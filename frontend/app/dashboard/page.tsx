"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavBar from "@/components/dashboard/TopNavBar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import QuickActions from "@/components/dashboard/QuickActions";
import { fetchDashboardData } from "@/lib/api"; // ✅ Fix: Corrected import
import styles from "./Dashboard.module.css";


export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Error in loadDashboardData:", err);
        setError("Failed to load dashboard data. Please try again later.");
      }
    };
    loadDashboardData();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!dashboardData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <div className={styles.dashboardGrid}>
          <div className={styles.leftColumn}>
            <SummaryCards data={dashboardData.summary} />
            <QuickActions />
          </div>
          <div className={styles.rightColumn}>
            <RecentOrdersTable orders={dashboardData.recentOrders} />
          </div>
        </div>
      </div>
    </div>
  );
}
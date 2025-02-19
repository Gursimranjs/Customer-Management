"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavBar from "@/components/dashboard/TopNavBar";
import OrdersList from "@/components/orders/OrdersList";
import API from "@/utils/axios"; // ✅ Fetch orders from backend
import styles from "./Orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/orders")
      .then((response) => {
        console.log("Fetched Orders:", response.data); // ✅ Log response data
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error); // ✅ Log the actual error
        setError("Failed to load orders.");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.ordersPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <div className={styles.ordersHeader}>
          <h1>Orders</h1>
          <Link href="/orders/create">
            <button className={styles.createOrderBtn}>Create New Order</button>
          </Link>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <OrdersList orders={orders} />
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import styles from "./RecentOrdersTable.module.css";

export default function RecentOrdersTable({ orders }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ column: "orderId", direction: "asc" });

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter by orderId, status, or trackingNumber
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const term = searchTerm.toLowerCase();
      return (
        order.orderId.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term) ||
        order.trackingNumber.toLowerCase().includes(term)
      );
    });
  }, [orders, searchTerm]);

  // Sort the filtered results
  const sortedOrders = useMemo(() => {
    const { column, direction } = sortConfig;
    return [...filteredOrders].sort((a, b) => {
      const aVal = a[column]?.toString().toLowerCase() ?? "";
      const bVal = b[column]?.toString().toLowerCase() ?? "";
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredOrders, sortConfig]);

  return (
    <div className={styles.recentOrdersTable}>
      <div className={styles.tableHeader}>
        <h2>Recent Orders</h2>
        <div className={styles.searchBar}>
          <Search />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("orderId")}>
              Order ID <ArrowUpDown />
            </th>
            <th onClick={() => handleSort("status")}>
              Status <ArrowUpDown />
            </th>
            <th onClick={() => handleSort("expectedDelivery")}>
              Expected Delivery <ArrowUpDown />
            </th>
            <th>Tracking Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => (
              <tr
                key={order.orderId}
                className={order.status === "In Transit" ? styles.inTransit : ""}
              >
                <td>{order.orderId}</td>
                <td>{order.status}</td>
                <td>{order.expectedDelivery}</td>
                <td>{order.trackingNumber}</td>
                <td>
                  <button className={styles.viewButton}>View Order</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.noOrders}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
"use client"; // ✅ Add this at the top

import { useEffect, useState } from "react";
import API from "@/utils/axios";
import styles from "@/components/orders/OrdersList.module.css";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.ordersHeader}>Orders</h1>
      <table className="min-w-full bg-white border border-gray-200 text-left">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Pickup Address</th>
            <th className="px-4 py-2">Delivery Address</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{order.order_id}</td>
              <td className="px-4 py-2">{order.customer_name}</td>
              <td className="px-4 py-2">{order.pickup_address}</td>
              <td className="px-4 py-2">{order.dropoff_address}</td>
              <td className="px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
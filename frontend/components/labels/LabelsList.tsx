import { useState } from "react"
import GenerateLabel from "./GenerateLabel"
import LabelViewer from "./LabelViewer"
import styles from "./LabelsList.module.css"

interface Order {
  orderId: string
  customer: string
  address: string
  status: string
  items: number
}

interface LabelsListProps {
  searchTerm: string
}

export default function LabelsList({ searchTerm }: LabelsListProps) {
  const [orders, setOrders] = useState<Order[]>([
    { orderId: "ORD-1001", customer: "Acme Corp", address: "123 Main St, NY", status: "Pending", items: 5 },
    { orderId: "ORD-1002", customer: "Beta LLC", address: "456 Market St, CA", status: "In Transit", items: 2 },
    { orderId: "ORD-1003", customer: "Gamma Inc", address: "789 Oak Rd, TX", status: "Delivered", items: 1 },
    { orderId: "ORD-1004", customer: "Delta Co", address: "321 Pine Ave, FL", status: "Pending", items: 3 },
    { orderId: "ORD-1005", customer: "Epsilon Ltd", address: "654 Elm St, WA", status: "Delivered", items: 4 },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingOrders = filteredOrders.filter((order) => order.status !== "Delivered")
  const deliveredOrders = filteredOrders.filter((order) => order.status === "Delivered")

  const renderOrdersTable = (orders: Order[], title: string) => (
    <div className={styles.tableWrapper}>
      <h2 className={styles.tableTitle}>{title}</h2>
      <table className={styles.labelsTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Delivery Address</th>
            <th>Status</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>
                <span className={`${styles.status} ${styles[order.status.toLowerCase().replace(" ", "")]}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.items}</td>
              <td>
                <GenerateLabel order={order} />
                <button className={styles.viewButton} onClick={() => setSelectedOrder(order)}>
                  View Labels
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className={styles.labelsListContainer}>
      {renderOrdersTable(pendingOrders, "Pending Orders")}
      {renderOrdersTable(deliveredOrders, "Delivered Orders")}
      {selectedOrder && <LabelViewer order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  )
}


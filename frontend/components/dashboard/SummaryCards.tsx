import { Package, Truck, FileText, Box } from "lucide-react"
import styles from "./SummaryCards.module.css"

export default function SummaryCards({ data }) {
  const cards = [
    { title: "Total Orders", value: data.totalOrders, icon: <Package size={24} /> },
    { title: "Active Orders", value: data.activeOrders, icon: <Truck size={24} /> },
    { title: "Pending Invoices", value: data.pendingInvoices, icon: <FileText size={24} /> },
    { title: "Total Inventory Items", value: data.totalInventoryItems, icon: <Box size={24} /> },
  ]

  return (
    <div className={styles.summaryCards}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardIcon}>{card.icon}</div>
          <div className={styles.cardContent}>
            <h3>{card.title}</h3>
            <p className={styles.cardValue}>{card.value}</p>
            <p className={styles.cardSubtext}>Updated Just Now</p>
          </div>
        </div>
      ))}
    </div>
  )
}


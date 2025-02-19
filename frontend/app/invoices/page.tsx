"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import InvoicesList from "@/components/invoices/InvoicesList"
import styles from "./Invoices.module.css"

export default function InvoicesPage() {
  const [invoices] = useState([
    {
      invoiceId: "INV-1001",
      orderId: "ORD-1001",
      customer: "Acme Corp",
      status: "Pending",
      amountDue: "$0.00",
      createdAt: "2025-01-15",
    },
    {
      invoiceId: "INV-1002",
      orderId: "ORD-1002",
      customer: "Beta LLC",
      status: "Paid",
      amountDue: "$120.00",
      createdAt: "2025-01-16",
    },
    {
      invoiceId: "INV-1003",
      orderId: "ORD-1003",
      customer: "Gamma Inc",
      status: "Pending",
      amountDue: "$75.50",
      createdAt: "2025-01-17",
    },
  ])

  return (
    <div className={styles.invoicesPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <h1 className={styles.pageTitle}>Invoices</h1>
        <InvoicesList invoices={invoices} />
      </div>
    </div>
  )
}


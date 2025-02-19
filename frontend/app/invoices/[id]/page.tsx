"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/Sidebar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import styles from "./InvoiceDetails.module.css"

export default function InvoiceDetails({ params }) {
  const router = useRouter()
  const { id } = params
  const [invoice, setInvoice] = useState(null)

  useEffect(() => {
    // Mock API call to fetch invoice details
    const fetchInvoice = async () => {
      // In a real application, you would fetch this data from your API
      const mockInvoice = {
        invoiceId: id,
        orderId: "ORD-1001",
        customer: "Acme Corp",
        status: "Pending",
        amountDue: "$0.00",
        createdAt: "2025-01-15",
      }
      setInvoice(mockInvoice)
    }

    fetchInvoice()
  }, [id])

  const handleMarkAsPaid = () => {
    // In a real application, you would update the invoice status via an API call
    setInvoice((prevInvoice) => ({ ...prevInvoice, status: "Paid" }))
  }

  if (!invoice) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.invoiceDetailsPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <h1 className={styles.pageTitle}>Invoice Details</h1>
        <div className={styles.invoiceDetails}>
          <p>
            <strong>Invoice ID:</strong> {invoice.invoiceId}
          </p>
          <p>
            <strong>Order ID:</strong> {invoice.orderId}
          </p>
          <p>
            <strong>Customer:</strong> {invoice.customer}
          </p>
          <p>
            <strong>Status:</strong> <span className={styles[invoice.status.toLowerCase()]}>{invoice.status}</span>
          </p>
          <p>
            <strong>Amount Due:</strong> {invoice.amountDue}
          </p>
          <p>
            <strong>Created Date:</strong> {invoice.createdAt}
          </p>
          {invoice.status === "Pending" && (
            <button className={styles.markAsPaidButton} onClick={handleMarkAsPaid}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


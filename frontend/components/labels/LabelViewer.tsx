"use client"

import { useState } from "react"
import PrintButton from "../shared/PrintButton"
import styles from "./LabelViewer.module.css"

interface Order {
  orderId: string
  customer: string
  address: string
  items: number
}

interface LabelViewerProps {
  order: Order
  onClose: () => void
}

export default function LabelViewer({ order, onClose }: LabelViewerProps) {
  const [currentLabel, setCurrentLabel] = useState(1)

  const nextLabel = () => {
    if (currentLabel < order.items) {
      setCurrentLabel(currentLabel + 1)
    }
  }

  const prevLabel = () => {
    if (currentLabel > 1) {
      setCurrentLabel(currentLabel - 1)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          Shipping Label {currentLabel} of {order.items}
        </h2>
        <div className={styles.labelContent}>
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Customer:</strong> {order.customer}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.address}
          </p>
          <p>
            <strong>Tracking #:</strong> {`${order.orderId}-${currentLabel}`.replace("ORD", "TRK")}
          </p>
          <p>
            <strong>Carrier:</strong> MovinMountainsLogistics
          </p>
          <div className={styles.barcode}>
            {/* Placeholder for barcode */}
            ||||| |||| || ||||| ||| ||
          </div>
        </div>
        <div className={styles.modalActions}>
          <button onClick={prevLabel} disabled={currentLabel === 1}>
            Previous
          </button>
          <PrintButton />
          <button onClick={nextLabel} disabled={currentLabel === order.items}>
            Next
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}


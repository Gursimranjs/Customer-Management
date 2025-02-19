"use client"

import { useState } from "react"
import styles from "./GenerateLabel.module.css"

interface Order {
  orderId: string
  items: number
}

interface GenerateLabelProps {
  order: Order
}

export default function GenerateLabel({ order }: GenerateLabelProps) {
  const [loading, setLoading] = useState(false)

  const handleGenerateLabels = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert(`Generated ${order.items} labels for Order: ${order.orderId}`)
      setLoading(false)
    }, 1000)
  }

  return (
    <button className={styles.generateButton} onClick={handleGenerateLabels} disabled={loading}>
      {loading ? "Generating..." : `Generate ${order.items} Labels`}
    </button>
  )
}


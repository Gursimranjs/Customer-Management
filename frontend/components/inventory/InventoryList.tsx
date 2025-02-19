"use client"

import { useState } from "react"
import styles from "./InventoryList.module.css"

interface InventoryItem {
  productName: string
  stockQuantity: number
  weightPerUnit: number
  dimensions: string
}

export default function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  const handleDelete = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.inventoryListContainer}>
      <h2 className={styles.sectionTitle}>Inventory List</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stock Quantity</th>
              <th>Weight per Unit (kg)</th>
              <th>Dimensions (cm)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.stockQuantity}</td>
                <td>{item.weightPerUnit || "N/A"}</td>
                <td>{item.dimensions}</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


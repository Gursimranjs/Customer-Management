"use client"

import { useState } from "react"
import styles from "./AddInventoryItem.module.css"

interface InventoryItem {
  productName: string
  stockQuantity: number
  weightPerUnit: number
  dimensions: string
}

export default function AddInventoryItem() {
  const [item, setItem] = useState({
    productName: "",
    stockQuantity: "",
    weightPerUnit: "",
    length: "",
    width: "",
    height: "",
  })

  const handleAddItem = () => {
    const { productName, stockQuantity, weightPerUnit, length, width, height } = item

    if (!productName || !stockQuantity || !length || !width || !height) {
      alert("Please fill in all required fields.")
      return
    }

    const newItem: InventoryItem = {
      productName,
      stockQuantity: Number.parseInt(stockQuantity),
      weightPerUnit: Number.parseFloat(weightPerUnit) || 0,
      dimensions: `${length} x ${width} x ${height}`,
    }

    // In a real application, you would update the inventory state here
    console.log("New item added:", newItem)

    setItem({
      productName: "",
      stockQuantity: "",
      weightPerUnit: "",
      length: "",
      width: "",
      height: "",
    })
  }

  return (
    <div className={styles.addItemContainer}>
      <h2 className={styles.sectionTitle}>Add Inventory Item</h2>
      <div className={styles.formGrid}>
        <input
          type="text"
          placeholder="Product Name"
          value={item.productName}
          onChange={(e) => setItem({ ...item, productName: e.target.value })}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={item.stockQuantity}
          onChange={(e) => setItem({ ...item, stockQuantity: e.target.value })}
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Weight per Unit (kg)"
          value={item.weightPerUnit}
          onChange={(e) => setItem({ ...item, weightPerUnit: e.target.value })}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Length (cm)"
          value={item.length}
          onChange={(e) => setItem({ ...item, length: e.target.value })}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Width (cm)"
          value={item.width}
          onChange={(e) => setItem({ ...item, width: e.target.value })}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={item.height}
          onChange={(e) => setItem({ ...item, height: e.target.value })}
          className={styles.input}
        />
      </div>
      <button className={styles.addButton} onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  )
}


"use client"

import { useState } from "react"
import FileUploadButton from "@/components/shared/FileUploadButton"
import styles from "./UploadInventory.module.css"

interface InventoryItem {
  productName: string
  stockQuantity: number
  weightPerUnit: number
  dimensions: string
}

export default function UploadInventory() {
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setError(null)

    if (!file) {
      setError("No file selected")
      return
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    if (fileExtension !== "xlsx" && fileExtension !== "csv") {
      setError("Invalid file format. Please upload an Excel (.xlsx) or CSV (.csv) file.")
      return
    }

    // Here you would typically send the file to your backend for processing
    // For this example, we'll simulate processing with a timeout
    setTimeout(() => {
      const mockData: InventoryItem[] = [
        { productName: "Product A", stockQuantity: 100, weightPerUnit: 0.5, dimensions: "10 x 5 x 2" },
        { productName: "Product B", stockQuantity: 50, weightPerUnit: 1.2, dimensions: "20 x 15 x 10" },
      ]
      // In a real application, you would update the inventory state here
      console.log("Processed data:", mockData)
      alert("File processed successfully!")
    }, 2000)
  }

  const handleDownloadTemplate = () => {
    // In a real application, you would generate and provide a download link for the template
    alert("Downloading template...")
  }

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.sectionTitle}>Upload Inventory</h2>
      <p className={styles.instructions}>
        Upload your inventory file (Excel or CSV format).
        <button className={styles.downloadLink} onClick={handleDownloadTemplate}>
          Download template
        </button>
      </p>
      <FileUploadButton onFileSelect={handleFileUpload} accept=".xlsx,.csv" />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}


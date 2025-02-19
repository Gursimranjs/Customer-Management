import type { Metadata } from "next"
import Sidebar from "@/components/dashboard/Sidebar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import InventoryList from "@/components/inventory/InventoryList"
import UploadInventory from "@/components/inventory/UploadInventory"
import AddInventoryItem from "@/components/inventory/AddInventoryItem"
import styles from "./Inventory.module.css"

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Manage your inventory items",
}

export default function InventoryPage() {
  return (
    <div className={styles.inventoryPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <h1 className={styles.pageTitle}>Inventory Management</h1>
        <UploadInventory />
        <AddInventoryItem />
        <InventoryList />
      </div>
    </div>
  )
}


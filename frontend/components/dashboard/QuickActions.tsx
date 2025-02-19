import { Plus, Upload } from "lucide-react"
import styles from "./QuickActions.module.css"

export default function QuickActions() {
  return (
    <div className={styles.quickActions}>
      <button className={styles.actionButton}>
        <Plus size={20} />
        <span>Create New Order</span>
      </button>
      <button className={styles.actionButton}>
        <Upload size={20} />
        <span>Upload Inventory</span>
      </button>
    </div>
  )
}


import { Bell, User } from "lucide-react"
import styles from "./TopNavBar.module.css"

export default function TopNavBar() {
  return (
    <div className={styles.topNavBar}>
      <div className={styles.notifications}>
        <Bell />
        <span className={styles.notificationBadge}>3</span>
      </div>
      <div className={styles.userProfile}>
        <User />
        <span>John Doe</span>
      </div>
    </div>
  )
}


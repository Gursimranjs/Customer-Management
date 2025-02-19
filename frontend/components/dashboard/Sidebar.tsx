"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Package, FileText, Settings, Box, Tag, Menu, X } from "lucide-react"
import styles from "./Sidebar.module.css"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: "/dashboard", icon: <Home size={24} />, label: "Dashboard" },
    { href: "/orders", icon: <Package size={24} />, label: "Orders" },
    { href: "/inventory", icon: <Box size={24} />, label: "Inventory" },
    { href: "/labels", icon: <Tag size={24} />, label: "Labels" },
    { href: "/invoices", icon: <FileText size={24} />, label: "Invoices" },
    { href: "/settings", icon: <Settings size={24} />, label: "Settings" },
  ]

  return (
    <>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Moving Mountains Logistics" />
        </div>
        <ul className={styles.navItems}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.mobileMenuToggle} onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  )
}


"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import LabelsList from "@/components/labels/LabelsList"
import SearchBar from "@/components/labels/SearchBar"
import styles from "./Labels.module.css"

export default function LabelsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className={styles.labelsPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <h1 className={styles.pageTitle}>Shipping Labels</h1>
        <SearchBar onSearch={setSearchTerm} />
        <LabelsList searchTerm={searchTerm} />
      </div>
    </div>
  )
}


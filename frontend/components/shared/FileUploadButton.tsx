import type React from "react"
import { useRef } from "react"
import styles from "./FileUploadButton.module.css"

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void
  accept: string
}

export default function FileUploadButton({ onFileSelect, accept }: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div>
      <button className={styles.uploadButton} onClick={handleClick}>
        Select File
      </button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} accept={accept} />
    </div>
  )
}


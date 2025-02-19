import styles from "./PrintButton.module.css"

export default function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button className={styles.printButton} onClick={handlePrint}>
      Print Label
    </button>
  )
}


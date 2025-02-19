import Link from "next/link"
import styles from "./InvoicesList.module.css"

interface Invoice {
  invoiceId: string
  orderId: string
  customer: string
  status: string
  amountDue: string
  createdAt: string
}

interface InvoicesListProps {
  invoices: Invoice[]
}

export default function InvoicesList({ invoices }: InvoicesListProps) {
  return (
    <div className={styles.invoicesListContainer}>
      <table className={styles.invoicesTable}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Amount Due</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceId}>
              <td>{invoice.invoiceId}</td>
              <td>
                <Link href={`/orders/${invoice.orderId}`}>{invoice.orderId}</Link>
              </td>
              <td>{invoice.customer}</td>
              <td>
                <span className={`${styles.status} ${styles[invoice.status.toLowerCase()]}`}>{invoice.status}</span>
              </td>
              <td>{invoice.amountDue}</td>
              <td>{invoice.createdAt}</td>
              <td>
                <Link href={`/invoices/${invoice.invoiceId}`}>
                  <button className={styles.viewButton}>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


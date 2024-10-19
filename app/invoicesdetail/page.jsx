import EditInvoices from "../editinvoices/editinvoices"
import "./invoicesdetail.css"

export default function InvoicesDetail() {

  return (
    <div className="invoiceDetail">
      <div className="invoicedetailheader">
        <p>Status</p>
        <li>Pending</li>
      </div>
      <div className="invoicedetailbtn">
        <EditInvoices />
        <button className="dlt">Sil</button>
        <button className="save">Ödendi olarak işaretle</button>

      </div>
    </div>
  )
}
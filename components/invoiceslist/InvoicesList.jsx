import InvoicesTop from "../invoicestop/invoicestop";
import "./invoiceslist.css"

export default function InvoicesList(){
  return(
    <div className="invoice">
    <InvoicesTop />
    <div className="invoiceList">
      <div className="invoiceİtem">
        <h3>#RT3080</h3>
        <p>Due  19 Aug 2021</p>
        <p>Jensen Huang</p>
        <h3>£ 1,800.90</h3>
        <li>Ödenmiş</li>
      </div>
    </div>
  </div>
  )
}
import NewInvoices from "../newinvoices/newinvoices"
import "./invoicestop.css"
import { DowndArrow, TopPlus } from "./topsvg"


export default function InvoicesTop() {
  return (
    <div className="invoicesTopCont">
      <div className="invoicesTopLogo">
        <h1>Invoices</h1>
        <p>Toplam <span>7</span> fatura bulunmaktadır</p>
      </div>
      <div className="filterandNew">
        <div className="filter">
          <p>Duruma göre Filtrele </p>
          <DowndArrow />

          <div className="filters">
            <label htmlFor="draft">
              <input type="checkbox" name="draft" id="" />Draft
            </label>
            <label htmlFor="pending">
              <input type="checkbox" name="pending" id="" />Pending
            </label>
            <label htmlFor="paid">
              <input type="checkbox" name="paid" id="" />Paid
            </label>
          </div>
        </div>
        <NewInvoices />
      </div>
    </div>
  )
}
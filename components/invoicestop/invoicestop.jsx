"use client"
import NewInvoices from "../newinvoices/newinvoices"
import "./invoicestop.css"
import { DowndArrow, TopPlus } from "./topsvg"


export default function InvoicesTop({ length, FilterData, medata }) {

  return (
    <div className="invoicesTopCont">
      <div className="invoicesTopLogo">
        <h1>Invoices</h1>
        <p>Toplam <span>{length}</span> fatura bulunmaktadır</p>
      </div>
      <div className="filterandNew">
        <div className="filter">
          <p>Duruma göre Filtrele </p>
          <p>Filtrele</p>
          <DowndArrow />

          <div className="filters">
            <label htmlFor="draft">
              <input type="checkbox" name="draft" onChange={(event) => FilterData(event, "2")} />Draft
            </label>
            <label htmlFor="pending" >
              <input type="checkbox" name="pending" onChange={(event) => FilterData(event, "0")} />Pending
            </label>
            <label htmlFor="paid">
              <input type="checkbox" name="paid" onChange={(event) => FilterData(event, "1")} />Paid
            </label>
          </div>
        </div>
        <NewInvoices medata={medata} />
      </div>
    </div>
  )
}
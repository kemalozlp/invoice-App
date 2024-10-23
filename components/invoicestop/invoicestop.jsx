"use client"
import NewInvoices from "../newinvoices/newinvoices"
import "./invoicestop.css"
import { DowndArrow, TopPlus } from "./topsvg"


export default function InvoicesTop({ length, FilterData, medata, datalist }) {

  return (
    <div className="invoicesTopCont">
      <div className="invoicesTopLogo">
        <h1>Invoices</h1>
        <p className="desktop">Toplam <span>{length}</span> fatura bulunmaktadır</p>
        <p  className="mobile "> <span>{length}</span> fatura</p>
      </div>
      <div className="filterandNew">
        <div className="filter">
          <p  className="desktop">Duruma göre Filtrele </p>
          <p  className="mobile" >Filtrele</p>
          <DowndArrow />

          <div className="filters">
            <label htmlFor="draft" onChange={(event) => FilterData(event, 2)}>
              <input type="checkbox" name="draft" id="draft" />Draft
            </label>
            <label htmlFor="pending" onChange={(event) => FilterData(event, 0)}  >
              <input type="checkbox" name="pending" id="pending" />Pending
            </label>
            <label htmlFor="paid" onChange={(event) => FilterData(event, 1)} >
              <input type="checkbox" name="paid" id="paid" />Paid
            </label>
          </div>
        </div>
        <NewInvoices medata={medata}  datalist={datalist} />
      </div>
    </div>
  )
}
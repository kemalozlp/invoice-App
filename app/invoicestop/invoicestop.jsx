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
        </div>
        <div className="newInvoicesBtn">
          <TopPlus />
          <h2>Yeni Fatura</h2>
        </div>
      </div>
    </div>
  )
}
import Image from "next/image"
import InvoicesTop from "../invoicestop/invoicestop"
import "./emptyinvoices.css"
import Link from "next/link"

export default function EmptyInvoices() {

  return (
    <div className="invoiceEmpty">
      <InvoicesTop />
      <div className="emptyimg">
        <Image width={241.34} height={200} src={"/images/Flatline.png"} />
        <div className="emptytext">
          <h1>Burada hiçbir şey yok.</h1>
          <p>  Tıklayarak bir fatura oluşturun <br />
           <span>Yeni Fatura</span> düğmesine basın ve başlayın</p>
        </div>
      </div>

    </div>
  )
}
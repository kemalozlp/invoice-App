import Link from "next/link"
import EditInvoices from "../editinvoices/editinvoices"
import "./invoicesdetail.css"
import Image from "next/image"

export default function InvoicesDetail() {

  return (
    <div className="invoiceDetail">
      <div className="back">
        <Link href={"/"}> <Image width={10} height={10} src={"/images/ok.png"} /> <p>Go Back</p> </Link>
      </div>
      <div className="detailHeader">
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
      <div className="detailContent">
        <div className="dcTop">
          <div className="dctLeft">
            <p className="dctlTop>"><h4>#XM9141</h4></p>
            <p className="dctlBottom">Grafik Tasarım</p>
          </div>
          <div className="dctRight">
            <p> 19 Union Terrace <br /> London <br /> E1 3EZ <br /> United Kingdom</p>
          </div>
        </div>
        <div className="dcMedium">
          <div className="dcmLeft">
            <div>
              <p>Fatura Tarihi</p> <br />
              <h3>21 Ağustos 2021</h3>
            </div>
            <div>
              <p>Vadesi Gelen Ödeme</p>
              <br />
              <h3>20 Eylül 2021</h3>
            </div>
          </div>
          <div className="dcmMedium">
            <p>fatura</p> <br />
            <h3>Alex Grim</h3> <br />
            <p>
              84 Church Way <br /> Bradford <br /> BD1 9PB <br />
              United Kingdom
            </p>
          </div>
          <div className="dcmRight">
            <p>Gönderilen</p> <br />
            <h3>alexgrim@mail.com</h3>
          </div>
        </div>
        <div className="itemsContainer">
          <div className="column">
            <p>Ürün Adı</p>
            <h3 >Afiş Tasarımı</h3>
          </div>
          <div className="itemsDetail">
            <div className="column">
              <p>Adet</p>
              <p>1</p>
            </div>
            <div className="column">
              <p>Fiyat</p>
              <p>€156.00</p>
            </div>
            <div className="column">
              <p>Toplam</p>
              <h3 >€156.00</h3>
            </div>
          </div>
        </div>
        <div className="dcFooter">
          <h2>Ödenmesi Gereken Tutar</h2>
          <h2>€556.00</h2>
        </div>
      </div>
    </div >
  )
}
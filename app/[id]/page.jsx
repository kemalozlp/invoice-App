import Link from "next/link"
import EditInvoices from "../../components/editinvoices/editinvoices"
import "./invoicesdetail.css"
import Image from "next/image"
import { getInvoices } from "@/utils/invoicesService";

export default async function InvoicesDetail({ params }) {

  const data = await getInvoices();

  console.log(data);

  const filteredData = data.find(x => x.id === Number(params.id));
  console.log(filteredData, "assdasd");


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
      <div className="detailContent" >
        <div className="dcTop">
          <div className="dctLeft">
           <h4 className="dctlTop>">#{filteredData.referanceNumber}</h4>
            <p className="dctlBottom">{filteredData.description}</p>
          </div>
          <div className="dctRight">
            <p> {filteredData.fromStreet} <br /> {filteredData.fromCity} <br /> {filteredData.fromPostCode}<br /> {filteredData.fromCountry}</p>
          </div>
        </div>
        <div className="dcMedium">
          <div className="dcmLeft">
            <div>
              <p>Fatura Tarihi</p> <br />
              <h3>{filteredData.paymentDue}</h3>
            </div>
            <div>
              <p>Vadesi Gelen Ödeme</p>
              <br />
              <h3>{filteredData.invoiceDate}</h3>
            </div>
          </div>
          <div className="dcmMedium">
            <p>fatura</p> <br />
            <h3>{filteredData.clientName}</h3> <br />
            <p>
              {filteredData.fromStreet} <br /> {filteredData.fromCity}  <br /> {filteredData.fromPostCode} <br />
              {filteredData.fromCountry}
            </p>
          </div>
          <div className="dcmRight">
            <p>Gönderilen</p> <br />
            <h3>alexgrim@mail.com</h3>
          </div>
        </div>
        {filteredData ? filteredData.items.map((x, i) =>

          <div className="itemsContainer" key={i}>
            <div className="column">
              <p>Ürün Adı</p>
              <h3 >{x.name}</h3>
            </div>
            <div className="itemsDetail">
              <div className="column">
                <p>Adet</p>
                <p>{x.quantity}</p>
              </div>
              <div className="column">
                <p>Fiyat</p>
                <p>{x.price}</p>
              </div>
              <div className="column">
                <p>Toplam</p>
                <h3 >{x.price * x.quantity}</h3>
              </div>
            </div>
          </div>
        ) : ""}
        <div className="dcFooter">
          <h2>Ödenmesi Gereken Tutar</h2>
          <h2>€556.00</h2>
        </div>
      </div>
    </div >
  )
}
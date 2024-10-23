import Link from "next/link"
import EditInvoices from "../../components/editinvoices/editinvoices"
import "./invoicesdetail.css"
import Image from "next/image"
import { getInvoices, getMe } from "@/utils/invoicesService";

export default async function InvoicesDetail({ params }) {
  console.log(params);
  let id = 0;

  if (params.id <= 24){
    id = 1
  }else if(params.id <= 28){
    id = 2;
  }else if(params.id <= 32){
    id = 3;
  }else if(params.id <= 36){
    id = 4;
  }else if(params.id <= 40){
    id = 5;
  }

    const data = await getInvoices(id, 5);

  const medata = await getMe();
  console.log(data, "asdasdasdad");
  console.log(data.invoices);

  const filteredData = data?.invoices.find(x => x.id === Number(params.id));
  console.log(filteredData, "assdasd");

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  let toplam = filteredData?.items.map(x => x.price * x.quantity);

  return (
    <div className="invoiceDetail">
      <div className="back">
        <Link href={"/"}> <Image width={10} height={10} src={"/images/ok.png"} /> <p>Go Back</p> </Link>
      </div>
      <div className="detailHeader">
        <div className="invoicedetailheader" >
          <p>Status</p>
          <li
            style={{
              color: `${filteredData?.status === 0 ? "rgba(51, 214, 159, 1)" : filteredData?.status === 1 ? "rgba(255, 143, 0, 1)" : filteredData?.status === 2 ? "rgba(55, 59, 83, 1)" : filteredData?.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
              backgroundColor: `${filteredData?.status === 0 ? "rgba(51, 214, 159, .05)" : filteredData?.status === 1 ? "rgba(255, 143, 0, .05)" : filteredData?.status === 2 ? "rgba(55, 59, 83, .05)" : filteredData?.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`,
            }}>{filteredData?.status === 0 ? "pending" : filteredData?.status === 1 ? "paid" : filteredData?.status === 2 ? "draft" : filteredData?.status === 3 ? "Deleted" : ""}</li>
        </div>
        <div className="invoicedetailbtn">
          <EditInvoices medata={medata} filteredData={filteredData} />
          <button className="dlt">Sil</button>
          <button className="save">Ödendi olarak işaretle</button>
        </div>
      </div>
      <div className="detailContent" >
        <div className="dcTop">
          <div className="dctLeft">
            <h4 className="dctlTop>">#{filteredData?.referanceNumber}</h4>
            <p className="dctlBottom">{filteredData?.description}</p>
          </div>
          <div className="dctRight">
            <p> {filteredData?.fromStreet} <br />  {filteredData?.fromCity} <br /> {filteredData?.fromPostCode}  <br /> {filteredData?.fromCountry}</p>
          </div>
        </div>
        <div className="dcMedium">
          <div className="dcmLeft">
            <div>
              <p>Fatura Tarihi</p>
              <h3> {formatDate(filteredData?.paymentDue)}</h3>
            </div>
            <div>
              <p>Vadesi Gelen Ödeme</p>

              <h3> {formatDate(filteredData?.invoiceDate)}</h3>
            </div>
          </div>
          <div className="dcmMedium">
            <p>fatura</p>
            <h3>{filteredData?.clientName}</h3>
            <p>
              {filteredData?.fromStreet} <br /> {filteredData?.fromCity}  <br />  {filteredData?.fromPostCode} <br />
              {filteredData?.fromCountry}
            </p>
          </div>
          <div className="dcmRight">
            <p>Gönderilen</p>
            <h3>alexgrim@mail.com</h3>
          </div>
        </div>
        <div className="itemsContainer">
          <div className="item-item">
            <p>Ürün Adı</p>
            <p>Adet</p>
            <p>Fiyat</p>
            <p>Toplam</p>
          </div>
          {filteredData ? filteredData?.items.map((x, i) =>

            <div className="items-item" key={i}>
              <h3 >{x.name}</h3>
              <p>{x.quantity}</p>
              <p>{x.price}</p>
              <h3 >{x.price * x.quantity}</h3>

            </div>
          ) : ""} </div>
        <div className="dcFooter">
          <h2>Ödenmesi Gereken Tutar</h2>
          <h2>€{toplam}</h2>
        </div>
      </div>
    </div >
  )
}
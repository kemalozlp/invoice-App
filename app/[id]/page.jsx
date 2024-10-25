"use client"
import {Spinner} from "@nextui-org/spinner";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import EditInvoices from "../../components/editinvoices/editinvoices";
import "./invoicesdetail.css";
import Image from "next/image";
import { deleteInvoices, getDetailInvoices, getInvoices, getMe, MarksPaidInvoices } from "@/utils/invoicesService";
import { notFound, redirect } from "next/navigation";
export default function InvoicesDetail({ params }) {
  const [data, setData] = useState(null);
  const [medata, setMeData] = useState(null); 
  const [deleted, setDeleted] = useState(false);
  const [markspaids, setMarkspaids] = useState(false);
  const dialogRef = useRef({});



  useEffect(() => { 

    const fetchData = async () => {
      const invoiceData = await getDetailInvoices(params.id);
      const userData = await getMe(); 

      setData(invoiceData);
      setMeData(userData); 

      if(!invoiceData){
        return notFound();
      }
    };
    const deleteInvoice = async () => {
      await deleteInvoices(params.id); 
    };

    const markspaid = async () => {
      await MarksPaidInvoices(params.id); 
    };

    if (markspaids) {
      markspaid();
      redirect("/");
    }

    if (deleted) {
      deleteInvoice();
      redirect("/");
    }

    fetchData();
  }, [params.id, deleted, markspaids]);
 

  if(!data){
    return <div style={{
      position:"absolute",
      top:"50%",
      left:"50%"
    }}> <Spinner  label="Loading..." color="warning"  /></div>
  }


  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  }; 
 
  function handleClick() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function close() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  return (
    <div className="invoiceDetail">
      <div className="back">
        <Link href={"/"}>
          <Image width={10} height={10} src={"/images/ok.png"} alt="Back" />
          <p>Go Back</p>
        </Link>
      </div>
      <div className="detailHeader">
        <div className="invoicedetailheader">
          <p>Status</p>
          <li
            style={{
              color: `${data?.status === 0 ? "rgba(51, 214, 159, 1)" : data?.status === 1 ? "rgba(255, 143, 0, 1)" : data?.status === 2 ? "rgba(55, 59, 83, 1)" : data?.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
              backgroundColor: `${data?.status === 0 ? "rgba(51, 214, 159, .05)" : data?.status === 1 ? "rgba(255, 143, 0, .05)" : data?.status === 2 ? "rgba(55, 59, 83, .05)" : data?.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`,
            }}
          >
            {data?.status === 0 ? "pending" : data?.status === 1 ? "paid" : data?.status === 2 ? "draft" : data?.status === 3 ? "Deleted" : ""}
          </li>
        </div>
        <dialog ref={(e) => (dialogRef.current = e)}>
          <div className="dialogCont">
            <h1>Silme İşlemini Onayla</h1>
            <p>#{data?.referanceNumber} numaralı faturayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="dialogBtns">
              <button onClick={() => close()}>Vazgeç</button>
              <button onClick={() => {setDeleted(true);close()}}>Sil</button>
            </div>
          </div>
        </dialog>
        <div className="invoicedetailbtn">
          <EditInvoices medata={medata} data={data} />
          <button className="dlt" onClick={() => handleClick()}>Sil</button>
          <button className="save" onClick={() => setMarkspaids(true)}>Ödendi olarak işaretle</button>
        </div>
      </div>
      <div className="detailContent">
        <div className="dcTop">
          <div className="dctLeft">
            <h4>#{data?.referanceNumber}</h4>
            <p>{data?.description}</p>
          </div>
          <div className="dctRight">
            <p> {data?.fromStreet} <br /> {data?.fromCity} <br /> {data?.fromPostCode}  <br /> {data?.fromCountry}</p>
          </div>
        </div>
        <div className="dcMedium">
          <div className="dcmLeft">
            <div>
              <p>Fatura Tarihi</p>
              <h3>{formatDate(data?.paymentDue)}</h3>
            </div>
            <div>
              <p>Vadesi Gelen Ödeme</p>
              <h3>{formatDate(data?.invoiceDate)}</h3>
            </div>
          </div>
          <div className="dcmMedium">
            <p>fatura</p>
            <h3>{data?.clientName}</h3>
            <p>
              {data?.fromStreet} <br /> {data?.fromCity}  <br />  {data?.fromPostCode} <br />
              {data?.fromCountry}
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
          {data?.items?.map((x, i) => (
            <div className="items-item" key={i}>
              <h3>{x.name}</h3>
              <p>{x.quantity}</p>
              <p>{x.price}</p>
              <h3>{x.price * x.quantity}</h3>
            </div>
          ))}
        </div>
        <div className="dcFooter">
          <h2>Ödenmesi Gereken Tutar</h2>
          <h2>€{data.amount}</h2>
        </div>
      </div>
    </div>
  );
}

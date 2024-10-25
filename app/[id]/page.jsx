"use client"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import EditInvoices from "../../components/editinvoices/editinvoices";
import "./invoicesdetail.css";
import Image from "next/image";
import { deleteInvoices, getInvoices, getMe, MarksPaidInvoices } from "@/utils/invoicesService";
export default function InvoicesDetail({ params }) {
  const [data, setData] = useState(null);
  const [medata, setMeData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [markspaids, setMarkspaids] = useState(false);
  const dialogRef = useRef({});

  useEffect(() => {
    let id = 0;
    if (params.id <= 24) {
      id = 1;
    } else if (params.id <= 28) {
      id = 2;
    } else if (params.id <= 32) {
      id = 3;
    } else if (params.id <= 36) {
      id = 4;
    } else if (params.id <= 40) {
      id = 5;
    }

    const fetchData = async () => {
      const invoiceData = await getInvoices(id, 5);
      const userData = await getMe();
      const filtered = invoiceData?.invoices.find(x => x.id === Number(params.id));

      setData(invoiceData);
      setMeData(userData);
      setFilteredData(filtered);
    };
    const deleteInvoice = async () => {
      await deleteInvoices(params.id);
      router.push("/");
    };

    const markspaid = async () => {
      await MarksPaidInvoices(params.id);
      router.push("/");
    };

    if (markspaids) {
      markspaid();
    }

    if (deleted) {
      deleteInvoice();
    }

    fetchData();
  }, [params.id, deleted, markspaids]);

  console.log(typeof filteredData?.id);


  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  let toplam = filteredData?.items?.map(x => x.price * x.quantity).reduce((acc, val) => acc + val, 0);


  if (!filteredData) {
    return <div>Loading...</div>;
  }

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
              color: `${filteredData?.status === 0 ? "rgba(51, 214, 159, 1)" : filteredData?.status === 1 ? "rgba(255, 143, 0, 1)" : filteredData?.status === 2 ? "rgba(55, 59, 83, 1)" : filteredData?.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
              backgroundColor: `${filteredData?.status === 0 ? "rgba(51, 214, 159, .05)" : filteredData?.status === 1 ? "rgba(255, 143, 0, .05)" : filteredData?.status === 2 ? "rgba(55, 59, 83, .05)" : filteredData?.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`,
            }}
          >
            {filteredData?.status === 0 ? "pending" : filteredData?.status === 1 ? "paid" : filteredData?.status === 2 ? "draft" : filteredData?.status === 3 ? "Deleted" : ""}
          </li>
        </div>
        <dialog ref={(e) => (dialogRef.current = e)}>
          <div className="dialogCont">
            <h1>Silme İşlemini Onayla</h1>
            <p>#{filteredData?.referanceNumber} numaralı faturayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="dialogBtns">
              <button onClick={() => close()}>Vazgeç</button>
              <button onClick={() => {setDeleted(true);close()}}>Sil</button>
            </div>
          </div>
        </dialog>
        <div className="invoicedetailbtn">
          <EditInvoices medata={medata} filteredData={filteredData} />
          <button className="dlt" onClick={() => handleClick()}>Sil</button>
          <button className="save" onClick={() => setMarkspaids(true)}>Ödendi olarak işaretle</button>
        </div>
      </div>
      <div className="detailContent">
        <div className="dcTop">
          <div className="dctLeft">
            <h4>#{filteredData?.referanceNumber}</h4>
            <p>{filteredData?.description}</p>
          </div>
          <div className="dctRight">
            <p> {filteredData?.fromStreet} <br /> {filteredData?.fromCity} <br /> {filteredData?.fromPostCode}  <br /> {filteredData?.fromCountry}</p>
          </div>
        </div>
        <div className="dcMedium">
          <div className="dcmLeft">
            <div>
              <p>Fatura Tarihi</p>
              <h3>{formatDate(filteredData?.paymentDue)}</h3>
            </div>
            <div>
              <p>Vadesi Gelen Ödeme</p>
              <h3>{formatDate(filteredData?.invoiceDate)}</h3>
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
          {filteredData?.items?.map((x, i) => (
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
          <h2>€{toplam}</h2>
        </div>
      </div>
    </div>
  );
}

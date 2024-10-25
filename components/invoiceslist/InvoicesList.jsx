"use client"

import { getInvoices, getMe } from "@/utils/invoicesService";
import { useEffect, useState } from "react";
import Link from "next/link";
import EmptyInvoices from "../emptyinvoices/emptyinvoices";
import InvoicesTop from "../invoicestop/invoicestop";
import "./invoiceslist.css";
import Image from "next/image";
import { LeftArrow, RightArrow } from "../invoicestop/topsvg";


export default function InvoicesList({ medata }) {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [datalist, setDataList] = useState([]);

  useEffect(() => {
    const getInvoicess = async () => {
      const data = await getInvoices(page, 5);
      setDatas(data);
      setDataList(data)
    }
    getInvoicess();
  }, [page]);

  function FilterData(event, statusdata) {
    console.log(datalist);
    if (event.target.checked) {
      let filtereddata = datas?.invoices.filter((x) => x.status === Number(statusdata));
      setDataList(filtereddata);
      console.log(datalist);
    } else {
      setDataList(datas.invoices);
    }
  }

  useEffect(() => {
    setDataList(datalist);
    console.log(datalist);

  }, [datalist]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  function PrevPage() {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }

  function NextPage() {
    if (page < Math.ceil(datas.totalItems / datas.pageSize)) {
      setPage(prev => prev + 1);
    }
  }

  if(!datalist){
    return <div style={{
      position:"absolute",
      top:"50%",
      left:"50%"
    }}> <Spinner  label="Loading..." color="warning"  /></div>
  }


  const result = Math.ceil(datas.totalItems / datas.pageSize);

  return (
    <div className="invoice">
      <InvoicesTop length={datas.totalItems} datalist={datalist} FilterData={FilterData} medata={medata} />
      <div className="invoiceList">
        {datalist?.invoices?.length > 0 ? (
          datalist?.invoices?.map((x, i) => (
            <Link href={"/" + x.id} key={i} className="invoiceİtem"  >
              <div className="invoiceTextItem">
                <h3>
                  <span>#</span>{x.referanceNumber}
                </h3>
                <p>Due {formatDate(x.invoiceDate)}</p>
                <p>{x.clientName}</p>
              </div>
              <div className="invoiceTextItem">
                <h3>${x.amount}</h3>
                <li
                  style={{
                    color: `${x.status === 0 ? "rgba(51, 214, 159, 1)" : x.status === 1 ? "rgba(255, 143, 0, 1)" : x.status === 2 ? "rgba(55, 59, 83, 1)" : x.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
                    backgroundColor: `${x.status === 0 ? "rgba(51, 214, 159, .05)" : x.status === 1 ? "rgba(255, 143, 0, .05)" : x.status === 2 ? "rgba(55, 59, 83, .05)" : x.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`,
                  }}
                >● {x.status === 0 ? "pending" : x.status === 1 ? "paid" : x.status === 2 ? "draft" : x.status === 3 ? "Deleted" : ""}</li>
                <Image width={8} height={12} src={"/images/rightarrow.png"} />
              </div>
            </Link>
          ))
        ) : datalist.length > 0 ? (
          datalist?.map((x, i) => (
            <Link href={"/" + x.id} key={i} className="invoiceİtem"  >
              <div className="invoiceTextItem">
                <h3>
                  <span>#</span>{x.referanceNumber}
                </h3>
                <p>Due {formatDate(x.invoiceDate)}</p>
                <p>{x.clientName}</p>
              </div>
              <div className="invoiceTextItem">
                <h3>${x.amount}</h3>
                <li
                  style={{
                    color: `${x.status === 0 ? "rgba(51, 214, 159, 1)" : x.status === 1 ? "rgba(255, 143, 0, 1)" : x.status === 2 ? "rgba(55, 59, 83, 1)" : x.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
                    backgroundColor: `${x.status === 0 ? "rgba(51, 214, 159, .05)" : x.status === 1 ? "rgba(255, 143, 0, .05)" : x.status === 2 ? "rgba(55, 59, 83, .05)" : x.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`,
                  }}
                >● {x.status === 0 ? "pending" : x.status === 1 ? "paid" : x.status === 2 ? "draft" : x.status === 3 ? "Deleted" : ""}</li>
                <Image width={8} height={12} src={"/images/rightarrow.png"} />
              </div>
            </Link>
          ))
        ) : <EmptyInvoices />}
      </div>

      <div className="buttonList">
        <button onClick={PrevPage}> <LeftArrow />  Önceki </button>
        {[...Array(Number(result) || 0)].map((a, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
            className="pagination"
          >
            {i + 1}
          </button>
        ))}

        <button onClick={NextPage}>Sonraki <RightArrow /> </button>
      </div>
    </div>
  );
}

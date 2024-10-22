"use client"

import { getInvoices, getMe } from "@/utils/invoicesService";
import { useEffect, useState } from "react";
import Link from "next/link";
import EmptyInvoices from "../emptyinvoices/emptyinvoices";
import InvoicesTop from "../invoicestop/invoicestop";
import "./invoiceslist.css"; 


export default function InvoicesList({ medata }) {
  const [datalist, setDataList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getInvoicess = async (e) => {
      const data = await getInvoices(page, 5);
      setDataList(data);
    }
    getInvoicess();
  }, [page]);

  function FilterData(event, statusdata) {
    if (event.target.checked) {
      setDataList(datalist?.invoices?.filter((x) => x.status === Number(statusdata)));
    }
  }

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  console.log(datalist, "dasdasdasdasdasdasdasdasddasd");


  function PrevPage() {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }

  console.log( Math.ceil(datalist.totalItems / datalist.pageSize), "dasdasdsadasdasdasdasda8s7das4d98as4d9as4d8as94da98");
  
  function NextPage() {
    if (page < Math.ceil(datalist.totalItems / datalist.pageSize)) {
      setPage(prev => prev + 1);
    }
  }


  return (
    <div className="invoice">
      <InvoicesTop length={datalist.totalItems} FilterData={FilterData} medata={medata} />
      <div className="invoiceList">
        {datalist?.invoices?.length > 0 ? (
          datalist?.invoices.map((x, i) => (
            <Link href={"/" + x.id} key={i} className="invoiceİtem">
              <h3>
                <span>#</span>{x.referanceNumber}
              </h3>
              <p>Due {formatDate(x.invoiceDate)}</p>
              <p>{x.clientName}</p>
              <h3>${x.items.map((a) => a.total)}</h3>
              <li
                style={{
                  color: `${x.status === 0 ? "rgba(51, 214, 159, 1)" : x.status === 1 ? "rgba(255, 143, 0, 1)" : x.status === 2 ? "rgba(55, 59, 83, 1)" : x.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
                  backgroundColor: `${x.status === 0 ? "rgba(51, 214, 159, .05)" : x.status === 1 ? "rgba(255, 143, 0, .05)" : x.status === 2 ? "rgba(55, 59, 83, .05)" : x.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`,
                }}
              >● {x.status === 0 ? "pending" : x.status === 1 ? "paid" : x.status === 2 ? "draft" : x.status === 3 ? "Deleted" : ""}</li>
            </Link>
          ))
        ) : (
          <EmptyInvoices />
        )}
      </div>

      <div className="buttonList">
        <button onClick={PrevPage}>Önceki</button>
        <button onClick={NextPage}>Sonraki</button>
      </div>
    </div>
  );
}

"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import EmptyInvoices from "../emptyinvoices/emptyinvoices";
import InvoicesTop from "../invoicestop/invoicestop";
import "./invoiceslist.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function InvoicesList({ data, datatotal, medata }) {
  const [datalist, setDataList] = useState(data.invoices);
  const [page, setPage] = useState(1);

  const router = useRouter();

  function FilterData(event, statusdata) {
    if (event.target.checked) {
      setDataList(datalist.filter((x) => x.status === Number(statusdata)));
    } else {
      setDataList(data.invoices);
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


  function PrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      Cookies.set('page', newPage);
      router.refresh(); // Sayfayı yeniden oluştur 
    }
  }

  function NextPage() {
    const newPage = page + 1;
    setPage(newPage);
    Cookies.set('page', newPage);
    router.refresh(); // Sayfayı yeniden oluştur 
  }

  useEffect(() => {
    const storedPage = Cookies.get('page');
    if (storedPage) {
      setPage(Number(storedPage));
    }
  }, []);

  return (
    <div className="invoice">
      <InvoicesTop length={datatotal} FilterData={FilterData} medata={medata} />
      <div className="invoiceList">
        {datalist.length > 0 ? (
          datalist.map((x, i) => (
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

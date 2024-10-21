import Link from "next/link";
import EmptyInvoices from "../emptyinvoices/emptyinvoices";
import InvoicesTop from "../invoicestop/invoicestop";
import "./invoiceslist.css"
import { getInvoices } from "@/utils/invoicesService";

export default async function InvoicesList() {

  const data = await getInvoices();

  console.log(data);

  return (
    <div className="invoice">
      <InvoicesTop length={data.length} />
      <div className="invoiceList">
        {
          data ? data.map((x, i) =>
            <Link href={"/" + x.id} key={i}>
              <div className="invoiceİtem">
                <h3>#{x.referanceNumber}</h3>
                <p>{x.invoiceDate}</p>
                <p>{x.clientName}</p>
                <h3>{x.items.map(x => x.price)}</h3>
                <li style={{
                  color: `${x.status === 0 ? "rgba(51, 214, 159, 1)" : x.status === 1 ? "rgba(255, 143, 0, 1)" : x.status === 2 ? "rgba(55, 59, 83, 1)" : x.status === 3 ? "rgba(236, 87, 87, 1)" : ""}`,
                  backgroundColor: `${x.status === 0 ? "rgba(51, 214, 159, .05)" : x.status === 1 ? "rgba(255, 143, 0, .05)" : x.status === 2 ? "rgba(55, 59, 83, .05)" : x.status === 3 ? "rgba(236, 87, 87, .05)" : ""}`
                }}>● {x.status === 0 ? "pending" : x.status === 1 ? "paid" : x.status === 2 ? "draft" : x.status === 3 ? "Deleted" : ""}</li>
              </div></Link>
          ) : <EmptyInvoices />
        }
      </div>
    </div>
  )
}
import { getInvoices } from "@/utils/invoicesService";
import InvoicesList from "../components/invoiceslist/InvoicesList";


export default async function Home() {

  const data = await getInvoices();
  console.log(data);
  return (
    <div>
      <InvoicesList data={data} />
    </div>
  );
}

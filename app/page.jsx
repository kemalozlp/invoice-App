import { getInvoices, getMe } from "@/utils/invoicesService";
import InvoicesList from "../components/invoiceslist/InvoicesList";


export default async function Home() {
  
  const data = await getInvoices(1 , 5);
  console.log(data,"adasd");
  const medata = await getMe();
  console.log(data,"asdasdasdad");
  return (
    <div>
      <InvoicesList data={data} datatotal={data.totalItems} medata={medata} />
    </div>
  );
}

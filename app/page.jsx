import { getInvoices, getMe } from "@/utils/invoicesService";
import InvoicesList from "../components/invoiceslist/InvoicesList"; 
import { cookies } from "next/headers";


export default async function Home() {

  const cookieStore = cookies();
  console.log(cookieStore);
  
  const page = cookieStore.get('page');
 


  const data = await getInvoices(page ? page.value : 1, 5);
  console.log(data, "adasd");
  const medata = await getMe();
  console.log(data, "asdasdasdad");
  return (
    <div>
      <InvoicesList data={data} datatotal={data.totalItems} medata={medata} />
    </div>
  );
}

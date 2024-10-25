import { getInvoices, getMe } from "@/utils/invoicesService";

import InvoicesList from "../components/invoiceslist/InvoicesList";  

export default async function Home() {
 

 
  const medata = await getMe(); 
  return (
    <div>
      <InvoicesList   medata={medata} />
    </div>
  );
}

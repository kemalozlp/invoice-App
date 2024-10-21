
// postService.js
import { advancedFetch } from './fetchUtils'; 

export const getInvoices = async () => {
  const response = await advancedFetch("https://invoiceapi.senihay.com/api/Invoice/GetInvoices");
  return response;
};
 

export const addInvoices = async () => {
  const response = await advancedFetch(`https://invoiceapi.senihay.com/api/Invoice/AddInvoice`, "POST", {
    title: "Hello",
    userId: 1,
  });
  return response;
};


export const getMe = async () => {
  const response = await advancedFetch("https://invoiceapi.senihay.com/api/User/Me");
  return response;
};
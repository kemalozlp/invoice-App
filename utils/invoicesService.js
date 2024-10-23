"use server"

// postService.js
import { advancedFetch } from './fetchUtils'; 

export const getInvoices = async (page, pageSize) => {
  const response = await advancedFetch("https://invoiceapi.senihay.com/api/Invoice/GetInvoices?page="+ page + "&pageSize=" + pageSize);
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


export async function searchUser(name) {
  const response = await fetch("https://invoiceapi.senihay.com/api/Adress/Clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name
    })
  })
  return await response.json();
}

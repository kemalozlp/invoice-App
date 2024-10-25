"use server"

import { advancedFetch } from './fetchUtils';

export const getInvoices = async (page, pageSize) => {
  const response = await advancedFetch("https://invoiceapi.senihay.com/api/Invoice/GetInvoices?page=" + page + "&pageSize=" + pageSize);
  return response;
};
export const getDetailInvoices = async (id) => {
  const response = await advancedFetch("https://invoiceapi.senihay.com/api/Invoice/GetInvoiceByIdOptional/" + id);
  return response;
};



export const saveChanges = async (form, itemss) => {

  const response = await fetch('https://invoiceapi.senihay.com/api/Invoice/SaveChanges', {
    method: 'PUT',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: form[0].id,
      description: form[0].description,
      invoiceDate: form[0].invoicedate,
      paymentTermDay: form[0].invoicesterm,
      clientId: 1,
      items: itemss
    }),
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
  return response;
};

export const addClient = async (form) => {

  console.log(form);
  
  const response = await fetch('https://invoiceapi.senihay.com/api/Adress/AddClient', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: form[0].clients,
      mail: form[0].clientemail,
      street: form[0].tostreetadress,
      city: form[0].tocity,
      postCode: form[0].topostcode,
      country: form[0].tocountry
    }),
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
  return response;
};

export const addInvoices = async (form, itemss) => {


  console.log("çalıştım");
  
  const response = await fetch('https://invoiceapi.senihay.com/api/Invoice/AddInvoice', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      description: form[0].description,
      created:  form[0].date,
      invoiceDate: form[0].invoicedate,
      paymentTermDay: form[0].invoicesterm,
      clientId: 1,
      items: itemss
    }),
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
  return response;
};


export const updateClient = async (form) => {
  try {
    const response = await fetch('https://invoiceapi.senihay.com/api/Adress/UpdateClient', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        name: form[0].clients,
        mail: form[0].clientemail,
        street: form[0].tostreetadress,
        city: form[0].tocity,
        postCode: form[0].topostcode,
        country: form[0].tocountry,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
export const saveAsDraft = async (form, itemss) => {

  const response = await fetch('https://invoiceapi.senihay.com/api/Invoice/SaveAsDraft', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      description: form[0].description,
      created:  form[0].date,
      invoiceDate: form[0].invoicedate,
      paymentTermDay: form[0].invoicesterm,
      paymentDue: "2024-10-24T10:22:07.655Z",
      clientId: 1,
      items: itemss
    }),
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
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

export const deleteInvoices = async (id) => {
  const response = await fetch(`https://invoiceapi.senihay.com/api/Invoice/DeleteInvoice/${id}/delete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response;
};

export const MarksPaidInvoices = async (id) => {
  const response = await fetch(`https://invoiceapi.senihay.com/api/Invoice/MarkAsPaid?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response;
};


export const getMe = async () => {
  const response = await advancedFetch("https://invoiceapi.senihay.com/api/User/Me");
  return response;
};
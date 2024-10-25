"use server"
 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function editInvoicesForm(prevState, formData) {

  const formObj = Object.fromEntries(formData); 

  const errors = {
    streetadress: !formObj.streetadress && "Sokak Adres alanı boş olamaz",
    citypostcountry: !formObj.citypostcountry && "Şehir alanı boş olamaz",
    postcode: !formObj.postcode && "PostaKodu alanı boş olamaz",
    country: !formObj.country && "Ülke alanı boş olamaz",
    clients: !formObj.clients && "MüşteriAdı alanı boş olamaz",
    clientemail: !formObj.clientemail && "MüşteriEpostası alanı boş olamaz",
    tostreetadress: !formObj.tostreetadress && "MüşteriSokakAdresi alanı boş olamaz", 
    tocity: !formObj.tocity && "Şehir alanı boş olamaz",
    topostcode: !formObj.topostcode && "PostaKodu alanı boş olamaz",
    tocountry: !formObj.tocountry && "Ülke alanı boş olamaz",
    invoicedate: !formObj.invoicedate && "Fatura Tarihi alanı boş olamaz",
    invoiceterm: !formObj.invoiceterm && "Ödeme Koşulları alanı boş olamaz",
    description: !formObj.description && "Proje Açıklaması alanı boş olamaz",
    name: !formObj.name && "İsim alanı boş olamaz",
    quantity: !formObj.quantity && "Adet alanı boş olamaz",
    price: !formObj.price && "Fiyat alanı boş olamaz",
  };

  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      const element = errors[key];
      if (element) return { errors };
    }
  }
   
  revalidatePath('/', 'layout')
}
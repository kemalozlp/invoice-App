"use client"
import { useContext, useEffect, useRef, useState } from "react";
import "./newinvoices.css"
import Image from "next/image";
import { TopPlus } from "../invoicestop/topsvg";
import { useFormState } from "react-dom"
import { editInvoicesForm } from "../editinvoices/action";
import { addClient, addInvoices, saveAsDraft } from "@/utils/invoicesService";

export default function NewInvoices({ medata, datalist }) {
  const [itemList, setItemList] = useState([]);
  const [additem, setAddItem] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState([]);
  const [items, setItems] = useState([]);
  const [saves, setSaves] = useState(false);
  const [savesdraft, setSavesDraft] = useState(false);
  const [state, action] = useFormState(editInvoicesForm, {
    message: null,
    error: null,
  })


  useEffect(() => {
    setItemList([...itemList, {
      id: additem,
      text: "text",
      number: "number",
      textplaceholder: "lütfen isim giriniz",
      numberfirstplace: "ad",
      numbersecond: "fiyat giriniz"
    }])

  }, [additem]);
  useEffect(() => {
    setItemList(itemList.filter(x => x.id !== selectedIndex));
    setSelectedIndex(null);
    console.log(selectedIndex);
  }, [selectedIndex]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));
    await action(new FormData(e.target));

    if (state?.errors) {
      console.log("Form hataları:", state.errors);
      return;
    }
 
    if (!formObj.date) {
      formObj.date = new Date().toISOString();
    }

    console.log("Form verileri:", formObj);

    try {
      if (saves) {
        const clientResponse = await addClient([formObj]);
        console.log("Müşteri kaydı başarılı:", clientResponse);

        const invoiceResponse = await addInvoices([formObj], items);
        console.log("Fatura kaydı başarılı:", invoiceResponse);
        setSaves(false);
      }


      if (savesdraft) {
        const savesResponse = await saveAsDraft([formObj], items);
        console.log("Fatura kaydı başarılı:", savesResponse);
        setSavesDraft(false);
      } 
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  }

console.log(savesdraft);
console.log(saves);


if(show){
  document.body.classList.add("active");
}else{
  document.body.classList.remove("active");
}



  return (
    <>
      <button className="newInvoicesBtn" onClick={() => setShow(true)}>
        <TopPlus />
        <h2 className="desktop">Yeni Fatura</h2>
        <h2 className="mobile" >Yeni</h2>
      </button>

      <div className="newInvoicesForm" style={{
        width: show ? "40%" : "0%",
        transition: "all .3s",
        padding: show ? "20px 56px" : "0",
        opacity: show ? "1" : "0"
      }}>
        <h1 style={{
          display: show ? "flex" : "none"
        }}>Yeni Fatura</h1>
        <form onSubmit={handleSubmit}>
          <div className="formsections">
            <div className="formsectionRow">
              <h4>Bill From</h4>
              <label htmlFor="streetadress">Sokak Adresi
                <input type="text" name="streetadress" defaultValue={medata.street} />
                {state?.errors?.streetadress && <small style={{ color: "red" }}>{state.errors.streetadress}</small>}
              </label>
              <div className="citypostcountry">
                <label htmlFor="city">Şehir
                  <input type="text" name="citypostcountry" defaultValue={medata.city} />
                  {state?.errors?.city && <small style={{ color: "red" }}>{state.errors.city}</small>}
                </label>
                <label htmlFor="postcode">Posta Kodu
                  <input type="text" name="postcode" defaultValue={medata.postCode} />
                  {state?.errors?.postcode && <small style={{ color: "red" }}>{state.errors.postcode}</small>}
                </label>
                <label htmlFor="country">Ülke
                  <input type="text" name="country" defaultValue={medata.country} />
                  {state?.errors?.country && <small style={{ color: "red" }}>{state.errors.country}</small>}
                </label>
              </div>
            </div>

            <div className="formsectionRow">
              <h4>Bill To</h4>
              <label htmlFor="clients">Müşterinin Adı
                <input type="text" name="clients" />
                {state?.errors?.clients && <small style={{ color: "red" }}>{state.errors.clients}</small>}
              </label>
              <label htmlFor="clientemail">Müşterinin Epostası
                <input type="text" name="clientemail" />
                {state?.errors?.clientemail && <small style={{ color: "red" }}>{state.errors.clientemail}</small>}
              </label>
              <label htmlFor="tostreetadress">Sokak Adresi
                <input type="text" name="tostreetadress" />
                {state?.errors?.tostreetadress && <small style={{ color: "red" }}>{state.errors.streetadress}</small>}
              </label>
              <div className="citypostcountry">
                <label htmlFor="tocity">Şehir
                  <input type="text" name="tocity" />
                  {state?.errors?.tocity && <small style={{ color: "red" }}>{state.errors.tocity}</small>}
                </label>
                <label htmlFor="topostcode">Posta Kodu
                  <input type="text" name="topostcode" />
                  {state?.errors?.topostcode && <small style={{ color: "red" }}>{state.errors.topostcode}</small>}
                </label>
                <label htmlFor="tocountry">Ülke
                  <input type="text" name="tocountry" />
                  {state?.errors?.tocountry && <small style={{ color: "red" }}>{state.errors.tocountry}</small>}
                </label>
              </div>
              <div className="dateterms">
                <label htmlFor="invoicedate">Fatura Tarihi:
                  <input type="date" name="invoicedate" />
                  {state?.errors?.invoicedate && <small style={{ color: "red" }}>{state.errors.invoicedate}</small>}
                </label>
                <label htmlFor="invoiceterm">Ödeme Koşulları:
                  <select name="invoiceterm">
                    <option value="Net 1 Gün" selected>Net 1 Gün</option>
                    <option value="Net 7 Gün" >Net 7 Gün</option>
                    <option value="Net 14 Gün" >Net 14 Gün</option>
                    <option value="Net 30 Gün" >Net 30 Gün</option>
                  </select>
                  {state?.errors?.invoiceterm && <small style={{ color: "red" }}>{state.errors.invoiceterm}</small>}
                </label>
              </div> <label htmlFor="description">Proje Açıklaması
                <input type="text" name="description" />
                {state?.errors?.description && <small style={{ color: "red" }}>{state.errors.description}</small>}
              </label>
            </div>

            <div className="formsectionRow">
              <h3>Öğe Listesi</h3>
              <div className="itemFeatures">
                <div className="featuresItem">
                  <p>Öğe Adı</p>
                  <p>Ad</p>
                  <p>Fiyat</p>
                  <p>Toplam</p>
                </div>

                {
                  itemList && itemList.map((x, i) =>
                    <div className="featuresInputItem">
                      <input type={x.text} placeholder={x.textplaceholder} />
                      <input type={x.number} placeholder={x.numberfirstplace} />
                      <input type={x.number} placeholder={x.numbersecond} />
                      <p></p>
                      <button type="button" onClick={() => setSelectedIndex(x.id)} ><Image src={"/images/cop.png"} width={12} height={16} /></button>
                    </div>)
                }

                <button className="addnewItemBtn" type="button" onClick={() => setAddItem(prev => prev + 1)}>+ Yeni Öğe Ekle</button>
              </div>
            </div>

          </div>
          <div className="formBtnList" style={{
            display: show ? "flex" : "none"
          }}>
            <button type="button" onClick={() => setShow(false)}>Vazgeç</button>
            <div className="saveBtns">
              <button onClick={() => setSavesDraft(true)} >Taslak Olarak Kaydet</button>
              <button onClick={() => setSaves(true)}>Kaydet ve Gönder</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
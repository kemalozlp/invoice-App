"use client"
import { useContext, useEffect, useRef, useState } from "react";
import "./newinvoices.css"
import Image from "next/image";
import { TopPlus } from "../invoicestop/topsvg";

export default function NewInvoices({ medata, datalist }) {
  const [itemList, setItemList] = useState([]);
  const [additem, setAddItem] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(false);


  console.log(datalist, "asdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");


  console.log(medata, "132123123123123213");

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
  console.log(itemList);


  useEffect(() => {
    setItemList(itemList.filter(x => x.id !== selectedIndex));
    setSelectedIndex(null);
    console.log(selectedIndex);
  }, [selectedIndex]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
        <form >
          <div className="formsections">
            <div className="formsectionRow">
              <h4>Bill From</h4>
              <label htmlFor="streetadress">Sokak Adresi
                <input type="text" name="streetadress" defaultValue={medata.street} />
              </label>
              <div className="citypostcountry">
                <label htmlFor="city">Şehir
                  <input type="text" name="citypostcountry" defaultValue={medata.city} />
                </label>
                <label htmlFor="postcode">Posta Kodu
                  <input type="text" name="postcode" defaultValue={medata.postCode} />
                </label>
                <label htmlFor="country">Ülke
                  <input type="text" name="country" defaultValue={medata.country} />
                </label>
              </div>
            </div>

            <div className="formsectionRow">
              <h4>Bill To</h4>
              <label htmlFor="clientsname">Müşterinin Adı
                <input type="text" name="clientsname" defaultValue={"19 Union Terrace"} />
              </label>
              <label htmlFor="clientemail">Müşterinin Epostası
                <input type="text" name="clientemail" defaultValue={"London"} />
              </label>
              <label htmlFor="streetadress">Sokak Adresi
                <input type="text" name="streetadress" defaultValue={"E1 3EZ"} />
              </label>
              <div className="citypostcountry">
                <label htmlFor="city">Şehir
                  <input type="text" name="citypostcountry" defaultValue={"London"} />
                </label>
                <label htmlFor="postcode">Posta Kodu
                  <input type="text" name="postcode" defaultValue={"E1 3EZ"} />
                </label>
                <label htmlFor="country">Ülke
                  <input type="text" name="country" defaultValue={"United Kingdom"} />
                </label>
              </div>
              <div className="dateterms">
                <label htmlFor="invoicedate">
                  <input type="date" name="invoicedate" value={formatDate(datalist.invoiceDate)} />
                </label>
                <label htmlFor="invoiceterm">
                  <select name="invoiceterm">
                    <option value="Net 1 Gün" selected>Net 1 Gün</option>
                    <option value="Net 7 Gün" >Net 7 Gün</option>
                    <option value="Net 14 Gün" >Net 14 Gün</option>
                    <option value="Net 30 Gün" >Net 30 Gün</option>
                  </select>
                </label>
              </div>
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
                      <input type={x.text} placeholder={x.textplaceholder}/>
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
              <button type="button">Taslak Olarak Kaydet</button>
              <button>Kaydet ve Gönder</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
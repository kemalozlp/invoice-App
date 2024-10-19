"use client"

import "./editinvoices.css"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";


export default function EditInvoices() {
  const [itemList, setItemList] = useState([]);
  const [additem, setAddItem] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dialogRef = useRef({});

  function handleClick() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function close() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  useEffect(() => {
    setItemList([...itemList, {
      id: additem,
      text: "text",
      number: "number"
    }])

  }, [additem]);
  console.log(itemList);

  useEffect(() => {
    setItemList(itemList.filter(x => x.id !== selectedIndex));
    setSelectedIndex(null);
    console.log(selectedIndex);
  }, [selectedIndex]);


  return (
    <>
      <button onClick={() => handleClick()} className="editBtn">Düzenle</button>
      <dialog ref={(e) => (dialogRef.current = e)}>

        <div className="editInvoicesForm">
          <h1>Düzenle <span> #XM9141</span></h1>
          <form >
            <div className="formsections">
              <div className="formsectionRow">
                <h4>Bill From</h4>
                <label htmlFor="streetadress">Sokak Adresi
                  <input type="text" name="streetadress" defaultValue={"19 Union Terrace"} />
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
                    <input type="date" name="invoicedate" />
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
                        <input type={x.text} />
                        <input type={x.number} />
                        <input type={x.number} />
                        <p></p>
                        <button type="button" onClick={() => setSelectedIndex(x.id)} ><Image src={"/images/cop.png"} width={12} height={16} /></button>
                      </div>)
                  }

                  <button className="addnewItemBtn" type="button" onClick={() => setAddItem(prev => prev + 1)}>+ Yeni Öğe Ekle</button>
                </div>
              </div>

            </div>
            <div className="formBtnList">
              <button type="button" onClick={() => close()}>Vazgeç</button>
              <button>Değişikliği Kaydet</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
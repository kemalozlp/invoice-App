"use client"
import { useContext, useEffect, useRef, useState } from "react";
import "./editinvoices.css"
import Image from "next/image";
import { searchUser } from "@/utils/invoicesService";

export default function EditInvoices({ medata, filteredData }) {

  console.log(filteredData, "111111111111111111111222222222222222222222222222222222222");

  const [itemList, setItemList] = useState([]);
  const [additem, setAddItem] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showedit, setShowEdit] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInput = async (e) => {

    if (e.target.value.length > 2) {
      const response = await searchUser(e.target.value);

      if (Array.isArray(response)) {
        setSearchedUsers(response);
      }
    }
  };



  const handleFocusOut = (e) => {
    const user = searchedUsers.find(user => user.mail === e.target.value);
    setSelectedUser(user);
  };

  useEffect(() => {
    console.log(searchedUsers);

  }, [searchedUsers])

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


  return (
    <>
      <button className="newInvoicesBtn" onClick={() => setShowEdit(true)}>
        <h2 >Düzenle</h2>
      </button>

      <div className="newInvoicesForm" style={{
        width: showedit ? "40%" : "0%",
        transition: "all .3s",
        padding: showedit ? "20px 56px" : "0",
        opacity: showedit ? "1" : "0"
      }}>
        <h1 style={{
          display: showedit ? "flex" : "none"
        }}>#{filteredData?.referanceNumber} Düzenle</h1>
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
              <label htmlFor="clients">Müşteri Adı:</label>
              <input
                onKeyDown={handleInput}
                onBlur={handleFocusOut}
                list="clientsa"
                id="clients"
                name="clients"
              />
              <datalist id="clientsa">
                {searchedUsers.map((user, index) => (
                  <option key={index} value={user.mail} />
                ))}
              </datalist>
              <label htmlFor="clientemail">Müşterinin Epostası
                <input type="text" name="clientemail" defaultValue={selectedUser?.mail} />
              </label>
              <label htmlFor="streetadress">Sokak Adresi
                <input type="text" name="streetadress" defaultValue={selectedUser?.street} />
              </label>
              <div className="citypostcountry">
                <label htmlFor="city">Şehir
                  <input type="text" name="citypostcountry" defaultValue={selectedUser?.city} />
                </label>
                <label htmlFor="postcode">Posta Kodu
                  <input type="text" name="postcode" defaultValue={selectedUser?.country} />
                </label>
                <label htmlFor="country">Ülke
                  <input type="text" name="country" defaultValue={selectedUser?.postCode} />
                </label>
              </div>

              <div className="dateterms">
                <label htmlFor="invoicedate">
                  <input type="date" name="invoicedate" />
                </label>

                <label htmlFor="invoiceterm">
                  <select name="invoiceterm" >
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
                  filteredData ? filteredData.items.map((a, i) => <div className="featuresInputItem" key={i}>
                    <input type="text" defaultValue={a.name} />
                    <input type="number" defaultValue={a.quantity} />
                    <input type="number" defaultValue={a.price} />
                    <p>{a.total}</p>
                  </div>) : ""

                }
                {
                  itemList && itemList.map((x, i) =>
                    <div className="featuresInputItem">
                      <input type={x.text} placeholder={x.textplaceholder}  />
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
            display: showedit ? "flex" : "none"
          }}>
            <button type="button" onClick={() => setShowEdit(false)}>Vazgeç</button>
            <button>Kaydet ve Gönder</button>
          </div>
        </form>
      </div>
    </>
  )
}
"use client"
import { useContext, useEffect, useRef, useState } from "react";
import "./editinvoices.css"
import Image from "next/image";
import { saveChanges, searchUser } from "@/utils/invoicesService";
import { editInvoicesForm } from "./action";
import { useFormState } from "react-dom"

export default function EditInvoices({ medata, filteredData }) {

  console.log(filteredData, "111111111111111111111222222222222222222222222222222222222");

  const [itemList, setItemList] = useState([]);
  const [additem, setAddItem] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showedit, setShowEdit] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState([]);
  const [items, setItems] = useState([]);
  const [saves, setSaves] = useState(false);
  const [filteredId, setFilteredId] = useState(filteredData.id);
  const [state, action] = useFormState(editInvoicesForm, {
    message: null,
    error: null,
  })

  const handleInputChange = (e, index, field) => {
    const updatedData = [...items];
    if (!updatedData[index]) {
      updatedData[index] = { name: "", quantity: "", price: "" };
    }
    updatedData[index][field] = e.target.value;
    setItems(updatedData);

    console.log(items);

  };
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
  async function handleSubmit(e) {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));
    await action(new FormData(e.target));
    if (state?.errors) {
      console.log("Form hataları:", state.errors);
      return;
    }
    if (!formObj.id) {
      formObj.id = filteredId;
    }

    if (!filteredId) {
      console.log("filteredId henüz yüklenmedi, lütfen bekleyin.");
      return;
    }

    console.log("Form verileri:", formObj);

    setFormData([formObj]);

    setSaves(true);
  }

  useEffect(() => {
    // filteredId ve formData tam olarak yüklendikten sonra PUT isteği yapılabilir
    if (saves && formData.length > 0 && items.length > 0 && filteredId) {
      const savechange = async () => {
        await saveChanges(formData, items);
      };

      savechange();
      setSaves(false);  // İşlemden sonra saves'i tekrar false yap
    }

  }, [saves, formData, items, filteredId]);


  useEffect(() => {
    setItemList(itemList.filter(x => x.id !== selectedIndex));
    setSelectedIndex(null);
    console.log(selectedIndex);
  }, [selectedIndex]);

  const calculateTotalPrice = (index) => {
    const item = formData[index];
    const quantity = parseFloat(item?.quantity || 0);
    const price = parseFloat(item?.price || 0);
    return (quantity * price).toFixed(2);
  };

  console.log(filteredData.id);

  return (
    <>
      <button className="newInvoicesBtn" onClick={() => setShowEdit(true)}>
        <h2 > Edit</h2>
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
        <form onSubmit={handleSubmit} >
          <div className="formsections">
            <div className="formsectionRow">
              <h4>Bill From</h4>
              <label htmlFor="streetadress">Sokak Adresi
                <input type="text" name="streetadress" defaultValue={medata.street} />
                {state?.errors?.streetadress && <small style={{ color: "red" }}>{state.errors.streetadress}</small>}
              </label>

              <div className="citypostcountry">
                <label htmlFor="city">Şehir
                  <input type="text" name="city" defaultValue={medata.city} />
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
              <label htmlFor="clients">Müşteri Adı:
                <input
                  onKeyDown={handleInput}
                  onBlur={handleFocusOut}
                  list="clientsa"
                  id="clients"
                  name="clients"
                />
                {state?.errors?.clients && <small style={{ color: "red" }}>{state.errors.clients}</small>}
              </label> <datalist id="clientsa">
                {searchedUsers.map((user, index) => (
                  <option key={index} value={user.mail} />
                ))}
              </datalist>
              <label htmlFor="clientemail">Müşterinin Epostası
                <input type="text" name="clientemail" defaultValue={selectedUser?.mail} />
              {state?.errors?.clientemail && <small style={{ color: "red" }}>{state.errors.clientemail}</small>}
              </label>
              <label htmlFor="tostreetadress">Sokak Adresi
                <input type="text" name="tostreetadress" defaultValue={selectedUser?.street} />
                {state?.errors?.tostreetadress && <small style={{ color: "red" }}>{state.errors.streetadress}</small>}
              </label>
              <div className="citypostcountry">
                <label htmlFor="tocity">Şehir
                  <input type="text" name="tocity" defaultValue={selectedUser?.city} />
                  {state?.errors?.tocity && <small style={{ color: "red" }}>{state.errors.tocity}</small>}
                </label>
                <label htmlFor="topostcode">Posta Kodu
                  <input type="text" name="topostcode" defaultValue={selectedUser?.postCode} />
                  {state?.errors?.topostcode && <small style={{ color: "red" }}>{state.errors.topostcode}</small>}
                </label>
                <label htmlFor="tocountry">Ülke
                  <input type="text" name="tocountry" defaultValue={selectedUser?.country} />
                  {state?.errors?.tocountry && <small style={{ color: "red" }}>{state.errors.tocountry}</small>}
                </label>
              </div>

              <div className="dateterms">
                <label htmlFor="invoicedate">Fatura Tarihi:
                  <input type="date" name="invoicedate" />
                  {state?.errors?.invoicedate && <small style={{ color: "red" }}>{state.errors.invoicedate}</small>}
                </label>

                <label htmlFor="invoiceterm">Ödeme Koşulları:
                  <select name="invoiceterm" >
                    <option value="1" selected>Net 1 Gün</option>
                    <option value="7" >Net 7 Gün</option>
                    <option value="14" >Net 14 Gün</option>
                    <option value="30" >Net 30 Gün</option>
                  </select>
                  {state?.errors?.invoiceterm && <small style={{ color: "red" }}>{state.errors.invoiceterm}</small>}
                </label>


              </div>
              <label htmlFor="description">Proje Açıklaması
                <input type="text" name="description" defaultValue={filteredData?.description} />
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
                  filteredData ? filteredData.items.map((a, i) => <div className="featuresInputItem" key={i}>
                    <input type="text" defaultValue={a.name} />
                    <input type="number" defaultValue={a.quantity} />
                    <input type="number" defaultValue={a.price} />
                    <p>{a.total}</p>
                  </div>) : ""

                }
                {itemList &&
                  itemList.map((x, i) => (
                    <div className="featuresInputItem" key={i}>
                      <input
                        type="text"
                        name="name"
                        placeholder={x.textplaceholder}
                        onChange={(e) => handleInputChange(e, i, "name")}
                      />
                      <input
                        type="number"
                        name="quantity"
                        placeholder={x.numberfirstplace}
                        onChange={(e) => handleInputChange(e, i, "quantity")}
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder={x.numbersecond}
                        onChange={(e) => handleInputChange(e, i, "price")}
                      />
                      <p>{calculateTotalPrice(i)}</p>
                      <button type="button" onClick={() => setSelectedIndex(x.id)}>
                        <Image src={"/images/cop.png"} width={12} height={16} alt="Delete" />
                      </button>
                    </div>
                  ))}


                <button className="addnewItemBtn" type="button" onClick={() => setAddItem(prev => prev + 1)}>+ Yeni Öğe Ekle</button>
              </div>
            </div>

          </div>
          <div className="formBtnList" style={{
            display: showedit ? "flex" : "none"
          }}>
            <button type="button" onClick={() => setShowEdit(false)}>Vazgeç</button>
            <button type="submit" onClick={() => { setSaves(!saves) }}>Kaydet ve Gönder</button>
          </div>
        </form>
      </div>

    </>
  )
}
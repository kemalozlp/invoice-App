import "./invoicesdetail.css"

export default function InvoicesDetail() {

  return (
    <div className="invoiceDetail">
      <div className="invoicedetailheader">
        <p>Status</p>
        <li>Pending</li>
      </div>
      <div className="invoicedetailbtn">
        <button>Düzenle</button>
        <button>Sil</button>
        <button>Ödendi olarak işaretle</button>
      </div>
    </div>
  )
}
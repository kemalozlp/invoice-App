import Link from "next/link"
import "./header.css"
import Image from "next/image"


export default function Header() {
  return (
    <div className="invoice-item">
      <div className="invoive-item-header">
        <Link href="/"><Image width={103} height={103} src={"/images/group.png"} /></Link>
      </div>
      <div className="invoicedark">
          <Image width={20} height={20} src={"/images/Path.png"} />
          <hr />
          <Image className="ovalimg" width={40} height={40} src={"/images/Oval.png"} />
        </div>
    </div>
  )
}
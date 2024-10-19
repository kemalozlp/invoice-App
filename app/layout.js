import { League_Spartan } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
const leaguespartan =  League_Spartan({ subsets: ['latin'] })
export const metadata = {
  title: "İnvoice App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={leaguespartan.className}>
        <Header /> 
        {children}
      </body>
    </html>
  );
}

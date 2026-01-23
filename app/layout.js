import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const vazirmatn = Vazirmatn({
  variable: "--vazirmatn-font",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});


export const metadata = {
  title: "MonaLearn Educational Platform",
  description: "An innovative platform for learning and growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

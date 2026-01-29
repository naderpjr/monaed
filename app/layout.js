
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";

const myCustomFont = localFont({
  src: [
    {
      path: "./fonts/YekanBakh-Regular.ttf",
      weight: "400",
      style: 'normal',
    },
    {
      path: "./fonts/YekanBakh-Bold.ttf",
      weight: "700",
      style: 'normal',
    },
    {
      path: "./fonts/YekanBakh-Black.ttf",
      weight: "900",
      style: 'normal',
    },
    {
      path: "./fonts/YekanBakh-ExtraBlack.ttf",
      weight: "1000",
      style: 'normal',
    },
  ],
  variable: "--font-yekan",
})





export const metadata = {
  title: "MonaLearn Educational Platform",
  description: "An innovative platform for learning and growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${myCustomFont.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

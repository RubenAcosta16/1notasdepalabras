import { Inter } from "next/font/google";
import moduleName from "module";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import ReactQuerySession from "@/context/ReactQuerySession";
import AuthUser from "@/context/AuthUser";
import NextUi from "@/context/NextUi";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// y usar nunito
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100`}>
        <SessionAuthProvider>
          <ReactQuerySession>
          <AuthUser>
            <NextUi>
              <Navbar></Navbar>
              {children}
              <Footer></Footer>
            </NextUi>
          </AuthUser>
          </ReactQuerySession>
        </SessionAuthProvider>
      </body>
    </html>
  );
}

// todo este tiempo el if(currentUser) loading... no era asi, debia hacerle la condicion al currentUser.id
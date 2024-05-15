import { Inter } from "next/font/google";
import moduleName from "module";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import ReactQuerySession from "@/context/ReactQuerySession";
import AuthUser from "@/context/AuthUser";
import NextUi from "@/context/NextUi";



// import Navbar from "./components/Navbar";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notas de palabras",
  description: "This is an App for learn words of some languajes",
};

// y usar nunito
export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className={`${inter.className} bg-main`}>
        <SessionAuthProvider>
          <ReactQuerySession>
          <AuthUser>
            {/* here I put the favicon img */}
            <NextUi>
              {/* <Navbar></Navbar> */}
              <NavBar></NavBar>
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
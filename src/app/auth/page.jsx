"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { Noto_Sans_Cham, Quicksand } from "next/font/google";

import useKnowLogin from "@/hooks/useKnowLogin";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SocialButton from "./components/auth/SocialButton";

import { FaArrowRightLong } from "react-icons/fa6";

import "./components/design/bg_pattern.css";

import { FaGoogle } from "react-icons/fa";

const noto_Sans_Cham = Noto_Sans_Cham({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const page = ({ pageAction = "register" }) => {
  useKnowLogin();
  // console.log(pageAction)
  const [action, setAction] = useState(pageAction);
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // const { data: session, status } = useSession();
  // console.log(action);

  // bg-wavy mt-[-38px] pt-[38px]
  return (
    <div
      className={`${quicksand.className} font-medium relative w-full z-20 overflow-hidden  bg-zinc-100 mt-[-38px]`}
    >
      <Link href="/" className="absolute top-2 left-2  z-20 relative">
        <FaArrowRightLong className="inline ml-3 text-xl rotate-180" />
      </Link>

      <h1 className="text-[30px] text-center mt-[80px] ml-[5px] z-20 relative text-pink-600 font-semibold">
        Notas de Palabras
      </h1>

      {/* auth */}
      <div className="flex flex-col gap-6 bg-white rounded-tl-[50px] mt-[90px] p-10 pb-14 shadow-lg z-20 relative" style={{boxShadow:"0 5px 15px rgba(0, 0, 0, 0.7)"}}>
        <div className="">
          {action == "register" ? <Register></Register> : <Login></Login>}
        </div>

        <div className=" flex flex-col text-center m-auto text-[14px] text-zinc-600">
          <div className="w-[70%] h-[1px] bg-zinc-500 mx-auto " />

          {action == "register" ? (
            <>
              <p className="">Do you have an account?</p>
              <button
                className="mx-auto cursor-pointer hover:text-pink-600
                "
                onClick={() => {
                  setAction("login");
                }}
              >
                <span className="border-b border-zinc-600">Login</span>
              </button>
            </>
          ) : (
            <>
              <p className="">Are you new?</p>
              <button
                className="mx-auto cursor-pointer hover:text-pink-600
                "
                onClick={() => {
                  setAction("register");
                }}
              >
                <span className="border-b border-zinc-600">Register</span>
              </button>
            </>
          )}

          <div className="mt-[20px]">
            <p className="mb-[10px]">Or continue with:</p>
            <SocialButton
              action="google"
              buttonCode={
                <div className="flex flex-row items-center px-8 py-2 border-2 border-zinc-800 rounded-lg bg-white hover:bg-zinc-100">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
                    alt=""
                    className="w-[18px] h-[18px] mr-[10px]"
                  />
                  Login with Google
                </div>
              }
            ></SocialButton>
          </div>
        </div>
      </div>

      <object
        type="image/svg+xml"
        data="/blobs/login/blob_login1.svg"
        className="w-[350px] h-[350px] absolute top-[-90px] left-[-170px] z-10 rotate-45"
      ></object>

      <object
        type="image/svg+xml"
        data="/blobs/login/blob_login2.svg"
        className="w-[350px] h-[350px] absolute top-[50px] right-[-170px] z-10"
      ></object>
    </div>
  );
};

export default page;

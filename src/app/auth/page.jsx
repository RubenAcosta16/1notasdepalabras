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

const Page = ({ pageAction = "register" }) => {
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
      className={`${quicksand.className} font-medium relative w-full z-20 overflow-hidden  bg-main mt-[-38px]`}
    >
      <Link href="/" className="absolute top-6 left-2  z-20 relative">
        <FaArrowRightLong className="inline ml-3 text-xl rotate-180" />
      </Link>

      <h1 className="text-[30px] text-center mt-[80px] ml-[5px] z-20 relative text-pink-600 font-semibold">
        Notas de Palabras
      </h1>

      {/* auth */}
      <div
        className="flex flex-col gap-6 bg-squaresList rounded-tl-[50px] mt-[90px] p-10 pb-14 shadow-lg z-20 relative"
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)" }}
      >
        <div className="">
          {action == "register" ? <Register></Register> : <Login></Login>}
        </div>

        <div className=" flex flex-col text-center m-auto text-[14px] text-normal-secondary">
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

          <div className="mt-[20px] ">
            <p className="mb-[10px] text-normal-secondary">Or continue with:</p>
            <SocialButton action="google">
              <div className="flex flex-row items-center px-8 py-2 border-2 border-zinc-800 rounded-lg bg-white hover:bg-zinc-100 text-black">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
                  alt=""
                  className="w-[18px] h-[18px] mr-[10px]"
                />
                Login with Google
              </div>
            </SocialButton>
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[350px] h-[350px] absolute top-[-90px] left-[-170px] z-10 rotate-45"
      >
        <defs>
          <clipPath id="a">
            <path
              fill="currentColor"
              d="M732 597q36 97-41 175.5t-170.5 16Q427 726 357.5 690t-44-113q25.5-77-20-168.5T334 285q86-32 192-111.5t199 8q93 87.5 32 203T732 597Z"
            />
          </clipPath>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="#d1d1d1"
            className="fill-[#d1d1d1] dark:fill-[#212121]"
            d="M732 597q36 97-41 175.5t-170.5 16Q427 726 357.5 690t-44-113q25.5-77-20-168.5T334 285q86-32 192-111.5t199 8q93 87.5 32 203T732 597Z"
          />
        </g>
      </svg>

      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[350px] h-[350px] absolute top-[50px] right-[-170px] z-10"
      >
        <defs>
          <clipPath id="a">
            <path
              fill="currentColor"
              d="M889.5 645Q900 790 760 829t-228.5-57Q443 676 350 676.5t-211.5-88q-118.5-88.5 1-176t183-175Q386 150 496.5 161t256 30q145.5 19 136 164t1 290Z"
            />
          </clipPath>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="#d1d1d1"
            className="fill-[#d1d1d1] dark:fill-[#212121]"
            d="M889.5 645Q900 790 760 829t-228.5-57Q443 676 350 676.5t-211.5-88q-118.5-88.5 1-176t183-175Q386 150 496.5 161t256 30q145.5 19 136 164t1 290Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Page;

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Noto_Sans_Cham, Quicksand } from "next/font/google";
import Link from "next/link";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaMagic, FaBook } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
// Rubik
// Quicksand
// Overpass

// Noto Sans Cham

const noto_Sans_Cham = Noto_Sans_Cham({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Page = () => {
  const { data: session, status } = useSession();

  const iconStyle = "relative  size-[22px]";

  const demoList = [
    {
      icon: <CiBoxList className={`${iconStyle} `} />,
      text: "Lista de palabras personalizable",
      desc: "Description",
    },
    {
      icon: <FaMagic className={`${iconStyle}`} />,
      text: "Editor de palabras",
      desc: "Description",
    },
    {
      icon: <FaBook className={`${iconStyle}`} />,
      text: "Modos para aprender",
      desc: "Description",
    },
  ];

  return (
    <div className="relative w-full h-[1000vh] overflow-hidden">
      <div className="z-10 mt-14 px-4 relative flex flex-col gap-[50px]">
        <div>
          <h1
            className={`${noto_Sans_Cham.className} text-[40px] font-bold text-center mx-3 tracking-tighter text-normal`}
          >
            Aprende palabras de forma{" "}
            <span className="text-pink-600">sencilla</span>
          </h1>
        </div>

        {/* aqui ira una imagen */}

        <div
          className={`${quicksand.className} text-zinc-800 text-[18px] font-medium text-center mx-5 text-normal`}
        >
          Esta es una herramienta que te puede ayudar a{" "}
          <span className="text-rose-600">aprender</span> palabras de forma mas
          facil y rapida.
        </div>

        <Link
          href="/home"
          className={`${quicksand.className} text-white text-[16px] font-normal w-full mx-auto lg:w-[40%] rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500`}
        >
          {/* transition en el hover */}
          Empezar
          <FaArrowRightLong className="inline ml-3" />
        </Link>
      </div>

      <ul className="flex flex-col gap-5 mx-5 relative z-10 m-16">
        {demoList.map((demo) => (
          <li
            className="bg-squaresList rounded-md shadow shadow-md font-semibold p-3 flex flex-col gap-3 text-black"
            key={demo.text}
          >
            <div className="flex flex-row">
              <span className="mr-4 rounded-full p-2 bg-zinc-300  h-[38px]">
                {demo.icon}
              </span>
              <span className="text-normal">{demo.text}</span>
            </div>
            <div className="font-normal text-normal-secondary ">
              {demo.desc}
            </div>
          </li>
        ))}
      </ul>

      {/* capturas o una demostracion mas */}

      {/* <object
        type="image/svg+xml"
        data="/blobs/blobs_patterns/blob_1dot.svg"
        className="w-[350px] h-[350px] absolute top-[460px] left-[-170px] bg-none"
      ></object> */}

      <svg
        className="w-[350px] h-[350px] absolute top-[460px] left-[-170px] bg-main"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="a">
            <path
              fill="red"
              d="M896.5 628Q852 756 743 834t-248 93q-139 15-264-63T82 643q-24-143 33-262t161-185q104-66 220-52.5T757.5 182Q903 207 922 353.5T896.5 628Z"
            />
          </clipPath>
          <pattern
            id="b"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
            viewBox="0 0 100 100"
            fill="#212121"
            className="fill-normal"
          >
            <circle cx="50" cy="50" r="12.5" />
          </pattern>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="url(#b)"
            d="M896.5 628Q852 756 743 834t-248 93q-139 15-264-63T82 643q-24-143 33-262t161-185q104-66 220-52.5T757.5 182Q903 207 922 353.5T896.5 628Z"
          />
        </g>
      </svg>

      {/* <object
        type="image/svg+xml"
        data="/blobs/blobs_patterns/blob_2dot.svg"
        className="w-[350px] h-[350px] absolute top-[950px] right-[-170px] bg-none"
      ></object> */}

      <svg className="w-[350px] h-[350px] absolute top-[950px] right-[-170px] bg-main" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="a">
            <path
              fill="currentColor"
              d="M895 640.5Q887 781 745 799t-250.5 35q-108.5 17-219-36.5T105.5 622q-59.5-122 34-219T290 168Q347 30 492.5 53.5t255 105Q857 240 880 370t15 270.5Z"
            />
          </clipPath>
          <pattern
            id="b"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
            viewBox="0 0 100 100"
            fill="#212121"
            className="fill-normal"
          >
            <circle cx="50" cy="50" r="12.5" />
          </pattern>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="url(#b)"
            d="M895 640.5Q887 781 745 799t-250.5 35q-108.5 17-219-36.5T105.5 622q-59.5-122 34-219T290 168Q347 30 492.5 53.5t255 105Q857 240 880 370t15 270.5Z"
          />
        </g>
      </svg>

      {/* {status == "authenticated" && <Link href={`/home`}>Go to home</Link>}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2>Aqui debe de ir la presentacion de la pagina y un link al home</h2>

      <ul>
        <li>https://nextui.org/docs/customization/layout</li>
        <li>https://fkhadra.github.io/react-toastify/introduction/</li>
        <li>https://www.framer.com/motion/</li>
        <li>https://chakra-ui.com/docs/components/button/usage</li>
        <li>usar autoanimate y react-magic-motion</li>
        <li>inspiracion: busca ese link en notas ajaj</li>
      </ul> */}
    </div>
  );
};

export default Page;

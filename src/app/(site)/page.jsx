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

const page = () => {
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
      <div className="z-10 mt-14 relative flex flex-col gap-[50px]">
        <div>
          <h1
            className={`${noto_Sans_Cham.className} text-[40px] font-bold text-center mx-3 tracking-tighter`}
          >
            Aprende palabras de forma{" "}
            <span className="text-pink-600">sencilla</span>
          </h1>
        </div>

        {/* aqui ira una imagen */}

        <div
          className={`${quicksand.className} text-zinc-800 text-[18px] font-medium text-center mx-5`}
        >
          Esta es una herramienta que te puede ayudar a{" "}
          <span className="text-rose-600">aprender</span> palabras de forma mas
          facil y rapida.
        </div>


        <Link
          href="/home"
          className={`${quicksand.className} text-white text-[16px] font-normal flex-grow rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500`}
        >
          {/* transition en el hover */}
          Empezar
          <FaArrowRightLong className="inline ml-3" />
        </Link>
      </div>

      <ul className="flex flex-col gap-5 mx-5 relative z-10 m-16">

        {demoList.map((demo) => (
          <li
            className="bg-white rounded-md shadow shadow-md font-semibold p-3 flex flex-col gap-3 text-black"
            key={demo.text}
          >
            <div className="flex flex-row">
              <span className="mr-4 rounded-full p-2 bg-zinc-300 h-[38px]">{demo.icon}</span>
              <span>{demo.text}</span>
            </div>
            <div className="font-normal text-zinc-500 ">{demo.desc}</div>
          </li>
        ))}
      </ul>

      {/* capturas o una demostracion mas */}

      <object
        type="image/svg+xml"
        data="/blobs/blobs_patterns/blob_1dot.svg"
        className="w-[350px] h-[350px] absolute top-[460px] left-[-170px] "
      ></object>

      <object
        type="image/svg+xml"
        data="/blobs/blobs_patterns/blob_2dot.svg"
        className="w-[350px] h-[350px] absolute top-[950px] right-[-170px]"
      ></object>

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

export default page;

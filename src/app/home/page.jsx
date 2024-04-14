"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import ListTypes from "./components/ListTypes";
import { useState } from "react";
import clsx from "clsx";
import useDarkMode from "@/hooks/useDarkMode";

import Image from "next/image";

import Link from "next/link";

import { Skeleton } from "@nextui-org/react";
import LoadingCard from "./components/LoadingCard";

import { Noto_Sans_Cham, Quicksand } from "next/font/google";

import "./components/bg_zigzag.css";

const noto_Sans_Cham = Noto_Sans_Cham({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Page = () => {
  const { currentUser, status } = useCurrentUser();

  const { currentMode } = useDarkMode();

  const [creatorList, setCreatorList] = useState("creator");

  // if (status == "loading") {
  //   return (
  //     <div>
  //       Loading...{" "}
  //       <Skeleton isLoaded={status !== "loading"} className="w-3/5 rounded-lg">
  //         <div className="h-3 w-full rounded-lg bg-secondary">hola</div>
  //       </Skeleton>
  //     </div>
  //   );
  // }

  // // Manejar el estado de carga inicial
  // if (status === "loading" || isLoading||isFetching) {
  //   return <div>Loading...</div>;
  // }

  // // Asegurarse de que 'types' esté definido antes de usarlo
  // if (!types||!currentUser) {
  //   return <div>No types found</div>;
  // }

  // console.log("62291337-2091-411a-b42b-6819d867212d");

  return (
    <div
      className={clsx(
        `${quicksand.className} flex-flex-col font-medium relative`,
        {
          "bg-zigzag": currentMode == "light",
          "bg-zigzag-dark": currentMode == "dark",
        }
      )}
    >
      <div className="text-center mt-[-45px] pt-[120px] text-[22px] z-20 relative">
        <div className="hidden md:block w-full">
          {status == "loading" ? (
            <Skeleton
              className={"h-[170px] w-[170px] rounded-full mx-auto"}
            ></Skeleton>
          ) : (
            <>
              {currentUser.image == "" ? (
                <Image
                  src="/default_user.jpg"
                  alt="Image preview"
                  width={170}
                  height={170}
                  className="w-[170px] mx-auto object-contain h-[170px] rounded-full"
                />
              ) : (
                <Image
                  src={currentUser.image}
                  alt="Image preview"
                  width={170}
                  height={170}
                  className="w-[170px] mx-auto object-contain h-[170px] rounded-full"
                />
              )}
            </>
          )}
        </div>
        <Skeleton
          isLoaded={status !== "loading"}
          className={clsx("h-6 w-[30%] rounded-lg inline-block mt-[20px]", {
            "h-10 w-[80%]": status !== "loading",
          })}
        >
          <span className="font-medium">Hola </span>
          <span className="font-bold w-auto"> {currentUser.username}</span>
        </Skeleton>
      </div>

      <div className="flex flex-col mt-[60px] md:items-center ">
        <Link
          href="/dashboard"
          className={
            "text-white text-[14px] font-normal flex-grow rounded-full text-center py-2 mx-9 font-medium bg-pink-600 hover:bg-pink-500 md:px-10"
          }
        >
          Crear listas
        </Link>
      </div>

      <div className="flex flex-col mt-[60px]">
        <div className="flex flex-row mx-auto gap-[15px] text-zinc-600 text-[20px] font-normal text-center font-medium">
          <button
            onClick={() => setCreatorList("creator")}
            // className="text-white text-[16px] font-normal flex-grow rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500"
            className={clsx(
              "p-[2px] hover:border-b-2 hover:border-cyan-600 hover:pb-0",
              {
                "text-cyan-700 dark:text-cyan-500 font-medium": creatorList === "creator",
                "text-normal": creatorList === "user",
                // "bg-cyan-600 hover:bg-cyan-500": creatorList === true,
              }
            )}
          >
            Listas creadas
          </button>

          <div className="w-[1px] h-[25px] bg-zinc-500 rounded-xl mt-[5px]" />

          <button
            onClick={() => setCreatorList("user")}
            // className="text-white text-[16px] font-normal flex-grow rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500"
            className={clsx(
              "p-[2px] hover:border-b-2 hover:border-cyan-600 hover:pb-0 ",
              {
                "text-cyan-700 dark:text-cyan-500 font-medium": creatorList === "user",
                "text-normal": creatorList === "creator",
              }
            )}
          >
            Mis listas
          </button>
        </div>

        {/* <button
          onClick={() => setCreatorList("games")}
          // className="text-white text-[16px] font-normal flex-grow rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500"
          className={clsx(
            "text-white text-[14px] font-normal flex-grow rounded-full text-center py-2 mx-9 font-semibold",
            {
              "bg-pink-600 hover:bg-pink-500": creatorList === "games",
              // "bg-cyan-600 hover:bg-cyan-500": creatorList === true,
            }
          )}
        >
          Juegos
        </button> */}

        <div
          className="mt-[30px] w-full rounded-tl-[35px] py-[40px] px-[20px] bg-main"
          style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)" }}
        >
          {status == "loading" ? (
            <div className="flex flex-col gap-[15px] mx-auto">
              <LoadingCard> </LoadingCard>
              <LoadingCard> </LoadingCard>
              <LoadingCard> </LoadingCard>
            </div>
          ) : (
            <>
              {creatorList == "creator" && (
                <>
                  <ListTypes
                    userId={"62291337-2091-411a-b42b-6819d867212d"}
                  ></ListTypes>
                </>
              )}

              {creatorList == "user" && (
                <>
                  <p className="font-semibold text-[15px] mb-[20px] text-normal-secondary md:text-center">
                    Mis tipos:
                  </p>

                  <ListTypes userId={currentUser.id}></ListTypes>
                </>
              )}

              {/* {creatorList == "games" && (
                <>

                </>
              )} */}
            </>
          )}
        </div>
      </div>

      {/* <object
        type="image/svg+xml"
        data="/blobs/blobs_patterns/blob_3lines.svg"
        className="w-[350px] h-[350px] absolute  top-[160px] left-[-170px] hidden md:block z-10"
      ></object> */}
      <svg
        className="w-[350px] h-[350px] absolute  top-[160px] left-[-170px] hidden md:block z-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="a">
            <path
              fill="currentColor"
              d="M896 621.5Q835 743 714.5 766t-243 110Q349 963 244 862.5T103 631q-36-131 35.5-236.5t162-168Q391 164 504 152.5T736.5 191q119.5 50 170 179.5t-10.5 251Z"
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
            patternTransform="rotate(-45 0 0)"
          >
            <path d="M0 0v100" stroke="#212121" className="stroke-normal" stroke-width="20" />
          </pattern>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="url(#b)"
            d="M896 621.5Q835 743 714.5 766t-243 110Q349 963 244 862.5T103 631q-36-131 35.5-236.5t162-168Q391 164 504 152.5T736.5 191q119.5 50 170 179.5t-10.5 251Z"
          />
        </g>
      </svg>





      {/* <object
        type="image/svg+xml"
        data="/blobs/blobs_patterns/blob_2lines.svg"
        className="w-[350px] h-[350px] absolute top-[60px] right-[50px] hidden md:block z-10"
      ></object> */}
      <svg
        className="w-[350px] h-[350px] absolute top-[60px] right-[50px] hidden md:block z-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
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
            
            patternTransform="rotate(-45 0 0)"
          >
            <path d="M0 0v100" stroke="#212121" className="stroke-normal" stroke-width="20" />
          </pattern>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="url(#b)"
            d="M895 640.5Q887 781 745 799t-250.5 35q-108.5 17-219-36.5T105.5 622q-59.5-122 34-219T290 168Q347 30 492.5 53.5t255 105Q857 240 880 370t15 270.5Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Page;

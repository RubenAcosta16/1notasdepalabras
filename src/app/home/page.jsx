"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import ListTypes from "./components/ListTypes";
import { useState } from "react";
import clsx from "clsx";

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
      className={`${quicksand.className} flex-flex-col font-medium bg-zigzag relative`}
    >
      <div className="text-center mt-[-45px] pt-[120px] text-[22px]">
        <Skeleton
          isLoaded={status !== "loading"}
          className={clsx("h-6 w-[80%] rounded-lg inline-block", {
            "h-10": status !== "loading",
          })}
        >
          <span className="font-medium">Hola </span>
          <span className="font-bold w-auto"> {currentUser.username}</span>
        </Skeleton>
      </div>

      <div className="flex flex-col mt-[60px]">
        <Link
          href="/dashboard"
          className={
            "text-white text-[14px] font-normal flex-grow rounded-full text-center py-2 mx-9 font-semibold bg-pink-600 hover:bg-pink-500"
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
                "text-cyan-700 font-semibold": creatorList === "creator",
                // "bg-cyan-600 hover:bg-cyan-500": creatorList === true,
              }
            )}
          >
            Listas creadas
          </button>

          <button
            onClick={() => setCreatorList("user")}
            // className="text-white text-[16px] font-normal flex-grow rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500"
            className={clsx(
              "p-[2px] hover:border-b-2 hover:border-cyan-600 hover:pb-0",
              {
                "text-cyan-700 font-semibold": creatorList === "user",
                // "bg-cyan-600 hover:bg-cyan-500": creatorList === true,
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
          className="mt-[30px] w-full rounded-tl-[35px] py-[40px] px-[20px] bg-white"
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
                  <p>Mis tipos:</p>

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
    </div>
  );
};

export default Page;

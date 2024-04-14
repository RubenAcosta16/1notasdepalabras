"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { Noto_Sans_Cham, Quicksand } from "next/font/google";
import { Button, Skeleton } from "@nextui-org/react";



import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import CreateVerb from "./components/CreateVerb";
import CreateType from "./components/CreateType";
import EditAll from "./components/EditAll";
import ListVerbs from "./components/ListVerbs";
import ListTypes from "./components/ListTypes";
import NavbarState from "./components/NavbarState";

import { PanelEditDash } from "@/app/components/PanelEditDash";
// import NavbarTypes from './components/NavbarTypes'

// import useTypes from "@/hooks/useTypes";

const noto_Sans_Cham = Noto_Sans_Cham({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const page = () => {
  const { currentType, setCurrentType, verbsLength } = useCurrentTypeState();
  /**
   * seran 3 paginas
   * crear verbo
   * crear tipo
   * el edit
   * ademas de una para cambiar entre tipos y con un buscador
   */

  const [navbarState, setNavbarState] = useState("createVerb");
  const [navbarTypes, setNavbarTypes] = useState(false);

  const [loadingDisableButton, setLoadingDisableButton] = useState(true);

  const { currentUser, status } = useCurrentUser();



  // if (status == "authenticated" && currentUser.id) {
  //   setLoadingDisableButton(false);
  // }

  // console.log(navbarTypes);

  return (
    <div
      className={`${quicksand.className} relative flex flex-col lg:flex-row  pb-[35px] lg:pb-0`}
    >
      <NavbarState
        navbarState={navbarState}
        setNavbarState={setNavbarState}
        navbarTypes={navbarTypes}
        setNavbarTypes={setNavbarTypes}
        loadingDisableButton={status !== "authenticated" || !currentUser.id}
      >
        <ListTypes
          userId={currentUser.id}
          setNavbarTypes={setNavbarTypes}
          navbarTypes={navbarTypes}
          navbarState={navbarState}
        ></ListTypes>
      </NavbarState>
      {/* crear verbos */}

      <div className="relative flex flex-col justify-center items-center w-full lg:w-[80%]">
        <div
          className={`mt-[30px] w-[90%] lg:w-[50%] mx-auto bg-zinc-800 text-white flex flex-row py-5 rounded-2xl`}
        >
          <div className="overflow-hidden flex flex-col justify-center items-center flex-grow">
            <p className="text-[13px] font-normal">Tipo actual:</p>
            <p className="mt-[4px] text-yellow-300 text-[16px] font-medium line-clamp-1 hover:line-clamp-none w-[80px]">
              {currentType !== "" ? (
                <>{currentType}</>
              ) : (
                <Skeleton
                  className={"h-[16px] w-[50px] rounded-xl mx-auto"}
                ></Skeleton>
              )}
            </p>

            <Button
              className="mt-[13px] bg-zinc-950 rounded-full text-[14px] font-semibold text-white"
              onClick={() => setNavbarState("createVerb")}
            >
              Crear
            </Button>
          </div>

          <div className="overflow-hidden flex flex-col justify-center items-center flex-grow">
            <p className="text-[13px] font-normal">Palabras</p>
            <p className="mt-[4px] text-[15px] font-medium">
              {" "}
              {currentType !== "" ? (
                <>{verbsLength}</>
              ) : (
                <Skeleton
                  className={"h-[16px] w-[50px] rounded-xl mx-auto"}
                ></Skeleton>
              )}
            </p>

            <Button
              className="mt-[13px] py-2 px-8 bg-zinc-950 rounded-full text-[14px] font-semibold text-white"
              onClick={() => console.log("esto debe editar este tipo")}
            >
              Editar
            </Button>
          </div>
        </div>

        {/* poner cuadro negro como el dash de pinterest */}
        {navbarState == "createVerb" && <CreateVerb></CreateVerb>}

        {status == "authenticated" && currentUser.id && (
          <>
            {navbarState == "editVerbs" && (
              <ListVerbs
                userId={currentUser.id}
                setNavbarState={setNavbarState}
              ></ListVerbs>
            )}
            {navbarState == "createType" && <CreateType></CreateType>}

            {/* {navbarState == "editTypes" && } */}
            {/* de mientras hiden pero haber como me las ingenio para que sea un navbar left */}
            <div
              className={clsx(``, {
                block: navbarTypes === true,
                hidden: navbarTypes === false,
              })}
            >
              {/* <PanelEditDash edit={navbarTypes} setEdit={setNavbarTypes}> */}
              <ListTypes
                userId={currentUser.id}
                setNavbarTypes={setNavbarTypes}
                navbarTypes={navbarTypes}
              ></ListTypes>
              {/* </PanelEditDash> */}
            </div>
          </>
        )}

        {/* <EditAll userId={currentUser.id}></EditAll> */}

        {/* navegar entre los tipos */}
        {/* <h2>navbar</h2> */}
        {/* <NavbarTypes userId={currentUser.id} setCurrentType={setCurrentType}></NavbarTypes> */}

        {/*  */}
      </div>
    </div>
  );
};

export default page;

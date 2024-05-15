"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import { useClickAway, useWindowSize, useTitle } from "react-use";

import { Noto_Sans_Cham, Quicksand } from "next/font/google";
import { Button, Skeleton } from "@nextui-org/react";

import { motion, AnimatePresence } from "framer-motion";

import { ToastContainer } from "react-toastify";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import CreateVerb from "./components/CreateVerb";
import CreateType from "./components/CreateType";
import EditAll from "./components/EditAll";
import ListVerbs from "./components/ListVerbs";
import ListTypes from "./components/ListTypes";
import NavbarState from "./components/NavbarState";

// import toast from '@/actions/toast/toast'

import { PanelEditDash } from "@/app/components/PanelEditDash";

import "react-toastify/dist/ReactToastify.css";
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

const Page = () => {
  useTitle("Edit dashboard");
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

  const { width } = useWindowSize();



  const panelRef = useRef(null);
  useClickAway(panelRef, () => {
    // console.log("OUTSIDE CLICKED");
    setNavbarTypes(false);
  });

  // if (status == "authenticated" && currentUser.id) {
  //   setLoadingDisableButton(false);
  // }

  // console.log(navbarTypes);

  const menuSlide = {
    initial: {
      x: 100,
      transition: {
        duration: 0.2,
        type: "spring", // Usa una transición tipo "spring" para más naturalidad
        stiffness: 260,
        damping: 20,
      },
    },
    enter: {
      x: 0,
      transition: {
        duration: 0.2,
        type: "spring", // Usa una transición tipo "spring" para más naturalidad
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      x: 100,
      transition: {
        duration: 0.2,
        // type: "spring", // Usa una transición tipo "spring" para más naturalidad
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // console.log(navbarTypes)

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
        {width > 1024 && (
          <ListTypes
            userId={currentUser.id}
            setNavbarTypes={setNavbarTypes}
            navbarTypes={navbarTypes}
            navbarState={navbarState}
          ></ListTypes>
        )}
      </NavbarState>
      {/* crear verbos */}

      <div className="relative flex flex-col justify-center items-center w-full lg:w-[80%]">
        <div
          className={`mt-[30px] w-[90%] lg:w-[50%] mx-auto bg-zinc-800 dark:bg-zinc-900 text-white flex flex-row py-5 rounded-2xl`}
        >
          <div className="overflow-hidden flex flex-col justify-center items-center flex-grow">
            <p className="text-[13px] font-normal">Tipo actual:</p>
            <p className="mt-[4px] text-pink-600 text-[16px] font-medium line-clamp-1 hover:line-clamp-none w-[80px]">
              {currentType !== "" ? (
                <>{currentType}</>
              ) : (
                <Skeleton
                  className={"h-[24px] w-[50px] rounded-xl mx-auto"}
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
                  className={"h-[24px] w-[50px] rounded-xl mx-auto"}
                ></Skeleton>
              )}
            </p>

            <Button
              className="mt-[13px] py-2 px-8 bg-zinc-950 rounded-full text-[14px] font-semibold text-white"
              onClick={() => setNavbarState("editVerbs")}
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
            {width <= 1024 && (
              <AnimatePresence>
                {navbarTypes && (
                  <motion.div
                    ref={panelRef}
                    variants={menuSlide}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    {/* <PanelEditDash edit={navbarTypes} setEdit={setNavbarTypes}> */}

                    <ListTypes
                      userId={currentUser.id}
                      setNavbarTypes={setNavbarTypes}
                      navbarTypes={navbarTypes}
                    ></ListTypes>

                    {/* </PanelEditDash> */}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </>
        )}

        {/* <EditAll userId={currentUser.id}></EditAll> */}

        {/* navegar entre los tipos */}
        {/* <h2>navbar</h2> */}
        {/* <NavbarTypes userId={currentUser.id} setCurrentType={setCurrentType}></NavbarTypes> */}

        {/*  */}
      </div>
      <ToastContainer

      />
    </div>
  );
};

export default Page;

"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { useClickAway } from "react-use";

import { AnimatePresence } from "framer-motion";

import useDarkMode from "@/hooks/useDarkMode";

import { RxCross2 } from "react-icons/rx";
import { AiOutlineBars } from "react-icons/ai";

import Nav from "./Nav";
import Link from "next/link";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  // tema oscuro
  // const [theme, setTheme] = useState("light");

  const { setCurrentMode } = useDarkMode();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme == "dark") {
      document.querySelector("html").classList.add("dark");
      setCurrentMode("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
      setCurrentMode("light");
    }
  }, [theme]);

  function handleChangeTheme() {
    setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
    setIsActive(!isActive);
  }

  const navRef = useRef(null);
  useClickAway(navRef, () => {
    // console.log("OUTSIDE CLICKED");
    setIsActive(!isActive);
  });

  const shadow = { textShadow: "1px 1px 3px rgba(0,0,0,0.7)" };

  return (
    <div
      className={`${poppins.className} py-3 relative flex flex-row justify-between z-40 relative text-zinc-100`}
    >
      {/* icon button */}
      <Link
        href="/home"
        className="text-[16px] flex my-auto ml-[8px] lg:l-[70px]  tracking-tighter relative"
        style={shadow}
      >
        Notas de palabras
      </Link>
      <div className="shadow-md shadow-black">
        {!isActive ? (
          // barras
          <motion.div
            onClick={() => {
              setIsActive(true);
            }}
            className="background-color-nav-btn fixed top-3 right-4 w-14 h-14 flex justify-center items-center rounded-full cursor-pointer z-10"
            whileHover={{ scale: 1.1 }}
          >
            <AiOutlineBars className="text-[26px]" />
          </motion.div>
        ) : (
          // cruz
          <motion.div
            className="background-color-nav-btn fixed top-3 right-4 w-14 h-14 flex justify-center items-center rounded-full  cursor-pointer z-10"
            onClick={() => {
              setIsActive(false);
            }}
            whileHover={{ scale: 1.1 }}
          >
            <RxCross2 className="size-[26px]"></RxCross2>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isActive && (
          <div ref={navRef}>
            <Nav
              handleChangeTheme={handleChangeTheme}
              currentTheme={theme}
            ></Nav>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

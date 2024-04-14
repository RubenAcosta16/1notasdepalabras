"use client";
import { useState, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import { Poppins } from "next/font/google";

import Image from "next/image";

import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa6";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

const Navbar = () => {
  const { status } = useSession();
  const { currentUser } = useCurrentUser();
  const { setCurrentMode } = useDarkMode();

  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setCurrentMode("dark")
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    if (theme == "dark") {
      document.querySelector("html").classList.add("dark");
      setCurrentMode("dark")
    } else {
      document.querySelector("html").classList.remove("dark");
      setCurrentMode("light")
    }
  }, [theme]);

  const itemLi = "p-2 hover:bg-slate-200 dark:hover:bg-slate-600 flex-auto hover:text-pink-600";
  const iconLi = "size-[22px] m-auto";

  const shadow = { textShadow: "1px 1px 3px rgba(0,0,0,0.7)" };
  // console.log(currentUser);
  // console.log(status);

  return (
    <nav
      className={`${poppins.className} relative flex flex-row justify-between z-40 relative text-zinc-100`}
    >
      <Link
        href="/home"
        className="text-[16px] flex my-auto ml-[8px] lg:l-[70px]  tracking-tighter relative"
        style={shadow}
      >
        Notas de palabras
      </Link>
      {/* poner loading del status */}

      <ul className="flex flex-row justify-center  items-center">
        {status == "authenticated" ? (
          <>
            {/* <li className={itemLi}>
              <Link href="/home">
                <IoHomeOutline className={iconLi} />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </li> */}

            <li className={itemLi}>
              <button
                onClick={() => {
                  setTheme((prevTheme) =>
                    prevTheme == "light" ? "dark" : "light"
                  );
                }}
              >
                <FiSun
                  className={`${iconLi} relative top-[3px] hidden dark:block text-zinc-300`}
                />
                <FaRegMoon
                  className={`${iconLi} relative top-[3px] block dark:hidden text-zinc-300`}
                />
              </button>
            </li>

            <li className={"inline " + itemLi + " flex-auto"}>
              {/* falta img poner al lado*/}
              <Link
                href="/editprofile"
                className="flex flex-row justify-center items-center gap-[15px]"
              >
                {currentUser.image ? (
                  <Image 
                    src={currentUser.image}
                    alt="Image preview"
                    width={30}
                    height={30}
                    className="rounded-full relative object-contain"
                  />
                ) : (
                  <Image
                    src="/default_user.jpg"
                    alt="Image preview"
                    width={30}
                    height={30}
                    className="rounded-full relative object-contain"
                  />
                )}
                <span className="hidden md:inline text-[15px]" style={shadow}>
                  {currentUser.username}
                </span>
              </Link>
            </li>

            <li className={`${itemLi} text-zinc-300`}>
              <Link href="/dashboard">
                <LuLayoutDashboard className={iconLi} />
                {/* <span className="hidden lg:inline">Dashboard</span> */}
              </Link>
            </li>
            {/* <li className={itemLi}>
              <Link href="/editprofile">
                <FaRegUser className={iconLi} />
                <span className="hidden lg:inline">Edit profile</span>
              </Link>
            </li> */}
            <li
              className={`${itemLi} text-zinc-300`}
              onClick={async () => await signOut()}
            >
              <IoLogOutOutline className={`${iconLi} rotate-180`} />
              {/* <span className="hidden lg:inline">Sign Out</span> */}
            </li>
          </>
        ) : (
          <li className={`${itemLi} text-zinc-300`}>
            <Link
              href="/auth/login"
              className="flex flex-row justify-center items-center gap-[15px]"
            >
              <IoLogOutOutline className={`${iconLi}`} />
              <span className="hidden inline text-[15px] font-medium">
                Login
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

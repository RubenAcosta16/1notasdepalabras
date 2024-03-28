"use client";
import { signOut, useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
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
  const itemLi = "p-2 hover:bg-slate-200 flex-1 hover:text-pink-600";
  const iconLi = "size-[22px] m-auto";
  // console.log(currentUser);
  // console.log(status);

//   <li className={itemLi}>
//   <button>
//     {/* <FiSun className={`${iconLi} relative top-[3px]`} /> */}
//     <FaRegMoon className={`${iconLi} relative top-[3px]`} />
//   </button>
// </li>

  return (
    <nav
      className={`${poppins.className}  flex flex-row justify-between z-10 relative text-zinc-600`}
    >
      <Link
        href="/home"
        className="text-[16px] flex my-auto ml-[8px] lg:l-[70px]  tracking-tighter relative"
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

            <li className={"inline " + itemLi}>
              {/* falta img poner al lado*/}
              <Link href="/editprofile">
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
                <span className="hidden md:inline text-[15px]">{currentUser.username}</span>
              </Link>
            </li>
            <li className={itemLi}>
              <Link href="/dashboard">
                <LuLayoutDashboard className={iconLi} />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            </li>
            {/* <li className={itemLi}>
              <Link href="/editprofile">
                <FaRegUser className={iconLi} />
                <span className="hidden lg:inline">Edit profile</span>
              </Link>
            </li> */}
            <li className={itemLi} onClick={async () => await signOut()}>
              <IoLogOutOutline className={`${iconLi} rotate-180`} />
              <span className="hidden lg:inline">Sign Out</span>
            </li>
          </>
        ) : (
          <li className={itemLi}>
            <Link href="/auth/login">
              <IoLogOutOutline className={`${iconLi}`} />
              <span className="hidden lg:inline">Login</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

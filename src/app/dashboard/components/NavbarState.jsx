import clsx from "clsx";

import { Button } from "@nextui-org/react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { RiEditBoxFill } from "react-icons/ri";

import './css/NavbarState.css'

const NavbarTypes = ({
  navbarState,
  setNavbarState,
  navbarTypes,
  setNavbarTypes, 
  loadingDisableButton,
  children
}) => {
  const navButton =
    "bg-[rgba(0,0,0,0)] relative lg:left-[-17px] text-[25px] lg:text-[20px] flex-grow lg:flex-grow-0 py-[5px] rounded-none lg:h-[40px] text-black lg:text-white";

  const navText = "hidden lg:block text-[16px] font-medium";

  return (
    <nav className="flex flex-row lg:flex-col bg-lines fixed lg:relative bottom-0 lg:top-0 left-0 w-full lg:w-[20%] z-30 lg:rounded-tr-[20px]">
      <Button
        isDisabled={loadingDisableButton}
        className={clsx(``, navButton, {
          "bg-slate-300 text-pink-700 lg:left-0 lg:rounded-r-full":
            navbarState === "createVerb",
        })}
        onClick={() => {
          setNavbarState("createVerb");
        }}
      >
        <span className={navText}>Create verb</span>{" "}
        <IoIosAddCircleOutline className="mx-auto lg:mx-0 inline"></IoIosAddCircleOutline>
      </Button>

      <div
        className={clsx(
          `hidden lg:block h-[1px] w-[70%] mx-auto relative left-[-17px] bg-zinc-400 rounded-xl `,
          {
            "lg:hidden":
              (navbarState === "createVerb" || navbarState === "createType"),
          }
        )}
      ></div>

      <Button
        isDisabled={loadingDisableButton}
        className={clsx(` `, navButton, {
          "bg-pink-950 dark:bg-slate-300 text-white dark:text-pink-700 lg:left-0 lg:rounded-r-full":
            navbarState === "createType",
        })}
        onClick={() => setNavbarState("createType")}
      >
        <span className={navText}>Create Type</span>{" "}
        <MdNoteAdd className="mx-auto lg:mx-0 inline"></MdNoteAdd>
      </Button>

      <div
        className={clsx(
          `hidden lg:block h-[1px] w-[70%] mx-auto relative left-[-17px] bg-zinc-400 rounded-xl `,
          {
            "lg:hidden":
              (navbarState === "createType" || navbarState === "editVerbs"),
          }
        )}
      ></div>

      <Button
        isDisabled={loadingDisableButton}
        className={clsx(``, navButton, {
          "bg-pink-950 dark:bg-slate-300 text-white dark:text-pink-700 lg:left-0 lg:rounded-r-full":
            navbarState === "editVerbs",
        })}
        onClick={() => {
          setNavbarState("editVerbs")
          console.log("no null")
        }}
      >
        <span className={navText}>Edit Verbs</span>{" "}
        <RiEditFill className="mx-auto lg:mx-0 inline"></RiEditFill>
      </Button>

      {/* obviamente esto es otro navbar */}
      <Button
        isDisabled={loadingDisableButton}
        className={`${navButton} lg:hidden`}
        onClick={() => setNavbarTypes(!navbarTypes)}
      >
        <span className={navText}>Edit types</span>{" "}
        <RiEditBoxFill className="mx-auto lg:mx-0 inline" />
      </Button>

      <div className="hidden lg:block w-full">
        {children}
      </div>
    </nav>
  );
};

export default NavbarTypes;

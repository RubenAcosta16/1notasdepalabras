import clsx from "clsx";

import { Button } from "@nextui-org/react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { RiEditBoxFill } from "react-icons/ri";

const NavbarTypes = ({
  navbarState,
  setNavbarState,
  navbarTypes,
  setNavbarTypes,
  loadingDisableButton,
}) => {
  const navButton = "text-[25px] flex-grow py-[5px] rounded-none";

  return (
    <nav className="flex flex-row bg-white fixed bottom-0 left-0 w-full z-30">
      <Button
        isDisabled={loadingDisableButton}
        className={clsx(``, navButton, {
          "bg-zinc-800 text-white": navbarState === "createVerb",
        })}
        onClick={() => {
          setNavbarState("createVerb");
        }}
      >
        <span className="hidden lg:block">Create verb</span>{" "}
        <IoIosAddCircleOutline className="mx-auto"></IoIosAddCircleOutline>
      </Button>
      <Button
        isDisabled={loadingDisableButton}
        className={clsx(` `, navButton, {
          "bg-zinc-800 text-white": navbarState === "createType",
        })}
        onClick={() => setNavbarState("createType")}
      >
        <span className="hidden lg:block">Create Type</span>{" "}
        <MdNoteAdd className="mx-auto"></MdNoteAdd>
      </Button>
      <Button
        isDisabled={loadingDisableButton}
        className={clsx(``, navButton, {
          "bg-zinc-800 text-white": navbarState === "editVerbs",
        })}
        onClick={() => setNavbarState("editVerbs")}
      >
        <span className="hidden lg:block">Edit Verbs</span>{" "}
        <RiEditFill className="mx-auto"></RiEditFill>
      </Button>

      {/* obviamente esto es otro navbar */}
      <Button
        isDisabled={loadingDisableButton}
        className={`${navButton}`}
        onClick={() => setNavbarTypes(!navbarTypes)}
      >
        <span className="hidden lg:block">Edit types</span>{" "}
        <RiEditBoxFill className="mx-auto" />
      </Button>
    </nav>
  );
};

export default NavbarTypes;

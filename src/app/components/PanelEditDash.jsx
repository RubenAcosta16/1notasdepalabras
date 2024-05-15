import { useRef } from "react";
import { useClickAway } from "react-use";

import { motion,AnimatePresence } from "framer-motion";

import { RxCross2 } from "react-icons/rx";

import { Button } from "@nextui-org/react";

import "./css/scroll.css";

const PanelEditDash = ({ edit, setEdit, children }) => {
  const panelRef = useRef(null);
  useClickAway(panelRef, () => {
    // console.log("OUTSIDE CLICKED");
    setEdit(!edit);
  });

  const panelScale = {
    initial: {
      scale: 0,
      transition: {
        duration: 0.05,
        type: "spring", // Usa una transición tipo "spring" para más naturalidad
        stiffness: 260,
        damping: 20,
      },
    },
    enter: {
      scale: 1,
      transition: {
        duration: 0.05,
        type: "spring", // Usa una transición tipo "spring" para más naturalidad
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.05,
        // type: "spring", // Usa una transición tipo "spring" para más naturalidad
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <AnimatePresence>
      {edit && (
        <motion.div
        ref={panelRef}
          className="myscroll fixed top-[15%] left-[5%] w-[90%] lg:w-[66%] lg:left-[17%] max-h-[70%] bg-main z-30 p-10 px-7 rounded-xl flex flex-col overflow-y-scroll"
          style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)" }}

          variants={panelScale}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
          <div className="relative top-1 right-3">
            <button
              type="button"
              // color="default"
              // size="sm"
              className="fixed top-[160px] lg:top-[100px] right-[10%] lg:right-[19%] text-[20px] hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full w-[32px] h-[32px] flex flex-col justify-center items-center"
              onClick={() => setEdit(!edit)}
            >
              <RxCross2 className="inline"></RxCross2>
            </button>
          </div>
        </motion.div>
      )}
    </ AnimatePresence>
  );
};

export default PanelEditDash;

// el hook que detecta si presionas otro lado afuera del panel

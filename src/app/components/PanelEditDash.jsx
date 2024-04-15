import { useRef } from "react";
import { useClickAway } from "react-use";

import { RxCross2 } from "react-icons/rx";

import { Button } from "@nextui-org/react";

const PanelEditDash = ({ edit, setEdit, children }) => {
  const panelRef = useRef(null);
  useClickAway(panelRef, () => {
    // console.log("OUTSIDE CLICKED");
    setEdit(!edit)
  });

  return (
    <>
      {edit && (
        <div
          ref={panelRef}
          className="fixed top-[15%] left-[5%] w-[90%] lg:w-[66%] lg:left-[17%] max-h-[70%] bg-main z-30 p-10 px-7 rounded-xl flex flex-col overflow-y-scroll"
          style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)" }}
        >
          {children}
          <div className="relative top-1 right-3">
            <button
              type="button"
              // color="default"
              // size="sm"
              className="fixed top-[100px] right-[10%] lg:right-[19%] text-[20px] hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full w-[32px] h-[32px] flex flex-col justify-center items-center"
              onClick={() => setEdit(!edit)}
            >
              <RxCross2 className="inline"></RxCross2>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PanelEditDash;

// el hook que detecta si presionas otro lado afuera del panel

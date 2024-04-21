"use client";
import ShowImg from "./ShowImg";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useAnimate, motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import clsx from "clsx";

import { IoIosArrowForward } from "react-icons/io";

const VerbCard = ({ verb, functionNav, hasImg, index }) => {
  const [showDescription, setShowDescription] = useState(false);

  const [scope, animate] = useAnimate();

  // , ease: [0.76, 0, 0.24, 1]

  function animations() {
    if (!showDescription) {
      animate(
        scope.current,
        { transform: "rotate(135deg)" },
        { duration: 0.1 }
      );
    } else {
      animate(scope.current, { transform: "rotate(45deg)" }, { duration: 0.1 });
    }
    // {
    //   "rotate-0": showDescription === false,
    //   "rotate-90": showDescription === true,
    // }
  }

  //usando y

  const showDesc = {
    initial: {
      scaleY: 0,
      opacity: 0,
      transition: { duration: 0.1 },
    },
    enter: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.1 },
    },
    exit: {
      scaleY: 0,
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  // console.log(index % 2);
  return (
    <motion.li
      className={clsx("ml-[8px] lg:", {
        "mt-[15px]": index % 4 == 0 && index !== 0,
        // "line-clamp-none": seeTitle === true,
      })}
      layout
    >
      {hasImg ? (
        <Card
          shadow="md"
          key={verb.name}
          // isPressable
          // onPress={() => console.log("item pressed")}
          className="w-[264px] hover:bg-zinc-100"
        >
          <CardBody className="overflow-visible p-0">
            {verb.img ? (
              <Image
                shadow="md"
                radius="lg"
                // width="100%"
                // alt={item.title}
                className="w-full object-cover h-[150px]  z-10"
                src={verb.img}
                alt={verb.name}
                width={500}
                height={500}
              />
            ) : (
              <div className="h-[150px] w-[264px] bg-zinc-300 rounded-xl"></div>
            )}
          </CardBody>
          <CardFooter className="text-small flex flex-col items-start">
            <div
              onClick={() => {
                setShowDescription(!showDescription);
                animations();
              }}
              className="cursor-pointer flex flex-row items-center"
            >
              {/* name */}
              <p className="text-[16px] text-normal font-semibold">
                {(functionNav == "Normal" ||
                  functionNav == "Aleatorio" ||
                  functionNav === "VerbsPorFecha") && <> {verb.name}</>}
                {(functionNav == "Significados" ||
                  functionNav == "SignificadosAleatorio") && (
                  <>
                    <p>{verb.description}</p>
                  </>
                )}
              </p>
              <div
                className={clsx(
                  "h-[12px] w-[12px]  ml-[15px] rotate-45 border-r-2 border-t-2 text-normal border-black dark:border-white ml-[5px]",
                  {
                    "rotate-45": showDescription === false,
                    "rotate-[135deg]": showDescription === true,
                  }
                )}
              ></div>
            </div>

            {/* description */}
            <p
              className={clsx("text-normal-secondary  text-[16px]", {
                hidden: showDescription === false,
                "block ml-[6px] border-l border-pink-500 pl-[6px]":
                  showDescription === true,
              })}
            >
              {(functionNav == "Normal" ||
                functionNav == "Aleatorio" ||
                functionNav === "VerbsPorFecha") && (
                <> {verb.description}</>
              )}{" "}
              {(functionNav == "Significados" ||
                functionNav == "SignificadosAleatorio") && <> {verb.name}</>}
            </p>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div
            onClick={() => {
              setShowDescription(!showDescription);
              animations();
            }}
            className="cursor-pointer flex flex-row items-center"
          >
            {/* name */}
            <p className="text-[16px] text-normal font-semibold">
              {(functionNav == "Normal" ||
                functionNav == "Aleatorio" ||
                functionNav === "VerbsPorFecha") && <> {verb.name}</>}
              {(functionNav == "Significados" ||
                functionNav == "SignificadosAleatorio") && (
                <>
                  <p>{verb.description}</p>
                </>
              )}
            </p>
            {/* <IoIosArrowForward
              className={clsx("text-[18px]  text-normal ml-[5px]", {
                "rotate-0": showDescription === false,
                "rotate-90": showDescription === true,
              })}
            /> */}
            <div
              ref={scope}
              className={clsx(
                "h-[12px] w-[12px]  ml-[15px] rotate-45 border-r-2 border-t-2 text-normal border-black dark:border-white ml-[5px]"
                // {
                //   "rotate-45": showDescription === false,
                //   "rotate-[135deg]": showDescription === true,
                // }
              )}
            ></div>
          </div>

          {/* description */}
          <AnimatePresence>
            {showDescription && (
              <motion.p
                className={clsx("text-normal-secondary  text-[16px]", {
                  "block ml-[6px] border-l border-pink-500 pl-[6px]":
                    showDescription === true,
                })}
                style={{ overflow: 'hidden', transformOrigin: 'top' }}
                
                variants={showDesc}
                initial="initial"
                animate="enter"
                exit="exit"
                layout
              >
                {(functionNav == "Normal" ||
                  functionNav == "Aleatorio" ||
                  functionNav === "VerbsPorFecha") && (
                  <> {verb.description}</>
                )}{" "}
                {(functionNav == "Significados" ||
                  functionNav == "SignificadosAleatorio") && <> {verb.name}</>}
              </motion.p>
            )}
          </AnimatePresence>
        </>
      )}

      {/* img */}
      {/* {verb.img ? (
        <Image
          shadow="md"
          radius="lg"
          // width="100%"
          // alt={item.title}
          className="w-full object-cover h-[150px]  z-10"
          src={verb.img}
          alt={verb.name}
          width={500}
          height={500}
        />
      ) : (
        <div className="h-[150px] w-[264px] bg-zinc-300 rounded-xl"></div>
      )} */}
      {/* <ShowImg img={verb.img}></ShowImg> */}
    </motion.li>
  );
};
export default VerbCard;

// const Description = () => {

//   const [scope, animate] = useAnimate();

//   // , ease: [0.76, 0, 0.24, 1]

//   function animations() {
//     if (!showDescription) {
//       animate(
//         scope.current,
//         { transform: "rotate(135deg)" },
//         { duration: 0.1 }
//       );
//     } else {
//       animate(
//         scope.current,
//         { transform: "rotate(45deg)" },
//         { duration: 0.1 }
//       );
//     }
//     // {
//     //   "rotate-0": showDescription === false,
//     //   "rotate-90": showDescription === true,
//     // }
//   }

//   // console.log(index % 2);
//   return ();
// }

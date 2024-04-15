"use client";
import ShowImg from "./ShowImg";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useAnimate } from "framer-motion";

import { useState } from "react";
import clsx from "clsx";

import { IoIosArrowForward } from "react-icons/io";
import { transform } from "next/dist/build/swc";

const VerbCard = ({ verb, functionNav, hasImg, index }) => {
  const [showDescription, setShowDescription] = useState(false);

  const [scope, animate] = useAnimate();

  async function animations() {
    // if (showDescription) {
    //   await animate(
    //     scope.current,
    //     { transform: "rotate(90deg)" },
    //     { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    //   );
    // } else {
    //   await animate(
    //     scope.current,
    //     { transform: "rotate(0deg)" },
    //     { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    //   );
    // }

    // // {
    // //   "rotate-0": showDescription === false,
    // //   "rotate-90": showDescription === true,
    // // }
  }

  // console.log(index % 2);
  return (
    <li
      className={clsx("ml-[8px]", {
        "mt-[15px]": index % 4 == 0 && index !== 0,
        // "line-clamp-none": seeTitle === true,
      })}
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
                ref={scope}
                className={clsx("text-[18px]  text-normal ml-[5px]")}
              >
                {/* caracter > porque magicMotion es algo delicado */}
                &gt;
              </div>
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
              className={clsx("text-[18px]  text-normal ml-[5px]")}
            >
              {/* caracter > porque magicMotion es algo delicado */}
              &gt;
            </div>
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
              functionNav === "VerbsPorFecha") && <> {verb.description}</>}{" "}
            {(functionNav == "Significados" ||
              functionNav == "SignificadosAleatorio") && <> {verb.name}</>}
          </p>
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
    </li>
  );
};
export default VerbCard;

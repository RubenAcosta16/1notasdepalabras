"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import clsx from "clsx";

import useVerbs from "@/hooks/useVerbs";
import useGroupVerbs from "@/hooks/useGroupVerbs";
// import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import VerbsGrouped from "./VerbsGrouped";
import NavFunctions from "./NavFunctions";
import ShowImg from "./ShowImg";
import VerbCard from "./VerbCard";
import LoadingCard from "./LoadingCard";

import "./bgs.css";

import { Tooltip, Skeleton } from "@nextui-org/react";

const showVerbs = ({ currentType }) => {
  //   console.log(userId);
  //   console.log(type);

  // mandar a llamar type para ver si pide con grupos
  // const [currentType, setCurrentType] = useState({})

  // if (!userId) {
  //   return <div>Loading...</div>;
  // }

  const {
    verbs,
    error,
    isLoading,
    //  isError,
    //  isSuccess,
    status, //es como una mezcla de las 2 de arriba
    isFetching,
    //esto es para saber si esta desabilitado
    isIdle,
    //esto es para que cargue de nuevo
    refetch,
  } = useVerbs(currentType.userId, currentType.name);

  const [functionNav, setFunctionNav] = useState("Normal");
  const [verbsRandom, setVerbsRandom] = useState([]);

  const [seeTitle, setSeeTitle] = useState(false);
  const [seeDescription, setSeeDescription] = useState(false);

  function handleRamdomVerbs() {
    // Función de comparación aleatoria para el método sort()
    const randomCompare = () => Math.random() - 0.5;

    const arrRandom = [...verbs];

    // Ordena la copia del array de forma aleatoria
    arrRandom.sort(randomCompare);
    setVerbsRandom([...arrRandom]);
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  //   console.log(status);
  // console.log(verbs);
  // if (verbs.length == 0) {
  //   return <div>Sin verbos</div>;
  // }

  const verbsGrouped = useGroupVerbs(verbs);

  return (
    <div className="bg-pattern text-white pt-[5px]">
      {/* panel con como ordenar los verbos */}
      <NavFunctions
        functionNav={functionNav}
        setFunctionNav={setFunctionNav}
        handleRamdomVerbs={handleRamdomVerbs}
        hasGroup={currentType.hasGroup}
      ></NavFunctions>

      {isLoading ? (
        <>
          <Skeleton
            className={"h-[26px] w-[120px] rounded-xl mt-[35px] ml-[15px]"}
          ></Skeleton>

          <Skeleton
            className={"h-[20px] w-[100px] rounded-xl mt-[10px] ml-[25px]"}
          ></Skeleton>
        </>
      ) : (
        <>
          <Tooltip content={seeTitle ? "Ver menos" : "Ver mas"}>
            <h1
              className={clsx(
                "ml-[15px] text-[22px] font-semibold mt-[35px] w-[270px] break-words",
                {
                  "line-clamp-2": seeTitle === false,
                  "line-clamp-none": seeTitle === true,
                }
              )}
              onClick={() => setSeeTitle(!seeTitle)}
            >
              {currentType.name}
            </h1>
          </Tooltip>

          <Tooltip content={seeDescription ? "Ver menos" : "Ver mas"}>
            <h2
              className={clsx(
                "mx-[25px] cursor-pointer text-[16px] text-zinc-200 font-normal mt-[10px] w-[270px] break-words",
                {
                  "line-clamp-2": seeDescription === false,
                  "line-clamp-none": seeDescription === true,
                }
              )}
              onClick={() => setSeeDescription(!seeDescription)}
            >
              {currentType.description}
            </h2>
          </Tooltip>
        </>
      )}

      <ul
        className={clsx(
          "text-black mt-[30px] w-full rounded-tl-[35px] py-[40px] px-[20px] bg-white flex flex-col ",
          {
            "gap-[8px]":
              currentType.hasGroup === false ||
              functionNav == "Aleatorio" ||
              functionNav == "SignificadosAleatorio",
            "gap-[35px]":
              (functionNav == "Normal" || functionNav == "Significados") &&
              currentType.hasGroup === true,
          }
        )}
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)" }}
      >
        {isLoading ? (
          <>
            {currentType.hasImg ? (
              ""
            ) : (
              <div className="flex flex-col gap-5">
                {" "}
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
                <LoadingCard hasImg={currentType.hasImg}></LoadingCard>
              </div>
            )}
          </>
        ) : (
          <>
            {/* <LoadingCard hasImg={currentType.hasImg}></LoadingCard> */}
            {verbs.length == 0 ? (
              <>Sin verbos</>
            ) : (
              <>
                {!currentType.hasGroup &&
                  (functionNav == "Normal" ||
                    functionNav == "Significados" ||
                    functionNav == "VerbsPorFecha") && (
                    <>
                      {verbs.map((verb, index) => (
                        <>
                          <VerbCard
                            key={verb.id}
                            verb={verb}
                            functionNav={functionNav}
                            hasImg={currentType.hasImg}
                            index={index}
                          ></VerbCard>
                        </>
                      ))}
                    </>
                  )}

                {currentType.hasGroup &&
                  (functionNav == "Normal" || functionNav == "Significados") &&
                  verbsGrouped.map((verbGrouped) => (
                    <VerbsGrouped
                      functionNav={functionNav}
                      key={verbGrouped[0].name}
                      verbGrouped={verbGrouped}
                      hasImg={currentType.hasImg}
                    ></VerbsGrouped>
                  ))}

                {functionNav == "Aleatorio" ||
                functionNav == "SignificadosAleatorio" ? (
                  <>
                    {verbsRandom.map((verb, index) => (
                      <VerbCard
                        key={verb.id}
                        verb={verb}
                        functionNav={functionNav}
                        hasImg={currentType.hasImg}
                        index={index}
                      ></VerbCard>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}

        {/* {functionNav == "VerbsPorFecha" && (
          <>
            {verbs.map((verb) => (
              <>
                <VerbCard
                  key={verb.id}
                  verb={verb}
                  functionNav={functionNav}
                ></VerbCard>

              </>
            ))}
          </>
        )} */}
      </ul>
    </div>
  );
};

export default showVerbs;

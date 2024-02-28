"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

import useVerbs from "@/hooks/useVerbs";
import useGroupVerbs from "@/hooks/useGroupVerbs";
// import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import VerbsGrouped from "./VerbsGrouped";
import NavFunctions from "./NavFunctions";
import ShowImg from "./ShowImg";
import VerbCard from "./VerbCard";

const showVerbs = ({ userId, currentType }) => {
  //   console.log(userId);
  //   console.log(type);

  // mandar a llamar type para ver si pide con grupos
  // const [currentType, setCurrentType] = useState({})

  if (!userId) {
    return <div>Loading...</div>;
  }

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
  } = useVerbs(userId, currentType.name);

  const [functionNav, setFunctionNav] = useState("Normal");
  const [verbsRandom, setVerbsRandom] = useState([]);

  function handleRamdomVerbs() {
    // Función de comparación aleatoria para el método sort()
    const randomCompare = () => Math.random() - 0.5;

    const arrRandom = [...verbs];

    // Ordena la copia del array de forma aleatoria
    arrRandom.sort(randomCompare);
    setVerbsRandom([...arrRandom]);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //   console.log(status);
  // console.log(verbs);
  if (verbs.length == 0) {
    return <div>Sin verbos</div>;
  }

  const verbsGrouped = useGroupVerbs(verbs);

  return (
    <div>
      {/* panel con como ordenar los verbos */}
      <NavFunctions
        functionNav={functionNav}
        setFunctionNav={setFunctionNav}
        handleRamdomVerbs={handleRamdomVerbs}
        hasGroup={currentType.hasGroup}
      ></NavFunctions>

      <br />
      <br />
      <br />
      <h1>Name:{currentType.name}</h1>
      <h2>Description:{currentType.description}</h2>

      <br />
      <br />
      <br />

      <div>
        {!currentType.hasGroup &&
          (functionNav == "Normal" || functionNav == "Significados") && (
            <div>
              {verbs.map((verb) => (
                <>
                  <VerbCard
                    key={verb.id}
                    verb={verb}
                    functionNav={functionNav}
                  ></VerbCard>

                  <br />
                </>
              ))}
            </div>
          )}

        {currentType.hasGroup &&
          (functionNav == "Normal" || functionNav == "Significados") &&
          verbsGrouped.map((verbGrouped) => (
            <VerbsGrouped
              functionNav={functionNav}
              key={verbGrouped[0].name}
              verbGrouped={verbGrouped}
            ></VerbsGrouped>
          ))}

        {functionNav == "Aleatorio" ||
        functionNav == "SignificadosAleatorio" ? (
          <div>
            random
            {verbsRandom.map((verb) => (
              <div>
                <VerbCard
                  key={verb.id}
                  verb={verb}
                  functionNav={functionNav}
                ></VerbCard>

                <br />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {functionNav == "VerbsPorFecha" && (
          <>
            {verbs.map((verb) => (
              <>
                <VerbCard
                  key={verb.id}
                  verb={verb}
                  functionNav={functionNav}
                ></VerbCard>

                <br />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default showVerbs;

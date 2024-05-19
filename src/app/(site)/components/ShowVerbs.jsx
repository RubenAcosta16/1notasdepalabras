"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VerbCard from "@/app/s/[type_user]/components/VerbCard";
import { Button } from "@nextui-org/react";

import EditVerbs from "@/app/dashboard/components/edit/EditVerbs";

const ShowVerbs = () => {
  const myVerbs = [
    {
      name: "Find",
      description: "Found - Found",
      group:
        "Cuando el pasado y participio son iguales y terminan con el fonema “d”",
      img: "",
    },
    {
      name: "Hear",
      description: "Heard - Heard",
      group:
        "Cuando el pasado y participio son iguales y terminan con el fonema “d”",
      img: "",
    },
    {
      name: "Hold",
      description: "Held - Held",
      group:
        "Cuando el pasado y participio son iguales y terminan con el fonema “d”",
      img: "",
    },
    {
      name: "Speak",
      description: "Spoke - Spoken",
      group:
        "Cuando en el pasado cambiamos la vocal por “o…e” y en el participio por “o…en”",
      img: "",
    },
  ];

  const [verbsRandom, setVerbsRandom] = useState([]);

  function handleRandomVerbs() {
    const randomCompare = () => Math.random() - 0.5;

    const arrRandom = [...myVerbs];

    // Ordena la copia del array de forma aleatoria
    arrRandom.sort(randomCompare);
    setVerbsRandom([...arrRandom]);
  }

  useEffect(() => {
    handleRandomVerbs();
  }, []);

  return (
    <div className="relative z-10 flex flex-col gap-5 mx-5">
      <div className="flex flex-row-reverse w-full lg:mx-auto lg:w-[70%]">
        <div
          className={`text-zinc-800 text-[18px] text-center font-medium mx-5 text-normal mb-3 self-center`}
        >
          Puedes aprender <span className="text-rose-600">palabras</span> más
          rápido.
        </div>
        <ul className="shadow shadow-md text-black py-[20px] w-full rounded-lg  px-[20px] lg:pl-[155px] bg-squaresList flex flex-col">
          <Button
            className="w-[70px] mb-5"
            onClick={handleRandomVerbs}
            color="danger"
          >
            Aleatorio
          </Button>

          <AnimatePresence>
            {verbsRandom.map((verb, index) => (
              <motion.li
                key={verb.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <VerbCard
                  verb={verb}
                  functionNav={"Aleatorio"}
                  hasImg={false}
                  index={index}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <div className="flex flex-row-reverse w-full lg:mx-auto lg:w-[70%]">
        <ul className="shadow shadow-md py-[20px] w-full  rounded-lg pt-[30px] px-[20px]  bg-squaresList flex flex-col gap-1 lg:gap-0">
          {verbsRandom.map((verb, index) => (
            <EditVerbs
              verb={verb}
              refetch={() => {}}
              withImg={false}
            ></EditVerbs>
          ))}
        </ul>
        <div
          className={`text-zinc-800 text-[18px] text-center font-medium mx-5 text-normal mb-3 self-center`}
        >
          Tambien puedes <span className="text-rose-600">editar</span> palabras
        </div>
      </div>
    </div>
  );
};

export default ShowVerbs;

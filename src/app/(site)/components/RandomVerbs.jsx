"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VerbCard from "@/app/s/[type_user]/components/VerbCard";
import { Button } from "@nextui-org/react";

const RandomVerbs = () => {
  const myVerbs = [
    {
      name: "Fly",
      description: "Flew - Flown",
    },
    {
      name: "Draw",
      description: "Drew - Drawn",
    },
    {
      name: "Drink",
      description: "Drank - Drunk",
    },
    {
      name: "Speak",
      description: "Spoke - Spoken",
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
    <div className="relative z-10 flex flex-col mx-5">
      <div
        className={`text-zinc-800 text-[18px] text-center font-medium mx-5 text-normal mb-3`}
      >
        Puedes aprender <span className="text-rose-600">palabras</span> más
        rápido.
      </div>
      <ul className="shadow shadow-md text-black py-[20px] w-full lg:mx-auto lg:w-[70%] rounded-lg pt-[30px] px-[20px] lg:pl-[155px] bg-squaresList flex flex-col">
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
  );
};

export default RandomVerbs;
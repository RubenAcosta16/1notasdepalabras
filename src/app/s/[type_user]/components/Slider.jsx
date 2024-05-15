import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEditType from "@/actions/useEditType";

const Carousel = ({ items, functionNav }) => {
  const [index, setIndex] = useState(0);
  const [tmpIndex, setTmpIndex] = useState(0);

  const [containerHeight, setContainerHeight] = useState("auto");
  const containerRef = useRef(null);

  const handleNext = (newIndex) => {
    setTmpIndex(index);
    // setIndex((prevIndex) => (prevIndex + 1) % divs.length);
    setIndex(newIndex);
  };

  const handlePrev = (newIndex) => {
    setTmpIndex(index);
    // setIndex((prevIndex) => (prevIndex - 1 + divs.length) % divs.length);
    setIndex(newIndex);
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [index]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const direction = index - tmpIndex > 0 ? 1 : -1;

  useEffect(() => {
    if (functionNav == "Aleatorio" || functionNav == "SignificadosAleatorio") {
      handleNext(1);
    } else {
      handleNext(0);
    }
  }, [functionNav]);

  return (
    <>
      <div style={{height: containerHeight}}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            ref={containerRef}
            
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* <button
        onClick={() => {
          handleNext(0);
        }}
        style={{
          position: "absolute",
          left: "10px",
          top: "100px",
          transform: "translateY(-50%)",
        }}
        className="z-40"
      >
        Anterior
      </button>
      <button
        onClick={() => {
          handleNext(1);
        }}
        style={{
          position: "absolute",
          right: "10px",
          top: "100px",
          transform: "translateY(-50%)",
        }}
        className="z-40"
      >
        Siguiente
      </button> */}
    </>
  );
};

export default Carousel;

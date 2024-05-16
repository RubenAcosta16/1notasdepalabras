import { useHover } from "react-use";
import { useRef } from "react";

import { motion } from "framer-motion";

import { Poppins } from "next/font/google";

import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function NavLink({ link,setIsActive, index }) {
  const linkRef = useRef(null);
  index++; 

  const linkSlide = {
    initial: { x: 10, opacity: 0 },
    enter: (i) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.2, delay: 0.3 + 0.05 * index, type: "spring" },
    }),
    exit: (i) => ({
      x: 20,
      opacity: 0,
      transition: { duration: 0.2, delay: 0.05 * index, type: "spring" },
    }),
  };

  const element = (hovered) => (
    <>
      {link.blank ? (
        <Link href={link.link} target="_blank">
          <motion.li
            className={`w-auto text-slate-300 text-2xl cursor-pointer hover:text-slate-100 ${poppins.className}`}
            ref={linkRef}
            whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
          >
            {link.name}
          </motion.li>
        </Link>
      ) : (
        <Link href={link.link}>
          <motion.li
            className={`w-auto text-slate-300 text-2xl cursor-pointer hover:text-slate-100 ${poppins.className}`}
            ref={linkRef}
            whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
          >
            {link.name}
          </motion.li>
        </Link>
      )}
    </>
  );

  const [hoverable, hovered] = useHover(element);

  return (
    <motion.div
      variants={linkSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-auto"
      onClick={()=>{
        setIsActive(false)
      }}
    >
      {/* // <div className="sm:w-2 h-2 bg-white rounded-full absolute left-[17%] mt-[11px]"></div> */}
      {hovered && <div className=""></div>}
      {hoverable}
    </motion.div>
  );
}

"use client";
import clsx from "clsx";

import "./bgs.css";

import { Button } from "@nextui-org/react";

const NavFunctions = ({
  functionNav,
  setFunctionNav,
  handleRamdomVerbs,
  hasGroup,
  isLoading,
}) => {
  const navLi =
    "relative flex flex-col items-center justify-center text-center w-[135px] h-[60px] mx-auto rounded-2xl hover:border-3 overflow-hidden text-center text-[16px] font-normal text-white font-medium z-20";

  const navItem = " text-center text-[16px] font-normal text-white font-medium break-words ";
  // const itemSelected=""

  return (
    <nav className="w-full mt-[35px]  relative ">
      <ul className="mx-auto items-center justify-center content-center grid grid-cols-2 gap-[20px] md:w-[40%]">
        <Button
          disabled={isLoading}
          // className={`${navItem} relative `}
          className={clsx(`bg-teal-500 ${navLi} hover:border-teal-300`, {
            "border-3 border-teal-300": functionNav === "Normal",
          })}
          onClick={() => {
            setFunctionNav("Normal");
          }}
        >
          <p className={navItem}>Normal</p>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[-20px] left-[-5px] svg-blue"
          >
            <defs>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <path
                className="fill-teal-300"
                fill="#fff"
                d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
              />
            </g>
          </svg>
        </Button>

        <Button
          disabled={isLoading}
          // className={`${navItem}`}
          className={clsx(`bg-amber-600 ${navLi} hover:border-amber-300`, {
            "border-3 border-amber-300": functionNav === "Aleatorio",
          })}
          onClick={() => {
            if (!isLoading) {
              setFunctionNav("Aleatorio");
              handleRamdomVerbs();
            }
          }}
        >
          <p className={navItem}>Aleatorio</p>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[37px] left-[17px] svg-blue rotate-180"
          >
            <defs>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <path
                className="fill-amber-400"
                fill="#fff"
                d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
              />
            </g>
          </svg>
        </Button>

        <Button
          disabled={isLoading}
          className={clsx(`bg-lime-600 ${navLi} hover:border-lime-300`, {
            "border-3 border-lime-300": functionNav === "Significados",
          })}
          onClick={() => {
            if (!isLoading) {
              setFunctionNav("Significados");
            }
          }}
        >
          <p className={navItem}>Significados</p>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[-27px] left-[37px] svg-blue rotate-180"
          >
            <defs>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <path
                className="fill-lime-400"
                fill="#fff"
                d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
              />
            </g>
          </svg>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[30px] left-[70px] svg-blue "
          >
            <defs>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <path
                className="fill-lime-400"
                fill="#fff"
                d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
              />
            </g>
          </svg>
        </Button>

        <Button
          className={clsx(`bg-pink-600 ${navLi} hover:border-rose-300`, {
            "border-3 border-rose-300": functionNav === "SignificadosAleatorio",
          })}
          onClick={() => {
            if (!isLoading) {
              setFunctionNav("SignificadosAleatorio");
              handleRamdomVerbs();
            }
          }}
        >
          <p className={navItem}>Significados <p>Aleatorio</p></p>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[100px] h-[100px] absolute top-[-50px] left-[65px] svg-blue"
          >
            <defs>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <path
                className="fill-rose-400"
                fill="#fff"
                d="M860 631.5Q861 763 751 849t-238 46q-128-40-260.5-79.5T123.5 638Q127 500 179 402.5T306.5 221q75.5-84 199-101.5T724 185q95 83 115 199t21 247.5Z"
              />
            </g>
          </svg>
        </Button>

        {/* {hasGroup && (
          <li className={navLi}>
            <button
              className={clsx(navItem, {
                "text-cyan-500 font-semibold  border-b-2 border-cyan-600 pb-0": functionNav === "VerbsPorFecha",
              })}
              onClick={() => {
                setFunctionNav("VerbsPorFecha");
              }}
            >
              Ordenar por fecha
            </button>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default NavFunctions;

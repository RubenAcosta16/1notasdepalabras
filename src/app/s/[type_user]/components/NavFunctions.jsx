"use client";
import clsx from "clsx";

import "./bgs.css";

const NavFunctions = ({
  functionNav,
  setFunctionNav,
  handleRamdomVerbs,
  hasGroup,
}) => { 
  const navLi =
    "relative flex flex-col items-center justify-center text-center w-[135px] h-[60px] mx-auto rounded-2xl hover:border-3 overflow-hidden";

  const navItem = "text-center text-[16px] font-normal text-white font-medium ";
  // const itemSelected=""

  return (
    <nav className="w-full mt-[35px]  relative ">
      <ul
        className="mx-auto items-center justify-center content-center"
        style={{
          display: "grid",
          gridTemplateColumns: " repeat(2, 1fr)",
          gridTemplateRows: " repeat(2, 1fr)",
          gridColumnGap: " 0px",
          gridRowGap: " 15px",
        }}
      >
        <li
          className={clsx(
            `bg-teal-500 ${navLi} hover:border-teal-300 `,
            {
              "border-3 border-teal-300": functionNav === "Normal",
            }
          )}
        >
          <button
            className={`${navItem} relative z-20`}
            onClick={() => setFunctionNav("Normal")}
          >
            Normal
          </button>

          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[-30px] left-[-15px] svg-blue"
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
        </li>

        <li
          className={clsx(`bg-amber-600 ${navLi} hover:border-amber-300`, {
            "border-3 border-amber-300": functionNav === "Aleatorio",
          })}
        >
          <button
            className={`${navItem}`}
            onClick={() => {
              setFunctionNav("Aleatorio");
              handleRamdomVerbs();
            }}
          >
            Aleatorio
          </button>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[42px] left-[27px] svg-blue rotate-180"
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
        </li>

        <li
          className={clsx(`bg-lime-600 ${navLi} hover:border-lime-300`, {
            "border-3 border-lime-300": functionNav === "Significados",
          })}
        >
          <button
            className={`${navItem}`}
            onClick={() => setFunctionNav("Significados")}
          >
            Significados
          </button>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px] absolute top-[-30px] left-[27px] svg-blue rotate-180"
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
            className="w-[50px] h-[50px] absolute top-[35px] left-[70px] svg-blue "
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
        </li>
        <li
          className={clsx(`bg-rose-600 ${navLi} hover:border-rose-300`, {
            "border-3 border-rose-300": functionNav === "SignificadosAleatorio",
          })}
        >
          <button
            className={`${navItem} z-20`}
            onClick={() => {
              setFunctionNav("SignificadosAleatorio");
              handleRamdomVerbs();
            }}
          >
            Significados Aleatorio
          </button>
          <svg
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[100px] h-[100px] absolute top-[15px] left-[-45px] svg-blue"
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
        </li>
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

"use client";
import clsx from "clsx";

const NavFunctions = ({ functionNav, setFunctionNav, handleRamdomVerbs,hasGroup }) => {
  return (
    <nav>
      <ul>
        <li>
          <button
            className={clsx({ "bg-rose-500": functionNav === "Normal" })}
            onClick={() => setFunctionNav("Normal")}
          >
            Normal
          </button>
        </li>
        <li>
          <button
            className={clsx({ "bg-rose-500": functionNav === "Aleatorio" })}
            onClick={() => {
              setFunctionNav("Aleatorio");
              handleRamdomVerbs();
            }}
          >
            Aleatorio
          </button>
        </li>
        <li>
          <button
            className={clsx({ "bg-rose-500": functionNav === "Significados" })}
            onClick={() => setFunctionNav("Significados")}
          >
            Significados
          </button>
        </li>
        <li>
          <button
            className={clsx({
              "bg-rose-500": functionNav === "SignificadosAleatorio",
            })}
            onClick={() => {
              setFunctionNav("SignificadosAleatorio");
              handleRamdomVerbs();
            }}
          >
            Significados Aleatorio
          </button>
        </li>
        {hasGroup&&(<li>
          <button
            className={clsx({
              "bg-rose-500": functionNav === "VerbsPorFecha",
            })}
            onClick={() => {
              setFunctionNav("VerbsPorFecha");
            }}
          >
            Ordenar por fecha
          </button>
        </li>)}
      </ul>
    </nav>
  );
};

export default NavFunctions;

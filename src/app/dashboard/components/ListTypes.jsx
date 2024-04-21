"use client";
import { useEffect } from "react";

import clsx from "clsx";


import useTypes from "@/hooks/useTypes";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import EditTypes from "./edit/EditTypes";

import moduleName from "@/app/components/css/scroll.css";

const ListTypes = ({ userId, setNavbarTypes, navbarTypes, navbarState }) => {
  const { currentType, setCurrentType } = useCurrentTypeState();
  const {
    types,
    error,
    isLoading,
    //  isError,
    isSuccess,
    status, //es como una mezcla de las 2 de arriba
    isFetching,
    //esto es para saber si esta desabilitado
    isIdle,
    //esto es para que cargue de nuevo
    refetch,
  } = useTypes(userId, setCurrentType, currentType);
  // console.log(userId)
  // console.log(types)

  // console.log(navbarState)

  // useEffect(() => {
  //   refetch()
  // }, [userId]) ;

  

  return (
      <div
        className={clsx(
          `myscroll fixed top-0 right-0 w-[65%] lg:w-full h-full lg:h-[698px] z-20 p-10 px-3 rounded-xl lg:rounded-[0px] flex flex-col overflow-y-scroll overflow-x-hidden bg-main lg:absolute lg:top-[186px] lg:z-30`
          // {
          //   "lg:h-[698px]": navbarState === "createVerb",
          //   "lg:h-[662px]": navbarState === "createType",
          //   "lg:h-[698px]": navbarState === "editVerbs",
          // }
        )}
      >
        <h2 className="text-[20px] font-semibold my-[30px]">Tipos</h2>
        {isLoading || !userId ? (
          <div>Loading...</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {types.length === 0
              ? "Sin tipos"
              : types.map((type) => (
                  <EditTypes
                    userId={userId}
                    key={type.name}
                    type={type}
                    setNavbarTypes={setNavbarTypes}
                    navbarTypes={navbarTypes}
                  ></EditTypes>
                ))}
          </ul>
        )}
      </div>
  );
};

export default ListTypes;

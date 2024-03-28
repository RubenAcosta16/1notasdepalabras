"use client";
import { useEffect } from "react";

import useTypes from "@/hooks/useTypes";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import EditTypes from "./edit/EditTypes";

const ListTypes = ({ userId,setNavbarTypes,navbarTypes }) => {
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

  if (isLoading || !userId) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   refetch()
  // }, [userId]) ;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-30 p-10 px-3 rounded-xl flex flex-col overflow-y-scroll overflow-x-hidden bg-white">
      <h2 className="text-[20px] font-semibold my-[30px]">Tipos</h2>
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
    </div>
  );
};

export default ListTypes;

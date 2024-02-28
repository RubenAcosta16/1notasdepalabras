"use client";
import { useEffect } from "react";

import useTypes from "@/hooks/useTypes";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import EditTypes from "./edit/EditTypes";

const ListTypes = ({ userId }) => {
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
  } = useTypes(userId, setCurrentType,currentType);
  // console.log(userId)
  // console.log(types)

  if (isLoading || !userId) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   if (types && types.length > 0) {
  //     setCurrentType(types[0].name);
  //   }
  // }, [types]) ;

  return (
    <div>
      <h2>Types</h2>
      {types.length === 0?"Sin tipos":(types.map((type) => (
        <EditTypes userId={userId} key={type.name} type={type}></EditTypes>
      )))}
    </div>
  );
};

export default ListTypes;

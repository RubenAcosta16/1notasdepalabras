"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import CreateVerb from "./components/CreateVerb";
import CreateType from "./components/CreateType";
import EditAll from "./components/EditAll";
// import NavbarTypes from './components/NavbarTypes'

// import useTypes from "@/hooks/useTypes";

const page = () => {
  const { currentType, setCurrentType } = useCurrentTypeState()
  /**
   * seran 3 paginas
   * crear verbo
   * crear tipo
   * el edit
   * ademas de una para cambiar entre tipos y con un buscador
   */

  // const {
  //   types,
  //   error,
  //   isLoading,
  //   //  isError,
  //   //  isSuccess,
  //   status, //es como una mezcla de las 2 de arriba
  //   isFetching,
  //   //esto es para saber si esta desabilitado
  //   isIdle,
  //   //esto es para que cargue de nuevo
  //   refetch,
  // }=useTypes()

  const { currentUser, status } = useCurrentUser();
  // console.log(currentUser)
  // const [currentType, setCurrentType] = useCurrentTypeState("")
  // const { currentType, setCurrentType } = useCurrentTypeState()

  if (!status == "authenticated") {
    return <div>loading...</div>;
  }

  if (!currentUser) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* crear verbos */}
      <p>currentType:{currentType}</p>

      <CreateVerb></CreateVerb>

      <CreateType></CreateType>

      <EditAll userId={currentUser.id}></EditAll>
      {/* navegar entre los tipos */}
      <h2>navbar</h2>
      {/* <NavbarTypes userId={currentUser.id} setCurrentType={setCurrentType}></NavbarTypes> */}
    </div>
  );
};

export default page;

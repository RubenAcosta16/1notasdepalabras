import { useEffect, useState } from "react";

import { Button, Skeleton } from "@nextui-org/react";

import { LuPencil } from "react-icons/lu";

import useVerbs from "@/hooks/useVerbs";
import useGroupVerbs from "@/hooks/useGroupVerbs";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import EditGroups from "./edit/EditGroups";

import '@/app/components/css/scroll.css'

const ListVerbs = ({ userId, setNavbarState }) => {
  const { currentType, setCurrentType, setVerbsLength } = useCurrentTypeState();

  const {
    verbs,
    error,
    isLoading,
    //  isError,
    //  isSuccess,
    status, //es como una mezcla de las 2 de arriba
    isFetching,
    //esto es para saber si esta desabilitado
    isIdle,
    //esto es para que cargue de nuevo
    refetch,
  } = useVerbs(userId, currentType);

  useEffect(() => {
    refetch();
    async function lenght() {
      if (currentType && verbs) {
        console.log(verbs.length);
        setVerbsLength(verbs.length);
      }
    }

    lenght();
  }, [currentType]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const verbsGrouped = useGroupVerbs(verbs);
  // useEffect(() => {
  //   verbsGrouped
  // }, [verbs])

  // console.log(verbs)
  // console.log(verbsGrouped)
  // console.log(verbs)

  // problema con nose y con que los verbos al final no los retorna con la propiedad groups

  return (
    <ul className="myscroll overflow-x-hidden relative flex flex-col gap-5 h-auto lg:h-[714px] px-9 lg:px-4 pb-[30px] items-center w-full">
      <h2 className=" text-[20px] font-semibold my-[30px]">Palabras</h2>

      {isLoading ? (
        <div className=" relative flex flex-col w-full gap-[15px]">
          <Loading></Loading>
          <Loading></Loading>
          <Loading></Loading>
        </div>
      ) : (
        <>
          {verbsGrouped.length === 0 ? (
            <div className="text-black text-[20px] font-medium text-center">
              {" "}
              <p className=" text-normal text-[13px]">No tienes palabras aun.</p>
              <p className="mb-[100px] text-normal text-[13px]">Hay que crear algunas</p>
              <Button
                onClick={() => {
                  setNavbarState("createVerb");
                }}
              >
                Crear
              </Button>
            </div>
          ) : (
            verbsGrouped.map((verbGrouped) => (
              <EditGroups
                key={verbGrouped[0].id}
                verbGrouped={verbGrouped}
                refetch={refetch}
              ></EditGroups>
            ))
          )}
        </>
      )}
    </ul>
  );
};

export default ListVerbs;

function Loading() {
  return (
    <div
      className=" relative flex flex-col w-full p-10 px-4 gap-[15px] rounded-xl "
      style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)" }}
    >
      <p className="text-[16px] font-semibold text-cyan-600 break-words">
        Grupo: <Skeleton className={"h-[16px] w-[70px] rounded-xl"}></Skeleton>
      </p>

      <div className="ml-[5px] pl-[3px]  border-l border-black">
        <p className="ml-[5px] break-words">
          Description:{" "}
          <Skeleton className={"h-[16px] w-[80px] rounded-xl"}></Skeleton>{" "}
        </p>
        {/* <p className="ml-[5px]">
          Group: <span className="font-semibold break-words">{group}</span>{" "}
        </p> */}
      </div>

      <Button
        type="button"
        color="warning"
        // size=""
        // onClick={() => setEdit((state) => !state)}
        className="self-center absolute top-0 right-0 p-0 rounded-tl-none rounded-br-none"
      >
        <LuPencil className="inline"></LuPencil>
      </Button>
    </div>
  );
}

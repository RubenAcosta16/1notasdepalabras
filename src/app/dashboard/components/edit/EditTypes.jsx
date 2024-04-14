"use client";
import { useState } from "react";
import Image from "next/image";

import PanelTypes from "./PanelTypes";

import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea, Input, Button } from "@nextui-org/react";
import clsx from "clsx";
import MyImg from "@/app/components/MyImg";

const EditTypes = ({ userId, type, setNavbarTypes, navbarTypes }) => {
  const { currentType, setCurrentType } = useCurrentTypeState();
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(type.name);
  const [description, setDescription] = useState(type.description);
  const [img, setImg] = useState(type.img);
  const [hasGroup, setHasGroup] = useState(type.hasGroup);
  const [hasImg, setHasImg] = useState(type.hasGroup);

  //   const [group, setGroup] = useState(verb.group)

  function handleEdit() {}

  return (
    <li
      className={clsx(`relative flex flex-col w-full  gap-[15px] rounded-xl`, {
        "bg-zinc-100 dark:bg-zinc-600": currentType === name,
        "bg-squaresList": currentType !== name,
      })}
      style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)" }}
    >
      <MyImg name={name} img={img} height={125} types={true}></MyImg>

      <Button
        type="button"
        color="warning"
        // size=""
        onClick={() => setEdit((state) => !state)}
        className="self-center absolute top-0 right-0 p-0 rounded-xl rounded-tl-none rounded-br-none z-20"
      >
        <LuPencil className="inline"></LuPencil>
      </Button>

      <div className="flex flex-col w-full  gap-[15px] pb-4 px-4">
        <p className="text-[16px] font-semibold text-cyan-600 break-words line-clamp-2 hover:line-clamp-none lg:hover:line-clamp-2">
          Name: {name}
        </p>
        <p className="ml-[5px] text-normal break-words line-clamp-2 hover:line-clamp-none lg:hover:line-clamp-2">
          Description: <span className="font-semibold">{description}</span>{" "}
        </p>
        {/* <p>Group: {group}</p> */}

        <Button
          isDisabled={currentType === name}
          color="success"
          onClick={() => {
            setCurrentType(name);
            console.warn("type changed");
            setNavbarTypes(false);
          }}
        >
          Select
        </Button>

        <div className="flex flex-row justify-between gap-[5px] text-[16px] font-semibold">
          {hasGroup ? (
            <p className="text-lime-600">Grupos</p>
          ) : (
            <p className="text-rose-600">Sin grupos</p>
          )}

          <div className="w-[1px] h-full bg-zinc-500 rounded-xl mt-[5px]" />

          {hasImg ? (
            <p className="text-lime-600">Imagenes</p>
          ) : (
            <p className="text-rose-600">Sin imagenes</p>
          )}
        </div>
      </div>

      <PanelTypes
        userId={userId}
        typeThings={{
          name,
          setName,
          description,
          setDescription,
          hasGroup,
          setHasGroup,
          hasImg,
          setHasImg,
          img,
          setImg,
        }}
        edit={edit}
        setEdit={setEdit}
        typeId={type.id}
      ></PanelTypes>
    </li>
  );
};
export default EditTypes;

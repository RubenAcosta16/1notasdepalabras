"use client";
import { useState, useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { CiImageOn } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea, Input, Button } from "@nextui-org/react";

import PanelEditDash from "@/app/components/PanelEditDash";

import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import editType from "@/actions/editType";
import deleteType from "@/actions/deleteType";

const PanelTypes = ({ userId, typeThings, edit, setEdit, typeId }) => {
  const {
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
  } = typeThings;

  // const [hasGroup, setHasGroup] = useState(rHasGroup);

  const { currentType, setCurrentType } = useCurrentTypeState();

  const { mutate: mutateEdit, error, isLoading, isSuccess, reset } = editType();
  const { mutate: mutateDelete, isLoading: deleteLoading } =
    deleteType(currentType);

  const [buttonDelete, setButtonDelete] = useState(false);
  const [sendImg, setSendImg] = useState(null);

  // false no lo borra
  const [borrarImg, setBorrarImg] = useState(false);

  // setHasGroup()

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0]);
    // setImg(acceptedFiles[0])

    setBorrarImg(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  //

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(name)
    // console.log(description)
    // console.log(group)

    const formData = new FormData();
    formData.append("img", sendImg);

    mutateEdit(
      {
        name,
        description,
        typeId,
        img: formData,
        hasGroup,
        hasImg,
        validationImg: !sendImg,
      },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("tipo editado");
          // if(sendImg)setImg(URL.createObjectURL(sendImg))
          if (sendImg) {
            // console.log("si tiene img")
            setImg(URL.createObjectURL(sendImg));
          }
          if (borrarImg) {
            setImg("");
            setBorrarImg(false);
          }
          setEdit(!edit)
          setCurrentType(name)
        },
        onError: () => {
          console.error(error.response.data);
        },
      }
    );
  }

  async function handleDelete() {
    mutateDelete(
      { typeId, userId, name },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("tipo eliminado");
          setCurrentType("");
        },
      }
    );
  }

  return (
    <PanelEditDash edit={edit} setEdit={setEdit}>
      {" "}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center w-full    gap-[15px] rounded-xl "
      >
        {/* <p>Name: {verb.name}</p> */}
        <p className="mb-[5px] text-[16px] font-semibold text-black">
          Editar tipo
        </p>

        <Input
          type="text"
          variant="underlined"
          label="Nombre"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          variant="underlined"
          label="Descripción"
          // placeholder="Enter your description"
          className="max-w-xs"
          minRows={3}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />



        <div className="flex flex-row gap-[5px] w-[220px] h-[82px]">
          <Button
            type="button"
            className="w-[50%] h-full text-[15px] text-wrap"
            color="warning"
            size="sm"
            variant={hasGroup ? "solid" : "ghost"}
            onClick={() => setHasGroup(!hasGroup)}
          >
            {hasGroup ? "Eliminar grupos" : "Añadir grupos"}
          </Button>

          <Button
            className="w-[50%] h-full text-[15px] text-wrap"
            type="button"
            color="secondary"
            size="sm"
            variant={hasImg ? "solid" : "ghost"}
            onClick={() => setHasImg(!hasImg)}
          >
            {hasImg ? "No mostrar imagenes" : "Mostrar imagenes"}
          </Button>
        </div>

        {/*  */}

        <Button
          type="button"
          onClick={() => {
            setBorrarImg(!borrarImg);
            setSendImg(null);
          }}
        >
          {!borrarImg ? "Borrar imagenes" : "No borrar imagenes"}
        </Button>

        {/* para mobile */}
        <Button color="success" type="button" {...getRootProps()} className="">
          <input {...getInputProps()} />
          <p className="text-[14px] text-white">
            Añadir archivos{" "}
            <CiImageOn className="text-[20px] inline"></CiImageOn>
          </p>
        </Button>

        {sendImg && (
          <div className="flex flex-col">
            {" "}
            <Image
              src={URL.createObjectURL(sendImg)}
              alt="Image preview"
              width={500}
              height={500}
              className="w-full object-cover h-[170px] rounded-t-lg"
            />
            {/* <Button
            color="danger"
            variant="solid"
            type="button"
            onClick={() => setSendImg(null)}
          >
            Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button> */}
            <Button
              color="danger"
              className=" font-medium py-2 flex-grow rounded-b-lg rounded-t-none text-[14px] text-white"
              type="button"
              onClick={() => setSendImg(null)}
            >
              {" "}
              Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
            </Button>
          </div>
        )}

        <div
          className={clsx("mt-[30px] flex flex-row justify-between w-full", {
            hidden: buttonDelete === true,
          })}
        >
          <Button
            type="button"
            color="danger"
            className="font-medium flex-wrap"
            onClick={() => setButtonDelete(!buttonDelete)}
          >
            <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button>
          <Button
            type="submit"
            color="success"
            className="font-medium "
            isLoading={isLoading}
            // onClick={() => handleEdit()}
          >
            Enviar <LuPencil className="inline"></LuPencil>
          </Button>
        </div>

        <div className={clsx("mt-[20px]", { hidden: buttonDelete === false })}>
          <p className="text-[14px] font-medium text-black">
            ¿Estas seguro de eliminar el tipo? tambien se los verbos de este
            tipo
          </p>
          <div className="flex flex-row justify-between mt-[10px]">
            <Button
              size="sm"
              color="danger"
              type="button"
              onClick={() => handleDelete()}
              className="text-[14px] font-medium"
            >
              Si
            </Button>
            <Button
              size="sm"
              color="default"
              type="button"
              onClick={() => setButtonDelete(false)}
              className="text-[14px] font-medium"
            >
              No
            </Button>
          </div>
        </div>
      </form>
    </PanelEditDash>
  );
};

export default PanelTypes;

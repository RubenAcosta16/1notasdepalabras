"use client";
// import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { Textarea, Input, Button } from "@nextui-org/react";
import { CiImageOn } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import createType from "@/actions/useCreateType";

import AddFiles from '@/app/components/AddFiles'

const CreateVerb = () => {
  const { currentUser } = useCurrentUser();

  const { currentType, setCurrentType } = useCurrentTypeState();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  const [isChecked, setIsChecked] = useState(false);

  const { mutate, error, isLoading, isSuccess } = createType();

  const [sendImg, setSendImg] = useState(null);

  const [hasImg, setHasImg] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  //

  const onSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("usuario no encontrado");
      return;
    }

    // let dataImg=data.img
    // if(!dataImg){
    //     data.img
    // }

    if (!currentUser) {
      console.error("usuario no encontrado");
      return;
    }

    // console.log(data.img[0])
    const formData = new FormData();
    formData.append("img", sendImg);

    //recibe lo que queremos mandar
    //igualmente el onSuccess
    mutate(
      {
        id: uuidv4(),
        name: name,
        userId: currentUser.id,
        img: formData,
        description: description,
        hasGroup: isChecked,
        hasImg: hasImg,
        validationImg: !sendImg,
      },
      {
        onSuccess: () => {
          // setTitle("");
          // setBody("");

          // reset({
          //   name: "", // Vaciar el valor del input 'name'
          //   description: "", // Vaciar el valor del input 'description'
          //   // group: "", // Vaciar el valor del input 'group'
          // });

          setName("");
          setDescription("");

          setCurrentType(name);

          console.warn("tipo creado");
        },
        onError: () => {
          console.error(error.response.data);
        },
      }
    );
  };
  // console.log(!acceptedFiles)

  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="mt-[70px] bg-squaresList relative h-auto lg:h-[643px] flex flex-col items-center w-full px-5 gap-[15px] rounded-tl-[50px] p-10"
      style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)" }}
    >
      <h1 className="mb-[5px] text-[20px] font-semibold text-normal text-wrap">
        Crea un tipo de palabras
      </h1>

      <Input
        type="text"
        variant="underlined"
        label="Nombre"
        name="username"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="w-full lg:w-[500px] mx-auto"
      />

      <Textarea
        variant="underlined"
        label="Descripción"
        // placeholder="Enter your description"
        className="w-full lg:w-[500px] mx-auto"
        minRows={3}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      {/* <button type="button" onClick={() => setIsChecked(!isChecked)}>
        {isChecked ? "remove groups" : "add groups"}
      </button> */}

      <div className="flex flex-row gap-[5px] w-[250px] lg:w-[500px] h-[82px]">
        <Button
          className="w-[50%] h-full lg:h-[60px] text-[15px] text-wrap"
          type="button"
          color="warning"
          // size="sm"
          variant={isChecked ? "solid" : "ghost"}
          // endContent={""}
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked ? "Eliminar grupos" : "Añadir grupos"}
        </Button>

        <Button
          className="w-[50%] h-full lg:h-[60px] text-[15px] text-wrap"
          type="button"
          color="secondary"
          // size="sm"
          variant={hasImg ? "solid" : "ghost"}
          onClick={() => setHasImg(!hasImg)}
        >
          {hasImg ? "No mostrar imagenes" : "Mostrar imagenes"}
        </Button>
      </div>

      {/* para las imagenes */}
      {/* para pc */}
      {/* <div {...getRootProps()} className="bg-slate-200 rounded-2xl p-5 flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-black cursor-pointer">
        <input {...getInputProps()} />
        <CiImageOn className="text-[150px]"></CiImageOn>
        {isDragActive ? (
          <p className="text-[14px]">Drop the files here ...</p>
        ) : (
          <p className="text-[14px]">Drag 'n' drop some files here, or click to select files</p>
        )}
      </div> */}
      {/* {acceptedFiles.length !== 0 && "Solo se puede enviar 1 archivo"} */}

      <AddFiles getRootProps={getRootProps} getInputProps={getInputProps} sendImg={sendImg} setSendImg={setSendImg} isDragActive={isDragActive}></AddFiles>

      <Button
        type="submit"
        color="primary"
        variant="solid"
        isLoading={isLoading}
        className="w-[85%] lg:w-[256px] mt-[10px]"
      >
        Enviar
      </Button>
    </form>
  );
};

export default CreateVerb;

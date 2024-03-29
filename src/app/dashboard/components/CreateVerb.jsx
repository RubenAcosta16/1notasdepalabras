"use client";
// import { useForm } from "react-hook-form";
import { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import clsx from "clsx"; 

import { Textarea, Input, Button } from "@nextui-org/react";
import { CiImageOn } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";
import createVerb from "@/actions/createVerb";

const CreateVerb = () => {
  const { currentUser } = useCurrentUser();

  // error en el contact createVerbs.js
  // lo del mantener grupo
  const { currentType, setCurrentType } = useCurrentTypeState();

  const { mutate, error, isLoading, isSuccess } = createVerb(currentType);

  // const refName = useRef(null);
  // const refDescription = useRef(null);
  // const refGroup = useRef(null);

  const [keepGroup, setKeepGroup] = useState(false);

  const [sendImg, setSendImg] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");

  // const [isLoading, setisLoading] = useState(initialState)

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

    // console.log({
    //   id: uuidv4(),
    //   name: data.name,
    //   userId: currentUser.id,
    //   //   img: data.img,
    //   description: data.description,
    //   type: currentType,
    //   group: data.group,
    // });

    //recibe lo que queremos mandar
    //igualmente el onSuccess

    const formData = new FormData();
    formData.append("img", sendImg);

    if (currentType) {
      mutate(
        {
          id: uuidv4(),
          name: name,
          userId: currentUser.id,
          img: formData,
          description: description,
          type: currentType,
          group: group,
          validationImg: !sendImg,
        },
        {
          onSuccess: () => {
            // setTitle("");
            // setBody("");
            if (keepGroup) {
              setName("");
              setDescription("");
              // setGroup("")
            } else {
              setName("");
              setDescription("");
              setGroup("");
            }

            console.warn("verbo creado");
          },
          onError: () => {
            console.error(error.response.data);
          },
        }
      );
    } else {
      console.error("Necesitas tener un tipo para crear un verbo");
    }
  };

  // console.log(errors.name?.message)

  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="mt-[70px] relative flex flex-col items-center w-full px-5 gap-[15px] rounded-tl-[50px] p-10"
      style={{boxShadow:"0 5px 15px rgba(0, 0, 0, 0.7)"}}
    >
      <h1 className="mb-[5px] text-[20px] font-semibold text-black">Crea una palabra</h1>

      <Input
        type="text"
        variant="underlined"
        label="Nombre"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
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

      <div className="relative w-full">
        {" "}
        <Textarea
          variant="underlined"
          label="Grupo"
          // placeholder="Enter your description"
          className="max-w-xs"
          minRows={3}
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
          }}
        />
        <Button
          className="mt-[10px] absolute top-[-10px] right-0 z-10"
          type="button"
          color="warning"
          size="sm"
          variant={keepGroup ? "solid" : "ghost"}
          // endContent={""}
          onClick={() => setKeepGroup(!keepGroup)}
        >
          {keepGroup ? "No mantener grupo" : "Mantener grupo"}
        </Button>
      </div>

      {/* <button
        type="button"
        // color="danger"
        // variant="ghost"
        // className="border-2 border-cyan-600"
        className={clsx(
          `border-2 border-rose-500  text-[14px] font-medium py-2 px-7 rounded-2xl hover:bg-rose-400`,
          {
            "bg-rose-500 text-white": keepGroup === true,
            "bg-rose-200 text-black": keepGroup === false,
          }
        )}
        // endContent={""}
        onClick={() => setKeepGroup(!keepGroup)}
      >
        {keepGroup ? "No mantener grupo" : "Mantener grupo"}
      </button> */}

      {/* <Button color="primary" isLoading>
        Loading
      </Button> */}

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

      {/* para mobile */}
      <Button
      color="success"
        type="button"
        {...getRootProps()}
        className=""
      >
        <input {...getInputProps()} />
        <p className="text-[14px] text-white">
          Añadir archivos <CiImageOn className="text-[20px] inline"></CiImageOn>
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

      <Button
        type="submit"
        color="primary"
        variant="solid"
        isLoading={isLoading}
        className="w-[85%]"
      >
        Enviar
      </Button>
    </form>
  );
};

export default CreateVerb;

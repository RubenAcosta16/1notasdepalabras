"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { CiImageOn } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import { Textarea, Input, Button } from "@nextui-org/react";

import PanelEditDash from "@/app/components/PanelEditDash";

import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import editVerb from "@/actions/editVerb";
import deleteVerb from "@/actions/deleteVerb";

const PanelVerbs = ({ verbThings, verbId, edit, setEdit,refetch }) => {
  const { currentType, setCurrentType } = useCurrentTypeState();
  const {
    name,
    setName,
    description,
    setDescription,
    group,
    setGroup,
    img,
    setImg,
  } = verbThings;

  const {
    mutate: mutateEdit,
    error,
    isLoading,
    isSuccess,
    reset,
    
  } = editVerb(currentType);
  const { mutate: mutateDelete } = deleteVerb(currentType);

  const [sendImg, setSendImg] = useState(null);
  // false no lo borra
  const [borrarImg, setBorrarImg] = useState(false);
  // const [edit, setEdit] = useState(false);

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0]);
    setBorrarImg(false);
    // setImg(URL.createObjectURL(acceptedFiles[0]));
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
        group,
        verbId,
        img: formData,
        validationImg: !sendImg,
        borrarImg,
      },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("verbo editado");
          if (sendImg) {
            // console.log("si tiene img")
            setImg(URL.createObjectURL(sendImg));
          }
          if (borrarImg) {
            setImg("");
            setBorrarImg(false);
          }
          setEdit(!edit)
          refetch()
        },
        onError: () => {
          console.error(error.response.data);
        },
      }
    );
  }

  async function handleDelete() {
    mutateDelete(
      { verbId },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("verbo eliminado");
        },
      }
    );
  }

  return (
    <PanelEditDash edit={edit} setEdit={setEdit}>
      <form
        onSubmit={handleSubmit}
        className=" relative flex flex-col items-center w-full gap-[15px] rounded-xl  "
        // style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)" }}
      >
         
        <p className="mb-[5px] text-[16px] font-semibold text-black">
          Editar palabra
        </p>
        {/* <p>Name: {verb.name}</p> */}

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
        </div>

        {/* <p>Description: {verb.description}</p>
      <p>Group: {verb.group}</p> */}

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
        
        <div className="mt-[30px] flex flex-row justify-between w-full">
          <Button
            type="button"
            color="danger"
            className="font-medium flex-wrap"
            onClick={handleDelete}
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
      </form>
    </PanelEditDash>
  );
};

export default PanelVerbs;

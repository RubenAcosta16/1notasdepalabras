"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import Image from "next/image";

// import { CiImageOn } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import { Textarea, Input, Button } from "@nextui-org/react";

import toast from "@/actions/toast/toast";

import PanelEditDash from "@/app/components/PanelEditDash";

import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import editVerb from "@/actions/useEditVerb";
import deleteVerb from "@/actions/useDeleteVerb";

import AddFiles from "@/app/components/AddFiles";

const PanelVerbs = ({ verbThings, verbId, edit, setEdit, refetch }) => {
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
  const { mutate: mutateDelete,error:errorDelete } = deleteVerb(currentType);

  const [sendImg, setSendImg] = useState(null);
  // false no lo borra
  const [borrarImg, setBorrarImg] = useState(false);
  // const [edit, setEdit] = useState(false);

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
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

          toast('Palabra editada')
          if (sendImg) {
            setImg(URL.createObjectURL(sendImg));
          }
          if (borrarImg) {
            setImg("");
            setBorrarImg(false);
          }
          setEdit(!edit);
          refetch();
        },
        onError: () => {
          toast(error.response.data,false)
        },
      }
    );
  }

  async function handleDelete() {
    mutateDelete(
      { verbId },
      {
        onSuccess: () => {

          toast('Palabra eliminada')
        },
        onError: () => {
          toast(errorDelete.response.data,false)
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
        <p className="mb-[5px] text-[16px] font-medium text-normal">
          Editar palabras
        </p>
        {/* <p>Name: {verb.name}</p> */}

        <Input
          type="text"
          variant="underlined"
          label="Nombre"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <div className="relative w-full">
          {" "}
          <Textarea
            variant="underlined"
            label="Grupo"
            // placeholder="Enter your description"
            className="w-full lg:w-[500px] mx-auto"
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

        <AddFiles
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          sendImg={sendImg}
          setSendImg={setSendImg}
          isDragActive={isDragActive}
          img={img}
        ></AddFiles>

        

        <div className="mt-[30px] flex flex-row justify-between  w-full lg:w-[337px] lg:gap-[15px]">
          <Button
            type="button"
            color="danger"
            className="font-medium flex-wrap "
            onClick={handleDelete}
          >
            <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button>

          <Button
            type="submit"
            color="success"
            className="font-medium lg:flex-grow"
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

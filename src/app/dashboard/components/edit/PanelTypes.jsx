"use client";
import { useState, useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import useCurrentTypeState from '@/hooks/useCurrentTypeState'

import editType from "@/actions/editType";
import deleteType from "@/actions/deleteType";

const PanelTypes = ({ userId, typeThings, typeId }) => {
  const {
    name,
    setName,
    description,
    setDescription,
    hasGroup,
    setHasGroup,
    img,
    setImg,
  } = typeThings;

  // const [hasGroup, setHasGroup] = useState(rHasGroup);

  const { currentType, setCurrentType } = useCurrentTypeState();

  const { mutate: mutateEdit, error, isLoading, isSuccess, reset } = editType();
  const { mutate: mutateDelete,isLoading:deleteLoading } = deleteType(currentType);

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
    
    setBorrarImg(false)
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
          if(borrarImg){
            setImg("");
            setBorrarImg(false)
          }
        },
        onError: () => {
          console.error(error.response.data);
        },
      }
    );
  }

  async function handleDelete() {
    mutateDelete(
      { typeId, userId, name, },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("tipo eliminado");
          setCurrentType("")
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <p>Name: {verb.name}</p> */}
      <label htmlFor="">Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="">Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={() => setHasGroup(!hasGroup)}>
        {hasGroup ? "remove groups" : "add groups"}
      </button>

      {/* <p>Description: {verb.description}</p>
      <p>Group: {verb.group}</p> */}

      <button type="button" onClick={() => setButtonDelete(!buttonDelete)}>
        Delete
      </button>
      <div className={clsx({ hidden: buttonDelete === false })}>
        ¿Estas seguro de eliminar el tipo? tambien se los verbos de este tipo
        <button type="button" onClick={handleDelete}>
          {deleteLoading ? "Loading..." : "Si"}
        </button>
        <button type="button" onClick={() => setButtonDelete(false)}>
          No
        </button>
      </div>

      {/*  */}
      <button type="button" onClick={() => {
        setBorrarImg(!borrarImg) 
        setSendImg(null)
      }}>
        {!borrarImg?"Borrar imagenes":"No borrar imagenes"}
        
      </button>

      {/* para las imagenes */}
      <div {...getRootProps()} className="bg-slate-300 p-5">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {/* {acceptedFiles.length !== 0 && "Solo se puede enviar 1 archivo"} */}

      {sendImg && (
        <Image
          src={URL.createObjectURL(sendImg)}
          alt="Image preview"
          width={500}
          height={300}
        />
      )}

      <button type="button" onClick={() => setSendImg(null)}>
        Limpiar imagenes
      </button>

      <button>{isLoading ? "Loading..." : "Save"}</button>
    </form>
  );
};

export default PanelTypes;

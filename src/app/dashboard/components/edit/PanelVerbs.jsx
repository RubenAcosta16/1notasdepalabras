"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import editVerb from "@/actions/editVerb";
import deleteVerb from "@/actions/deleteVerb";

const PanelVerbs = ({ verbThings, verbId }) => {
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

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0]);
    setBorrarImg(false)
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

      <label htmlFor="">Group:</label>
      <input
        type="text"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />

      {/* <p>Description: {verb.description}</p>
      <p>Group: {verb.group}</p> */}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>

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

export default PanelVerbs;

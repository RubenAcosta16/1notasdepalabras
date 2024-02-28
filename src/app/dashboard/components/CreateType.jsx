"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import createType from "@/actions/createType";

const CreateVerb = () => {
  const { currentUser } = useCurrentUser();

  const { currentType, setCurrentType } = useCurrentTypeState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isChecked, setIsChecked] = useState(false);

  const { mutate, error, isLoading, isSuccess } = createType();

  const [sendImg, setSendImg] = useState(null);

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0])
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  //
  
  const onSubmit = handleSubmit(async (data) => {
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
        name: data.name,
        userId: currentUser.id,
        img: formData,
        description: data.description,
        hasGroup: isChecked,
        validationImg: !sendImg,
      },
      {
        onSuccess: () => {
          // setTitle("");
          // setBody("");

          reset({
            name: "", // Vaciar el valor del input 'name'
            description: "", // Vaciar el valor del input 'description'
            // group: "", // Vaciar el valor del input 'group'
          });

          setCurrentType(data.name);

          console.warn("tipo creado");
        },
        onError: () => {
          console.error(error.response.data);
        },
      }
    );
  });
  // console.log(!acceptedFiles)

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="">Nombre del tipo:</label>
        <input
          name="verb"
          type="text"
          // value={username}
          //   onChange={(event) => setUsername(event.target.value)}
          {...register("name", {
            required: "Este campo es requerido",
          })}
        />
        {errors.name && <div>{errors.name.message}</div>}

        <label htmlFor="">Descripcion:</label>
        <textarea
          id=""
          cols="30"
          rows="10"
          type="text"
          name="description"
          // value={username}
          //   onChange={(event) => setUsername(event.target.value)}
          {...register("description", {
            required: "Este campo es requerido",
          })}
        ></textarea>

        {errors.description && <div>{errors.description.message}</div>}
        {/* <label htmlFor="">has groups?
        <input
          type="checkbox"
          checked={isChecked}
          onChange={()=>setIsChecked(!isChecked)}
        /></label> */}

        <button type="button" onClick={() => setIsChecked(!isChecked)}>
          {isChecked ? "remove groups" : "add groups"}
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

<button type="button" onClick={() => setSendImg(null)}>Limpiar imagenes</button>

        <button>{isLoading ? "Loading..." : "Enviar"}</button>
      </form>
    </div>
  );
};

export default CreateVerb;

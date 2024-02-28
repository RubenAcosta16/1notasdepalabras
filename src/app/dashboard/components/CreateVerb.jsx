"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";
import createVerb from "@/actions/createVerb";

const CreateVerb = () => {
  const { currentUser } = useCurrentUser();

  // error en el contact createVerbs.js
  // lo del mantener grupo
  const { currentType, setCurrentType } = useCurrentTypeState();

  const { mutate, error, isLoading, isSuccess } = createVerb(currentType);

  const refName = useRef(null);
  const refDescription = useRef(null);
  const refGroup = useRef(null);

  const [keepGroup, setKeepGroup] = useState(false);

  const [sendImg, setSendImg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  //

  const onSubmit = handleSubmit(async (data) => {
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
          name: data.name,
          userId: currentUser.id,
          img: formData,
          description: data.description,
          type: currentType,
          group: data.group,
          validationImg: !sendImg,
        },
        {
          onSuccess: () => {
            // setTitle("");
            // setBody("");
            if (keepGroup) {
              reset({
                name: "", // Vaciar el valor del input 'name'
                description: "", // Vaciar el valor del input 'description'
                // group: "", // Vaciar el valor del input 'group'
              });
            } else {
              reset({
                name: "", // Vaciar el valor del input 'name'
                description: "", // Vaciar el valor del input 'description'
                group: "", // Vaciar el valor del input 'group'
              });
            }

            console.warn("verbo creado");
          },
          onError: () => {
            console.error(error.response.data);
          },
        }
      );
    }else{
      console.error("Necesitas tener un tipo para crear un verbo")
    }
  });

  // console.log(errors.name?.message)

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="">Verbo:</label>
        <input
          name="name"
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

        <label htmlFor="">Grupo:</label>
        <textarea
          name="group"
          id=""
          cols="30"
          rows="10"
          type="text"
          // value={username}
          //   onChange={(event) => setUsername(event.target.value)}
          {...register("group", {
            // required: true,
          })}
        ></textarea>

        <button type="button" onClick={() => setKeepGroup(!keepGroup)}>
          {keepGroup ? "No mantener grupo" : "Mantener grupo"}
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

        <button>{isLoading ? "Loading..." : "Enviar"}</button>
      </form>
    </div>
  );
};

export default CreateVerb;

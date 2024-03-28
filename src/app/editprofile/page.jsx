"use client";
import { useSession } from "next-auth/react";

import { Input, Button, Skeleton } from "@nextui-org/react";
import { CiImageOn } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

import { Noto_Sans_Cham, Quicksand } from "next/font/google";

import axios from "axios";

import { useState, useEffect, useCallback } from "react";
// import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";

import { useDropzone } from "react-dropzone";

import { useForm } from "react-hook-form";

import useCurrentUser from "@/hooks/useCurrentUser";

const noto_Sans_Cham = Noto_Sans_Cham({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const page = () => {
  // const { data: session, status } = useSession();

  const { currentUser, status, setCurrentUser } = useCurrentUser();
  // console.log(currentUser)
  const [username, setUsername] = useState("Cargando...");
  const [sendImg, setSendImg] = useState(null);
  const [borrarImg, setBorrarImg] = useState(false);

  // const [firstImgUser, setFirstImgUser] = useState("")

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      console.error("usuario no encontrado");
      return;
    }
    // else{
    //   setFirstImgUser(currentUser.image)
    // }
    setUsername(currentUser.username);

    // setSendImg
  }, [currentUser]);

  // console.log(username)

  // para las imagenes
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    // Do something with the files
    setSendImg(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  //

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    if (!currentUser) {
      console.error("usuario no encontrado");
      return;
    }
    const formData = new FormData();
    formData.append("img", sendImg);

    let user1 = {
      username: username,
    };

    if (borrarImg) {
      user1 = {
        username: username,
        image: "",
      };
    }

    try {
      const { data: data1 } = await axios.put(
        "/api/profile/" + currentUser.id,
        user1
      );

      if (sendImg) {
        // console.log("se enviara");
        // console.log(formData);
        const { data: dataImg } = await axios.post(`/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(dataImg);

        const urlImg = { image: dataImg.url };
        // console.log(urlImg)

        const { data: dataEdited } = await axios.put(
          "/api/profile/" + currentUser.id,
          {
            ...urlImg,
          }
        );

        // console.log(dataEdited);
        setCurrentUser(dataEdited);
      } else {
        setCurrentUser(data1);
      }
      // const resJSON = await res.json();
      // // setUsername("")
      // console.log(resJSON);
      if (data) {
        console.warn("Usuario actualizado");
      }
    } catch (error) {
      console.error("error: " + error);
    } finally {
      setIsLoading(false);
    }
    // console.log(resJSON.ok)
    // console.log(resJSON.status)
  });

  // console.log(!sendImg);

  return (
    <div
      className={`${quicksand.className} flex flex-col justify-center items-center`}
    >
      <h1 className="text-[20px] font-semibold">Edit profile</h1>

      <form
        className="mt-[70px] relative flex flex-col items-center w-full px-5 gap-[15px] rounded-tl-[50px] p-10"
        action=""
        onSubmit={onSubmit}
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)" }}
      >
        <div className="flex flex-col items-center">
          {/* para mobile */}

          <div className="flex flex-col gap-[15px] w-[170px]">
            {status == "loading" ? (
              <Skeleton
                className={"h-[170px] w-[170px] rounded-full"}
              ></Skeleton>
            ) : (
              <>
                {!sendImg ? (
                  <>
                    {currentUser.image == "" ? (
                      <Image
                        src="/default_user.jpg"
                        alt="Image preview"
                        width={170}
                        height={170}
                        className="w-full object-contain h-[170px] rounded-full"
                      />
                    ) : (
                      <Image
                        src={currentUser.image}
                        alt="Image preview"
                        width={170}
                        height={170}
                        className="w-full object-contain h-[170px] rounded-full"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {sendImg == null ? (
                      <Image
                        src="/default_user.jpg"
                        alt="Image preview"
                        width={170}
                        height={170}
                        className="w-full object-contain h-[170px] rounded-full"
                      />
                    ) : (
                      <Image
                        src={URL.createObjectURL(sendImg)}
                        alt="Image preview"
                        width={170}
                        height={170}
                        className="w-full object-contain h-[170px] rounded-full"
                      />
                    )}
                  </>
                )}
              </>
            )}

            {/* <Button
            color="danger"
            variant="solid"
            type="button"
            onClick={() => setSendImg(null)}
          >
            Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button> */}
            <Button
              color="success"
              type="button"
              {...getRootProps()}
              className=""
            >
              <input {...getInputProps()} />
              <p className="text-[14px] text-white">
                Añadir archivos{" "}
                <CiImageOn className="text-[20px] inline"></CiImageOn>
              </p>
            </Button>
            <Button
              color="danger"
              className=" font-medium py-2 flex-grow   text-[14px] text-white"
              type="button"
              onClick={() => setSendImg(null)}
            >
              {" "}
              Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
            </Button>

            <Button
              type="button"
              onClick={() => {
                setBorrarImg(!borrarImg);
                setSendImg(null);
              }}
            >
              {!borrarImg
                ? "Eliminar foto de perfil"
                : "Mantener foto de perfil"}
            </Button>
          </div>
          {/* <Button type="button" onClick={() => setSendImg(null)}>
            Limpiar imagenes
          </Button> */}
        </div>

        <Input
          type="text"
          variant="underlined"
          label="Nombre"
          name="name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {/* <input
        // onChange={handleChangeName}
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          {...register("username", {
            required: true,
          })}
        /> */}
        {/* {errors.username && <span>{errors.username.message}</span>} */}
        {/* for the image */}
        {/* <input type="text" value={session.user.name}/> */}

        {/*  */}

        <Button
          type="submit"
          color="primary"
          variant="solid"
          isLoading={isLoading}
          className="w-[85%]"
          isDisabled={status == "loading"}
        >
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default page;

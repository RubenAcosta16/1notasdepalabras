"use client";
// import { useSession } from "next-auth/react";

import { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

import { useForm } from "react-hook-form";

import useCurrentUser from '@/hooks/useCurrentUser'

const page = () => {
  // const { data: session, status } = useSession();

  const { currentUser,status } = useCurrentUser();
  // console.log(currentUser)
  const [username, setUsername] = useState("");

  useEffect(() => {
    if(!currentUser){
      console.error("usuario no encontrado")
      return
    }
    setUsername(currentUser.username)
  }, [currentUser])

  // console.log(username)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const onSubmit = handleSubmit(async (data) => {

    if(!currentUser){
      console.error("usuario no encontrado")
      return
    }

try {
  const res = await fetch("/api/profile/"+currentUser.id, {
    method: "PUT",
    body: JSON.stringify({
      username: username,
      // email: data.email,
      // // password: hashedPassword,
      // password: data.password,
    }),
    headers: { 
      "Content-Type": "application/json",
    },
  });
  const resJSON = await res.json();
  // setUsername("")
  console.log(resJSON)
  if(resJSON){
    console.warn("Nombre actualizado")
  }
} catch (error) {
  console.error("error: "+error)
}
      // console.log(resJSON.ok)
      // console.log(resJSON.status)
  });

  if (status == "loading") {
    return <div>loading...</div>;
  }
  
  return (
    <div>
      <h1>Edit profile</h1>

      <form action="" onSubmit={onSubmit}>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          // {...register("username", {
          //   required: true,
          // })}
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
        {errors.username && <span>{errors.username.message}</span>}
        {/* for the image */}
        {/* <input type="text" value={session.user.name}/> */}

        <button>Enviar</button>
      </form>
    </div>
  );
};

export default page;

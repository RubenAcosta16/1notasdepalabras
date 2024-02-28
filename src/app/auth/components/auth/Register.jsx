"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {signIn, signOut, useSession} from 'next-auth/react'

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [matchPassword, setMatchPassword] = useState(true);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      // return alert("Passwords do not match");
          setMatchPassword(false);
          return
    } 
    // setMatchPassword(true);

    // const hashedPassword=await bcrypt.hash(data.password,10)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        // password: hashedPassword,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await res.json();
    if(!resJSON.ok){
      console.error(resJSON.message);
    }
    
    // console.log(resJSON.ok);
    // console.log("se supone que no imprime")

    // una vez logeado signin

    if(resJSON.ok !== false){
      const resSignIn=await signIn("credentials",{
        email:data.email,
        password:data.password,
        redirect:false
      })
      // console.log(resSignIn)
  
      if(resSignIn.error){
        console.log(res.error)
      }else{
        router.push("/dashboard")
      }
    }
  });

  return (
    <div className="border border-solid border-red-500 border-2">
      <form action="" onSubmit={onSubmit}>
        <br />
        <label htmlFor="">Username</label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        />
 
        {errors.username && <span>{errors.username.message}</span>}

        <br />
        <label htmlFor="">Email</label>
        <input
          type="email"
          {...register("email", {
            required: true,
          })}
        />

        {errors.email && <span>{errors.email.message}</span>}

        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        {errors.password && <span>{errors.password.message}</span>}

        <br />
        <label htmlFor="">ConfirmPassword</label>
        <input
          type="confirmPassword"
          {...register("confirmPassword", {
            required: true,
          })}
        />
        {!matchPassword && <span>Las contraseñas deben ser iguales</span>}

        <button>Registrar</button>
      </form>
    </div>
  );
};

export default page;

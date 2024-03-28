"use client";

import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";

import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";

const page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);



  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = handleSubmit(async (data) => {
  //   const res = await signIn("credentials", {
  //     email: data.email,
  //     password: data.password,
  //     redirect: false,
  //   });
  //   // console.log(res);

  //   if (res.error) {
  //     console.error(res.error.message);
  //   } else {
  //     router.push("/dashboard");
  //   }
  // });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    // console.log(res);

    if (res.error) {
      console.error(res.error.message);
    } else {
      router.push("/home");

    }
  }

  // con framer motion hacer que se deslice y no tenga esa transicion tan fea al cambiar entre login y eso

  return (
    <form
      className="flex flex-col gap-[10px] h-[374px]"
      action=""
      onSubmit={handleSubmit}
    >
      <p className="text-[20px] font-semibold">Welcome Back</p>
      {/* <label htmlFor="">Username</label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        />

        {errors.username && <span>{errors.username.message}</span>} */}

      <Input
        type="email"
        variant="underlined"
        label="Email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {/* <label htmlFor="">Email</label>
        <input

        /> */}
      {/* {errors.email && <span>{errors.email.message}</span>} */}

      {/* <Input
        type="password"
        variant="underlined"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      /> */}
      {/* <label htmlFor="">Password</label>
        <input type="password" /> */}

      <Input
        // type="password"
        variant="underlined"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaRegEyeSlash  className="text-xl text-default-400 pointer-events-none" />
            ) : (
              <FaRegEye  className="text-xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />

      {/* esta cosa ya tiene espacio por el gap asi que le puse mas con un mt */}
      <button
        type="submit"
        className="text-white text-[16px] mt-[30px] font-normal  rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500"
      >
        login
      </button>
      <p>con framer motion hacer que se deslice</p>
    </form>
  );
};

export default page;

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import { Input } from "@nextui-org/react";
// import { useRef, useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Page = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const [matchPassword, setMatchPassword] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    // if (password.length >= 8) {
    //   console.log(res.error);
    //   return;
    // }

    if (password !== passwordConfirm) {
      // return alert("Passwords do not match");
      setMatchPassword(false);
      return;
    }
    // setMatchPassword(true);

    // const hashedPassword=await bcrypt.hash(data.password,10)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        // password: hashedPassword,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await res.json();
    if (!resJSON.ok) {
      console.error(resJSON.message);
    }

    // console.log(resJSON.ok);
    // console.log("se supone que no imprime")

    // una vez logeado signin

    if (resJSON.ok !== false) {
      const resSignIn = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      // console.log(resSignIn)

      if (resSignIn.error) {
        console.log(res.error);
      } else {
        router.push("/home");
      }
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col gap-[10px]"
    >
      <p className="text-[20px] font-semibold text-center">Let´s get started</p>

      {/* <label htmlFor="">Username</label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        /> */}
      <Input
        type="text"
        variant="underlined"
        label="Username"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="w-full lg:w-[500px] mx-auto"
      />

      {/* {errors.username && <span>{errors.username.message}</span>} */}

      {/* <br />
        <label htmlFor="">Email</label>
        <input
          type="email"
          {...register("email", {
            required: true,
          })}
        /> */}
      <Input
        type="email"
        variant="underlined"
        label="Email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full lg:w-[500px] mx-auto"
      />

      {/* {errors.email && <span>{errors.email.message}</span>}

        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
        /> */}
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
              <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />
            ) : (
              <FaRegEye className="text-xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="w-full lg:w-[500px] mx-auto"
      />

      {/* {errors.password && <span>{errors.password.message}</span>} */}

      {/* <br />
        <label htmlFor="">ConfirmPassword</label>
        <input
          type="confirmPassword"
          {...register("confirmPassword", {
            required: true,
          })}
        /> */}
      <Input
        // type="password"
        variant="underlined"
        label="Confirm Password"
        name="password"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}

        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility2}
          >
            {isVisible2 ? (
              <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />
            ) : (
              <FaRegEye className="text-xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible2 ? "text" : "password"}
        className="w-full lg:w-[500px] mx-auto"
      />

      {!matchPassword && <span>Las contraseñas deben ser iguales</span>}

      {/* que sea azulito */}
      <button
        type="submit"
        className="text-white text-[16px] mt-[30px] font-normal flex-grow rounded-full text-center py-2 mx-5 bg-pink-600 hover:bg-pink-500 w-full lg:w-[500px] mx-auto"
      >
        Register
      </button>
    </form>
  );
};

export default Page;

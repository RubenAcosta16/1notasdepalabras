"use client";
import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    // console.log(res);

    if (res.error) {
      console.error(res.error.message);
    } else {
      router.push("/dashboard");
    }
  });



  return (
    <div className="border border-solid border-red-500 border-2">
      <form action="" onSubmit={onSubmit}>
        <br />
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

        <br />
        <label htmlFor="">Email</label>
        <input
          type="email"
          {...register("email", {
            required: true,
          })}
        />

        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        <button>login</button>
      </form>
      <button
        onClick={async () => {
          await signOut({
            // para redireccionar al signout
            callbackUrl: "/",
          });
        }}
        className="btn btn-danger"
      >
        Sign out
      </button>

      
    </div>
  );
};

export default page;

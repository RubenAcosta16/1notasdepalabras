"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const GoogleButton = ({ children, action }) => {
  const router = useRouter();
  // console.log(action)

  async function socialSignIn() {
    // ver que retorna sign in y hacerlo como arriba, osea sin el .then para recoger lo que retorna y de pura casualidad ver si no son los datos del usuario para asi registrarlos en la db
    await signIn(action, { redirect: false })
      .then((callback) => {
        // console.log(callback);
        // if (callback?.error) {
        //   toast.error('Invalid credentials!');
        // }
        console.log(callback);

        // if (callback?.ok) {
        router.push("/dashboard");
        // }
      })
      .catch((error) => {
        console.log("went an error");
        console.error(error);
        // router.push("/auth/login");
      });
    // .finally(() => setIsLoading(false));
  }

  return (
    <button
      onClick={async () => {

        await socialSignIn();

      }}
      className="hover:scale-95"
    >
      {children}
    </button>
  );
};

export default GoogleButton;

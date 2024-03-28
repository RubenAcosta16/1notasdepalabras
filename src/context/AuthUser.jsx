"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import useCurrentUser from '@/hooks/useCurrentUser'


const authUser = ({ children }) => {
//   console.log("layout");

  const { data: session, status, update } = useSession();

  // Define el estado o cualquier otra lógica que necesites
  // const [currentUser, setCurrentUser] = useState({});

  const {
    currentUser,
    status: statusHook,
    setCurrentUser,
    setStatus,
  } = useCurrentUser();
//   console.log(statusHook);

  useEffect(() => {
    const fetchUser = async () => {
      // console.log("see ejecuto")
      try {
        if (status === "authenticated" && session?.user?.email) {
          const res = await fetch("/api/profile/" + session.user.email);
          const resJSON = await res.json();
        //   console.log(resJSON);
          // setCurrentUser(resJSON);

          setCurrentUser(resJSON);
          setStatus("authenticated");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Llama a la función fetchUser solo cuando la sesión esté autenticada y el email esté disponible
    fetchUser();
  }, [status, session?.user?.email]); // Ejecuta el efecto cuando cambie el estado de la sesión o el email del usuario

  return <>{children}</>;
};

export default authUser;

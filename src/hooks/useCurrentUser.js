import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const { data: session, status } = useSession();

  // Define el estado o cualquier otra lógica que necesites
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (status === "authenticated" && session?.user?.email) {
          const res = await fetch("/api/profile/" + session.user.email);
          const resJSON = await res.json();
          setCurrentUser(resJSON);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Llama a la función fetchUser solo cuando la sesión esté autenticada y el email esté disponible
    fetchUser();
  }, [status, session?.user?.email]); // Ejecuta el efecto cuando cambie el estado de la sesión o el email del usuario

//   if(!currentUser){
//     return
//   }
  // Devuelve los valores o funciones que deseas exponer
  return { currentUser,status };
};

export default useCurrentUser;
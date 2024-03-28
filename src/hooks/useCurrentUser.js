// import { useState, useEffect } from 'react';
// import { useSession } from "next-auth/react";

// const useCurrentUser = () => {
//   const { data: session, status,update } = useSession();

//   // Define el estado o cualquier otra lógica que necesites
//   const [currentUser, setCurrentUser] = useState({});



//   useEffect(() => {
//     const fetchUser = async () => {
//       // console.log("see ejecuto")
//       try {
//         if (status === "authenticated" && session?.user?.email) {
//           const res = await fetch("/api/profile/" + session.user.email);
//           const resJSON = await res.json();
//           setCurrentUser(resJSON);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     // Llama a la función fetchUser solo cuando la sesión esté autenticada y el email esté disponible
//     fetchUser();
//   }, [status, session?.user?.email]); // Ejecuta el efecto cuando cambie el estado de la sesión o el email del usuario

// //   if(!currentUser){
// //     return
// //   } 
//   // Devuelve los valores o funciones que deseas exponer
//   return { currentUser,status,setCurrentUser };
// };

// export default useCurrentUser;



"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import {create} from 'zustand';

const useCurrentUserHook = create((set) => ({
  currentUser: {}, // Variable para almacenar el tipo actual
  status:"loading",
  setCurrentUser: (newUser) => {
    // console.log({ currentUser: newUser })
    // console.log(newUser)
    set({ currentUser: newUser })
  }, // Función para asignar un nuevo valor a currentType
  setStatus: (newStatus) => set({ status: newStatus }), // Función para asignar un nuevo valor a currentType
}));


export default useCurrentUserHook;



// // Creamos nuestro estado usando Zustand
// const useCurrentTypeState = create((set) => ({
//   currentUser: '', // Variable para almacenar el tipo actual
//   setCurrentUser: (newType) => set({ currentType: newType }), // Función para asignar un nuevo valor a currentType
// }));

// // export default useCurrentTypeState;
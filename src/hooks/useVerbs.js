import { useState, useEffect } from "react";
import useCurrentUser from "./useCurrentUser";

// const useTypes = () => {
//   const { data: session, status } = useSession();
// //   reactquery

//   // Define el estado o cualquier otra lógica que necesites
//   const { currentUser } = useCurrentUser();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (currentUser) {
//             // usar reactquery
//           const res = await fetch("/api/types/");
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
//   return { currentUser };
// };
 
// export default useTypes;

import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const getVerbs = async (userId, type) => {
  const { data } = await axios.get(`/api/verbs/${userId}||${type}`);
  // console.log("type")
  // console.log(type)
  return data.reverse();
}; 

// con reactQuery

const useTypes = (userId, type) => {
  //esto es para acceder al cache
  //  const queryClient=useQueryClient()
  // console.log(userId)
  // console.log(type)
  // const [verbs, setVerbs] = useState([])

  //nombre o query para identificar, funcion promesa con el fetch donde se traen los datos
  //como 3er parametro es un objeto con configuraciones
  const {
    data:verbs,
    error,
    isLoading,
    //  isError,
    //  isSuccess,
    status, //es como una mezcla de las 2 de arriba
    isFetching,
    //esto es para saber si esta desabilitado
    isIdle,
    //esto es para que cargue de nuevo
    refetch, 
  } = useQuery([type], () => getVerbs(userId, type), {
    refetchOnWindowsFocus: false,
    //evalua cada cierto tiempo
    // refetchInterval: 2000,
    //esto es que por 60segs considere frescos los datos, no los considere desactualizados
    staleTime: 120000,
    //20:42 o antes explica lo de las cosas inactivas, si no estas usando datos hasta 5 min los elimina reactquery
    //esto es que cuando el dato no se usa, generalmente si cambiamos de pagina, si no se usa el dato en 3segs lo borra del cache
    cacheTime: 30000,
    //que no cargue por defecto, o cuando cargue la pagina
    // enabled:false,
    //para lo del reintento y el error
    // retry:1,
    retryDelay: 1000,
    // aqui para ordenar
    // select:(data)=>data.
  });
  // console.log(verbs)
  // console.log(verbs.length)

  // let copiaVerbs = [];
  // for (let i = 0; i < data.length; i++) {
  //   copiaVerbs = data[i];
    
  // }
  // // Invertir la copia del array
  // copiaVerbs.reverse();
  // // Actualizar el estado con el array invertido
  // setVerbs(copiaVerbs);

  return {
    verbs,
    error,
    isLoading,
    //  isError,
    //  isSuccess,
    status, //es como una mezcla de las 2 de arriba
    isFetching,
    //esto es para saber si esta desabilitado
    isIdle,
    //esto es para que cargue de nuevo
    refetch,
  };
};

export default useTypes;

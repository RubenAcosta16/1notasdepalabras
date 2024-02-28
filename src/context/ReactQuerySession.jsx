"use client";

import { QueryClientProvider,QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

//por si quieres configuracion global, configuracion por defecto si no se le cambia
const queryClient=new QueryClient({
    // defaultOptions:{
    //   queries:{
    //     staleTime:Infinity,
    //     cacheTime:3000
    //   }
    // }
  })
  
  //en cada consulta reactquery hace 3 reintentos de carga cuando hay un error, si en los 3 falla ya manda el error
  

const ReactQuerySession = ({ children }) => {
  return (
      <QueryClientProvider client={queryClient}>

        {children}
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
  );
};

export default ReactQuerySession;

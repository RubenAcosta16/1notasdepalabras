import {useEffect,useState} from 'react'

import useVerbs from "@/hooks/useVerbs";
import useGroupVerbs from "@/hooks/useGroupVerbs";
import useCurrentTypeState from "@/hooks/useCurrentTypeState";

import EditGroups from "./edit/EditGroups";

const ListVerbs = ({ userId }) => {

  const { currentType, setCurrentType } = useCurrentTypeState()



  const {
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
  } = useVerbs(userId, currentType);

  
  useEffect(() => {
    refetch()
  }, [currentType])
  
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const verbsGrouped= useGroupVerbs(verbs)
  // useEffect(() => {
  //   verbsGrouped
  // }, [verbs])

  // console.log(verbs)
  // console.log(verbsGrouped)
  // console.log(verbs)

// problema con nose y con que los verbos al final no los retorna con la propiedad groups


  return (
    <div> 
      <h2>Verbos</h2>
      <ul>
        {verbsGrouped.length === 0?"Sin verbos":(verbsGrouped.map((verbGrouped) => (
          <EditGroups key={verbGrouped[0].id} verbGrouped={verbGrouped}></EditGroups>
          
        )))}
        
      </ul>
    </div>
  );
};

export default ListVerbs;

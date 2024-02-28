import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// }; 
export const deleteVerb = async (verb) => {
    // console.log(verb)
    const { data } = await axios.delete(`/api/verb/${verb.verbId}`);
    return data;
  };
    

// con reactQuery

const eliminarVerb = (currentType) => {
    const queryClient=useQueryClient()

    //esta cosa ya la exporta
    //const { mutate, error, isLoading, isSuccess, reset } = 
    return useMutation(
        deleteVerb,
        {
          //aqui el resultado de hacer un post, el dato que eviamos
          onSuccess: (post) => {
            //cuando de la señal de que todo bien que haga algo
            
            //esto añade el dato a la cache sin hacer validaciones como abajo
            // que no lo añada, quiero editarlo
            // poner el state de los valores del verbo en editVerb y no en panel para que todo se comparta
            // queryClient.setQueryData(["Verbs"],(prevPosts)=>prevPosts.concat(post))
    
            //esto es como para que recargue cuando enviamos algo en posts
            //por si otros usuarios tambien hacen mutation
            queryClient.invalidateQueries([currentType]);
          },
        }
      );
};

export default eliminarVerb; 

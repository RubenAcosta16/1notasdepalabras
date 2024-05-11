import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// };
export const updateGroup = async (verbsIds) => {
  // // console.log("verbs")
  // // console.log(verbsIds.verbsIds)
  // const { data,status } = await axios.put(`/api/verbs/${verbsIds.verbsIds}`);
  console.log(verbsIds)
  console.log(verbsIds.group)
  const group=verbsIds.group

  const { data } = await axios.put(`/api/verbs/${verbsIds.verbsIds}`, {
    group,
  });

  return data;
};

// con reactQuery

const useEditarGroup = (currentType) => {
  const queryClient = useQueryClient();

  //esta cosa ya la exporta
  //const { mutate, error, isLoading, isSuccess, reset } =
  return useMutation(updateGroup, {
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
  });
};

export default useEditarGroup;

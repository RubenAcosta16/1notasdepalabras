import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// };
export const putType = async (type) => {
  const { name, description, typeId, img, hasGroup, validationImg,hasImg } = type;

  // if(validationImg){
  //   console.log("no existe img")
  // } 

  // console.log(type)
  const { data } = await axios.put(`/api/type/${typeId}`, {
    name,
    description,
    typeId,
    // img:"",
    hasGroup,
    hasImg
  });

  if (validationImg) {
    // console.log("no tiene");
    return data;
  } else {
    // console.log("si tiene");
    const { data: dataImg } = await axios.post(`/api/upload`, img, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const urlImg = { img: dataImg.url };
    // console.log(urlImg)

    const { data: dataEdited } = await axios.put(`/api/type/${typeId}`, {
      ...urlImg,
    });
    // console.log(dataEdited)

    return dataEdited;
  }
};

// con reactQuery

const useEditType = () => {
  const queryClient = useQueryClient();

  //esta cosa ya la exporta
  //const { mutate, error, isLoading, isSuccess, reset } =
  return useMutation(putType, {
    //aqui el resultado de hacer un post, el dato que eviamos
    onSuccess: (post) => {
      //cuando de la señal de que todo bien que haga algo

      //esto añade el dato a la cache sin hacer validaciones como abajo
      // que no lo añada, quiero editarlo
      // poner el state de los valores del verbo en editVerb y no en panel para que todo se comparta
      // queryClient.setQueryData(["Verbs"],(prevPosts)=>prevPosts.concat(post))

      //esto es como para que recargue cuando enviamos algo en posts
      //por si otros usuarios tambien hacen mutation
      queryClient.invalidateQueries(["Types"]);
    },
  });
};

export default useEditType;

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// };
export const putVerb = async (verb) => {
  const { name, description, group, verbId, img, validationImg, borrarImg } =
    verb;

  // console.log(verb)
  const { data } = await axios.put(`/api/verb/${verb.verbId}`, {
    name,
    description,
    group,
    verbId,
    // img: "",
  });

  if (borrarImg) {
    const { data } = await axios.put(`/api/verb/${verb.verbId}`, {
      // name,
      // description,
      // group,
      // verbId,
      img: "",
    });
  }

  if (validationImg) {
    // console.log("no tiene");
    return data;
  } else {
    const { data: dataImg } = await axios.post(`/api/upload`, img, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const urlImg = { img: dataImg.url };
    // console.log(urlImg)

    const { data: dataEdited } = await axios.put(`/api/verb/${verb.verbId}`, {
      ...urlImg,
    });
    return dataEdited;
  }


};

// con reactQuery

const editVerb = (currentType) => {
  const queryClient = useQueryClient();

  //esta cosa ya la exporta
  //const { mutate, error, isLoading, isSuccess, reset } =
  return useMutation(putVerb, {
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

export default editVerb;

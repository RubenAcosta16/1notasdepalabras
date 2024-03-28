import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// };
export const postVerb = async (verb) => {
  // console.log(verb)
  const { id, name, userId, img, description, type, group, validationImg } =
    verb;
  const { data } = await axios.post(`/api/verb`, {
    id,
    name,
    userId,
    img: "",
    description,
    type,
    group,
  });

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

    const { data: dataEdited } = await axios.put(`/api/verb/${id}`, {
      ...urlImg,
    });
    return dataEdited;
  }
};
 
// con reactQuery

const CreateVerb = (currentType) => {
  const queryClient = useQueryClient(); 

  //esta cosa ya la exporta
  //const { mutate, error, isLoading, isSuccess, reset } =
  return useMutation(postVerb, {
    //aqui el resultado de hacer un post, el dato que eviamos
    onSuccess: (post) => {
      //cuando de la señal de que todo bien que haga algo

      //esto añade el dato a la cache sin hacer validaciones como abajo
      // queryClient.setQueryData(["Verbs"],(prevPosts)=>prevPosts.concat(post))

      //esto es como para que recargue cuando enviamos algo en posts
      //por si otros usuarios tambien hacen mutation
      queryClient.invalidateQueries([currentType]);
    },
  });
};

export default CreateVerb;

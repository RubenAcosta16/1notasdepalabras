import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// };
export const postType = async (type) => {
  // console.log(type)
  const { id, name, userId, img, description, hasGroup, validationImg } = type;
  // console.log({
  //   id,
  //   name,
  //   userId,
  //   img:"",
  //   description,
  //   hasGroup,
  // })
  // console.log(validationImg)

  const { data } = await axios.post(`/api/type`, {
    id,
    name,
    userId,
    img: "",
    description,
    hasGroup,
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

    const { data: dataEdited } = await axios.put(`/api/type/${id}`, {
      ...urlImg,
    });
    // console.log(dataEdited)

    return dataEdited;
  }
}; 

// con reactQuery

const createType = () => {
  const queryClient = useQueryClient();

  //esta cosa ya la exporta
  //const { mutate, error, isLoading, isSuccess, reset } =
  return useMutation(postType, {
    //aqui el resultado de hacer un post, el dato que eviamos
    onSuccess: (post) => {
      //cuando de la señal de que todo bien que haga algo

      //esto añade el dato a la cache sin hacer validaciones como abajo
      // queryClient.setQueryData(["Types"],(prevPosts)=>prevPosts.concat(post))

      //esto es como para que recargue cuando enviamos algo en posts
      //por si otros usuarios tambien hacen mutation
      queryClient.invalidateQueries(["Types"]);
    },
  });
};

export default createType;

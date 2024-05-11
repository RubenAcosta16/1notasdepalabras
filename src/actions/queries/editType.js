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
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
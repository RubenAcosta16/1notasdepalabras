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
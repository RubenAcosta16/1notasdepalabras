import axios from "axios";


// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// }; 
export const deleteType = async (properties) => {
    // console.log(verb)
    const { data } = await axios.delete(`/api/type/${properties.typeId}||${properties.userId}||${properties.name}`);
    return data;
  };
    
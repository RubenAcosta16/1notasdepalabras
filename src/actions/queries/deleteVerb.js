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
    
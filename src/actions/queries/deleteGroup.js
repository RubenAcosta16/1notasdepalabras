import axios from "axios";


// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// }; 
export const deleteGroup = async (verbsIds) => {
    // console.log("verbs")
    // console.log(verbsIds.verbsIds)
    const { data,status } = await axios.delete(`/api/verbs/${verbsIds.verbsIds}`);
    // console.log(data,status)
    return data;
  };
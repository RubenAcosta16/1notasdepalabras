import axios from "axios";

// export const postVerb = async (verb) => {
//   const { data } = await axios.get("/api/types/");
//   return data;
// };
export const updateGroup = async (verbsIds) => {
  // // console.log("verbs")
  // // console.log(verbsIds.verbsIds)
  // const { data,status } = await axios.put(`/api/verbs/${verbsIds.verbsIds}`);
  console.log(verbsIds)
  console.log(verbsIds.group)
  const group=verbsIds.group

  const { data } = await axios.put(`/api/verbs/${verbsIds.verbsIds}`, {
    group,
  });

  return data;
};
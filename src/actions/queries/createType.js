import axios from "axios";

export const postType = async (type) => {
    // console.log(type)
    const { id, name, userId, img, description, hasGroup, validationImg,hasImg } = type;
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
  
      const { data: dataEdited } = await axios.put(`/api/type/${id}`, {
        ...urlImg,
      });
      // console.log(dataEdited)
  
      return dataEdited;
    }
  }; 
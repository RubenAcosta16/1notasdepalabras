"use client";
import { useState } from "react";
import Image from "next/image";

import PanelVerbs from "./PanelVerbs";

const EditVerbs = ({ verb}) => {
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(verb.name)
  const [description, setDescription] = useState(verb.description)
  const [group, setGroup] = useState(verb.group)
  const [img, setImg] = useState(verb.img)

  function handleEdit() {
 
  } 
 
  return (
    <li>
      <button onClick={()=>setEdit((state)=>!state)}>Edit</button>

          <p>Name: {name}</p>
          <p>Description: {description}</p>
          <p>Group: {group}</p>
          {img && <Image src={img} alt="img" width={500} height={300} />}


      {edit &&(
        // obviamente esto es un panel ajaj
        <PanelVerbs verbThings={{name, setName,description, setDescription,group, setGroup,img, setImg}} verbId={verb.id}></PanelVerbs>
      )}

      <br />
      <br />
    </li>
  );
};
export default EditVerbs;

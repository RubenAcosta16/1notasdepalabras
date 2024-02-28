"use client";
import { useState } from "react";
import Image from "next/image";

import PanelTypes from "./PanelTypes";

import useCurrentTypeState from "@/hooks/useCurrentTypeState";

const EditTypes = ({ userId, type }) => {
  const { currentType, setCurrentType } = useCurrentTypeState();
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(type.name);
  const [description, setDescription] = useState(type.description);
  const [img, setImg] = useState(type.img);
  const [hasGroup, setHasGroup] = useState(type.hasGroup);

  //   const [group, setGroup] = useState(verb.group)

  function handleEdit() {}

  return (
    <li>
      <button onClick={() => setEdit((state) => !state)}>Edit</button>

      <p>Name: {name}</p>
      <p>Description: {description}</p>
      {/* <p>Group: {group}</p> */}

      {img && <Image src={img} alt="img" width={500} height={300} />}

      <button
        onClick={() => {
          setCurrentType(name);
          console.warn("type changed");
        }}
      >
        Select
      </button>

      <p>{hasGroup ? "has groups" : "no groups"}</p>

      {edit && (
        // obviamente esto es un panel ajaj
        <PanelTypes
          userId={userId} 
          typeThings={{
            name,
            setName,
            description,
            setDescription,
            hasGroup,
            setHasGroup,
            img,
            setImg,
          }}
          typeId={type.id}
        ></PanelTypes>
      )}

      <br />
      <br />
    </li>
  );
};
export default EditTypes;

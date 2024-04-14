"use client";
import { useState } from "react";
import Image from "next/image";

import MyImg from "@/app/components/MyImg";

import { Button } from "@nextui-org/react";

import { LuPencil } from "react-icons/lu";

import PanelVerbs from "./PanelVerbs";

const EditVerbs = ({ verb, refetch }) => {
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(verb.name);
  const [description, setDescription] = useState(verb.description);
  const [group, setGroup] = useState(verb.group);
  const [img, setImg] = useState(verb.img);

  // function handleEdit() {}

  return (
    <li className="relative flex flex-col text-[15px] font-medium ">
      <p className="w-[70%] text-[16px] font-semibold mb-[15px] lg:ml-[90px] break-words">
        {name}
      </p>

      {/* {img && <Image src={img} alt="img" width={500} height={300} />} */}
      <div className="flex flex-col mx-auto">
        <MyImg name={name} img={img} height={125}></MyImg>

        <div className="ml-[5px] pl-[3px]  border-l border-black">
          <p className="ml-[5px] break-words">
            Description: <span className="font-semibold">{description}</span>{" "}
          </p>
          {/* <p className="ml-[5px]">
    Group: <span className="font-semibold break-words">{group}</span>{" "}
  </p> */}
        </div>
      </div>

      {/* <Button onClick={() => setEdit((state) => !state)}>Edit</Button> */}
      <Button
        type="button"
        color="warning"
        size="sm"
        onClick={() => setEdit((state) => !state)}
        className="self-center absolute top-0 right-0 "
      >
        <LuPencil className="inline"></LuPencil>
      </Button>

      {edit && (
        // obviamente esto es un panel ajaj
        <PanelVerbs
          verbThings={{
            name,
            setName,
            description,
            setDescription,
            group,
            setGroup,
            img,
            setImg,
          }}
          verbId={verb.id}
          edit={edit}
          setEdit={setEdit}
          refetch={refetch}
        ></PanelVerbs>
      )}
    </li>
  );
};
export default EditVerbs;

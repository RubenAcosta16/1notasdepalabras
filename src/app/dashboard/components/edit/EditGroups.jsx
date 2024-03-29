"use client";
import EditVerbs from "./EditVerbs";

import PanelEditDash from "@/app/components/PanelEditDash";

import deleteGroup from "@/actions/deleteGroup";
import editGroup from "@/actions/editGroup";

import { useState,useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea, Input, Button } from "@nextui-org/react";

const editGroups = ({ verbGrouped,refetch }) => {
  // const { mutate:mutateDelete, error, isLoading, isSuccess, reset } = deleteGroup(verbGrouped[0].type);
  const [currentType, setCurrentType] = useState({});

  const {
    mutate: mutateEdit,
    // error,
    isLoading: loadingEdit,
    // isSuccess,
    // reset,
  } = editGroup(currentType);


  const {
    mutate: mutateDelete,
    // error,
    // isLoading,
    // isSuccess,
    // reset,
  } = deleteGroup(currentType);

  const [buttonDelete, setButtonDelete] = useState(false);


  const [group, setGroup] = useState(verbGrouped[0].group);

  const [edit, setEdit] = useState(false);


  // console.log(verbGrouped[0].type)

  // useEffect(() => {
  //   if(!edit){
  //     setButtonDelete(true)
  //   }
  // }, [edit])

  async function handleEdit() {
    // console.log(verbGrouped);
    // let arrVerbsIds=[]
    let verbsIds = [];

    for (let i = 0; i < verbGrouped.length; i++) {
      // arrVerbsIds[i]=verbGrouped[i].id
      if (i == verbGrouped.length - 1) {
        verbsIds += verbGrouped[i].id;
      } else {
        verbsIds += verbGrouped[i].id + "||";
      }
    }
    // console.log(verbsIds);
    // verbsIds += "||" + group;

    mutateEdit(
      { verbsIds, group },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("grupo cambiado");
          setEdit(!edit)
          refetch()
        },
      }
    );

    // const { data,status } = await axios.delete(`/api/verbs/${verbsIds}`);
    // console.log(data,status)
  }

  async function handleDelete() {
    // console.log(verbGrouped);
    // let arrVerbsIds=[]
    let verbsIds = [];

    for (let i = 0; i < verbGrouped.length; i++) {
      // arrVerbsIds[i]=verbGrouped[i].id
      if (i == verbGrouped.length - 1) {
        verbsIds += verbGrouped[i].id;
      } else {
        verbsIds += verbGrouped[i].id + "||";
      }
    }
    // console.log(verbsIds);

    mutateDelete(
      { verbsIds },
      {
        onSuccess: () => {
          // setName("");
          // setDescription("");
          // setGroup("");
          console.warn("verbos eliminados");
        },
      }
    );

    // const { data,status } = await axios.delete(`/api/verbs/${verbsIds}`);
    // console.log(data,status)
  }

  return (
    <li
      key={verbGrouped[0].id}
      className=" relative flex flex-col w-full p-10 px-4 gap-[15px] rounded-xl "
      style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)" }}
    >
      <p className="text-[16px] font-semibold text-cyan-600 break-words">
        Grupo: {verbGrouped[0].group ? group : "Sin grupo"}
      </p>

      <Button
        type="button"
        // color="warning"
        // size=""
        onClick={() => setEdit((state) => !state)}
        className="self-center absolute top-0 right-0 p-0 rounded-tl-none rounded-br-none "
      >
        <LuPencil className="inline"></LuPencil>
      </Button>

      {verbGrouped.map((verb) => (
        <EditVerbs key={verb.name} verb={verb} refetch={refetch}></EditVerbs>
      ))}

      <PanelEditDash edit={edit} setEdit={setEdit}>
        <p className="text-[16px] font-semibold mb-[20px]">Editar Grupo</p>

        <Textarea
          variant="underlined"
          label="Grupo:"
          // placeholder="Enter your description"
          className="max-w-xs text-[18px]"
          minRows={3}
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
          }}
        />

        <div
          className={clsx("mt-[30px] flex flex-row justify-between w-full", {
            hidden: buttonDelete === true,
          })}
        >
          <Button
            type="button"
            color="danger"
            className="font-medium flex-wrap"
            onClick={() => setButtonDelete(!buttonDelete)}
          >
            <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button>
          <Button
            type="submit"
            color="success"
            className="font-medium "
            isLoading={loadingEdit}
            onClick={() => handleEdit()}
          >
            Enviar <LuPencil className="inline"></LuPencil>
          </Button>
        </div>

        <div className={clsx("mt-[20px]", { hidden: buttonDelete === false })}>
          <p className="text-[14px] font-medium text-black">
            ¿Estas seguro de eliminar el tipo? tambien se los verbos de este
            tipo
          </p>
          <div className="flex flex-row justify-between mt-[10px]">
            <Button
              size="sm"
              color="danger"
              type="button"
              onClick={() => handleDelete()}
              className="text-[14px] font-medium"
            >
              Si
            </Button>
            <Button
              size="sm"
              color="default"
              type="button"
              onClick={() => setButtonDelete(false)}
              className="text-[14px] font-medium"
            >
              No
            </Button>
          </div>
        </div>
      </PanelEditDash>
    </li>
  );
};

export default editGroups;

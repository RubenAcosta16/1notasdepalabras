"use client";
import EditVerbs from "./EditVerbs";

import PanelEditDash from "@/app/components/PanelEditDash";

import deleteGroup from "@/actions/useDeleteGroup";
import editGroup from "@/actions/useEditGroup";

import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea, Input, Button } from "@nextui-org/react";

import toast from "@/actions/toast/toast";

const EditGroups = ({ verbGrouped, refetch }) => {
  // const { mutate:mutateDelete, error, isLoading, isSuccess, reset } = deleteGroup(verbGrouped[0].type);
  const [currentType, setCurrentType] = useState({});

  const {
    mutate: mutateEdit,
    error: errorEdit,
    isLoading: loadingEdit,
    // isSuccess,
    // reset,
  } = editGroup(currentType);

  const {
    mutate: mutateDelete,
    error: errorDelete,
    // isLoading,
    // isSuccess,
    // reset,
  } = deleteGroup(currentType);

  const [buttonDelete, setButtonDelete] = useState(false);

  const [group, setGroup] = useState(verbGrouped[0].group);

  const [edit, setEdit] = useState(false);

  async function handleEdit() {
    let verbsIds = [];

    for (let i = 0; i < verbGrouped.length; i++) {
      if (i == verbGrouped.length - 1) {
        verbsIds += verbGrouped[i].id;
      } else {
        verbsIds += verbGrouped[i].id + "||";
      }
    }

    mutateEdit(
      { verbsIds, group },
      {
        onSuccess: () => {
          toast("Grupo cambiado");
          setEdit(!edit);
          refetch();
        },
        onError: () => {
          toast(errorEdit.response.data, false);
        },
      }
    );
  }

  async function handleDelete() {
    let verbsIds = [];

    for (let i = 0; i < verbGrouped.length; i++) {
      if (i == verbGrouped.length - 1) {
        verbsIds += verbGrouped[i].id;
      } else {
        verbsIds += verbGrouped[i].id + "||";
      }
    }

    mutateDelete(
      { verbsIds },
      {
        onSuccess: () => {
          toast("Grupo eliminado");
        },
        onError: () => {
          toast(errorDelete.response.data, false);
        },
      }
    );

  }

  return (
    <li
      key={verbGrouped[0].id}
      className=" relative flex flex-col w-full lg:w-[70%] mx-auto p-10 px-4 gap-[15px] rounded-xl "
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
        className="self-center absolute top-0 right-0 p-0 rounded-tl-none rounded-br-none"
      >
        <LuPencil className="inline"></LuPencil>
      </Button>

      {verbGrouped.map((verb) => (
        <EditVerbs key={verb.name} verb={verb} refetch={refetch}></EditVerbs>
      ))}

      <PanelEditDash edit={edit} setEdit={setEdit}>
        <p className="relative flex flex-col items-center w-full gap-[15px] rounded-xl text-[16px] font-semibold mb-[20px]">
          Editar Grupo
        </p>

        <Textarea
          variant="underlined"
          label="Grupo:"
          // placeholder="Enter your description"
          className="w-full lg:w-[500px] mx-auto text-[18px]"
          minRows={3}
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
          }}
        />

        <div
          className={clsx(
            "mt-[30px] flex flex-row justify-between w-full lg:w-[337px] lg:gap-[15px] mx-auto",
            {
              hidden: buttonDelete === true,
            }
          )}
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
            className="font-medium lg:flex-grow"
            isLoading={loadingEdit}
            onClick={() => handleEdit()}
          >
            Enviar <LuPencil className="inline"></LuPencil>
          </Button>
        </div>

        <div
          className={clsx(
            "mt-[20px] w-full lg:w-[337px] lg:gap-[15px] mx-auto",
            { hidden: buttonDelete === false }
          )}
        >
          <p className="text-[14px] font-medium text-black">
            ¿Estas seguro de eliminar el grupo? tambien se los verbos de este
            tipo
          </p>
          <div className="flex flex-row justify-between mt-[10px]">
            <Button
              size="sm"
              color="danger"
              type="button"
              onClick={() => handleDelete()}
              className="text-[14px] font-medium lg:flex-grow"
            >
              Si
            </Button>
            <Button
              size="sm"
              color="default"
              type="button"
              onClick={() => setButtonDelete(false)}
              className="text-[14px] font-medium lg:flex-grow"
            >
              No
            </Button>
          </div>
        </div>
      </PanelEditDash>
    </li>
  );
};

export default EditGroups;

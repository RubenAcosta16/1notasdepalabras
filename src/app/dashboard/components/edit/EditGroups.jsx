"use client";
import EditVerbs from "./EditVerbs";

import deleteGroup from '@/actions/deleteGroup'

import { useState } from "react";
import axios from "axios";
import clsx from "clsx";

const editGroups = ({ verbGrouped }) => {
  const { mutate:mutateDelete, error, isLoading, isSuccess, reset } = deleteGroup(verbGrouped[0].type);

  const [buttonDelete, setButtonDelete] = useState(false);

  const [currentType, setCurrentType] = useState({});


  // useEffect(() => {
  //   async function getType(type) {
  //     const { data } = await axios.delete(`/api/verbs/${params.type_user}`);
  //     console.log("type");
  //     // console.log(data)
  //     setCurrentType(data)
  //     // return data;
  //   }

  //   getType()
  // }, [])

  async function handleDelete() {
    // console.log(verbGrouped);
    // let arrVerbsIds=[]
    let verbsIds = [];

    for (let i = 0; i < verbGrouped.length; i++) {
      // arrVerbsIds[i]=verbGrouped[i].id
      if (i == verbGrouped.length-1) {
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
            console.warn("verbos eliminados")
        },
      }
    )

    // const { data,status } = await axios.delete(`/api/verbs/${verbsIds}`);
    // console.log(data,status)

  }

  return (
    <div className="border border-2 border-black" key={verbGrouped[0].id}>
      Grupo: {verbGrouped[0].group ? verbGrouped[0].group : "Sin grupo"}
      {verbGrouped.map((verb) => (
        <EditVerbs key={verb.name} verb={verb}></EditVerbs>
      ))}
      <button type="button" onClick={() => setButtonDelete(!buttonDelete)}>
        Delete Group
      </button>
      <div className={clsx({ hidden: buttonDelete === false })}>
        ¿Estas seguro de eliminar el tipo? tambien se los verbos de este tipo
        <button type="button" onClick={() => handleDelete()}>
          Si
        </button>
        <button type="button" onClick={() => setButtonDelete(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default editGroups;

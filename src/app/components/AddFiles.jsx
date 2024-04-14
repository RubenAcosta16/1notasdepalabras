import clsx from "clsx";

import { Textarea, Input, Button } from "@nextui-org/react";

import Image from "next/image";

import { CiImageOn } from "react-icons/ci";
// import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

const AddFiles = ({
  getRootProps,
  getInputProps,
  sendImg,
  setSendImg,
  isDragActive,
  img,
}) => {

  return (
    <>
      {/* para mobile */}

      <Button
        color="success"
        type="button"
        {...getRootProps()}
        className="font-medium lg:hidden"
      >
        <input {...getInputProps()} />
        <p className="text-[14px] text-white">
          Añadir archivos <CiImageOn className="text-[20px] inline"></CiImageOn>
        </p>
      </Button>

      <div
        className={clsx(
          "mb-[10px] bg-slate-300 dark:bg-zinc-700 px-5 py-12 rounded-xl flex flex-col justify-center items-center border-2 border-dashed border-slate-500 dark:border-slate-300 hidden lg:block",
          {
            // "line-clamp-2": isDragActive === false,
            "bg-slate-400": isDragActive === true,
          }
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-[14px] text-normal">
          Arrastra para añadir archivos{" "}
          <CiImageOn className="text-[20px] inline"></CiImageOn>, o has click
        </p>
      </div>

      {(img && !sendImg) && (
        <div className="flex flex-col">
          {" "}
          <Image
            src={img}
            alt="Image preview"
            width={500}
            height={500}
            className="w-full object-cover h-[170px] rounded-t-lg"
          />
          {/* <Button
            color="danger"
            variant="solid"
            type="button"
            onClick={() => setSendImg(null)}
          >
            Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button> */}
          <Button
            color="danger"
            className=" font-medium py-2 flex-grow rounded-b-lg rounded-t-none text-[14px] text-white"
            type="button"
            onClick={() => setSendImg(null)}
          >
            {" "}
            Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button>
        </div>
      )}

      {sendImg && (
        <div className="flex flex-col">
          {" "}
          <Image
            src={URL.createObjectURL(sendImg)}
            alt="Image preview"
            width={500}
            height={500}
            className="w-full object-cover h-[170px] rounded-t-lg"
          />
          {/* <Button
            color="danger"
            variant="solid"
            type="button"
            onClick={() => setSendImg(null)}
          >
            Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button> */}
          <Button
            color="danger"
            className=" font-medium py-2 flex-grow rounded-b-lg rounded-t-none text-[14px] text-white"
            type="button"
            onClick={() => setSendImg(null)}
          >
            {" "}
            Limpiar imagen <FaRegTrashAlt className="inline"></FaRegTrashAlt>
          </Button>
        </div>
      )}
    </>
  );
};

export default AddFiles;

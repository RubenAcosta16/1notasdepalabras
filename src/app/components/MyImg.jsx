import { Image } from "@nextui-org/react";

const MyImg = ({ name, img, height, types = false }) => {
  // const height2=`h-[${height}px]`

  return (
    <>
      {" "}
      {img ? (
        <div className="mx-auto">
          <Image
            shadow="md"
            radius="lg"
            // width="100%"
            // alt={item.title}
            src={img}
            alt={name}
            width={220}
            height={height}
            className={`relative w-full mx-auto object-cover h-[${height}px] w-[220px] rounded-xl z-10`}
          />
        </div>
      ) : (
        <>
          {types ? (
            <div
              className={`h-[125px] mx-auto w-[220px] lg:w-full  bg-zinc-300 rounded-xl`}
            ></div>
          ) : (
            <div
              className={`h-[125px] mx-auto w-[220px]  bg-zinc-300 rounded-xl`}
            ></div>
          )}
        </>
      )}
    </>
  );
};

export default MyImg;

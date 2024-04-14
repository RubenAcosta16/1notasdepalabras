import { Image } from "@nextui-org/react";

const MyImg = ({ name, img, height, types = false }) => {
  // const height2=`h-[${height}px]`

  return (
    <>
      {" "}
      {img ? (
        <Image
          shadow="md"
          radius="lg"
          // width="100%"
          // alt={item.title}
          className={`w-full object-cover h-[${height}px] w-[264px] rounded-xl z-10`}
          src={img}
          alt={name}
          width={500}
          height={500}
        />
      ) : (
        <>
          {types ? (
            <div className={`h-[125px] w-full bg-zinc-300 rounded-xl`}></div>
          ) : (
            <div className={`h-[125px] w-[220px] bg-zinc-300 rounded-xl`}></div>
          )}
        </>
      )}
    </>
  );
};

export default MyImg;

import { Image } from "@nextui-org/react";

const MyImg = ({ name,img, height }) => {
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
          className={`w-full object-contain h-[${height}px]  z-10`}
          src={img}  
          alt={name}
          width={500}
          height={500} 
        />
      ) : (
        <div className={`h-[${height}px] w-full bg-zinc-300 rounded-xl`}></div>
      )}
    </>
  );
};
 
export default MyImg;

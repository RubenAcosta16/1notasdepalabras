import Image from "next/image";

const ShowImg = ({ img }) => {
  return (
    <div>
      {img && <Image src={img} alt="img" width={500} height={300} />}
    </div>
  );
};

export default ShowImg;

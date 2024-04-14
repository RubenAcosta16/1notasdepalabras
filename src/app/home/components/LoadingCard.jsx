import { Card, CardBody, CardFooter, Skeleton,Button } from "@nextui-org/react";

const LoadingCard = () => {
  return (
    // <Card
    //   shadow="md"
    //   key="loading"
    //   // isPressable
    //   // onPress={() => console.log("item pressed")}
    //   className="w-[270px] hover:bg-zinc-100 mx-auto"
    // >
    //   <CardBody className="overflow-visible p-0">
    //     <Skeleton className={"h-[200px] w-[300px] rounded-xl"}></Skeleton>
    //   </CardBody>
    //   <CardFooter className="text-small flex flex-col items-start">
    //     <Skeleton className={"h-3 w-10 rounded-xl"}></Skeleton>
    //     {/*
    //   <p className="font-semibold text-[17px] line-clamp-1">
    //     {type.name}
    //   </p> */}

    //     <div className="flex flex-row justify-between w-full mt-1">
    //       <Skeleton className={"h-[40px] w-[150px] rounded-xl"}></Skeleton>
    //       <Skeleton className={"h-[20px] w-[90px] rounded-xl"}></Skeleton>
    //     </div>
    //   </CardFooter>
    // </Card>
    <div className="h-[300px] w-[300px] relative hover:scale-95">
      <div className="">
        <div className="h-[300px] w-[300px] rounded-xl images-empty"></div>
      </div>

      <div className="flex flex-col gap-[10px] absolute bottom-0 left-0 z-10 w-full p-3 ">

        <Skeleton className={"h-[20px] w-[60px] rounded-xl"}></Skeleton>

        <div className="flex flex-row justify-between w-full mt-1">

          <Skeleton className={"h-[15px] w-[40px] rounded-xl"}></Skeleton>

          <Skeleton className={"h-[37px] w-[152px] rounded-full"}></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;

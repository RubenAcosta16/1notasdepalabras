import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import clsx from "clsx";

import { IoIosArrowForward } from "react-icons/io";

const LoadingCard = ({ hasImg }) => {
  return (
    <div>
      {hasImg ? (
        <>
          {" "}
          <Card
            shadow="md"
            // isPressable
            // onPress={() => console.log("item pressed")}
            className="w-[264px] hover:bg-zinc-100"
          >
            <CardBody className="overflow-visible p-0">

              <Skeleton className={"h-[150px] w-[264px] rounded-xl"}></Skeleton>
            </CardBody>
            <CardFooter className="text-small flex flex-col items-start">
              <div
                className="cursor-pointer flex flex-row items-center"
              >
                {/* name */}
                <Skeleton className={"h-[20px] w-[78px] rounded-xl"}></Skeleton>
                <IoIosArrowForward
                  className={"text-[18px] ml-[5px]"}
                />
              </div>

              {/* description */}
              
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          <div
            className="cursor-pointer flex flex-row items-center"
          >
            {/* name */}
            <Skeleton className={"h-[20px] w-[78px] rounded-xl"}></Skeleton>

            <IoIosArrowForward className={"text-[18px] ml-[5px]"} />
          </div>

          {/* description */}
        </>
      )}
    </div>
  );
};

export default LoadingCard;

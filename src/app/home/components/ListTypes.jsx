"use client";
import Link from "next/link";
// import Image from "next/image";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import LoadingCard from './LoadingCard'

import { FaArrowRightLong } from "react-icons/fa6";

import useTypes from "@/hooks/useTypes";
import { useEffect,useState } from "react";

const ListTypes = ({ userId }) => { 
  const { types, isLoading, error, isFetching, refetch } = useTypes(
    userId,
    () => {},
    "",
    false
  );

  const [creatorId, setCreatorId] = useState("")




  //   nose porque tuve que recurrir a esto
  useEffect(() => {
    refetch();
// si al cargar los tipos, si estas cargando los tipos del creador
    if("62291337-2091-411a-b42b-6819d867212d"==userId){
      setCreatorId("crtr")
    }
  }, [userId]);

  // if (isLoading || !userId) {
  //   return <div>Loading...</div>;
  // }

  // console.log(types);

  return (
    <div className="mx-auto">
      {isLoading || !userId ? (
        <LoadingCard></LoadingCard>
      ) : (
        <>
          {types.length === 0 ? (
            "No tienes listas, empecemos creando unas cuantas:"
          ) : (
            <ul className="flex flex-col gap-[15px] mx-auto">
              <p className="font-semibold text-[18px]  mb-[20px] text-zinc-700">
                Listas: {types.length}
              </p>

              {types.map((type) => (
                <li key={type.id} className="mx-auto">
                  {/* <p>{type.name}</p> */}
                  <Link href={`/s/${type.name}$$${creatorId}`}>
                    <Card
                      shadow="md"
                      key={type.name}
                      // isPressable
                      // onPress={() => console.log("item pressed")}
                      className="w-[270px] hover:bg-zinc-100"
                    >
                      <CardBody className="overflow-visible p-0">
                        {type.img ? (
                          <Image
                            shadow="md"
                            radius="lg"
                            // width="100%"
                            // alt={item.title}
                            className="w-full object-cover h-[200px]  z-10"
                            src={type.img}
                            alt={type.name}
                            width={500}
                            height={500}
                          />
                        ) : (
                          <div className="h-[200px] w-[300px] bg-zinc-300 rounded-xl"></div>
                        )}
                      </CardBody>
                      <CardFooter className="text-small flex flex-col items-start">
                        <p className="font-semibold text-[17px] line-clamp-1">
                          {type.name}
                        </p>

                        <div className="flex flex-row justify-between w-full mt-1">
                          <p className="w-[160px] font-medium text-[14px] text-zinc-500 line-clamp-2 hover:line-clamp-none">
                            {type.description}
                          </p>
                          <p className="font-semibold text-[14px] text-emerald-600">
                            View Type{" "}
                            <FaArrowRightLong className="inline ml-3" />
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ListTypes;

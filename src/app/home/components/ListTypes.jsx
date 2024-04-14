"use client";
import Link from "next/link";
// import Image from "next/image";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

import LoadingCard from "./LoadingCard";

import { FaArrowRightLong } from "react-icons/fa6";

import useTypes from "@/hooks/useTypes";
import { useEffect, useState } from "react"; 

const ListTypes = ({ userId }) => {
  const { types, isLoading, error, isFetching, refetch } = useTypes(
    userId,
    () => {},
    "",
    false
  );

  const [creatorId, setCreatorId] = useState("");

  //   nose porque tuve que recurrir a esto
  useEffect(() => {
    refetch();
    // si al cargar los tipos, si estas cargando los tipos del creador
    if ("62291337-2091-411a-b42b-6819d867212d" == userId) {
      setCreatorId("crtr");
    }
  }, [userId]);

  // if (isLoading || !userId) {
  //   return <div>Loading...</div>;
  // }

  // console.log(types);

  return (
    <div className="mx-auto">
      {isLoading || !userId ? (
        <div className="flex flex-col gap-[25px] mx-auto md:grid md:grid-cols-2 lg:grid-cols-3">
          <LoadingCard></LoadingCard>
          <LoadingCard></LoadingCard>
          <LoadingCard></LoadingCard>
        </div>
      ) : (
        <>
          {types.length == 0 ? (
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <p className="text-[16px]">
                No tienes listas, empecemos creando unas cuantas:
              </p>
              <Button type="button" color="primary">
                <Link
                  href="/dashboard"
                  className="text-[16px]  tracking-tighter relative font-semibold"
                >
                  Crear Listas
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-[15px]">
              <p className="font-semibold text-[18px]  mb-[20px] text-normal md:text-center md:text-[20px]">
                Listas: {types.length}
              </p>

              <div className="flex flex-col gap-[25px] mx-auto md:grid md:grid-cols-2 lg:grid-cols-3">
                {" "}
                {types.map((type) => (
                  <ul key={type.id} className="mx-auto">
                    {/* <p>{type.name}</p> */}
                    <Link href={`/s/${type.name}$$${creatorId}`}>
                      {/* <Card
                        shadow="md"
                        key={type.name}
                        // isPressable
                        // onPress={() => console.log("item pressed")}
                        className="w-[270px] hover:bg-zinc-200"
                      >
                        <CardBody className="overflow-visible p-0">
                          {type.img ? (
                            <Image
                              shadow="md"
                              radius="lg"
                              // width="100%"
                              // alt={item.title}
                              className="w-full object-cover h-[200px]  z-10  rounded-b-none"
                              src={type.img}
                              alt={type.name}
                              width={500}
                              height={500}
                            />
                          ) : (
                            <div className="h-[200px] w-[300px] bg-zinc-300 rounded-xl rounded-b-none"></div>
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
                      </Card> */}

                      <div className="h-[300px] w-[300px] relative hover:scale-95">
                        {type.img ? (
                          <div className="">
                            <Image
                              shadow="md"
                              radius="lg"
                              // width="100%"
                              // alt={item.title}
                              className="w-full object-cover h-[300px]    "
                              src={type.img}
                              alt={type.name}
                              width={300}
                              height={300}
                            />
                          </div>
                        ) : (
                          <div className="h-[300px] w-[300px] images-empty rounded-xl "></div>
                        )}

                        <div className="flex flex-col gap-[10px] absolute bottom-0 left-0 z-10 w-full p-3 ">
                          <p
                            className="font-medium text-[17px] line-clamp-1 text-white"
                            style={{
                              textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
                            }}
                          >
                            {type.name}
                          </p>

                          <div className="flex flex-row justify-between w-full mt-1">
                            <p
                              className="w-[160px] font-medium text-[14px] text-white line-clamp-1 hover:line-clamp-none"
                              style={{
                                textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
                              }}
                            >
                              {type.description}
                            </p>
                            <Button
                              color="success"
                              variant="ghost"
                              className="font-semibold text-[14px] text-white w-[160px]"
                              style={{
                                textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
                              }}
                            >
                              Ver tipo{" "}
                              <FaArrowRightLong className="inline ml-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ul>
                ))}
              </div>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ListTypes;

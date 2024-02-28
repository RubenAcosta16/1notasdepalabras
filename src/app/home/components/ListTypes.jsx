"use client";
import Link from "next/link";
import Image from "next/image";

import useTypes from "@/hooks/useTypes";
import { useEffect } from "react";
const ListTypes = ({ userId }) => {
  const { types, isLoading, error, isFetching, refetch } = useTypes(
    userId,
    () => {},
    "",
    false
  );

  //   nose porque tuve que recurrir a esto
  useEffect(() => {
    refetch();
  }, [userId]);

  if (isLoading || !userId) {
    return <div>Loading...</div>;
  }

  // console.log(types);

  return (
    <div>
      {types.length === 0
        ? "Sin tipos"
        : types.map((type) => (
            <li key={type.id}>
              {/* <p>{type.name}</p> */} 
              <Link href={`/s/${type.name}`}>
                <p>{type.name}</p>
                <p>{type.description}</p>
                {type.img && (
                  <Image
                    src={type.img}
                    alt={type.name}
                    width={500}
                    height={300}
                  />
                )}
              </Link>
            </li>
          ))}
    </div>
  );
};

export default ListTypes;

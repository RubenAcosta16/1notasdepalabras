"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import ShowVerbs from "./components/showVerbs";
import axios from "axios";
import { useEffect, useState } from "react";

import { useTitle } from "react-use";

import { Noto_Sans_Cham, Quicksand } from "next/font/google";



const noto_Sans_Cham = Noto_Sans_Cham({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Page = ({ params }) => {
  // console.log(params.type_user);

  const newParams = params.type_user.split("%24%24");
  const typeUser = newParams[0];
  const idGet = newParams[1];
  // console.log(typeUser);
  // console.log(idGet);

  const { currentUser, status } = useCurrentUser();
  const [currentType, setCurrentType] = useState({});

  useEffect(() => {
    async function getType(type) {
      if (idGet == "") {
        // c&34at0%or
        // console.log("vacio")
        const { data } = await axios.get(
          `/api/type/${typeUser}$$${currentUser.id}`
        );
        // console.log("type");
        // console.log(data)
        setCurrentType(data);
        // return data;
      } else {
        // console.log("algo")
        const { data } = await axios.get(
          `/api/type/${typeUser}$$62291337-2091-411a-b42b-6819d867212d`
        );
        // console.log("type");
        // console.log(data)
        setCurrentType(data);
        // return data;
      }
    }

    getType();
  }, []);

  if (!currentType) return <div>El tipo no existe</div>;

  if (!status == "authenticated") {
    return <div>loading...</div>;
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }
  //   console.log(currentUser.id)

  // useTitle(currentType.name);

  return (
    // <Slider></Slider>
    <div className={`${quicksand.className} relative font-medium mt-[-56px] `}>
      {/* <svg  className="absolute top-[-13px] left-0 fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F5F9"
          fill-opacity="1"
          d="M0,96L34.3,106.7C68.6,117,137,139,206,133.3C274.3,128,343,96,411,101.3C480,107,549,149,617,165.3C685.7,181,754,171,823,170.7C891.4,171,960,181,1029,154.7C1097.1,128,1166,64,1234,64C1302.9,64,1371,128,1406,160L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg> */}

      

      <ShowVerbs currentType={currentType}></ShowVerbs>
    </div>
  );
};

export default Page;

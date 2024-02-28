"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import ShowVerbs from "./components/showVerbs";
import axios from "axios";
import { useEffect,useState } from "react";

const page = ({ params }) => {
//   console.log(params.type_user)
  const { currentUser, status } = useCurrentUser();
  const [currentType, setCurrentType] = useState({})

  useEffect(() => {
    async function getType(type) {
      const { data } = await axios.get(`/api/type/${params.type_user}`);
      // console.log("type");
      // console.log(data)
      setCurrentType(data)
      // return data;
    }

    getType()
  }, [])

  if (!currentType) return <div>El tipo no existe</div>;

  if (!status == "authenticated") {
    return <div>loading...</div>;
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }
//   console.log(currentUser.id)

  return (
    <div>
        
      <ShowVerbs userId={currentUser.id} currentType={currentType}></ShowVerbs>
    </div>
  );
}; 

export default page;

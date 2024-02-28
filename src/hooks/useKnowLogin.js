import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

async function useKnowLogin(){
    const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      async function si(){
        if(status=="authenticated"){
          router.push("/")
          // console.log("object")
        }
      }
      si()
    }, [status]);
}

export default useKnowLogin
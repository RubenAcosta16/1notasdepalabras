"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useKnowLogin from '@/hooks/useKnowLogin'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SocialButton from './components/auth/SocialButton'


const page = ({pageAction="register"}) => {
  useKnowLogin()
  // console.log(pageAction)
  const [action, setAction] = useState(pageAction);
  // const { data: session, status } = useSession();
  // const router = useRouter();


  // const { data: session, status } = useSession();
  // console.log(action);
  return (
    <div>
      <h1>Notas de Palabras</h1>

      {/* auth */}
      <div>
        <div>
        {action == "register" ? (
            <Register></Register>
          ) : (
            <Login></Login>
          )}
        </div>

        <div>
          {action == "register" ? (
            <div className="">
              <p>Do you have an account?</p>
              <button className="bg-slate-400" onClick={()=>{setAction("login")}}>Login</button>
            </div>
          ) : (
            <div className=""><p>Are you new?</p>
            <button className="bg-slate-400" onClick={()=>{setAction("register")}}>Register</button></div>
          )}
        </div>
        <div>
          <p>Or continue with:</p>
          <SocialButton action="google" buttonCode={(<div>Login with Google</div>)}></SocialButton>
        </div>
      </div>
    </div>
  );
};

export default page;

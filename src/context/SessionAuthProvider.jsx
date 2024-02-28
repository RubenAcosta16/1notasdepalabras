"use client";

import { SessionProvider } from "next-auth/react";

// interface Props{
//     children:React.ReactNode
// }

const SessionAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;

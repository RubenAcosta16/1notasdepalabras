"use client";
import { signOut, useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

const Navbar = () => {
  const { status } = useSession();
  const { currentUser } = useCurrentUser();
  // console.log(session);
  // console.log(status);
  return (
    <nav>
      {/* poner loading del status */}
      <ul className="flex flex-row">
        {status == "authenticated" && (
          <li onClick={async () => await signOut()}>Sign Out</li>
        )}

        {status == "authenticated" ? (
          <>
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>{currentUser.username}</li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/editprofile">Edit profile</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
        )}

        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;

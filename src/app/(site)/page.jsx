"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import Link from "next/link";
 


const page = () => {

  return ( 
    <div>
      <h1>Notas de Palabras</h1>
      <Link href={`/home`}>Go to home</Link>
      <br /><br /><br /><br /><br /><br />

      <h2>Aqui debe de ir la presentacion de la pagina y un link al home</h2>

      <ul>
        <li>https://nextui.org/docs/customization/layout</li>
        <li>https://fkhadra.github.io/react-toastify/introduction/</li>
        <li>https://www.framer.com/motion/</li>
        <li>https://chakra-ui.com/docs/components/button/usage</li>
        <li>usar autoanimate y react-magic-motion</li>
        <li>inspiracion: busca ese link en notas ajaj</li>
      </ul>
    </div> 
  );
};

export default page;
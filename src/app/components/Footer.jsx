import Link from "next/link";

const Footer = () => {
  return (
      <ul className="relative bg-zinc-600 text-white text-[13px] w-auto flex flex-col justify-center mx-auto p-4">
        <li>
          <span className="text-zinc-300">Creador:</span> Ruben Acosta
        </li>
        <li>
          <Link href="https://rubenacosta.vercel.app/" className="hover:border-b" target="_blank">
            Web Portafolio
          </Link>
        </li>
        <li>
          <span className="text-zinc-300">Contacto: </span>
           1511ruben@gmail.com
        </li>
      </ul>
  );
};

export default Footer;

import { useState, useEffect, useMemo } from "react";

// con reactQuery

const useGroupVerbs = (verbs) => {
//   const [verbsG, setVerbsG] = useState([]);
  // return verbs

  // Supongamos que tienes un arreglo llamado 'verbs' con objetos que tienen una propiedad 'group'
  if (verbs == undefined || verbs.lenght == 0) {
    return [];
  }

  //   // Usando el método reduce para agrupar objetos por 'group'
  //   let verbsGrouped = verbs.reduce((acumulador, objeto) => {
  //     // Verificamos si ya hay un arreglo para el grupo actual
  //     if (!acumulador[objeto.group]) {
  //         // Si no existe, creamos un arreglo vacío para ese grupo
  //         acumulador[objeto.group] = [];
  //     }
  //     // Agregamos el objeto al arreglo del grupo correspondiente
  //     acumulador[objeto.group].push(objeto);
  //     return acumulador;
  // }, {});

  //   // verbsGrouped contendrá un objeto donde las claves son los grupos y los valores son los arreglos de objetos pertenecientes a ese grupo
  //   // console.log(verbsGrouped);

  const grupos = verbs.reduce((acumulador, objeto) => {
    // Verificamos si ya hay un arreglo para el grupo actual
    if (!acumulador[objeto.group]) {
      // Si no existe, creamos un arreglo vacío para ese grupo
      acumulador[objeto.group] = [];
    }
    // Agregamos una copia del objeto al arreglo del grupo correspondiente
    acumulador[objeto.group].push({ ...objeto });
    return acumulador;
  }, {});

  // // Convertimos el objeto a un arreglo de arreglos
  const arregloDeArreglos = Object.values(grupos);
//   setVerbsG(arregloDeArreglos);

  //   return useMemo(() => doArrays(verbs), [verbs]);
  return arregloDeArreglos;
};

export default useGroupVerbs;

// puede servir de la pagina anterior

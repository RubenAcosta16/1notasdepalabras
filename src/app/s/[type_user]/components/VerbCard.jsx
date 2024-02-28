import ShowImg from "./ShowImg";

const VerbCard = ({ verb, functionNav }) => {
  return (
    <div>
      {(functionNav == "Normal" ||
        functionNav == "Aleatorio" ||
        functionNav === "VerbsPorFecha") && (
        <>
          <p>Name: {verb.name}</p>
          <p>Description: {verb.description}</p>
          {/* <p>Group: {verb.group}</p> */}
          <ShowImg img={verb.img}></ShowImg>
        </>
      )}

      {(functionNav == "Significados" ||
        functionNav == "SignificadosAleatorio") && (
        <>
          <p>Name: {verb.description}</p>
          <p>Description: {verb.name}</p>
          {/* <p>Group: {verb.group}</p> */}
          <ShowImg img={verb.img}></ShowImg>
        </>
      )}
    </div>
  );
};
export default VerbCard;

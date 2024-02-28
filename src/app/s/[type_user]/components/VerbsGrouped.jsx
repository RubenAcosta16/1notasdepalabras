import ShowImg from './ShowImg'
import VerbCard from './VerbCard'

const VerbsGrouped = ({ verbGrouped, functionNav }) => {
  // console.log("verbGrouped")
  // console.log(verbGrouped)
  return (
    <div>
      {functionNav == "Normal" || functionNav == "Significados" ? (
        <>
          Grupo: {verbGrouped[0].group ? verbGrouped[0].group : "Sin grupo"}
          {verbGrouped.map((verb) => (
            <div>
              <VerbCard key={verb.id} verb={verb} functionNav={functionNav}></VerbCard>

              <br />
            </div>
          ))}
          <br />
          <br />
          <br />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default VerbsGrouped;

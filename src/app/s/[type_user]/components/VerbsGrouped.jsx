import ShowImg from "./ShowImg";
import VerbCard from "./VerbCard";

const VerbsGrouped = ({ verbGrouped, functionNav,hasImg }) => {
  // console.log("verbGrouped")
  // console.log(verbGrouped)
  // const i=1
  return (
    <li>
      {functionNav == "Normal" || functionNav == "Significados" ? (
        <>
          <p className="text-[20px] text-normal font-bold">
            Grupo: {verbGrouped[0].group ? verbGrouped[0].group : "Sin grupo"}
          </p>
          <ul className="flex flex-col gap-[5px] border-l border-zinc-600 ml-[6px] mt-[10px]">
            {verbGrouped.map((verb,index) => (
              <VerbCard
                key={verb.id}
                verb={verb}
                functionNav={functionNav}
                hasImg={hasImg}
                index={index}
              ></VerbCard>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </li>
  );
};

export default VerbsGrouped;

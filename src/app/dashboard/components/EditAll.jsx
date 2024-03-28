import ListVerbs from "./ListVerbs";
import ListTypes from "./ListTypes";

const EditAll = ({userId}) => {
  // console.log(userId)

  // error en el contact createVerbs.js
  // console.log(userId);
  if (!userId) {
    return (
      <div>
        Loading...
      </div>
    ); 
  }

  return (
    <div>
    {/* validar si estan vacios */}

      ya los imprime aunque sin nada en especial
      <ListVerbs  userId={userId}></ListVerbs>
      <ListTypes userId={userId}></ListTypes>
    </div>
  );
};

export default EditAll;

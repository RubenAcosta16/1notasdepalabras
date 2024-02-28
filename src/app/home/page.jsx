"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import ListTypes from "./components/ListTypes";

const Page = () => {
  const { currentUser, status } = useCurrentUser();



  if (status=="loading") {
    return (
      <div>
        Loading...
      </div>
    );
  }

  // // Manejar el estado de carga inicial
  // if (status === "loading" || isLoading||isFetching) {
  //   return <div>Loading...</div>;
  // }

  // // Asegurarse de que 'types' esté definido antes de usarlo
  // if (!types||!currentUser) {
  //   return <div>No types found</div>;
  // }

  // console.log("Types:", types);

  return (
    <div>
      <h1>Home</h1>
      <p>
        Hola <span>{currentUser.username}</span>
      </p>
      <div>
        <p>Mis tipos:</p>

              <ListTypes userId={currentUser.id}></ListTypes>
      </div>
    </div>
  );
};

export default Page;
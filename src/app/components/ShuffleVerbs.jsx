// import  { useRef, useState } from "react";
// import { MagicMotion } from "react-magic-motion";

// import VerbCard from "@/app/s/[type_user]/components/VerbCard";

// function shuffle(array) {
//   let currentIndex = array.length;
//   let temporaryValue;
//   let randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

// function TodoListItem({ todo, setTodos }) {
//   return (
//     <li
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         lineHeight: "2rem",
//         padding: "0.35rem 1rem",
//         backgroundColor: "rgb(239 239 239 / 70%)",
//       }}
//     >
//       {todo.text}
//       <button
//         type="button"
//         title="Delete this item"
//         onClick={() =>
//           setTodos((todos) => todos.filter((t) => t.id !== todo.id))
//         }
//       >
//         🗑️
//       </button>
//     </li>
//   );
// }

// export default function TodoList({verbs,functionNav,hasImg}) {
//   const [todos, setTodos] = useState([...verbs]);

//   const newTodoInput = useRef(null);

//   return (
//     <MagicMotion>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1.5rem",
//           marginTop: "1rem",
//         }}
//       >
//         <ul
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "0.75rem",
//             overflow: "hidden",
//           }}
//         >
//           {todos.map((todo,index) => (
//             // <TodoListItem key={todo.id} todo={todo} setTodos={setTodos} />
//             <VerbCard
//             key={todo.id}
//             verb={todo}
//             functionNav={functionNav}
//             hasImg={hasImg}
//             index={index}
//           ></VerbCard>
//           ))}
//         </ul>
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           style={{ display: "flex", gap: "1rem" }}
//         >
//           <input
//             ref={newTodoInput}
//             type="text"
//             placeholder="Write a new todo 📝"
//             style={{
//               padding: "0.5rem 1rem",
//               border: "none",
//               borderRadius: "0.25rem",
//               width: "100%",
//               backgroundColor: "rgb(239 239 239)",
//             }}
//           />

//           <button
//             type="submit"
//             title="Add a new todo"
//             style={{
//               whiteSpace: "nowrap",
//               padding: "0.5rem 1rem",
//               backgroundColor: "#5a70ed",
//               color: "#ffffff",
//             }}
//             onClick={() => {
//               if (!newTodoInput.current?.value) return;
//               setTodos([
//                 ...todos,
//                 {
//                   id: crypto.randomUUID(),
//                   text: newTodoInput.current.value,
//                 },
//               ]);
//               newTodoInput.current.value = "";
//             }}
//           >
//             Add Todo
//           </button>

//           <button
//             type="submit"
//             title="Shuffle Items"
//             style={{
//               whiteSpace: "nowrap",
//               padding: "0.5rem 1rem",
//               backgroundColor: "#eac530",
//               color: "#ffffff",
//             }}
//             onClick={() => setTodos(shuffle([...verbs]))}
//           >
//             🔀
//           </button>
//         </form>
//       </div>
//     </MagicMotion>
//   );
// }
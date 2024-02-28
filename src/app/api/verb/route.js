import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import Verb from "@/models/Verb";

// export async function GET(request) {
//     // console.log("params")
//     console.log(params.id)
//   await dbConnect();
//   const userFound = await User.findOne({ email: params.id });
//   console.log(userFound)
//   return NextResponse.json(userFound);
// }

export async function POST(request) {
  const body = await request.json();
  dbConnect();

  try {
    // const verbs = await Verb.find({
    //   userId: userId,
    //   type: typeName,
    // });

    // poner coincidencia mismo verbo en el mismo grupo y tipo

    const verbFound = await Verb.findOne({
      name: body.name,
      group: body.group,
      type: body.type,
    });
    // console.log("verbFound");
    // console.log(verbFound);
    // console.log(body);
    // console.log(verbFound.name==body.name||verbFound.group==body.group||verbFound.type==body.type)
    if(verbFound){
      // return NextResponse.json({error:"Ya existe un verbo con el mismo nombre, grupo y tipo."});
      throw new Error("Ya existe un verbo con el mismo nombre, grupo y tipo.");
    }

    const newVerb = new Verb(body);

    const savedVerb = await newVerb.save();
 
    return NextResponse.json(savedVerb);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

// realmente solo puedo enviar lo que quiero actualizar y ya jaja
// export async function PUT(request) {
//     const body = await request.json();
//     dbConnect();

//     try {
//       const userUpdated = await Verb.findOneAndUpdate({ id: params.id }, body, {
//         new: true,
//       });

//       if (!userUpdated)
//         return NextResponse.json(
//           {
//             message: "User not found",
//           },
//           {
//             status: 404,
//           }
//         );

//       return NextResponse.json(userUpdated);
//     } catch (error) {
//       return NextResponse.json(error.message, {
//         status: 400,
//       });
//     }
//   }

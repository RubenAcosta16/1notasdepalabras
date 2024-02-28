import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import Type from "@/models/Type";

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
    

    const typeFound = await Type.findOne({
      name: body.name,
    });
    // console.log("verbFound");
    // console.log(verbFound);
    // console.log(body);
    // console.log(verbFound.name==body.name||verbFound.group==body.group||verbFound.type==body.type)
    if(typeFound){
      // return NextResponse.json({error:"Ya existe un verbo con el mismo nombre, grupo y tipo."});
      throw new Error("Ya existe un tipo igual");
    }
 
    const newType = new Type(body);

    const savedType = await newType.save();

    return NextResponse.json(savedType);
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

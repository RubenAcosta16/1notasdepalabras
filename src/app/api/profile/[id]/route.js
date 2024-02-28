import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";

export async function GET(request,{params}) {
    // console.log("params")
    // console.log(params.id)
  await dbConnect();
  const userFound = await User.findOne({ email: params.id });
  // console.log(userFound)
  return NextResponse.json(userFound);
}


// realmente solo puedo enviar lo que quiero actualizar y ya jaja
export async function PUT(request, { params }) {
    const body = await request.json();
    dbConnect();
  
    try {
      const userUpdated = await User.findOneAndUpdate({ id: params.id }, body, {
        new: true,
      });
  
      if (!userUpdated)
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(userUpdated);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
  
//   export async function DELETE(request, { params }) {
//     dbConnect();
  
//     try {
//       const taskDeleted = await Task.findByIdAndDelete(params.id);
  
//       if (!taskDeleted)
//         return NextResponse.json(
//           {
//             message: "Task not found",
//           },
//           {
//             status: 404,
//           }
//         );
  
//       return NextResponse.json(taskDeleted);
//     } catch (error) {
//       return NextResponse.json(error.message, {
//         status: 400,
//       });
//     }
//   }
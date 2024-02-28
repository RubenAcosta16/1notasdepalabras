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


// export async function POST(request) {
//     const body = await request.json();
//     dbConnect();
  
//     try {

//         // poner coincidencia mismo verbo en el mismo grupo y tipo

//     //   const userUpdated = await Verb.findOneAndUpdate({ id: params.id }, body, {
//     //     new: true,
//     //   });

//     const newVerb = new Verb(body);

//     const savedVerb = await newVerb.save();
  
//       return NextResponse.json(savedVerb);
//     } catch (error) {
//       return NextResponse.json(error.message, {
//         status: 400,
//       });
//     }
//   }


//realmente solo puedo enviar lo que quiero actualizar y ya jaja
export async function PUT(request,{params}) {
  // console.log("id")
  const verbId=params.verbId
    const body = await request.json();
    dbConnect();
  
    try {
      const verbUpdated = await Verb.findOneAndUpdate({ id: verbId }, body, {
        new: true,
      });
  
      if (!verbUpdated)
        return NextResponse.json(
          {
            message: "Verb not found",
          },
          { 
            status: 404,
          }
        );
  
      return NextResponse.json(verbUpdated);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }




export async function DELETE(request,{params}) {
  const verbId=params.verbId
  // console.log("id")
  // console.log(verbId)
    // const body = await request.json();
    dbConnect();
  
    try {
      const verbUpdated = await Verb.findOneAndDelete({ id: verbId });
  
      if (!verbUpdated)
        return NextResponse.json(
          {
            message: "Verb not found",
          },
          { 
            status: 404,
          }
        );
  
      return NextResponse.json(verbUpdated);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
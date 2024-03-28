import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import Type from "@/models/Type";
import Verb from "@/models/Verb";

// lo estoy usando en el showVerbs para comprobar si el type es con o sin grupos
export async function GET(request, { params }) {
  console.log("params")
  console.log(params)


  const newParams = params.typeId.split("$$");
  const typeUser = newParams[0];
  const idGet = newParams[1];
  // console.log(typeUser);
  // console.log(idGet);


  await dbConnect();
  const typeFound = await Type.findOne({ name: typeUser,userId:idGet });
  // console.log("object")
  // console.log(typeFound)
  return NextResponse.json(typeFound);
} 

export async function PUT(request, { params }) {
  // console.log("id")
  const typeId = params.typeId; 
  const body = await request.json();
  // console.log("body")
  // console.log(body)
  dbConnect();

  try {
    const oldType = await Type.find({
      id: typeId
    });

    const typeUpdated = await Type.findOneAndUpdate({ id: typeId }, body, {
      new: true,
    });

    console.log("typeUpdated")
    console.log(typeUpdated.userId) 
    console.log(oldType) 



    const verbsNotChanged = await Verb.find({
      userId: typeUpdated.userId,
      type: oldType[0].name,
    });
    console.log("verbs ca,biados")
    console.log(verbsNotChanged)

    console.log("body.name ")
    console.log(body.name)

    let verbsEdited=[]

    for (let i = 0; i < verbsNotChanged.length; i++) {
      // verbsEdited[i] = await Verb.findOneAndUpdate({
      //   // userId: userId,
      //   id: verbsIds[i],
      // });
      verbsEdited[i] = await Verb.findOneAndUpdate({ id: verbsNotChanged[i].id, }, {type:body.name}, {
        new: true,
      });
    }

    // if (verbsEdited.length == 0)
    // return NextResponse.json(
    //   {
    //     message: "Verbs not found",
    //   },
    //   {
    //     status: 404,
    //   }
    // );


    if (!typeUpdated)
      return NextResponse.json(
        {
          message: "Type not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(typeUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  // const typeId = params.typeId;
  // console.log("id")
  // console.log(typeId)
  // const body = await request.json();

  const newParams = params.typeId.split("||");

  const typeId = newParams[0];
  const userId = newParams[1];
  const typeName = newParams[2];

  dbConnect();

  try {

    const verbs = await Verb.find({
      userId: userId,
      type: typeName,
    });
    console.log("verbs para delete");
    // console.log(userId,typeName,);
    // console.log(verbs);

    let deletedArray=[]

    for (let i = 0; i < verbs.length; i++) {
      deletedArray[i] = await Verb.findOneAndDelete({
        // userId: userId,
        id: verbs[i].id,
      });
    }

    // console.log(deletedArray)

    const typeUpdated = await Type.findOneAndDelete({ id: typeId });

    if (!typeUpdated)
      return NextResponse.json(
        {
          message: "Type not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(typeUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

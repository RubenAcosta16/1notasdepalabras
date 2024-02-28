import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import Type from "@/models/Type";
import Verb from "@/models/Verb";

// lo estoy usando en el showVerbs para comprobar si el type es con o sin grupos
export async function GET(request, { params }) {
  // console.log("params")
  // console.log(params.id)
  await dbConnect();
  const typeFound = await Type.findOne({ name: params.typeId });
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
    const typeUpdated = await Type.findOneAndUpdate({ id: typeId }, body, {
      new: true,
    });

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

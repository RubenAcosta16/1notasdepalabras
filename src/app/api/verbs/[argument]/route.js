import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import Verb from "@/models/Verb";

export async function GET(request, { params }) {
  // console.log("params")
  // console.log(params.argument)
  // console.log("yooo")
  // console.log("yooo")
  const newParams = params.argument.split("||");

  const userId = newParams[0];
  const type = newParams[1];
  // console.log("type")
  // console.log(type)

  await dbConnect();
  const VerbsFound = await Verb.find({
    userId: userId,
    type: type,
  });
  // console.log(VerbsFound)
  return NextResponse.json(VerbsFound);
}

// aqui es para borrar los groups
export async function PUT(request, { params }) {
  const verbsIds = params.argument.split("||");

  await dbConnect();

  const body = await request.json();

  // const verbsIds=body.verbsIds
  // const group=body.group
  // const verbsIdsSplit=body.verbsIds.split("||")

  console.log("verbsIds");
  console.log(verbsIds);
  console.log(body.group);

  let verbsEdited = [];

  for (let i = 0; i < verbsIds.length; i++) {
    // verbsEdited[i] = await Verb.findOneAndUpdate({
    //   // userId: userId,
    //   id: verbsIds[i],
    // });
    verbsEdited[i] = await Verb.findOneAndUpdate(
      { id: verbsIds[i] },
      { group: body.group },
      {
        new: true,
      }
    );
  }

  if (verbsEdited.length == 0)
    return NextResponse.json(
      {
        message: "Verbs not found",
      },
      {
        status: 404,
      }
    );

  return NextResponse.json(verbsEdited);
}

// aqui es para borrar los groups
export async function DELETE(request, { params }) {
  const verbsIds = params.argument.split("||");

  await dbConnect();

  // console.log("verbsIds")
  // console.log(params.argument)

  let verbsDeleted = [];

  for (let i = 0; i < verbsIds.length; i++) {
    verbsDeleted[i] = await Verb.findOneAndDelete({
      // userId: userId,
      id: verbsIds[i],
    });
  }

  if (verbsDeleted.length == 0)
    return NextResponse.json(
      {
        message: "Verbs not found",
      },
      {
        status: 404,
      }
    );

  return NextResponse.json(verbsDeleted);
}

import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import Type from "@/models/Type";

export async function GET(request,{params}) { 
    // console.log("params")
    // console.log(params.argument)
    // console.log("yooo")
    // console.log("yooo")
    // const newParams=params.argument.split("||")

    const userId=params.argument
    // const type=newParams[1]

  await dbConnect();
  const TypesFound = await Type.find({
    userId: userId,
  });
  // console.log(TypesFound)
  return NextResponse.json(TypesFound);
}
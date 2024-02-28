import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";
import {hash} from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { data } from "autoprefixer";

// export async function GET() {
//   await dbConnect();
//   const userFound = await User.findOne({ email: "1511ruben@gmail.com" });
//   console.log(userFound)
//   return NextResponse.json(userFound);
// }

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();

    // by email
      const userFound = await User.findOne({ email: body.email });
      // console.log(userFound)
    
      // by username
      const usernameFound = await User.findOne({ username: body.username });
     
      if (userFound) {
        return NextResponse.json(
          {
            message: "Email already exists",
            ok:false
          },
          {
            status: 400,
          }
        );
      }
      if (usernameFound) {
        return NextResponse.json(
          { message: "El username ya existe",
          ok:false },
          { status: 400 }
        );
      }

    const hashedPassword=await hash(body.password,10)
    

    const hashedUser={
      id:uuidv4(),
      username: body.username,
      email: body.email,
      password: hashedPassword,
      provider:"credentials"
    }

    const newUser = new User(hashedUser);
    // const userFound = await newUser.findOne({ email: data.email });
    //   if (userFound) {
    //     return NextResponse.json(
    //       { message: "El usuario ya existe" },
    //       { status: 400 }
    //     );
    //   }


    const savedUser = await newUser.save();
    // console.log(body)
    const {password:_,...user}=savedUser

    // console.log(body.email)

    return NextResponse.json(user);
    // return NextResponse.json({"mess":"si"});
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}


// export async function POST(request) {
//   const data = await request.json();

// // // by email
// //   const userFound = await User.findOne({ email: data.email });

// // //   by username
// //   const usernameFound = await User.findOne({ username: data.username });

// //   if (userFound) {
// //     return NextResponse.json(
// //       { message: "El usuario ya existe" },
// //       { status: 400 }
// //     );
// //   }
// //   if (usernameFound) {
// //     return NextResponse.json(
// //       { message: "El username ya existe" },
// //       { status: 400 }
// //     );
// //   }

// //   const newUser = new User(data);
// //   const savedUser = await newUser.save();

// //   return NextResponse.json(savedUser);

// console.log(data)
// }

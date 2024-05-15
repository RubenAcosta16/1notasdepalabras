import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

import { compare } from "bcrypt";

import User from "@/models/User";
import { dbConnect } from "@/utils/mongoose";

//34:20

let globalUser = {};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        await dbConnect();

        // consultar a la base de datos
        const userFound = await User.findOne({ email: credentials.email });
        // console.log("credentials");
        // console.log(credentials);
        // console.log(userFound);

        if (!userFound) {
          throw new Error(
            JSON.stringify({
              message: "No user found",
              ok: false,
            })
          );
        }

        if (userFound.provider !== "credentials") {
          throw new Error(
            JSON.stringify({
              message: "Wrong Provider",
              ok: false,
            })
          );
        }

        const matchPassword = await compare(
          credentials.password,
          userFound.password
        );

        // console.log(matchPassword);

        if (!matchPassword) {
          throw new Error(
            JSON.stringify({
              message: "Wrong password",
              ok: false,
            })
          );
        }
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      }, 
    }),
    // https://console.developers.google.com/apis/credentials
    // https://www.youtube.com/watch?v=YCEnpcCYlyo&t=1047s
    // min 7:14
    // min 10:10 ya dominio de verdad
    GoogleProvider({
      clientId:
      process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // captura la info del usurario y la nutre
    async jwt({ token, user }) {
      token.id = globalUser.id;
      // return { ...token, ...user };
      return token;
    },
    // se lo da al usuario
    // aqui se añaden cosas al user
    async session({ session, token }) {
      session.user = token;
      // console.log("session")
      // console.log(session)
      session.id = token.id;
      return session;
    },
    async signIn({ user, account, profile }) {
      // console.log("credentials trueeeeeeeeeeeee");
      if (account.provider == "credentials") {
        console.log("credentials trueeeeeeeeeeeee");
        return true;
      } else {
        try {
          await dbConnect();
          // console.log("si aparece mame")

          // consultar a la base de datos
          const userFound = await User.findOne({ email: profile.email });

          if (userFound) {
            // console.log(userFound)

            if (userFound.provider !== account.provider) {
              console.log("User has wrong provider");
              // throw new Error("User has wrong provider");
              throw new Error("User already exists");
              // return false
            }
            console.log("user found");
            return true;
          } else {
            const tmpUser = {
              id: uuidv4(),
              username: profile.name,
              email: profile.email,
              image: profile.picture,
              provider: account.provider,
              // aaa:"aaa"
            };

            globalUser = tmpUser;

            const newUser = new User(tmpUser);

            const savedUser = await newUser.save();

            return true; // Continuar con el proceso de inicio de sesión
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      // return true
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV === "production",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

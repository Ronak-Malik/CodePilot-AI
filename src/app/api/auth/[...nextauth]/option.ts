import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/src/lib/dbconnect";
import UserModel from "@/src/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {

  
    async signIn({ user, profile }) {
      await dbConnect();

      if (!user.email) return false;

      let dbUser = await UserModel.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await UserModel.create({
          googleId: (profile as any)?.sub || user.id,
          name: user.name || "Google User",
          email: user.email,
          isProfileCompleted: false,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      await dbConnect();

      if (user?.email) {
        const dbUser = await UserModel.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.isProfileCompleted = dbUser.isProfileCompleted;
        }
      }

      if (token.email && !token.id) {
        const dbUser = await UserModel.findOne({ email: token.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.isProfileCompleted = dbUser.isProfileCompleted;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isProfileCompleted =
          token.isProfileCompleted as boolean;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

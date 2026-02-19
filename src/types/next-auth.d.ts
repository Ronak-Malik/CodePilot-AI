import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isProfileCompleted: boolean;
    } & DefaultSession["user"]; // This preserves name, email, and image
  }

  interface User {
    id: string;
    isProfileCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isProfileCompleted: boolean;
  }
}
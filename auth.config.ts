import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// https://authjs.dev/getting-started/authentication/credentials
//
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials, req: Request): Promise<User | null> {
        const username = credentials.username;

        console.log("[authorize] username: " + username);

        if (username === "obuchi") {
          return {
            id: "001",
          };
        } else {
          console.log("invalid user ...");
          return null;
        }
      },
    }),
  ],
};

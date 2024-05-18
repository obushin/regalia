import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// https://authjs.dev/getting-started/authentication/credentials
//
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      // credentials: {
      //   email: {},
      //   password: {},
      // },
      async authorize(credentials, req: Request): Promise<User | null> {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const username = credentials.username;

        console.log("[authorize] username: " + username);

        return {
          id: "001",
        };
        // return credentials.email === email && credentials.password === "123456"
        //   ? { id: "userId", email }
        //   : null;
      },
    }),
  ],
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     //
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false;
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL("/dashboard", nextUrl));
  //     }
  //     return true;
  //   },
  // },
};

// export interface User {
//   id?: string
//   name?: string | null
//   email?: string | null
//   image?: string | null
// }

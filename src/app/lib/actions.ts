"use server";

import { signIn } from "../../../auth";
import { redirect } from "next/navigation";
import { CallbackRouteError } from "@auth/core/errors";
import { CredentialsSignin } from "next-auth";

export async function login(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  let redirectUrl: string | undefined;

  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false, // try-catchの中でredirectできないため、手動でredirectする
    });
    
    // TODO: next.jsの以下の不具合のため、一旦loginとdashboardのレイアウトを共通のものにする
    //       https://github.com/vercel/next.js/issues/58263
    redirectUrl = "/dashboard";
  } catch (e) {
    if (e instanceof CallbackRouteError) {
      if (e.cause?.err instanceof CredentialsSignin) {
        return "Invalid credentials.";
      }
    }
    console.error(e);
    return "Unexpected Error occurred.";
  }
  
  console.log("Login successful!! redirect to " + redirectUrl);
  redirect(redirectUrl);  
}

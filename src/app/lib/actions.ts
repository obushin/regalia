"use server";

import { revalidatePath } from "next/cache";
import { signIn } from "../../../auth";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";

export async function login(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  let redirectUrl: string | undefined;

  try {
    const url = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false, // try-catchの中でredirectできないため、手動でredirectする
    });
    console.log(url);

    // TODO: next.jsの以下の不具合のため、一旦dashboardを同一レイアウトのフォルダに移動
    //       https://github.com/vercel/next.js/issues/58263
    redirectUrl = "/dashboard";
  } catch (e) {
    if (e instanceof CredentialsSignin) {
      return "Invalid credentials.";
    } else {
      console.error(e);
      return "Unexpected Error occurred.";
    }
  }
  
  console.log("Login successful!! redirect to " + redirectUrl);
  redirect(redirectUrl);  
}

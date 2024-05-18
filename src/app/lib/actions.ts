"use server";

import { signIn } from "../../../auth";
import { redirect } from "next/navigation";

export async function login(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  let redirectUrl: string | undefined;

  try {
    const url = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false, // auto redirectに不具合があるため、手動でredirectする
    });
    console.log(url);

    redirectUrl = "/dashboard";
  } catch (e) {
    console.error(e);
  } finally {
    if (redirectUrl) {
      console.log("redirect to " + redirectUrl);
      redirect(redirectUrl);
    } else {
      return "login failed.";
    }
  }

  // return result ? "success" : "failed";

  // try {
  //   await signIn("credentials", formData);
  //   return "success";
  // } catch (e) {
  //   console.error(e);
  //   // if (isRedirectError(e)) {
  //   //   console.error("redirect error occurred !!!!!!!!!!!!");
  //   //   throw e;
  //   // }
  //   // return "failed";

  //   if ((e as Error).message.includes("CredentialsSignin")) {
  //     return "failed";
  //   }

  //   throw e;
  // }
}

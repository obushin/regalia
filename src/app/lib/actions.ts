"use server";

import { revalidatePath } from "next/cache";
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
  }
  //finally {
  if (redirectUrl) {
    console.log("redirect to " + redirectUrl);

    // revalidatePath(redirectUrl);
    redirect(redirectUrl);
  } else {
    return "login failed.";
  }
}

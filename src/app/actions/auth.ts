"use server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signUpAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    console.log("email: ", email);
    console.log("formData", formData);

    try {
        const res = await auth.api.signUpEmail({
        body: { email, password, name },
        });

        console.log("ERROR", res);

        if ("error" in res && res.error) {
            // Validation error path (e.g., invalid_email)
            return { ok: false, message: "Validation Error" };
        }

        return { ok: true };
        redirect("/");
  } catch (err: any) {
    return { ok: false, code: "exception", message: err?.message || "Unexpected error" };
  }
}

export async function signInAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });

    redirect("/");
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers(),
    });

    redirect("/");
}
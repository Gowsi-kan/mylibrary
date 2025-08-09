"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { success } from "zod";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log(error, "Signin error");
    return {
      success: false,
      error: "Signin error",
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  if (!fullName || !email || !password || !universityId || !universityCard) {
    throw new Error("All fields are required");
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      message: "User with this email already exists",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    //await signInWithCredentials({email, password});
    return {
      success: true,
    };
  } catch (error) {
    console.log(error, "Signup error");
    return {
      success: false,
      error: "Signup error",
    };
  }
};

"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";

export const useAuth = () => {
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();

  const login = async (email: string, password: string) => {
    if (!signInLoaded || !signIn || !setActive) return;

    const res = await signIn.create({
      identifier: email,
      password,
    });

    if (res.status === "complete") {
      await setActive({ session: res.createdSessionId });
    }

    return res;
  };

  const register = async (email: string, password: string) => {
    if (!signUpLoaded || !signUp) return;

    const res = await signUp.create({
        emailAddress: email,
        password,
    });

    if (res.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
        });
    }

    return res;
    };

  return { login, register };
};
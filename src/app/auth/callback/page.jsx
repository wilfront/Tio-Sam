"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function confirmLogin() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) email = window.prompt("Digite seu e-mail:");

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`);
        } catch (error) {
          console.error(error);
          alert("Erro ao autenticar. Tente novamente.");
          router.push("/");
        }
      }
    }

    confirmLogin();
  }, [router]);

  return <p>Validando login mágico...</p>;
}

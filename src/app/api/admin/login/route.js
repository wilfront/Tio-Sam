import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
        { status: 400 }
      );
    }

    // Permitir apenas o e-mail do cliente
    const allowedEmail = "carvalhononi@gmail.com";
    if (email !== allowedEmail) {
      return new Response(
        JSON.stringify({ error: "E-mail não autorizado" }),
        { status: 403 }
      );
    }

    // Base URL dinâmica (usa env do Vercel ou cai no localhost)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // URL de callback (precisa estar autorizada no Firebase)
    const actionCodeSettings = {
      url: `${baseUrl}/auth/callback`,
      handleCodeInApp: true,
    };

    console.log("URL usada no Firebase:", actionCodeSettings.url);

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

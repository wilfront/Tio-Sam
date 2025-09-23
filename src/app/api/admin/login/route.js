import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email é obrigatório" }), { status: 400 });
    }

    // **Permitir apenas o e-mail do seu cliente**
    const allowedEmail = "carvalhononi@gmail.com";
    if (email !== allowedEmail) {
      return new Response(JSON.stringify({ error: "E-mail não autorizado" }), { status: 403 });
    }

    const actionCodeSettings = {
      url: 'http://localhost:3000/admin/dashboard',
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

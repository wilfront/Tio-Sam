'use client';
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setMessage("Informe e-mail e senha.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login Admin</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

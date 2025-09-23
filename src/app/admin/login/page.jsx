'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Informe um e-mail válido.");
      return;
    }

    try {
      // Usa a variável de ambiente
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.ok) {
        localStorage.setItem('emailForSignIn', email);
        setMessage("Login realizado com sucesso! Redirecionando...");
        router.push('/dashboard'); // redireciona para o dashboard
      } else {
        setMessage(`Erro: ${data.error}`);
      }
    } catch (err) {
      setMessage(`Erro: ${err.message}`);
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

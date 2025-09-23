'use client';
import { useState } from "react";
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Informe um e-mail válido.");
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessage("Link enviado! Verifique seu e-mail.");
        localStorage.setItem('emailForSignIn', email);
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
          <button type="submit">Enviar Link Mágico</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

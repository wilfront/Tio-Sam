"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./contato.css";

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    motivo: "",
    assunto: "",
    mensagem: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      await addDoc(collection(db, "mensagens"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setStatus("Mensagem enviada com sucesso!");
      setForm({ nome: "", email: "", telefone: "", motivo: "", assunto: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar a mensagem. Tente novamente.");
    }
  };

  return (
    <section className="contato">
      <div className="contato-container">
        <motion.h1
          className="contato-titulo"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Fale com a gente
        </motion.h1>

        <motion.form
          className="contato-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <label>
            Nome:
            <motion.input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.03 }}
            />
          </label>

          <label>
            Email:
            <motion.input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.03 }}
            />
          </label>

          <label>
            Telefone:
            <motion.input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              whileFocus={{ scale: 1.03 }}
            />
          </label>

          <label>
            Motivo do contato:
            <motion.select
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.03 }}
            >
              <option value="">Selecione um motivo</option>
              <option value="Dúvidas">Dúvidas</option>
              <option value="Sugestões">Sugestões</option>
              <option value="Reclamações">Reclamações</option>
              <option value="Elogios">Elogios</option>
            </motion.select>
          </label>

          <label>
            Assunto:
            <motion.input
              type="text"
              name="assunto"
              value={form.assunto}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.03 }}
            />
          </label>

          <label>
            Mensagem:
            <motion.textarea
              name="mensagem"
              rows="5"
              value={form.mensagem}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02 }}
            />
          </label>

          <motion.button
            type="submit"
            disabled={status === "Enviando..."}
            whileHover={{ scale: status === "Enviando..." ? 1 : 1.05 }}
            whileTap={{ scale: status === "Enviando..." ? 1 : 0.95 }}
          >
            {status === "Enviando..." ? "Enviando..." : "Enviar"}
          </motion.button>
        </motion.form>

        {status && (
          <motion.p
            className={`form-status ${
              status.toLowerCase().includes("sucesso")
                ? "form-status-success"
                : "form-status-error"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {status}
          </motion.p>
        )}
      </div>
    </section>
  );
}

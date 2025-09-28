'use client';
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  // Observa usuário logado
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(u => setUser(u));
    
    // Observa PDFs
    const qPdfs = query(collection(db, "cardapio"), orderBy("updatedAt", "desc"));
    const unsubscribePdfs = onSnapshot(qPdfs, snapshot => {
      setPdfs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Observa mensagens
    const qMensagens = query(collection(db, "mensagens"), orderBy("createdAt", "desc"));
    const unsubscribeMensagens = onSnapshot(qMensagens, snapshot => {
      setMensagens(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubscribePdfs();
      unsubscribeMensagens();
    };
  }, []);

  // Upload PDF
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Selecione um PDF");
    if (!user) return alert("Você precisa estar logado");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch("/api/admin/pdf", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Erro ao enviar PDF");

      await addDoc(collection(db, "cardapio"), {
        pdfUrl: data.pdf.secure_url,
        public_id: data.pdf.public_id,
        updatedAt: serverTimestamp(),
      });

      setFile(null);
      alert("PDF enviado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar PDF: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Deletar PDF
  const handleDeletePdf = async (pdf) => {
    if (!confirm("Deseja realmente excluir este PDF?")) return;
    try {
      if (!pdf.id || !pdf.public_id) return alert("Documento inválido");
      await fetch("/api/admin/pdf", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: pdf.public_id, docId: pdf.id }),
      });
      await deleteDoc(doc(db, "cardapio", pdf.id));
      alert("PDF excluído com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir PDF: " + err.message);
    }
  };

  // Deletar mensagem
  const handleDeleteMensagem = async (msg) => {
    if (!confirm("Deseja realmente excluir esta mensagem?")) return;
    try {
      await deleteDoc(doc(db, "mensagens", msg.id));
      alert("Mensagem excluída com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir mensagem: " + err.message);
    }
  };

  if (!user) return <p className="login-message">Você precisa estar logado para acessar o dashboard.</p>;

  return (
    <div className="dashboard-container">
      <h1>Painel Admin</h1>

      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Enviar PDF"}
        </button>
      </form>

      {pdfs.length > 0 && (
        <div className="pdf-list">
          <h2>PDFs enviados:</h2>
          <ul>
            {pdfs.map(pdf => (
              <li key={pdf.id} className="pdf-item">
                <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">Visualizar PDF</a>
                <button onClick={() => handleDeletePdf(pdf)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mensagens.length > 0 && (
        <div className="mensagens-list">
          <h2>Mensagens recebidas:</h2>
          <ul>
            {mensagens.map(msg => (
              <li key={msg.id} className="mensagem-item">
                <p><strong>Nome:</strong> {msg.nome}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                {msg.telefone && <p><strong>Telefone:</strong> {msg.telefone}</p>}
                <p><strong>Motivo:</strong> {msg.motivo}</p>
                <p><strong>Assunto:</strong> {msg.assunto}</p>
                <p><strong>Mensagem:</strong> {msg.mensagem}</p>
                <p><em>Enviada em: {msg.createdAt?.toDate().toLocaleString()}</em></p>
                <button onClick={() => handleDeleteMensagem(msg)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./cardapio.css";

export default function CardapioPage() {
  const [cardapios, setCardapios] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "cardapio"), orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCardapios(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "";
    return timestamp.toDate().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="cardapio-container">
      <motion.div
        className="cardapio-page"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold mb-4">📄 Cardápio</h1>

        {cardapios.length > 0 ? (
          <ul className="cardapio-list">
            {cardapios.map(({ id, pdfUrl, public_id, updatedAt }) => {
              const fileName = public_id?.split("/").pop() || "Cardápio";
              return (
                <li key={id} className="cardapio-item">
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    📥 {fileName}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum cardápio disponível no momento.</p>
        )}
      </motion.div>
    </div>
  );
}

'use client'

import React from 'react'
import Link from 'next/link'
import './Footer.css'
import { Facebook, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="footer-container"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Navegação lateral esquerda */}
        <nav className="footer-nav">
          <Link href="/">Home</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        {/* Logo central */}
        <a href="/">
          <div className="footer-logo">
            <img src="/logo.png" alt="Logo Tio Sam" />
          </div>
        </a>

        {/* Redes sociais lado direito */}
        <div className="footer-social">
          <a
            href="https://www.facebook.com/tiosamlanches"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/tiosamlanches/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
        </div>
      </motion.div>

      <a
        href="https://portfolio-wilfront.vercel.app/"
        className="footer-copy-link"
      >
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} @WilFront - Todos os direitos
          reservados.
        </p>
      </a>
    </footer>
  )
}

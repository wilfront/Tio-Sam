'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import './Header.css'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [scrolling, setScrolling] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`header ${scrolling ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          {/* Menu esquerdo (desktop) */}
          <nav className="nav-left desktop-menu">
            <Link href="/">Home</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
          </nav>

          {/* Logo central */}
          <a href="/">
            <div className="logo-container">
              <img src="/logo.png" alt="Logo" className="logo" />
            </div>
          </a>

          {/* Menu direito (desktop) */}
          <nav className="nav-right desktop-menu">
            <Link href="/lojas">Lojas</Link>
            <Link href="/cardapio">Cardápio</Link>
            <Link href="https://www.ifood.com.br/delivery/bauru-sp/tio-sam-lanches-bauru-vila-ipiranga/b7ad84aa-cc69-484b-8787-7efdb18db6d1?prato=2da0e56b-2b20-44cc-b721-8883aef09d2e&srsltid=AfmBOorV3fxktvEOkpICn91o1cjZDrKmOImBMJRZyFEIQENTITlEg9kC">Delivery</Link>
          </nav>

          {/* Ícone menu hamburguer - só aparece se menu estiver FECHADO */}
          {!menuOpen && (
            <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
              <Menu size={38} />
            </button>
          )}
        </div>
      </header>

      {/* Menu mobile (abre com motion) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="mobile-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            {/* Botão de fechar (X) só dentro do menu */}
            <button className="close-button" onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </button>

            <nav className="mobile-nav">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
              <Link href="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
              <Link href="/lojas" onClick={() => setMenuOpen(false)}>Lojas</Link>
              <Link href="/cardapio" onClick={() => setMenuOpen(false)}>Cardápio</Link>
              <Link href="https://www.ifood.com.br/delivery/bauru-sp/tio-sam-lanches-bauru-vila-ipiranga/b7ad84aa-cc69-484b-8787-7efdb18db6d1?prato=2da0e56b-2b20-44cc-b721-8883aef09d2e&srsltid=AfmBOorV3fxktvEOkpICn91o1cjZDrKmOImBMJRZyFEIQENTITlEg9kC">Delivery</Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

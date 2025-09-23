'use client'

import './globals.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Sobre from './sobre/page'
import Lojas from './lojas/page'

export default function Home() {
  const scrollToSobre = () => {
    const section = document.getElementById('sobre')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Seção Home */}
      <section className="home">
        <div className="home-overlay">
          <motion.div 
            className="home-content"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="home-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              O verdadeiro sabor está aqui
            </motion.h1>

            <motion.p 
              className="home-description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              No <strong>Tio Sam</strong>, o hambúrguer é levado a sério. Pão macio, carne suculenta e aquele toque especial que só a gente tem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link href="/cardapio">
                <button className="home-button">Ver Cardápio</button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Seta animada */}
          <motion.div 
            className="scroll-arrow" 
            onClick={scrollToSobre}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            ↓
          </motion.div>
        </div>
      </section>

      <Sobre />
      <Lojas />
    </>
  )
}

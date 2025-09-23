'use client'

import React from 'react'
import './sobre.css'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <section className="sobre" id="sobre">
      <motion.div 
        className="sobre-box"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="sobre-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="sobre-titulo">Sobre o Tio Sam</h2>

          <p>
            Fundado com paixão e sabor no coração de Bauru, o <strong>Tio Sam</strong> conquistou o paladar dos bauruenses com lanches autênticos, generosos e preparados com muito carinho.
          </p>

          <p>
            Hoje, estamos presentes em três pontos estratégicos da cidade: <strong>Praça da Hípica</strong>, <strong>Castelo Branco</strong> e <strong>Mary Dota</strong>.
          </p>

          <p>
            Mais do que um lanche, oferecemos uma experiência de sabor que virou tradição em Bauru.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

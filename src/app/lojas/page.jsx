'use client'

import React from 'react'
import './lojas.css'
import { motion } from 'framer-motion'

const lojas = [
  {
    nome: 'Unidade Castelo Branco',
    endereco: 'Av. Castelo Branco, 30-15 - Vila São João do Ipiranga, Bauru - SP, 17056-000',
    horario: 'Aberto ⋅ Fecha à 00:00',
    telefone: '(14) 99660-0310',
    maps: 'https://www.google.com/maps?q=Av.+Castelo+Branco,+30-15+-+Bauru,+SP,+17056-000'
  },
  {
    nome: 'Unidade Jardim Ouro Verde',
    endereco: 'Av. José Henrique Ferraz, 554 - Jardim Ouro Verde, Bauru - SP, 17054-115',
    horario: 'Aberto ⋅ Fecha à 00:00',
    telefone: '(14) 99660-0310',
    maps: 'https://www.google.com/maps?q=Av.+José+Henrique+Ferraz,+554+-+Bauru,+SP,+17054-115'
  },
  {
    nome: 'Unidade Mary Dota',
    endereco: 'Av. Dr. Marcos de Paula Raphael - Nucleo Hab. Mary Dota, Bauru - SP, 17025-773',
    horario: 'Aberto ⋅ Fecha à 00:00',
    telefone: '(14) 99828-8160',
    maps: 'https://www.google.com/maps?q=Av.+Dr.+Marcos+de+Paula+Raphael+-+Bauru,+SP,+17025-773'
  }
]

export default function Lojas() {
  return (
    <section className="lojas">
      <div className="lojas-container">
        <h1 className="lojas-titulo">Nossas Lojas</h1>
        <div className="grid-lojas">
          {lojas.map((loja, index) => (
            <motion.div
              key={index}
              className="loja-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h2>{loja.nome}</h2>
              <p><strong>Endereço:</strong> {loja.endereco}</p>
              <p><strong>Horário:</strong> {loja.horario}</p>
              <p><strong>Telefone:</strong> {loja.telefone}</p>
              <a
                href={loja.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-maps"
              >
                Ver no Google Maps
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

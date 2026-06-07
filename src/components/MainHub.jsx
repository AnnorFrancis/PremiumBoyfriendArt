import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Film, Gift } from 'lucide-react';

export default function MainHub({ onNavigate }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <motion.div 
      className="glass-panel interactive"
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h1 className="title" style={{fontSize: '2rem'}}>Our Journey</h1>
      <p className="message-text" style={{marginBottom: '1rem'}}>
        I celebrate you today and the love we share. I’m so thankful the world brought us together.
      </p>

      <div className="hub-grid">
        <motion.div className="hub-card" variants={item} onClick={() => onNavigate('heart')}>
          <h2 className="hub-card-title">The Heart of Us</h2>
          <div className="hub-card-icon"><Heart fill="#ff0844" /></div>
        </motion.div>

        <motion.div className="hub-card" variants={item} onClick={() => onNavigate('videos')}>
          <h2 className="hub-card-title">Beautiful Memories</h2>
          <div className="hub-card-icon"><Film fill="#ff0844" color="#ff0844" /></div>
        </motion.div>

        <motion.div className="hub-card" variants={item} onClick={() => onNavigate('gift')}>
          <h2 className="hub-card-title">A Special Gift</h2>
          <div className="hub-card-icon"><Gift fill="#ff0844" color="white" /></div>
        </motion.div>
      </div>
    </motion.div>
  );
}

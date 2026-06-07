import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Gateway({ onStart }) {
  return (
    <motion.div 
      className="glass-panel interactive"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 1, type: "spring", bounce: 0.4 }}
    >
      <h2 className="romantic-script">My Amuzu</h2>
      <h1 className="title" style={{fontSize: '2.5rem'}}>Happy Birthday!</h1>
      
      <p className="message-text">
        Happy birthday to the love of my life. You’re not just my boyfriend, you’re my safe place, my best friend, my peace.
      </p>
      
      <button className="btn-primary" onClick={onStart} style={{marginTop: '1rem'}}>
        Unlock Our Journey <Heart fill="white" size={20} />
      </button>
    </motion.div>
  );
}

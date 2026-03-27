import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const orbs = [
    { id: 1, size: '400px', color: 'rgba(255, 255, 255, 0.03)', top: '10%', left: '10%', duration: 15 },
    { id: 2, size: '500px', color: 'rgba(255, 255, 255, 0.02)', top: '50%', left: '60%', duration: 20 },
    { id: 3, size: '300px', color: 'rgba(255, 255, 255, 0.04)', top: '80%', left: '20%', duration: 12 },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'linear-gradient(135deg, #000 0%, #111 100%)'
    }}>
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            top: orb.top,
            left: orb.left,
            filter: 'blur(40px)',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Volume2, VolumeX, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import bdaySong from './assets/happy-birthday.mp3';

// --- Background Component ---
const Background = () => {
  const orbs = [
    { size: 96, color: 'bg-electric-purple/20' },
    { size: 80, color: 'bg-gold/20' },
    { size: 100, color: 'bg-blue-500/10' },
    { size: 64, color: 'bg-pink-500/10' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{ width: `${orb.size * 4}px`, height: `${orb.size * 4}px` }}
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// --- Cursor Trail ---
const CursorTrail = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-4 h-4 bg-gold rounded-full blur-[2px] z-[9999] mix-blend-screen"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        boxShadow: '0 0 10px 2px rgba(191,0,255,0.8)'
      }}
    />
  );
};

// --- Section 1: Gift Landing ---
const GiftLanding = ({ onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2 }}
      className="flex flex-col items-center justify-center h-screen relative z-10"
    >
      <motion.div
        whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 30px rgba(191,0,255,0.6))" }}
        animate={{
          rotate: [0, -5, 5, -5, 5, 0],
          transition: { duration: 2, repeat: Infinity, repeatDelay: 1 }
        }}
        className="cursor-pointer"
        onClick={onOpen}
      >
        <div className="relative">
          <Gift size={120} className="text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" strokeWidth={1} />
          <div className="absolute inset-0 bg-electric-purple/20 blur-2xl rounded-full -z-10"></div>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onOpen}
        className="mt-12 px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 font-light hover:bg-white/10 hover:text-gold transition-all duration-300 tracking-widest text-sm uppercase"
      >
        You have a delivery. Open it?
      </motion.button>
    </motion.div>
  );
};

// --- Section 2: Cake & Candle ---
const CakeRitual = ({ onBlow, isMuted, toggleMute }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen relative z-10"
    >
      <div className="relative">
        {/* Cake Base */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-8 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-t-lg mb-1 shadow-lg"></div>
          <div className="w-24 h-10 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-t-lg mb-1 shadow-lg"></div>
          <div className="w-32 h-12 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-t-lg shadow-lg"></div>
        </div>

        {/* Candle */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-white/90 rounded-sm"></div>

        {/* Flame */}
        <motion.div
          animate={{
            scale: [1, 1.1, 0.9, 1.2, 1],
            rotate: [0, -2, 2, -1, 0],
            filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
          }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-white rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,165,0,0.8)] origin-bottom"
        ></motion.div>
      </div>

      <div className="relative mt-16 flex items-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onBlow}
          className="px-8 py-3 bg-gradient-to-r from-electric-purple to-pink-600 text-white rounded-full font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 relative z-10"
        >
          Make a wish and blow!
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: [0, 5, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-full ml-4 -top-1 -translate-y-1/2 hidden lg:flex items-center pointer-events-none w-max"
        >
          {/* 1st Arrow: Tip pointing Left at the button */}
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold/80">
            <path d="M55 5C55 25 35 35 5 35M5 35L12 28M5 35L12 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* 2nd Text: Placed at the tail endpoint of the arrow */}

        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: [0, 5, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className=" absolute -right-[45%] -top-5 -translate-y-1/2 hidden lg:flex items-center pointer-events-none w-max"
        >
          {/* 1st Arrow: Tip pointing Left at the button */}
          <span className="text-gold text-[10px] font-black tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]  ">Click Here</span>

        </motion.div>
      </div>
    </motion.div>
  );
};

const FloatingEmojis = () => {
  const emojis = ['🎂', '🍫', '🧁', '🍪', '🍨'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: 0,
            scale: 0.5 + Math.random()
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 50}px)`
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute text-3xl md:text-5xl"
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
};

// --- Section 3: Grand Reveal ---
const GrandReveal = () => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#FFD700', '#BF00FF', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle', 'star']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle', 'star']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const name = "Akilan"; // Using user name from metadata context if available, or placeholder
  const letters = name.split("");

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen relative z-10 p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FloatingEmojis />

      <h1 className="text-4xl md:text-7xl font-bold mb-8 flex gap-2 flex-wrap justify-center relative z-20">
        <span className="text-white mr-4">HAPPY</span>
        <span className="text-white mr-4">BIRTHDAY</span>
      </h1>
      <div className="flex gap-2 mb-12 relative z-20">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold to-orange-300 drop-shadow-[0_0_15px_rgba(191,0,255,0.8)]"
          >
            {char}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        className="bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light relative z-10">
          "May this year bring you as much joy, brilliance, and success as you bring to the world. Keep shining like the star you are!"
        </p>
        <div className="mt-6 flex justify-end">
          <span className="text-sm text-gold font-medium tracking-wider uppercase">- With love, Akil ❤️</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const BDAY_SONG = bdaySong;

// --- Main App Component ---
function App() {
  const [stage, setStage] = useState('gift'); // gift | cake | reveal
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = React.useRef(null);

  useEffect(() => {
    // Initialize audio object once
    audioRef.current = new Audio(BDAY_SONG);
    audioRef.current.loop = true;
    audioRef.current.volume = 1.0;
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsMuted(false);
          console.log("Birthday music playing!");
        })
        .catch(err => {
          console.warn("Autoplay was blocked. Click again to play.", err);
        });
    }
  };

  const handleOpenGift = () => {
    setStage('cake');
    startMusic();
  };

  const handleBlowCandle = () => {
    // Secondary audio play attempt in case the first one was blocked
    startMusic();
    setStage('reveal');
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed interaction required", e));
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-electric-purple selection:text-white relative overflow-hidden">
      <Background />
      <CursorTrail />

      {/* Persistent Audio Control */}
      <div className="fixed top-8 right-8 z-[100] cursor-pointer bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors" onClick={toggleMute}>
        {isMuted ? <VolumeX className="text-white/50" /> : <Volume2 className="text-gold animate-pulse" />}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'gift' && <GiftLanding key="gift" onOpen={handleOpenGift} />}
        {stage === 'cake' && <CakeRitual key="cake" onBlow={handleBlowCandle} isMuted={isMuted} toggleMute={toggleMute} />}
        {stage === 'reveal' && <GrandReveal key="reveal" />}
      </AnimatePresence>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Volume2, VolumeX, ArrowDown, Settings, Lock, Save, X, Check } from 'lucide-react';
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
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over a button or link
      const target = e.target;
      const isInteractive = target.closest('button') || target.closest('a') || target.onclick;
      setIsHovering(!!isInteractive);
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
      className="pointer-events-none fixed top-0 left-0 z-[9999] text-2xl transition-opacity duration-200"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        filter: 'drop-shadow(0 0 8px rgba(191,0,255,0.4))',
        opacity: isHovering ? 0 : 1
      }}
    >
      🎂
    </div>
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
          className="px-8 py-3 bg-gradient-to-r from-electric-purple to-pink-600 text-white rounded-full font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-transform duration-300 relative z-10"
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

// --- Admin Screen Component ---
const AdminScreen = ({ onSave, onExit, currentBirthdayName, currentWisherName }) => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [birthdayName, setBirthdayName] = useState(currentBirthdayName);
  const [wisherName, setWisherName] = useState(currentWisherName);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // checking | global | local

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/.netlify/functions/config');
        if (res.ok) setConnectionStatus('global');
        else setConnectionStatus('local');
      } catch {
        setConnectionStatus('local');
      }
    };
    checkConnection();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Akilan') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      await onSave({ birthdayName, wisherName, password });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-screen relative z-[1000] p-6 bg-slate-950/80 backdrop-blur-sm"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple to-pink-600"></div>
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-electric-purple/10 rounded-full border border-electric-purple/20">
              <Lock className="text-electric-purple" size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-purple/50 transition-colors placeholder:text-white/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}
            <button className="w-full py-3 bg-gradient-to-r from-electric-purple to-pink-600 rounded-xl font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
              Unlock Dashboard
            </button>
            <button type="button" onClick={onExit} className="w-full text-white/40 text-sm mt-4 hover:text-white transition-colors">
              Go Back to Party
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-screen relative z-[1000] p-6 bg-slate-950/80 backdrop-blur-sm"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple to-pink-600"></div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
              <Settings className="text-gold" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Site Settings</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'global' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">
                  {connectionStatus === 'global' ? 'Global Cloud Sync Active' : 'Local Storage Only (Deploy to Sync)'}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onExit} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Birthday Person Name</label>
              <input
                type="text"
                placeholder="e.g. Nanba"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-purple/50 transition-colors"
                value={birthdayName}
                onChange={(e) => setBirthdayName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Wisher Name</label>
              <input
                type="text"
                placeholder="e.g. Akil"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-purple/50 transition-colors"
                value={wisherName}
                onChange={(e) => setWisherName(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <button
              disabled={isSaving}
              className="flex-[2] py-3 bg-gradient-to-r from-electric-purple to-pink-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
            <button type="button" onClick={onExit} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-white/80 hover:bg-white/10 transition-all active:scale-[0.98]">
              Done
            </button>
          </div>
        </form>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-green-400/50 z-[1001]"
            >
              <Check size={16} strokeWidth={3} />
              <span className="text-sm font-bold">Changes Saved!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Section 3: Grand Reveal ---
const GrandReveal = ({ birthdayName, wisherName }) => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#FFD700', '#BF00FF', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle', 'star']
      });
      confetti({
        particleCount: 3,
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

  const letters = (birthdayName || "Nanba").split("");

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
          <span className="text-sm text-gold font-medium tracking-wider uppercase">- With love, {wisherName || "Akil"} ❤️</span>
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
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');
  const [birthdayName, setBirthdayName] = useState('Nanba');
  const [wisherName, setWisherName] = useState('Akil');
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = React.useRef(null);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/config');
        if (response.ok) {
          const data = await response.json();
          setBirthdayName(data.birthdayName);
          setWisherName(data.wisherName);
        }
      } catch (error) {
        console.error("Failed to fetch config:", error);
        // Fallback to local storage if available
        const localBday = localStorage.getItem('bday_name');
        const localWisher = localStorage.getItem('wisher_name');
        if (localBday) setBirthdayName(localBday);
        if (localWisher) setWisherName(localWisher);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950"
          >
            <div className="relative">
              <div className="w-20 h-20 border-2 border-electric-purple/20 border-t-electric-purple rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-pink-500/20 border-b-pink-500 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
          </motion.div>
        ) : isAdmin ? (
          <AdminScreen
            key="admin"
            currentBirthdayName={birthdayName}
            currentWisherName={wisherName}
            onExit={() => {
              window.location.hash = '';
              setIsAdmin(false);
            }}
            onSave={async ({ birthdayName, wisherName, password }) => {
              try {
                const response = await fetch('/.netlify/functions/config', {
                  method: 'POST',
                  body: JSON.stringify({ birthdayName, wisherName, password }),
                });

                if (response.ok) {
                  setBirthdayName(birthdayName);
                  setWisherName(wisherName);
                  localStorage.setItem('bday_name', birthdayName);
                  localStorage.setItem('wisher_name', wisherName);
                  return true;
                } else {
                  const err = await response.json();
                  throw new Error(err.error || 'Failed to save');
                }
              } catch (error) {
                console.error("Save error:", error);
                throw error;
              }
            }}
          />
        ) : (
          <>
            {stage === 'gift' && <GiftLanding key="gift" onOpen={handleOpenGift} />}
            {stage === 'cake' && <CakeRitual key="cake" onBlow={handleBlowCandle} isMuted={isMuted} toggleMute={toggleMute} />}
            {stage === 'reveal' && <GrandReveal key="reveal" birthdayName={birthdayName} wisherName={wisherName} />}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

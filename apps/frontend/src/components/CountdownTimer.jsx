import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { assets } from '@/utils/assets';

function CountdownTimer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const serverTimeOffset = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Snow Moon: 1 February 2026 at 23:09 MEZ (UTC+1)
    const deadlineStr = import.meta.env.VITE_DEADLINE_DATE || '2026-02-01T23:09:00+01:00';
    const deadline = new Date(deadlineStr);
    
    // Fetch current time from internet API to get accurate time
    const fetchServerTime = async () => {
      try {
        // Get accurate time from worldtimeapi.org (Europe/Madrid = Alicante timezone)
        const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Madrid');
        const data = await response.json();
        const serverTime = new Date(data.datetime);
        const clientTime = new Date();
        // Calculate offset: server time - client time
        serverTimeOffset.current = serverTime.getTime() - clientTime.getTime();
        setIsLoading(false);
        
        // Calculate immediately
        calculateTimeRemaining();
        
        // Update every second for accuracy
        intervalRef.current = setInterval(calculateTimeRemaining, 1000);
      } catch (error) {
        console.warn('Failed to fetch server time, using local time:', error);
        // Fallback to local time if API fails
        serverTimeOffset.current = 0;
        setIsLoading(false);
        calculateTimeRemaining();
        intervalRef.current = setInterval(calculateTimeRemaining, 1000);
      }
    };

    const calculateTimeRemaining = () => {
      // Use internet time: current client time + offset
      const now = new Date(Date.now() + serverTimeOffset.current);
      const diffTime = deadline.getTime() - now.getTime();

      if (diffTime <= 0) {
        setIsExpired(true);
        setDays(0);
        setHours(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      setIsExpired(false);
      
      // Calculate days (full 24-hour periods)
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Calculate remaining time after days
      const remainingTime = diffTime - (diffDays * 1000 * 60 * 60 * 24);
      
      // Calculate hours from remaining time (0-23 range)
      const diffHours = Math.floor(remainingTime / (1000 * 60 * 60));
      
      setDays(diffDays);
      setHours(diffHours);
    };

    fetchServerTime();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-purple-500/20 border-2 border-teal-500/40 shadow-lg"
      >
        <img
          src={assets.ui.loadingSpinner}
          alt=""
          className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 animate-spin"
          aria-hidden="true"
        />
        <div className="text-center">
          <div className="text-sm sm:text-base text-gray-400 font-medium">Loading countdown...</div>
        </div>
      </motion.div>
    );
  }

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/30 shadow-lg"
      >
        <Clock className="w-6 h-6 text-red-400" />
        <div className="text-center">
          <div className="text-sm sm:text-base text-gray-400 font-medium">Deadline Passed</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-purple-500/20 border-2 border-teal-500/40 shadow-lg shadow-teal-500/20"
    >
      <img
        src={assets.components.countdownMoon}
        alt=""
        className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 opacity-90"
        aria-hidden="true"
      />
      <div className="text-center">
        <div className="text-xs sm:text-sm text-gray-400 font-medium mb-1">
          Snow Moon Deadline
        </div>
        <div className="flex items-baseline justify-center gap-2 sm:gap-3">
          <motion.span
            key={days}
            initial={{ scale: 1.2, color: '#14b8a6' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums"
          >
            {days}
          </motion.span>
          <span className="text-lg sm:text-xl md:text-2xl text-gray-300 font-semibold">
            days
          </span>
          <span className="text-xl sm:text-2xl text-gray-500">,</span>
          <motion.span
            key={hours}
            initial={{ scale: 1.2, color: '#14b8a6' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums"
          >
            {hours}
          </motion.span>
          <span className="text-lg sm:text-xl md:text-2xl text-gray-300 font-semibold">
            hours
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default CountdownTimer;

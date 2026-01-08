import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, FileText, Globe, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function StatusBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(7);

  useEffect(() => {
    // Calculate days remaining from deadline
    const deadlineStr = import.meta.env.VITE_DEADLINE_DATE;
    if (deadlineStr) {
      const deadline = new Date(deadlineStr);
      const now = new Date();
      const diffTime = deadline - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(Math.max(0, Math.min(7, diffDays)));
    }
  }, []);

  const currentDay = Math.min(7, 7 - daysRemaining + 1);

  return (
    <div className="sticky top-0 z-40">
      {/* Main Status Bar */}
      <motion.div
        className="backdrop-blur-xl bg-dark-100/90 border-b border-teal-500/20 shadow-lg shadow-dark-50/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2 sm:py-3">
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-semibold text-gray-200">7-day window</span>
                </div>
                <span className="text-sm text-gray-400">
                  I'm selecting 2 partners before the deadline. Calm urgency. Clear terms.
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="teal" size="sm" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Day {currentDay}/7
                </Badge>
                <Badge variant="purple" size="sm" className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  NDA required
                </Badge>
                <Badge variant="default" size="sm" className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  NL/EN
                </Badge>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 p-1 rounded-full hover:bg-dark-300/50 transition-colors"
                  aria-label={isExpanded ? 'Hide legal notice' : 'Show legal notice'}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-semibold text-gray-200">7-day window</span>
                  <Badge variant="teal" size="sm">
                    Day {currentDay}/7
                  </Badge>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-2">
                      <p className="text-sm text-gray-400">
                        I'm selecting 2 partners before the deadline. Calm urgency. Clear terms.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="purple" size="sm" className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          NDA required
                        </Badge>
                        <Badge variant="default" size="sm" className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          NL/EN
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Collapsible Legal Microcopy */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden backdrop-blur-xl bg-dark-200/80 border-b border-yellow-500/20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  <span className="text-yellow-400 font-semibold">Clear terms:</span>{' '}
                  This is a collaboration request, not investment advice. Any revenue share is subject 
                  to written agreement and depends on product performance. No guaranteed returns.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StatusBar;

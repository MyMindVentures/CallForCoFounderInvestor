import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/i18n/useTranslation';

function StatusBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Format deadline for display
    // Snow Moon: Sunday, 1 February 2026 • 23:09 (MEZ)
    const deadlineStr = import.meta.env.VITE_DEADLINE_DATE || '2026-02-01T23:09:00+01:00';
    const deadline = new Date(deadlineStr);
    
    try {
      const formatted = deadline.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Berlin'
      });
      const time = deadline.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Berlin',
        hour12: false
      });
      setDeadlineDate(`${formatted} • ${time} (MEZ)`);
    } catch (e) {
      // Fallback to hardcoded format
      setDeadlineDate('Sunday, 1 February 2026 • 23:09 (MEZ)');
    }
  }, []);

  return (
    <div className="sticky top-0 z-[70]">
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
                <span className="text-xs sm:text-sm text-gray-400 hidden md:inline">
                  {deadlineDate ? `${t('statusBar.snowMoon')}: ${deadlineDate}` : `${t('statusBar.snowMoon')}: Sunday, 1 February 2026 • 23:09 (MEZ)`}
                </span>
                <span className="text-xs text-gray-400 md:hidden">
                  {t('statusBar.snowMoon')}: Feb 1, 2026
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="purple" size="sm" className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {t('statusBar.ndaAgreement')}
                </Badge>
                <LanguageSelector />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 p-1 rounded-full hover:bg-dark-300/50 transition-colors"
                  aria-label={isExpanded ? t('statusBar.hideLegalNotice') : t('statusBar.showLegalNotice')}
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
                  <span className="text-xs text-gray-400">
                    {deadlineDate ? `${t('statusBar.snowMoon')}: ${deadlineDate.split('•')[0].trim()}` : `${t('statusBar.snowMoon')}: Feb 1, 2026`}
                  </span>
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
                        {t('statusBar.snowMoon')} deadline: {deadlineDate || 'Sunday, 1 February 2026 • 23:09 (MEZ)'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('statusBar.deadlineText')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="purple" size="sm" className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {t('statusBar.ndaAgreement')}
                        </Badge>
                        <LanguageSelector />
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
                  {t('statusBar.legalNotice')}
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

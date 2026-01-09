/**
 * Logger utility for frontend
 * Automatically disabled in production builds
 */

const isProduction = import.meta.env.PROD;

export const logger = {
  error: (...args) => {
    if (!isProduction) {
      console.error(...args);
    }
    // In production, errors are silently logged (or could be sent to error tracking service)
  },
  log: (...args) => {
    if (!isProduction) {
      console.log(...args);
    }
  },
  warn: (...args) => {
    if (!isProduction) {
      console.warn(...args);
    }
  }
};

export default logger;

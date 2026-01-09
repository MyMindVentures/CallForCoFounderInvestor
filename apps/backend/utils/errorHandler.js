/**
 * Error handling utilities for production
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Sanitize error message for client responses
 * Prevents exposing internal details in production
 */
export const sanitizeError = (error) => {
  if (!isProduction) {
    // In development, return full error for debugging
    return error.message || 'An error occurred';
  }

  // In production, sanitize error messages
  const message = error.message || 'An error occurred';
  
  // Don't expose internal error details
  if (message.includes('ENOENT') || 
      message.includes('EACCES') || 
      message.includes('database') ||
      message.includes('SQL') ||
      message.includes('ECONNREFUSED')) {
    return 'An internal error occurred. Please try again later.';
  }

  // Allow safe user-facing errors
  if (message.includes('required') || 
      message.includes('Invalid') || 
      message.includes('not found') ||
      message.includes('Access denied') ||
      message.includes('Invalid token') ||
      message.includes('Invalid credentials')) {
    return message;
  }

  // Default sanitized message
  return 'An error occurred. Please try again.';
};

/**
 * Log error for server-side debugging
 */
export const logError = (context, error) => {
  if (isProduction) {
    // In production, log full error details but don't expose to client
    console.error(`[${context}]`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  } else {
    // In development, simple console.error
    console.error(`[${context}]`, error);
  }
};

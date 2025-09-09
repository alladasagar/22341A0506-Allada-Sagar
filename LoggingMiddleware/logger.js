import axios from 'axios';

// Central logging API endpoint
const LOGGING_API_URL = 'http://20.244.56.144/evaluation-service/logs';
// If the API requires authentication, add your token here
const AUTH_TOKEN = process.env.LOG_API_TOKEN || '';

/**
 * Send log to central logging service
 * @param {Object} param0
 * @param {'backend'|'frontend'} param0.stack
 * @param {'debug'|'info'|'warn'|'error'|'fatal'} param0.level
 * @param {string} param0.packageName
 * @param {string} param0.message
 */
export const sendLog = async ({ stack, level, packageName, message }) => {
  const body = {
    stack,
    level,
    package: packageName,
    message,
  };

  try {
    const response = await axios.post(LOGGING_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        ...(AUTH_TOKEN && { Authorization: `Bearer ${AUTH_TOKEN}` }),
      },
    });
    console.log('Log sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending log:', error.message);
  }
};

/**
 * Express middleware to log all requests
 */
const loggerMiddleware = async (req, res, next) => {
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms - IP: ${req.ip}`;

    // Send info level log to central logging
    await sendLog({
      stack: 'backend',
      level: 'info',
      packageName: 'middleware',
      message: logMessage,
    });

    console.log(logMessage);
  });

  next();
};

export default loggerMiddleware;

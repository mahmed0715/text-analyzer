import express from 'express';
import analysisRouter from './routes/analysis.route';
import path from 'path';
import morgan from 'morgan';
import logger from './utils/logger';
import fs from 'fs';
import { apiLimiter } from './middleware/rate-limiter';
import helmet from 'helmet';
import authRouter from './routes/auth.route';
import { authenticate } from './middleware/authMiddleware';
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const app = express();
app.use((req, res, next) => {
  if (req.hostname !== 'localhost' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       'script-src-attr': ["'unsafe-inline'"], // ⚠️ allows inline event handlers like onClick=""
//     },
//   }),
// );
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'script-src-attr': ["'none'"], // Keep blocking inline JS
      'connect-src': ["'self'"], // Allow fetch/XHR/websockets to your server
    },
  }),
);

// Static files - should come before your API routes
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use('/api', apiLimiter);

app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

// Your routes and other middleware

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/texts', authenticate, analysisRouter);
// Catch / route to serve index.html for SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
export default app;

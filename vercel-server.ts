// Vercel serverless function for Next.js with Socket.IO support
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

export default async function handler(req, res) {
  // For Vercel serverless, we'll handle the request differently
  const app = next({ dev: false, dir: __dirname });
  await app.prepare();
  const handle = app.getRequestHandler();
  
  return handle(req, res);
}

// For local development with Socket.IO
if (process.env.NODE_ENV === 'development') {
  const dev = process.env.NODE_ENV !== 'production';
  const port = process.env.PORT || 3000;
  const hostname = '0.0.0.0';

  async function createCustomServer() {
    try {
      const nextApp = next({ 
        dev,
        dir: process.cwd(),
        conf: dev ? undefined : { distDir: './.next' }
      });

      await nextApp.prepare();
      const handle = nextApp.getRequestHandler();

      const server = createServer((req, res) => {
        if (req.url?.startsWith('/api/socketio')) {
          return;
        }
        handle(req, res);
      });

      const io = new Server(server, {
        path: '/api/socketio',
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });

      try {
        const { setupSocket } = await import('@/lib/socket');
        setupSocket(io);
      } catch (error) {
        console.log('Socket setup not available, continuing without Socket.IO');
      }

      server.listen(port, hostname, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
        console.log(`> Socket.IO server running at ws://${hostname}:${port}/api/socketio`);
      });

    } catch (err) {
      console.error('Server startup error:', err);
      process.exit(1);
    }
  }

  createCustomServer();
}
import http from 'http';
import app from './app.js';

const server = http.createServer(app);
server.listen(5001, () => {
    console.log(`🚀 user service running at http://localhost:${5001}`);
  });    
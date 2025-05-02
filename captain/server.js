import http from 'http';
import app from './app.js';

const server = http.createServer(app);
server.listen(5002, () => {
    console.log(`🚀 captain service running at http://localhost:${5002}`);
  });    
import http from 'http';
import app from './app.js';

const server = http.createServer(app);
server.listen(5003, () => {
    console.log(`🚀 ride service running at http://localhost:${5003}`);
  });    
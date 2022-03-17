import http from 'http';
import Debug from 'debug';
import app from '../app.js';

const port = process.env.PORT || '3000';
const debug = Debug('demo:server');
const server = http.createServer(app.callback()).listen(port, 'localhost');

/**
 * listening
 */
server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`Listening on ${addr.address}:${addr.port}`)
});

/**
 * error
 */
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
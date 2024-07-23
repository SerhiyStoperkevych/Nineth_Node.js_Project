const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const storeRouter = require('./routes/stores');
const setupSocket = require('./socket/socket');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/menu/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/menu/store', storeRouter);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

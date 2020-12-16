import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRouter from './modules/task/router/task.router';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app');

const bootServer = async () => {
  const app: express.Application = express();
  const port = 5000;
  app.use(bodyParser.json());

  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    }),
  );

  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    }),
  );

  try {
    await mongoose.connect('mongodb://localhost:27017/task-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    debugLog('MongoDB connected');
  } catch (e) {
    throw new Error(e);
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/task', taskRouter);
  app.listen(port, () => {
    debugLog(`Example app listening at http://localhost:${port}`);
  });
};

bootServer();

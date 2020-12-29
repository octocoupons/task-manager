import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRouter from './modules/task/router/task.router';
import { logger } from './config/winston';

export const bootServer = async (): Promise<void> => {
  const app: express.Application = express();
  const port = 5000;
  app.use(bodyParser.json());

  try {
    await mongoose.connect('mongodb://localhost:27017/task-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected');
  } catch (e) {
    logger.error('MongoDB failed to connected');
    throw new Error(e);
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/task', taskRouter);
  app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
  });
};

bootServer()
  .then(() => {
    logger.info('Server has booted');
  })
  .catch(() => {
    logger.error('Server has failed to boot');
  });

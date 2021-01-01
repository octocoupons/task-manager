import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRouter from './modules/task/router/task.router';
import { logger } from './config/winston';
import * as dotenv from 'dotenv';

export const bootServer = async (): Promise<express.Application> => {
  dotenv.config();

  const app: express.Application = express();
  app.use(bodyParser.json());

  try {
    await mongoose.connect(process.env.MONGO_URL, {
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

  return app;
};

bootServer()
  .then((app) => {
    const port = 5000;
    app.listen(port, () => {
      logger.info(`Example app listening at http://localhost:${port}`);
    });
    logger.info('Server has booted');
  })
  .catch(() => {
    logger.error('Server has failed to boot');
  });

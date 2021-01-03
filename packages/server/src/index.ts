import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRouter from '@task/router/task.router';
import { logger } from '@app/config/winston';
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
    app.listen(process.env.PORT, () => {
      logger.info(`Task Manager app listening at http://localhost:${process.env.PORT}`);
    });
    logger.info('Server has booted');
  })
  .catch(() => {
    logger.error('Server has failed to boot');
  });

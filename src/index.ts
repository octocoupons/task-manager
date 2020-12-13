import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRouter from './modules/task/router/task.router';

const bootServer = async () => {
  const app: express.Application = express();
  const port = 5000;
  app.use(bodyParser.json());

  try {
    await mongoose.connect('mongodb://localhost:27017/task-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (e) {
    throw new Error(e);
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/task', taskRouter);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

bootServer();

import express from 'express';
import taskModel from './task.model';
const router = express.Router();

router.post('/', async (req, res) => {
  const { text, author } = req.body;
  try {
    const newTask = await new taskModel({
      text,
      author,
    }).save();
    res.status(201).send(newTask);
  } catch (e) {
    console.log('e -> ', e);
    res.status(400).send('error accured while creating task');
  }
});

router.get('/', (req, res) => {
  const { id } = req.query;
  res.status(201).send(`your ${id} task`);
});

router.get('/getAll', async (req, res) => {
  try {
    const tasks = await taskModel.find({}).select('-__v').lean();
    res.status(201).send(tasks);
  } catch (e) {
    console.log('e -> ', e);
    res.status(400).send('error accured while getting tasks');
  }
});

export default router;

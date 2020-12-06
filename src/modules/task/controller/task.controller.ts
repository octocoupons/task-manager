import { Request, Response } from 'express';
import taskModel from '../entity/task.model';

export const createTask = async (req: Request, res: Response): Promise<void> => {
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
};

export const getTask = (req: Request, res: Response): void => {
  const { id } = req.query;
  res.status(201).send(`your ${id} task`);
};

export const getTaskList = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskModel.find({}).select('-__v').lean();
    res.status(201).send(tasks);
  } catch (e) {
    console.log('e -> ', e);
    res.status(400).send('error accured while getting tasks');
  }
};

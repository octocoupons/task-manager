import { Request, Response } from 'express';
import taskEntity from '@task/entity/task.entity';
import { TaskModel } from '@task/model/task.model';
import { logger } from '@config/winston';

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  const { text, author } = req.body;
  try {
    const newTask = await new taskEntity({
      text,
      author,
    }).save();
    return res.status(201).send(newTask);
  } catch (e) {
    logger.error('Error occured while creating new task');
    logger.error(e);
    return res.status(400).send('Error accured while creating task');
  }
};

export const getTask = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  const task = await taskEntity.findById(id).select('-__v').lean();
  if (!task) return res.status(404).send('Task with given id not found.');

  const taskModel: TaskModel = {
    id: task._id.toString(),
    text: task.text,
    author: task.author,
  };
  return res.status(201).send(taskModel);
};

export const editTask = async (req: Request, res: Response): Promise<Response> => {
  const { id, text } = req.body;
  const task = await taskEntity.findOneAndUpdate({ _id: id }, { text }, { new: true }).select('-__v').lean();
  if (!task) {
    return res.status(404).send('Task not found.');
  }
  const taskModel: TaskModel = {
    id: task._id.toString(),
    text: task.text,
    author: task.author,
  };
  return res.status(201).send(taskModel);
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  const task = await taskEntity.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(404).send('Task with given id not found.');
  }
  return res.status(201).send();
};

export const getTaskList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await taskEntity.find({}).select('-__v').lean();
    return res.status(201).send(tasks);
  } catch (e) {
    logger.error('Error occured while getting task list');
    logger.error(e);
    return res.status(400).send('Error accured while getting task list');
  }
};

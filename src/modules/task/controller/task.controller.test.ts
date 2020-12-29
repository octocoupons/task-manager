import { Request, Response } from 'express';
import taskEntity, { ITask } from '../entity/task.entity';
import { TaskModel } from '../model/task.model';
import { createTask, getTask, editTask, deleteTask, getTaskList } from './task.controller';
import { logger } from '../../../config/winston';
import mongoose from 'mongoose';

jest.mock('../entity/task.entity');
jest.mock('express');

describe('Modules > Task > Controller > Task Controller', () => {
  describe('createTask', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let save;
    beforeEach(() => {
      req = { body: { text: 'testText', author: 'testAuthor' } } as Request;
      const resStatus = jest.fn();
      const resSend = jest.fn();
      res = ({
        status: resStatus,
        send: resSend,
      } as unknown) as Response;
      resStatus.mockImplementation(() => res);
      resSend.mockImplementation(() => res);
    });

    it('should create new task and return', async () => {
      // Given
      save = taskEntity.prototype.save = jest.fn().mockResolvedValue(req.body);

      // When
      await createTask(req as Request, res as Response);

      // Then
      expect(taskEntity).toBeCalledWith(req.body);
      expect(save).toBeCalled();
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith(req.body);
    });

    it('should not create new task and return error', async () => {
      // Given
      save = taskEntity.prototype.save = jest.fn().mockRejectedValue('Database write error');
      logger.error = jest.fn();

      // When
      await createTask(req as Request, res as Response);

      // Then
      expect(taskEntity).toBeCalledWith(req.body);
      expect(save).toBeCalled();
      expect(logger.error).toHaveBeenNthCalledWith(1, 'Error occured while creating new task');
      expect(logger.error).toHaveBeenNthCalledWith(2, 'Database write error');

      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('Error accured while creating task');
    });
  });

  describe('getTask', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {
      req = ({ query: { id: '5fcb981a7319a26a419c178c' } } as unknown) as Request;
      const resStatus = jest.fn();
      const resSend = jest.fn();
      res = ({
        status: resStatus,
        send: resSend,
      } as unknown) as Response;
      resStatus.mockImplementation(() => res);
      resSend.mockImplementation(() => res);
    });

    it('should get the id from query param and return result', async () => {
      // Given
      const foundTask: any = {
        _id: mongoose.Types.ObjectId('5fcb981a7319a26a419c178c'),
        author: 'author',
        text: 'text',
      };
      taskEntity.findById = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(foundTask),
        })),
      }));

      //When
      await getTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith({
        id: '5fcb981a7319a26a419c178c',
        author: 'author',
        text: 'text',
      });
    });

    it('should return 404 if findById returns null', async () => {
      // Given
      const foundTask = null;
      taskEntity.findById = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(foundTask),
        })),
      }));

      //When
      await getTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(404);
      expect(res.send).toBeCalledWith('Task with given id not found.');
    });
  });

  describe('editTask', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {
      const resStatus = jest.fn();
      const resSend = jest.fn();
      res = ({
        status: resStatus,
        send: resSend,
      } as unknown) as Response;
      resStatus.mockImplementation(() => res);
      resSend.mockImplementation(() => res);
    });

    it('should return edited task', async () => {
      // Given
      req = ({ body: { id: '5fcb981a7319a26a419c178c', text: 'text123' } } as unknown) as Request;

      const editedTask: any = {
        _id: mongoose.Types.ObjectId('5fcb981a7319a26a419c178c'),
        author: 'asd@asd.com',
        text: 'edited',
      };
      taskEntity.findOneAndUpdate = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(editedTask),
        })),
      }));

      //When
      await editTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith({
        id: '5fcb981a7319a26a419c178c',
        author: 'asd@asd.com',
        text: 'edited',
      });
    });

    it('should return 404 if findOneAndUpdate returns null', async () => {
      // Given
      const editedTask = null;
      taskEntity.findOneAndUpdate = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(editedTask),
        })),
      }));

      //When
      await editTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(404);
      expect(res.send).toBeCalledWith('Task not found.');
    });
  });

  describe('deleteTask', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {
      const resStatus = jest.fn();
      const resSend = jest.fn();
      res = ({
        status: resStatus,
        send: resSend,
      } as unknown) as Response;
      resStatus.mockImplementation(() => res);
      resSend.mockImplementation(() => res);
    });

    it('should delete task and return 201', async () => {
      // Given
      req = ({ query: { id: '5fcb981a7319a26a419c178c' } } as unknown) as Request;

      const deletedTask: any = {
        _id: mongoose.Types.ObjectId('5fcb981a7319a26a419c178c'),
        author: 'asd@asd.com',
        text: 'deleted',
      };
      (taskEntity.findOneAndDelete = jest.fn().mockResolvedValue(deletedTask)),
        //When
        await deleteTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalled();
    });

    it('should return 404 if findOneAndUpdate returns null', async () => {
      // Given
      const deletedTask = null;
      (taskEntity.findOneAndDelete = jest.fn().mockResolvedValue(deletedTask)),
        //When
        await deleteTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(404);
      expect(res.send).toBeCalledWith('Task with given id not found.');
    });
  });

  describe('getTaskList', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {
      const resStatus = jest.fn();
      const resSend = jest.fn();
      res = ({
        status: resStatus,
        send: resSend,
      } as unknown) as Response;
      resStatus.mockImplementation(() => res);
      resSend.mockImplementation(() => res);
    });

    it('should find tasks return result', async () => {
      // Given
      const foundTasks = ['some task'];
      taskEntity.find = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(foundTasks),
        })),
      }));

      // When
      await getTaskList(req as Request, res as Response);

      // Then
      expect(taskEntity.find).toBeCalledWith({});
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith(foundTasks);
    });

    it('should return error with 400 code if taskModel.find rejects', async () => {
      // Given
      taskEntity.find = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockRejectedValue('Database write error'),
        })),
      }));
      logger.error = jest.fn();

      // When
      await getTaskList(req as Request, res as Response);

      // Then
      expect(taskEntity.find).toBeCalledWith({});
      expect(logger.error).toHaveBeenNthCalledWith(1, 'Error occured while getting task list');
      expect(logger.error).toHaveBeenNthCalledWith(2, 'Database write error');
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('Error accured while getting task list');
    });
  });
});

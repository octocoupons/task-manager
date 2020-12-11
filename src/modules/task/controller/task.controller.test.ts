import { Request, Response } from 'express';
import taskModel from '../entity/task.model';
import { createTask, getTask, getTaskList } from './task.controller';

jest.mock('../entity/task.model');
jest.mock('express');

describe('Modules > Task > Controller > Task Controller', () => {
  describe('Create Task', () => {
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
      save = taskModel.prototype.save = jest.fn().mockResolvedValue(req.body);

      // When
      await createTask(req as Request, res as Response);

      // Then
      expect(taskModel).toBeCalledWith(req.body);
      expect(save).toBeCalled();
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith(req.body);
    });

    it('should not create new task and return error', async () => {
      // Given
      save = taskModel.prototype.save = jest.fn().mockRejectedValue('some error');
      console.log = jest.fn();

      // When
      await createTask(req as Request, res as Response);

      // Then
      expect(taskModel).toBeCalledWith(req.body);
      expect(save).toBeCalled();
      expect(console.log).toBeCalledWith('e -> ', 'some error');
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('error accured while creating task');
    });
  });

  describe('getTask', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {
      req = ({ query: { id: '123' } } as unknown) as Request;
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
      // Given && When
      await getTask(req as Request, res as Response);

      // Then
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith(`your 123 task`);
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
      taskModel.find = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(foundTasks),
        })),
      }));

      // When
      await getTaskList(req as Request, res as Response);

      // Then
      expect(taskModel.find).toBeCalledWith({});
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith(foundTasks);
    });

    it('should return error with 400 code if taskModel.find rejects', async () => {
      // Given
      taskModel.find = jest.fn().mockRejectedValueOnce('fail');

      // When
      await getTaskList(req as Request, res as Response);

      // Then
      expect(taskModel.find).toBeCalledWith({});
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('error accured while getting tasks');
    });
  });
});

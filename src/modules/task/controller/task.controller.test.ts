import { Request, Response } from 'express';
import taskModel from '../entity/task.model';
import { createTask } from './task.controller';

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
});

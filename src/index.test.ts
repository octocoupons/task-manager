import request from 'supertest';
import express from 'express';
import { bootServer } from './index';

let server: express.Application;

beforeAll(async () => {
  server = await bootServer();
});

describe('index tests', () => {
  it('should return 200 & valid response', (done) => {
    request(server)
      .get(`/`)
      .expect('Content-Type', /text/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toEqual('Hello World!');
        done();
      });
  });
});

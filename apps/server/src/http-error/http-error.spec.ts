import { HttpError } from './http-error';

describe('HttpError', () => {
  it('should be defined', () => {
    expect(new HttpError()).toBeDefined();
  });
});

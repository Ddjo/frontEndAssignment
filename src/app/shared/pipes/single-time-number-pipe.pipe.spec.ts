import { SingleTimeNumberPipe } from './single-time-number-pipe.pipe';

describe('SingleTimeNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new SingleTimeNumberPipe();
    expect(pipe).toBeTruthy();
  });
});

import { getEncryptionKey, getLoopSize } from '../cryptography';

describe('getLoopSize', () => {
  it('should get the loop size', () => {
    expect(getLoopSize(5764801, 7, 20201227)).toBe(8);
  });
});

describe('getEncryptionKey', () => {
  it('should get the encryption Key', () => {
    expect(getEncryptionKey(5764801, 11, 20201227)).toBe(14897079);
  });
});

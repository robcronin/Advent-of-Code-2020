export const getLoopSize = (
  publicKey: number,
  subjectNumber: number,
  divisor: number,
): number => {
  let loopSize = 0;
  let value = 1;
  while (true) {
    value *= subjectNumber;
    value %= divisor;
    loopSize++;
    if (value === publicKey) return loopSize;
  }
};

export const getEncryptionKey = (
  publicKey: number,
  loopSize: number,
  divisor: number,
): number => {
  let result = 1;
  for (let i = 0; i < loopSize; i++) {
    result *= publicKey;
    result %= divisor;
  }
  return result;
};

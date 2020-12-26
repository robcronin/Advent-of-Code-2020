import { getEncryptionKey, getLoopSize } from '../utils/cryptography';

export const day25 = (publicKeys: number[]) => {
  const divisor = 20201227;
  const [cardPublic, doorPublic] = publicKeys;
  const cardLoopSize = getLoopSize(cardPublic, 7, divisor);
  const encryptionKey = getEncryptionKey(doorPublic, cardLoopSize, divisor);
  return encryptionKey;
};

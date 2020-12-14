import { applyMask, applyMask2 } from '../utils/dockingInstruction';
import { DockingInstruction } from '../utils/input';

export const day14 = (dockingInstructions: DockingInstruction[]) => {
  const memory: Record<number, bigint> = {};
  let currentMask: string = '';
  dockingInstructions.forEach((di) => {
    if (di.mask !== undefined) {
      currentMask = di.mask;
    } else {
      const newValue = applyMask(currentMask, BigInt(di.memValue));
      memory[di.memAddress] = newValue;
    }
  });

  return Object.values(memory).reduce((acc, el) => acc + el, BigInt(0));
};

export const day14part2 = (dockingInstructions: DockingInstruction[]) => {
  const memory: Record<number, bigint> = {};
  let currentMask: string = '';
  dockingInstructions.forEach((di) => {
    if (di.mask !== undefined) {
      currentMask = di.mask;
    } else {
      const newAddresses = applyMask2(currentMask, BigInt(di.memAddress));
      newAddresses.forEach((newAddress) => {
        memory[parseInt(newAddress.toString(), 10)] = BigInt(di.memValue);
      });
    }
  });

  return Object.values(memory).reduce((acc, el) => acc + el, BigInt(0));
};

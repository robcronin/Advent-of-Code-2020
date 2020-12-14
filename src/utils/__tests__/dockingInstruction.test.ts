import { applyMask, applyMask2 } from '../dockingInstruction';

describe('applyMask', () => {
  it('should apply XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X to 11', () => {
    expect(applyMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', BigInt(11))).toBe(
      BigInt(73),
    );
  });
  it('should apply XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X to 101', () => {
    expect(applyMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', BigInt(101))).toBe(
      BigInt(101),
    );
  });
  it('should apply XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX100X to 101', () => {
    expect(applyMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX100X', BigInt(101))).toBe(
      BigInt(105),
    );
  });
  it('should apply 110110X110100X10001X110110001000100X on 12045', () => {
    expect(
      applyMask('110110X110100X10001X110110001000100X', BigInt(12045)),
    ).toBe(BigInt(58420549769));
  });
});

describe('applyMask2', () => {
  it('should apply 0000000000000000000000000000000000XX to 0', () => {
    expect(
      applyMask2('0000000000000000000000000000000000XX', BigInt(0)),
    ).toEqual([BigInt(0), BigInt(1), BigInt(2), BigInt(3)]);
  });
  it('should apply 000000000000000000000000000000X1001X to 42', () => {
    expect(
      applyMask2('000000000000000000000000000000X1001X', BigInt(42)),
    ).toEqual([BigInt(26), BigInt(27), BigInt(58), BigInt(59)]);
  });
  it('should apply 000000000000000000000000000000110010 to 42 with no floats', () => {
    expect(
      applyMask2('000000000000000000000000000000110010', BigInt(42)),
    ).toEqual([BigInt(58)]);
  });
});

import { ShipNavigationInstruction } from '../input';
import {
  getNewDirection,
  getRotation,
  navigateShipToWaypoint,
} from '../shipNavigation';

describe('getNewDirection', () => {
  it('should return for right 90', () => {
    expect(getNewDirection('E', 'R', 90)).toEqual('S');
  });
  it('should return for left 90', () => {
    expect(getNewDirection('N', 'L', 90)).toEqual('W');
  });
  it('should return for left 270', () => {
    expect(getNewDirection('W', 'L', 270)).toEqual('N');
  });
});

describe('getRotation', () => {
  it('should rotate right 90', () => {
    expect(getRotation('R', 90, 10, 4)).toEqual({ newX: 4, newY: -10 });
  });
  it('should rotate right 90 from negative position', () => {
    expect(getRotation('R', 90, -4, 10)).toEqual({ newX: 10, newY: 4 });
  });
  it('should rotate left 90', () => {
    expect(getRotation('L', 90, 10, 4)).toEqual({ newX: -4, newY: 10 });
  });
  it('should rotate right 180', () => {
    expect(getRotation('R', 180, 10, 4)).toEqual({ newX: -10, newY: -4 });
  });
  it('should rotate left 180', () => {
    expect(getRotation('L', 180, 10, 4)).toEqual({ newX: -10, newY: -4 });
  });
  it('should rotate right 270', () => {
    expect(getRotation('R', 270, 10, 4)).toEqual({ newX: -4, newY: 10 });
  });
  it('should rotate left 270', () => {
    expect(getRotation('L', 270, 10, 4)).toEqual({ newX: 4, newY: -10 });
  });
});

describe('navigateShipToWaypoint', () => {
  it('should navigate from start', () => {
    const shipNavigationInstructions: ShipNavigationInstruction[] = [
      { action: 'F', value: 10 },
      { action: 'N', value: 3 },
      { action: 'F', value: 7 },
      { action: 'R', value: 90 },
      { action: 'F', value: 11 },
    ];
    expect(navigateShipToWaypoint(shipNavigationInstructions, 10, 1)).toEqual({
      x: 214,
      y: -72,
    });
  });
  it('should navigate from given positions', () => {
    const shipNavigationInstructions: ShipNavigationInstruction[] = [
      { action: 'F', value: 10 },
      { action: 'N', value: 3 },
      { action: 'F', value: 7 },
      { action: 'R', value: 90 },
      { action: 'F', value: 11 },
    ];
    expect(
      navigateShipToWaypoint(shipNavigationInstructions, 10, 1, 20, 30),
    ).toEqual({
      x: 234,
      y: -42,
    });
  });
});

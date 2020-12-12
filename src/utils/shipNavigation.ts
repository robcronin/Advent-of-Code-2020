import { ShipNavigationInstruction } from './input';

export type Direction = 'E' | 'N' | 'S' | 'W';

export const directionMovements: Record<Direction, [number, number]> = {
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
  N: [0, 1],
};

export const getNewDirection = (
  currentDirection: Direction,
  leftOrRight: 'L' | 'R',
  angle: number,
): Direction => {
  const directions: Direction[] = ['N', 'E', 'S', 'W'];
  const movement = leftOrRight === 'R' ? 1 : -1;
  const currentIndex = directions.findIndex(
    (direction) => direction === currentDirection,
  );
  const indexChange = angle / 90;
  const newDirection =
    directions[(currentIndex + movement * indexChange + 4) % 4];
  return newDirection;
};

export const getRotation = (
  leftOrRight: 'L' | 'R',
  angle: number,
  x: number,
  y: number,
) => {
  let newX = 0;
  let newY = 0;
  const directions: Direction[] = ['N', 'E', 'S', 'W'];
  const movement = leftOrRight === 'R' ? 1 : -1;
  const indexChange = angle / 90;

  const newXDirection = directions[(1 + movement * indexChange + 4) % 4];
  const [dxx, dyx] = directionMovements[newXDirection];
  newX += dxx * x;
  newY += dyx * x;

  const newYDirection = directions[(movement * indexChange + 4) % 4];
  const [dxy, dyy] = directionMovements[newYDirection];
  newX += dxy * y;
  newY += dyy * y;

  return { newX, newY };
};

export const navigateShip = (
  shipNavigationInstructions: ShipNavigationInstruction[],
  startDirection: Direction = 'E',
  startX: number = 0,
  startY: number = 0,
): { x: number; y: number; direction: Direction } => {
  let x = startX;
  let y = startY;
  let direction: Direction = startDirection;
  shipNavigationInstructions.forEach(({ action, value }) => {
    if (action === 'L' || action === 'R') {
      direction = getNewDirection(direction, action, value);
    } else if (action === 'F') {
      const [dx, dy] = directionMovements[direction];
      x += dx * value;
      y += dy * value;
    } else {
      const [dx, dy] = directionMovements[action];
      x += dx * value;
      y += dy * value;
    }
  });
  return { x, y, direction };
};

export const navigateShipToWaypoint = (
  shipNavigationInstructions: ShipNavigationInstruction[],
  startWayX: number,
  startWayY: number,
  startX: number = 0,
  startY: number = 0,
): { x: number; y: number } => {
  let x = startX;
  let y = startY;
  let wayX = startWayX;
  let wayY = startWayY;
  shipNavigationInstructions.forEach(({ action, value }) => {
    if (action === 'L' || action === 'R') {
      const { newX, newY } = getRotation(action, value, wayX, wayY);
      wayX = newX;
      wayY = newY;
    } else if (action === 'F') {
      x += wayX * value;
      y += wayY * value;
    } else {
      const [dx, dy] = directionMovements[action];
      wayX += dx * value;
      wayY += dy * value;
    }
  });
  return { x, y };
};

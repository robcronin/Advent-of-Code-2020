import { ShipNavigationInstruction } from '../utils/input';
import { navigateShip, navigateShipToWaypoint } from '../utils/shipNavigation';

export const day12 = (
  shipNavigationInstructions: ShipNavigationInstruction[],
) => {
  const { x, y } = navigateShip(shipNavigationInstructions);
  return Math.abs(x) + Math.abs(y);
};

export const day12part2 = (
  shipNavigationInstructions: ShipNavigationInstruction[],
) => {
  const { x, y } = navigateShipToWaypoint(shipNavigationInstructions, 10, 1);
  return Math.abs(x) + Math.abs(y);
};

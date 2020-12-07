import { BagConfig } from './input';

export const bagCanContain = (
  outerId: string,
  innerId: string,
  bagConfigs: Record<string, BagConfig>,
): boolean => {
  const bagConfig = bagConfigs[outerId];
  if (!bagConfig) return false;
  if (bagConfig.contents.find((bagContent) => bagContent.id === innerId))
    return true;
  return bagConfig.contents.some((bagContent) =>
    bagCanContain(bagContent.id, innerId, bagConfigs),
  );
};

export const countTotalBags = (
  bagId: string,
  bagConfigs: Record<string, BagConfig>,
): number =>
  bagConfigs[bagId].contents.reduce(
    (result, contain) =>
      result + contain.number * countTotalBags(contain.id, bagConfigs),
    1,
  );

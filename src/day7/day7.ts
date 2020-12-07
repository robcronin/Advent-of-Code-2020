import { countArrayByCondition } from '../utils/array';
import { BagConfig } from '../utils/input';
import { bagCanContain, countTotalBags } from '../utils/luggage';

export const day7 = (bagConfigs: Record<string, BagConfig>) =>
  countArrayByCondition(Object.keys(bagConfigs), (bagConfigKey) =>
    bagCanContain(bagConfigKey, 'shinygold', bagConfigs),
  );

export const day7part2 = (bagConfigs: Record<string, BagConfig>) =>
  countTotalBags('shinygold', bagConfigs) - 1;

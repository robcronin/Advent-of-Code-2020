import { countArrayByCondition } from '../utils/array';
import { SatelliteResponse } from '../utils/input';
import { getValidPatternsForRule } from '../utils/satellite';

export const day19 = (satelliteResponse: SatelliteResponse) => {
  const validPatterns = getValidPatternsForRule(0, satelliteResponse.rules);
  return countArrayByCondition(satelliteResponse.messages, (message) =>
    validPatterns.includes(message),
  );
};

/*
 * Based on the nudge in the question this is not a general solution but based on the specific input
 * Assumption: Lengths of 42 and 31 are always the same for all valid patterns
 * Rule 8 is a combo of many rules 42 (at least 1)
 * Rule 11 is a combo of many rules 42 and then the same number of rules 31
 * Rule 0 is 8 11 => will have many 42s followed by 31s (and at least one more 42 than 31)
 */
export const day19part2 = (satelliteResponse: SatelliteResponse) => {
  const validPatterns42 = getValidPatternsForRule(42, satelliteResponse.rules);
  const validPatterns31 = getValidPatternsForRule(31, satelliteResponse.rules);
  const len42 = validPatterns42[0].length;

  return countArrayByCondition(
    satelliteResponse.messages,
    (message): boolean => {
      const chunks = [];
      for (let i = 0; i < message.length / len42; i++) {
        chunks.push(message.slice(i * len42, (i + 1) * len42));
      }
      let checking42 = true;
      let match42 = 0;
      let match31 = 0;
      const isCombo4231: boolean = chunks.every((chunk) => {
        checking42 &&= validPatterns42.includes(chunk);
        if (checking42) {
          match42++;
          return true;
        } else {
          if (validPatterns31.includes(chunk)) {
            match31++;
            return true;
          }
          return false;
        }
      });
      return (
        isCombo4231 &&
        match42 >= 2 &&
        match31 >= 1 &&
        match42 - match31 >= 1 &&
        match31 + match42 === chunks.length &&
        message.length % len42 === 0
      );
    },
  );
};

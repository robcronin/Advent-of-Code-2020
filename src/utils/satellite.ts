import { SatelliteRule } from './input';

export const getValidPatternsForRule = (
  ruleNum: number,
  rules: Record<number, SatelliteRule>,
  currentPatterns: string[] = [''],
): string[] => {
  const rule = rules[ruleNum];
  if (rule.pattern !== undefined) {
    return currentPatterns.map(
      (currentPattern) => currentPattern + rule.pattern,
    );
  } else {
    return rule.subRules.reduce((acc: string[], subRule) => {
      const newSubPatterns = subRule.reduce((acc, subRuleNum) => {
        const subRulePatterns = getValidPatternsForRule(subRuleNum, rules);
        const nextResult: string[] = [];
        acc.forEach((current) => {
          subRulePatterns.forEach((subRulePattern) => {
            nextResult.push(current + subRulePattern);
          });
        });
        return nextResult;
      }, currentPatterns);
      return [...acc, ...newSubPatterns];
    }, []);
  }
};

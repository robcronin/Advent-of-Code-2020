import { parseFoodList } from '../utils/input';
import { logAnswer } from '../utils/logging';
import { day21, day21part2 } from './day21';
import { data } from './day21.data';

const testString = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;
const testData = parseFoodList(testString);

describe('day 21', () => {
  it('test cases', () => {
    expect(day21(testData)).toBe(5);
  });

  it('answer', () => {
    const answer = day21(data);
    logAnswer(answer, 21, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe(2075);
  });
});

describe('day 21 part 2', () => {
  it('test cases', () => {
    expect(day21part2(testData)).toBe('mxmxvkd,sqjhc,fvjkl');
  });

  it('answer', () => {
    const answer = day21part2(data);
    logAnswer(answer, 21, 2);
    expect(answer).toBe('zfcqk,mdtvbb,ggdbl,frpvd,mgczn,zsfzq,kdqls,kktsjbh');
  });
});

import { BagConfig } from '../input';
import { bagCanContain, countTotalBags } from '../luggage';

const bagConfigs: Record<string, BagConfig> = {
  brightwhite: {
    adjective: 'bright',
    color: 'white',
    contents: [
      { id: 'shinygold', number: 2 },
      { id: 'irishgreen', number: 3 },
    ],
    id: 'brightwhite',
  },
  darkorange: {
    adjective: 'dark',
    color: 'orange',
    contents: [
      { id: 'brightwhite', number: 3 },
      { id: 'mutedyellow', number: 4 },
    ],
    id: 'darkorange',
  },
  fadedblue: {
    adjective: 'faded',
    color: 'blue',
    contents: [],
    id: 'fadedblue',
  },
  shinygold: {
    adjective: 'shiny',
    color: 'gold',
    contents: [{ id: 'fadedblue', number: 3 }],
    id: 'shinygold',
  },
  irishgreen: {
    adjective: 'irish',
    color: 'green',
    contents: [],
    id: 'irishgreen',
  },
  mutedplum: {
    adjective: 'muted',
    color: 'plum',
    contents: [
      { id: 'darkorange', number: 5 },
      { id: 'paleturquoise', number: 3 },
      { id: 'fadedchartreuse', number: 3 },
    ],
    id: 'mutedplum',
  },
};

describe('bagCanContain', () => {
  it('should return true for first level contain', () => {
    expect(bagCanContain('brightwhite', 'shinygold', bagConfigs)).toBe(true);
  });
  it('should return true for second level contain', () => {
    expect(bagCanContain('darkorange', 'shinygold', bagConfigs)).toBe(true);
  });
  it('should return true for third level contain', () => {
    expect(bagCanContain('mutedplum', 'shinygold', bagConfigs)).toBe(true);
  });
  it('should return false for no contain', () => {
    expect(bagCanContain('mutedplum', 'boringgrey', bagConfigs)).toBe(false);
  });
});

describe('countTotalBags', () => {
  it('should return correct answer for no contents', () => {
    expect(countTotalBags('fadedblue', bagConfigs)).toBe(1);
  });
  it('should return correct answer for one bag content', () => {
    expect(countTotalBags('shinygold', bagConfigs)).toBe(4);
  });
  it('should return correct answer for two level bag content', () => {
    expect(countTotalBags('brightwhite', bagConfigs)).toBe(12);
  });
});

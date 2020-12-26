import { LinkedList, LinkNode } from '../linkedList';

describe('properties', () => {
  it('should maintain properties after operations', () => {
    const list = new LinkedList();
    expect(list.length).toEqual(0);
    expect(list.head).toEqual(null);
    expect(list.end).toEqual(null);

    list.push(1);
    const node1 = list.findNode(1) as LinkNode;
    expect(list.length).toEqual(1);
    expect(list.head).toEqual(node1);
    expect(list.end).toEqual(node1);

    list.push(2);
    const node2 = list.findNode(2) as LinkNode;
    expect(list.length).toEqual(2);
    expect(list.head).toEqual(node1);
    expect(list.end).toEqual(node2);
    expect(list.length).toEqual(2);

    list.shift();
    expect(list.length).toEqual(1);
    expect(list.head).toEqual(node2);
    expect(list.end).toEqual(node2);
    expect(list.length).toEqual(1);

    list.splice(node2, 0, [3, 4]);
    const node4 = list.findNode(4) as LinkNode;
    expect(list.length).toEqual(3);
    expect(list.head).toEqual(node2);
    expect(list.end).toEqual(node4);
  });
});

describe('push', () => {
  it('should add to the end of the list', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    expect(list.convertToArray()).toEqual([1, 2]);
  });
});

describe('createFromArray', () => {
  it('should create from an array', () => {
    const list = new LinkedList();
    list.push(1);
    list.createFromArray([4, 5, 6]);
    expect(list.convertToArray()).toEqual([4, 5, 6]);
    expect(list.length).toBe(3);
  });
});

describe('shift', () => {
  it('should remove the starting element', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    const shiftedValue = list.shift();
    expect(shiftedValue).toBe(1);
    expect(list.convertToArray()).toEqual([2]);
  });
  it('should remove the starting element if only one element', () => {
    const list = new LinkedList();
    list.push(2);
    const shiftedValue = list.shift();
    expect(shiftedValue).toBe(2);
    expect(list.convertToArray()).toEqual([]);
  });
  it('should return undefined if no elements', () => {
    const list = new LinkedList();
    const shiftedValue = list.shift();
    expect(shiftedValue).toBe(undefined);
    expect(list.convertToArray()).toEqual([]);
  });
});

describe('findNode', () => {
  it('should find a given node', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    expect(list.findNode(2)).toEqual({ next: null, value: 2 });
  });
  it('should return undefined if not found', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    expect(list.findNode(3)).toEqual(undefined);
  });
});

describe('splice', () => {
  it('should add an array in the middle', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    const node1 = list.findNode(1) as LinkNode;
    list.splice(node1, 0, [3, 4]);
    const node3 = list.findNode(3) as LinkNode;

    expect(list.convertToArray()).toEqual([1, 3, 4, 2]);
    expect(list.length).toEqual(4);
    expect(list.end).toEqual({ next: null, value: 2 });
    expect(list.head).toEqual({ next: node3, value: 1 });
  });
  it('should add an array at the bottom', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    const node2 = list.findNode(2) as LinkNode;
    list.splice(node2, 0, [3, 4]);

    expect(list.convertToArray()).toEqual([1, 2, 3, 4]);
    expect(list.length).toEqual(4);
    expect(list.end).toEqual({ next: null, value: 4 });
    expect(list.head).toEqual({ next: node2, value: 1 });
  });
  it('should add an empty array at the bottom', () => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    const node2 = list.findNode(2) as LinkNode;
    list.splice(node2, 0, []);

    expect(list.convertToArray()).toEqual([1, 2]);
    expect(list.length).toEqual(2);
    expect(list.end).toEqual({ next: null, value: 2 });
    expect(list.head).toEqual({ next: node2, value: 1 });
  });
  it('should throw error if trying to delete while splicing', () => {
    const list = new LinkedList();
    list.push(2);
    const node2 = list.findNode(2) as LinkNode;
    expect(() => list.splice(node2, 1, [3, 4])).toThrowError(
      'Not implemented deleting while splicing',
    );
  });
});

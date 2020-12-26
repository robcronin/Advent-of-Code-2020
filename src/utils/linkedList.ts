export class LinkNode {
  value: number;
  next: LinkNode | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: LinkNode | null;
  end: LinkNode | null;
  length: number;
  nodeMapper: Map<number, LinkNode>;
  constructor(array: number[] | null = null) {
    this.head = null;
    this.end = null;
    this.length = 0;
    this.nodeMapper = new Map();
    if (array) this.createFromArray(array);
  }

  reset(): void {
    this.head = null;
    this.end = null;
    this.length = 0;
    this.nodeMapper = new Map();
  }

  convertToArray(): number[] {
    const result: number[] = [];
    let node = this.head;
    while (node !== null) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }

  createFromArray(arr: number[]): void {
    this.reset();
    arr.forEach((v) => this.push(v));
  }

  push(newValue: number) {
    const newNode = new LinkNode(newValue);
    this.nodeMapper.set(newValue, newNode);
    if (this.end) {
      this.end.next = newNode;
      this.end = newNode;
    } else {
      this.head = newNode;
      this.end = newNode;
    }
    this.length++;
  }

  shift(): number | undefined {
    if (!this.head) return undefined;

    const oldHeadValue = this.head.value;
    this.nodeMapper.delete(oldHeadValue);
    this.length--;
    if (!this.head.next) {
      this.head = null;
      this.end = null;
    } else {
      this.head = this.head.next;
    }

    return oldHeadValue;
  }

  findNode(value: number): LinkNode | undefined {
    return this.nodeMapper.get(value);
  }

  splice(node: LinkNode, numToDelete: number, newValues: number[]): void {
    if (numToDelete !== 0)
      throw new Error('Not implemented deleting while splicing');

    const newList = new LinkedList(newValues);
    newValues.forEach((newValue) => {
      this.nodeMapper.set(newValue, newList.findNode(newValue) as LinkNode);
    });

    const oldEnd = node.next;
    node.next = newList.head;
    if (newList.end) newList.end.next = oldEnd;
    if (!oldEnd && newValues.length > 0) this.end = newList.end;
    this.length += newList.length;
  }
}

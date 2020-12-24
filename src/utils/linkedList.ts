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
  constructor(head = null) {
    this.head = head;
    this.end = head;
    this.length = head ? 1 : 0;
  }

  reset(): void {
    this.head = null;
    this.end = null;
    this.length = 0;
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
    if (arr.length === 0) {
      this.reset();
      return;
    }
    this.head = new LinkNode(arr.shift() as number);
    let lastNode = this.head;
    this.length = 1;
    arr.forEach((newValue) => {
      lastNode.next = new LinkNode(newValue);
      lastNode = lastNode.next;
      this.length++;
    });
    this.end = lastNode;
  }

  push(newValue: number) {
    const newNode = new LinkNode(newValue);
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
    let currentNode: LinkNode | null = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) return currentNode;
      currentNode = currentNode.next;
    }
    return undefined;
  }

  splice(node: LinkNode, numToDelete: number, newValues: number[]): void {
    if (numToDelete !== 0)
      throw new Error('Not implemented deleting while splicing');
    const newList = new LinkedList();
    const oldEnd = node.next;
    newList.createFromArray(newValues);
    node.next = newList.head;
    newList.end.next = oldEnd;
    if (!oldEnd) this.end = newList.end;
    this.length += newList.length;
  }
}

class MinHeap {
  #values = [];

  get print() {
    return this.#values;
  }

  get size() {
    return this.#values.length;
  }

  insert = (elem) => {
    this.#values.push(elem);
    this.#bubbleUp();
  };

  extract = () => {};

  #bubbleUp = () => {
    let index = this.#values.length - 1;
    const element = this.#values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.#values[parentIndex];
      if (element.date >= parent.date) break;
      this.#values[parentIndex] = element;
      this.#values[index] = parent;
      index = parentIndex;
    }
  };

  getMin = () => {
    const min = this.#values[0];
    const end = this.#values.pop();
    if (this.#values.length > 0 ) {
      this.#values[0] = end;
      this.#bubbleDown();
    }
    return min;
  };

  #bubbleDown = () => {
    let index = 0;
    const length = this.#values.length;
    const element = this.#values[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild;
      let rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.#values[leftChildIndex];
        if (leftChild.date < element.date) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.#values[rightChildIndex];
        if (
          (swap === null && rightChild.date < element.date) ||
          (swap !== null && rightChild.date < leftChild.date)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.#values[index] = this.#values[swap];
      this.#values[swap] = element;
      index = swap;
    }
  };
}

module.exports = MinHeap;

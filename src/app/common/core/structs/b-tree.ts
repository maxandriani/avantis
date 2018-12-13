import { IBTreeLeaf } from '../interfaces/i-b-tree-leaf';
import { IllegalOperationError } from '../errors/illegal-operation.error';

export class BTree<K, T> implements IterableIterator<{ key: K; value: T }> {
  protected root: IBTreeLeaf<K, T>;
  protected currentIterable: IBTreeLeaf<K, T> = null;
  protected iterableQueue: IBTreeLeaf<K, T>[];
  protected iterableDone: boolean;

  constructor() {
    this.iterableQueue = [];
    this.currentIterable = null;
  }

  batch(values: Array<{ key: K, value: T }>) {
    for (const v of values) {
      this.push(v.key, v.value);
    }
  }

  push(key: K, value: T): T {
    const node: IBTreeLeaf<K, T> = {
      key: key,
      value: value
    };

    // Check root
    if (this.root == null) {
      this.root = node;
    } else {
      // let's work...
      this.root = this._add(node, this.root);
    }

    return value;
  }

  update(key: K, value: T): IBTreeLeaf<K, T> {
    return this._update(key, value);
  }

  protected _update(key: K, value: T): IBTreeLeaf<K, T> {
    if (this.root == null) {
      this.push(key, value);
      return;
    }

    const node = this._find(key, this.root);

    if (node == null) {
      this.push(key, value);
    } else {
      node.value = value;
    }

    return node;
  }

  protected _add(
    leaf: IBTreeLeaf<K, T>,
    root: IBTreeLeaf<K, T>
  ): IBTreeLeaf<K, T> {
    if (leaf.key < root.key) {
      // go left
      if (!root.left) {
        root.left = leaf;
      } else {
        root.left = this._add(leaf, root.left);
      }
    } else if (leaf.key > root.key) {
      // go right
      if (!root.right) {
        root.right = leaf;
      } else {
        root.right = this._add(leaf, root.right);
      }
    } else {
      throw new IllegalOperationError(
        'You can\'t add sibling keys on a binary tree'
      );
    }

    return root;
  }

  remove(key: K) {
    // Call recursive state
    this.root = this._remove(key, this.root);
  }

  protected _remove(key: K, root: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    let node: IBTreeLeaf<K, T> = null;

    /**
     * If root is null, we have the follow situations:
     * - The tree is empty;
     * - We can't found the key node
     */
    if (root == null) {
      return root;

      /**
       * Now, we will perform the search by recursive way
       */
    } else if (key < root.key) {
      // search left side
      root.left = this._remove(key, root.left);
    } else if (key > root.key) {
      // search right side
      root.right = this._remove(key, root.right);
      /**
       * If the code is here, so key is equals to root.Key;
       */
    } else {
      /**
       * Now, we will check the three delete cases
       */

      // Check leaf case
      if (!root.left && !root.right) {
        root = undefined;

        // Check the single branch case
      } else if (!root.left) {
        // Perform right operation
        root = root.right;
      } else if (!root.right) {
        // Perform left operation
        root = root.left;

        // Unfortunary we have the third case. Two branches case
      } else {
        // Using MAX in LEFT strategy
        node = root.right;
        // Go to last right node (it is always the MAX value
        while (node.left) {
          node = node.left;
        }
        // We can't just replace this node, we need to copy its value and then perform a new remove operation
        root.key = node.key;
        root.value = node.value;

        // Let's remove the duplicated
        root.right = this._remove(node.key, root.right);
      }
    }

    return root;
  }

  protected _find(key: K, root: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    let leaf: IBTreeLeaf<K, T> = null;

    if (key === root.key) {
      return root;
    } else if (key < root.key) {
      // search left
      if (root.left) {
        leaf = this._find(key, root.left);
      }
    } else {
      // search right
      if (root.right) {
        leaf = this._find(key, root.right);
      }
    }

    return leaf;
  }

  find(key: K): T {
    if (!this.root) {
      return undefined;
    }
    const node: IBTreeLeaf<K, T> = this._find(key, this.root);
    if (node) {
      return node.value;
    } else {
      return undefined;
    }
  }

  levelOf(key: K): number {
    let node: IBTreeLeaf<K, T> = this.root;
    let count = 0;

    while (node) {
      if (node.key === key) {
        return count;
      } else if (key < node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
      count++;
    }

    return -1;
  }

  levels(): number {
    return this._levels(this.root);
  }

  protected _levels(node: IBTreeLeaf<K, T>) {
    let left: number;
    let right: number;

    if (!node) {
      return 0;
    } else {
      left = this._levels(node.left);
      right = this._levels(node.right);
      if (left > right) {
        return left++;
      } else {
        return right++;
      }
    }
  }

  serialize(): { key: K; value: T }[] {
    const r = [];
    let a = this.next();

    while (!a.done) {
      if (a.value) {
        r.push(a.value);
        a = this.next();
      }
    }

    return r;
  }

  [Symbol.iterator](): IterableIterator<{ key: K; value: T }> {
    return this;
  }

  next(value?: any): IteratorResult<{ key: K; value: T }> {
    const r: IteratorResult<{ key: K; value: T }> = {
      value,
      done: true
    };

    if (!this.root || this.iterableDone) {
      this.iterableDone = false;
      return r;
    }

    // Check if it is first iterable and iterable does not running
    if (this.iterableQueue.length === 0 && this.currentIterable == null) {
      this.currentIterable = this.root;
      // Get fist node in sequence
      while (this.currentIterable.left) {
        this.iterableQueue.push(this.currentIterable);
        this.currentIterable = this.currentIterable.left;
      }
    }

    // Prepare return value
    if (this.currentIterable) {
      r.done = false;
      r.value = {
        key: this.currentIterable.key,
        value: this.currentIterable.value
      };
    }

    // Find next item
    // If current node has a right hand...
    if (this.currentIterable.right) {
      // this.iterableQueue.push(this.currentIterable);
      this.currentIterable = this.currentIterable.right;
      // We need to find the extreame left hand of right hand
      while (this.currentIterable.left) {
        this.iterableQueue.push(this.currentIterable);
        this.currentIterable = this.currentIterable.left;
      }
      // So.. current node has no left and right hands. We are on the bottom. Time to call parent
    } else if (this.iterableQueue.length > 0) {
      this.currentIterable = this.iterableQueue.pop();
    } else {
      this.currentIterable = null;
      this.iterableDone = true;
    }

    return r;
  }

  return?(value?: any): IteratorResult<{ key: K; value: T }> {
    this.currentIterable = null;
    return {
      value: value,
      done: this.currentIterable === null
    };
  }

  throw?(e?: any): IteratorResult<{ key: K; value: T }> {
    this.currentIterable = null;
    if (e) {
      throw e;
    }
    throw new Error('Iterable Exception');
  }
}

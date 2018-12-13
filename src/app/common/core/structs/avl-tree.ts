import { BTree } from './b-tree';
import { IBTreeLeaf } from '../interfaces/i-b-tree-leaf';
import { AvlBalanceEnum } from '../enum/avl-balance.enum';

/**
 * @TODO: Implements iterable interface
 */
export class AvlTree<K, T> extends BTree<K, T> {

  protected _calcLeftLevel(leaf: IBTreeLeaf<K, T>): number {
    let sum = 0;

    if (leaf && leaf.left) {
      sum = this._calcLeftLevel(leaf.left);
      sum++;
    }

    return sum;
  }

  protected _calcRightLevel(leaf: IBTreeLeaf<K, T>): number {
    let sum = 0;

    if (leaf && leaf.right) {
      sum = this._calcRightLevel(leaf.right);
      sum++;
    }

    return sum;
  }

  protected _calcBalanceIndex(leaf: IBTreeLeaf<K, T>): number {

    const lSum = this._calcLeftLevel(leaf);
    const rSum = this._calcRightLevel(leaf);
    const r = (lSum - rSum);

    return r;
  }

  protected _rightRotation(leaf: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    // tmp is the new root with lead on right hand
    const tmp = leaf.left;
    // save tmp right hand
    leaf.left = tmp.right;
    tmp.right = leaf;

    return tmp;
  }

  protected _leftRotation(leaf: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    // tmp is the new root with leaf on left hand
    const tmp = leaf.right;
    // save tmp left hand
    leaf.right = tmp.left;
    tmp.left = leaf;

    return tmp;
  }

  protected _leftRightRotation(leaf: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    leaf = this._leftRotation(leaf);
    leaf = this._rightRotation(leaf);
    return leaf;
  }


  protected _rightLeftRotation(leaf: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    leaf = this._rightRotation(leaf);
    leaf = this._leftRotation(leaf);
    return leaf;
  }

  // push(key: K, value: T): T {
  //   const v = super.push(key, value);
  //   this.root = this._balance(this.root);
  //   return v;
  // }

  protected _add(leaf: IBTreeLeaf<K, T>, root: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    return this._balance(super._add(leaf, root));
  }

  protected _remove(key: K, root: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    return this._balance(super._remove(key, root));
  }

  protected _balance(root: IBTreeLeaf<K, T>): IBTreeLeaf<K, T> {
    const i = this._calcBalanceIndex(root);
    let child: number;

    if (i === AvlBalanceEnum.UnbalancedLeft) {
      child = this._calcBalanceIndex(root.left);
      // Left Left
      if (child === AvlBalanceEnum.Balanced || child === AvlBalanceEnum.SlightlyUnbalancedLeft) {
        root = this._rightRotation(root);
      } else
        // Left Right Case
        if (child === AvlBalanceEnum.SlightlyUnbalancedRight) {
          root = this._leftRightRotation(root);
        }
    }

    if (i === AvlBalanceEnum.UnbalancedRight) {
      child = this._calcBalanceIndex(root.right);
      // Right Right Case
      if (child === AvlBalanceEnum.Balanced || child === AvlBalanceEnum.SlightlyUnbalancedRight) {
        root = this._leftRotation(root);
      } else
        // Right Left Case
        if (child === AvlBalanceEnum.SlightlyUnbalancedRight) {
          root = this._rightLeftRotation(root);
        }
    }

    return root;

  }

}

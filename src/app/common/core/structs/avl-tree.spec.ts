import { TestBed, inject } from '@angular/core/testing';
import { AvlTree } from './avl-tree';

describe('AvlTree', () => {
  let tree: AvlTree<number, any>;

  /**
   * 5 4 7 3 8 1 9 0 2 6
   *
   *        5
   *    3         8
   *  1   4     7   9
   * 0 2      6
   *
   */
  beforeEach(() => {
    tree = new AvlTree<number, any>();
    const values = [ 5, 4, 7, 3, 8, 1, 9, 0, 2, 6 ];
    for (const n of values) {
      tree.push(n, n);
    }
  });

  afterEach(() => {
    tree = undefined;
  });

  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], number 5 is root (level 0)', () => {
    expect(tree.levelOf(5)).toEqual(0);
  });

  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], number 4 is thirth (level 3)', () => {
    expect(tree.levelOf(4)).toEqual(2);
  });

  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], number 9 is thirth (level 3)', () => {
    expect(tree.levelOf(9)).toEqual(2);
  });

  it('The sequence [ 5 4 7 3 8 1 9 0 2 6 ]) should iterate [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]', () => {
    const sequence = [];
    let n = tree.next();
    while (!n.done) {
      sequence.push(n.value.value);
      n = tree.next();
    }
    expect(sequence).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

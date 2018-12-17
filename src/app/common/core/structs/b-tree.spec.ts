import { TestBed, inject } from '@angular/core/testing';
import { BTree } from './b-tree';

describe('BTree', () => {
  let tree: BTree<number, any>;

  /**
   * Insert sequence [ 5 4 7 3 8 1 9 0 2 6 ]
   * Tree
   *         5
   *      4     7
   *     3  6     8
   *  1              9
   * 0 2
   */
  beforeEach(() => {
    tree = new BTree<number, number>();
    const values = [ 5, 4, 7, 3, 8, 1, 9, 0, 2, 6 ];
    for (const n of values) {
      tree.push(n, n);
    }
  });

  afterEach(() => {
    tree = undefined;
  });


  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], number 5 should be root (level 0)', () => {
    expect(tree.levelOf(5)).toEqual(0);
  });

  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], number 0 should be left bottom (level 5)', () => {
    expect(tree.levelOf(0)).toEqual(4);
  });

  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], number 6 should be third level (level 3)', () => {
    expect(tree.levelOf(6)).toEqual(2);
  });

  it('The sequence [ 5 4 7 3 8 1 9 0 2 6 ], should iterate [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]', () => {
    const sequence = [];
    let n = tree.next();
    while (!n.done) {
      sequence.push(n.value.value);
      n = tree.next();
    }
    expect(sequence).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], should find key 1', () => {
    expect(tree.find(1)).toEqual(1);
  });

  it ('In the sequence [ 5 4 7 3 8 1 9 0 2 6 ], should find key 11 and return null', () => {
    expect(tree.find(11)).toEqual(undefined);
  });

  it ('In the sequece [] should find index 5 and return null', () => {
    tree = new BTree<number, number>();
    expect(tree.find(5)).toEqual(undefined);
  });
});


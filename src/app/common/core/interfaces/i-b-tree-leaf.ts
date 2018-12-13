export interface IBTreeLeaf<K, T> {
  key: K;
  value: T;
  left?: IBTreeLeaf<K, T>;
  right?: IBTreeLeaf<K, T>;
}

export interface IBaseRepository<T> {
  save(t: T): Promise<T>;
}

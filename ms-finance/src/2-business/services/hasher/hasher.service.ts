export interface IHasherService {
  create(s: string): Promise<string>;

  compare(value: string, hashed: string): Promise<boolean>;
}

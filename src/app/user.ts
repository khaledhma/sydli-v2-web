import { Address } from './address';

export class User {

  constructor(private displayName: string,
              private email: string,
              private uid: string,
              private mode:number = 0,
              private orders: string[]=[],
              private addresses: Address[]=[]) {

  }
}

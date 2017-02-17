export class Address {
  constructor(private name: number,
              private appartment: number,
              private building: number,
              private street: string,
              private area: string,
              private city: string,
              private coordinates: {lang:string,lat:string}) {

  }
}

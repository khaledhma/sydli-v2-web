import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Address } from '../address';

@Injectable()
export class AddressService {

  constructor(private af:AngularFire, private http: Http) { }

  getAddresses(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/users/' + uid + '/addresses');
  }

  addAddress(uid: string, address: Address): firebase.Promise<void> {
    return this.af.database.list('/users/' + uid + '/addresses').push(address);
  }

  deleteAddress(uid: string, addressKey: string): firebase.Promise<void> {
    return this.af.database.list('/users/' + uid + '/addresses').remove(addressKey);
  }

  reverseGeocode(lat: number, lng: number): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCFuTMgaFJhBp4gD_-CPm_zzpoiNF-y7MY')
    .map((response)=>response.json());
  }

  geocode(address: string): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCFuTMgaFJhBp4gD_-CPm_zzpoiNF-y7MY')
    .map((response)=>response.json());
  }


}

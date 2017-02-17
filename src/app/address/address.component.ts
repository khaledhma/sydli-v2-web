import { Component, OnInit, OnDestroy, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { MouseEvent, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core'

import { Address } from '../address';
import { AddressService } from './address.service';

@Component({
  selector: 'sy-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  private lat: number = 30.0738672;
  private lng: number = 31.3200421;

  private addresses: Address[] = [];
  private addressesKeys: string[];
  @Input() uid: string = "";
  private Subscription: Subscription;
  private isAddress: boolean = false;
  private loading: boolean = true;
  private selectedAddress: number = 0;
  @Output() selectedAddressEmitter = new EventEmitter<Address>();
  private mapLoading: boolean = false;
  private newAddressForm: NgForm;
  @ViewChild('newAddressForm')
  set content(content: NgForm) {
    this.newAddressForm = content;
  }
  private isAddAddress: boolean = false;
  private openInfoWindow: boolean = false;

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.Subscription = this.addressService.getAddresses(this.uid).subscribe(
      (addresses) => {
        console.log(addresses)
        this.loading = false;
        if (addresses) {
          this.addresses = addresses;
          this.addressesKeys = addresses.map((address) => address.$key);
          if (this.addresses.length > 0) {
            this.isAddress = true;
            this.selectedAddress = 0;
            this.selectAddress(0);
          } else {
            this.isAddress = false;
            this.selectedAddress = 0;
            this.selectAddress(-1);
          }
        } else {
          this.isAddress = false;
          this.addresses = [];
          this.selectedAddress = 0;
          this.selectAddress(-1);
        }
      },
      (error) => {
        console.log('Error getting the user addresses', error);
      }
    )
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  addNewAddress() {
    this.isAddAddress = true;
  }

  saveAddress() {
    this.addressService.addAddress(this.uid,
      Object.assign(this.newAddressForm['value'],
        { 'coordinates': { 'lang': this.lng, 'lat': this.lat } })).then(
      () => {
        this.newAddressForm.reset();
        this.selectAddress(this.addresses.length - 1);
        this.isAddAddress = false;
      }
      )
  }

  deleteAddress(i: number) {
    this.addressService.deleteAddress(this.uid, this.addressesKeys[i]).then()
  }

  selectAddress(i: number) {
    if (i >= 0) {
      let addressToEmit = this.addresses[i];
      let address = new Address(
        addressToEmit['name'],
        addressToEmit['apartment'],
        addressToEmit['building'],
        addressToEmit['street'],
        addressToEmit['area'],
        addressToEmit['city'],
        addressToEmit['coordinates']
      )
      this.selectedAddress = i;
      this.selectedAddressEmitter.emit(address);
    } else {
      this.selectedAddressEmitter.emit(null);
    }

  }

  findCurrentLocation() {
    let ua = navigator.userAgent.toLowerCase();
    let isAndroid = ua.indexOf("android") > -1;
    let geoTimeout = isAndroid ? 60000 : 1000;
    this.mapLoading = true;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.mapLoading = false;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getAddressFromCoords();
        this.openInfoWindow = true;
      },
        (error) => {
          this.mapLoading = false;
          this.lat = 30.0738672;
          this.lng = 31.3200421;
          this.openInfoWindow = true;
          alert(error.message);
        },
        { enableHighAccuracy: false, maximumAge: Infinity, timeout: geoTimeout });
    } else {
      alert('Error: Unable to determine your position!');
    }
  }

  markerLocation(mouseEvent: any) {
    this.lat = mouseEvent.coords.lat;
    this.lng = mouseEvent.coords.lng;
    this.newAddressForm.reset();
    this.openInfoWindow = false;
  }

  getAddressFromCoords() {
    let buildingNumber = "";
    let streetName = "";
    let area = "";
    let region = "";
    let city = "";
    this.addressService.reverseGeocode(this.lat, this.lng).subscribe(
      (data) => {
        if (data.status == "OK") {
          let addressComponenets = data.results[0].address_components;
          let formattedAddress = data.results[0].formatted_address;
          for (let i = 0; i < addressComponenets.length; i++) {
            let name = addressComponenets[i].long_name;
            let type = addressComponenets[i].types[0];
            switch (type) {
              case "street_number":
                buildingNumber = name;
                break;
              case "route":
              case "street_address":
                streetName = name;
                break;
              case "administrative_area_level_3":
                area = name;
                break;
              case "administrative_area_level_2":
                region = name;
                break;
              case "administrative_area_level_1":
                city = name;
                break;
            }
          }
        }
        this.newAddressForm.controls['building'].setValue(buildingNumber);
        this.newAddressForm.controls['street'].setValue(streetName);
        this.newAddressForm.controls['area'].setValue(area + ', ' + region);
        this.newAddressForm.controls['city'].setValue(city);
      },
      (error) => {
        this.newAddressForm.controls['building'].setValue(buildingNumber);
        this.newAddressForm.controls['street'].setValue(streetName);
        this.newAddressForm.controls['area'].setValue(region);
        this.newAddressForm.controls['city'].setValue(city);
      }
    )
  }

}

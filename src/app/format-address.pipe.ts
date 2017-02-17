import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `Appartment Number ${value.apartment}, ${value.building}, ${value.street}, ${value.area}, ${value.city}`;
  }

}

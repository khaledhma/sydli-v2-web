import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class MedecineService {

  constructor(private af:AngularFire) { }

  getMedecineNames (name: string , mode: number, lang: number): FirebaseListObservable<any[]> {

    if (mode === 1) {
      if (lang === 0) {
        return this.af.database.list('medicineName', {
        query: {
          limitToFirst: 5,
          orderByKey: true,
          startAt:name,
          endAt:name+"\uf8ff"
        }
        });
      } else {
        return this.af.database.list('medicineNameArabic', {
        query: {
          limitToFirst: 5,
          orderByKey: true,
          startAt:name,
          endAt:name+"\uf8ff"
        }
        });
      }

    }

    if (mode === 2) {
      return this.af.database.list('medicineBarcode', {
      query: {
        orderByKey: true,
        equalTo:name
      }
      });
    }

    if (mode === 3) {
      return this.af.database.list('medicineEffectiveSubstance', {
      query: {
        limitToFirst: 5,
        orderByKey: true,
        startAt:name,
        endAt:name+"\uf8ff"
      }
      });
    }


  }

  getMedecineDetails (id: number): FirebaseListObservable<any[]> {

      return this.af.database.list('medicineInfo', {
      query: {
        orderByKey: true,
        equalTo: id+""
      }
      });

  }
}

import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp, FirebaseObjectObservable  } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class OfflineService {

  constructor(private af: AngularFire, @Inject(FirebaseApp) private firebaseApp: any) { }

  isOffline(): FirebaseObjectObservable<any> {
    return this.af.database.object('.info/connected');
  }

  saveConnection(uid: string) {
    let connectionNumber = Math.floor((Math.random())*100);
    this.firebaseApp.database().ref('online/' + uid).update({[connectionNumber]:true});
    this.firebaseApp.database().ref('online/' + uid + '/' + connectionNumber).onDisconnect().remove();
  }

}

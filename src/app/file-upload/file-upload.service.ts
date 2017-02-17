import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp  } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FileUploadService {

  constructor(private af: AngularFire, @Inject(FirebaseApp) private firebaseApp: any) { }

  uploadImage(filaName: string, file: File, folderName: string): firebase.storage.UploadTask {
    return this.firebaseApp.storage().ref().child(folderName + '/' + filaName.split(".")[0] + new Date().getTime() + '.' + filaName.split(".")[1]).put(file);
  }

  deleteImage(fileFullPath: string): firebase.Promise<any> {
    return this.firebaseApp.storage().ref().child(fileFullPath).delete();
  }

}

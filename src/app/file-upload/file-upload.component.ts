import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FileUploadService } from './file-upload.service';
import * as firebase from 'firebase';

@Component({
  selector: 'sy-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  private progressBar: number = 0;
  private showProgressBar: boolean = false;
  private uploadedImageUrl: string = "";
  private uploadedImageFullPath: string = "";
  private showImage: boolean = false;
  private inputField: any;
  @Input() folderName:string = "";
  @Output() imageUrl = new EventEmitter<string>();

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  fileChange(event) {
    this.inputField = event;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.showProgressBar = true;
      let emitProgress = new EventEmitter<number>();
      let emitImageData = new EventEmitter<[string]>();
      let subscriber = emitProgress.subscribe((value) => this.progressBar = value);
      let imageSubscriber = emitImageData.subscribe(
        (value) => {
          this.uploadedImageUrl = value[0];
          this.imageUrl.emit(value[0]);
          this.uploadedImageFullPath = value[1];
          this.showImage = true;
          this.showProgressBar = false;
        }
      );
      let file: File = fileList[0];
      let uploadTask = this.fileUploadService.uploadImage(file.name, file, this.folderName);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          emitProgress.emit(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          switch (error['code']) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;


            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          emitImageData.emit([uploadTask.snapshot.downloadURL, uploadTask.snapshot.ref.fullPath]);
        });
    }
  }

  deleteImage() {
    this.fileUploadService.deleteImage(this.uploadedImageFullPath).then(
      () => {
        this.showImage = false;
        this.uploadedImageUrl = "";
        this.inputField.srcElement.value = '';
      }
    ).catch(console.error);
  }


}

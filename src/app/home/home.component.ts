import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../upload-file-service.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  constructor(public http: HttpClient, private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.getData();
    this.fileInfos = this.uploadService.getFiles();
  }
    getData() {
        this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
             .subscribe(data => {
                this.userData = data[0];
                console.log('data', this.userData)
             },
             error => {
             }
    );
  }
    
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
}


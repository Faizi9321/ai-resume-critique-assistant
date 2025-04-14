import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    FileSizePipe
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  isDragging = false;
  uploadProgress = 0;
  errorMessage: string | null = null;
  uploading = false;

  constructor(private router: Router, private http: HttpClient) {}

  onFileSelected(event: any) {
    this.handleFile(event.target.files[0]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  private handleFile(file: File) {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file || !file.type) {
      this.errorMessage = 'Invalid file selected.';
      return;
    }

    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Please upload a PDF, DOCX, or TXT file.';
      return;
    }

    if (file.size > maxSize) {
      this.errorMessage = 'File size should not exceed 5MB.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';
    this.uploadFile();
  }

  private uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('resume', this.selectedFile);

    this.http.post('/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === 1) { // UploadProgress
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === 4) { // Response
          this.router.navigate(['/analysis']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Error uploading file. Please try again.';
        console.error('Upload error:', error);
      }
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  clearFile() {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.errorMessage = null;
    this.uploading = false;
  }
}

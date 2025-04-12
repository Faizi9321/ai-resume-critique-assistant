import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatProgressSpinnerModule,MatButtonModule],
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  loading = false;
  error: string | null = null;
  pdfData: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPDF();
  }

  fetchPDF() {
    this.loading = true;
    this.error = null;

    this.http.get(`${environment.apiUrl}/api/download`)
      .subscribe({
        next: (response: any) => {
          this.pdfData = response.data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching PDF:', error);
          this.error = 'Failed to generate enhanced resume. Please try again.';
          this.loading = false;
        }
      });
  }

  downloadResume() {
    if (!this.pdfData) {
      this.error = 'No PDF data available. Please try again.';
      return;
    }

    try {
      // Convert base64 to blob
      const binaryString = window.atob(this.pdfData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'enhanced_resume.pdf';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      this.error = 'Failed to download the PDF. Please try again.';
    }
  }
}

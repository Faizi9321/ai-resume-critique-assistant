import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume.model';
import { AnalysisResult } from '../../models/analysis-result.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatListModule, MatDividerModule, MatChipsModule, MatTooltipModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  resumes: Resume[] = [];
  selectedResume: Resume | null = null;
  analysisResult: AnalysisResult | null = null;
  error: string | null = null;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.resumeService.getResumes().subscribe({
      next: (resumes) => this.resumes = resumes,
      error: (err) => this.error = 'Failed to load resumes'
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadResume(file);
    }
  }

  uploadResume(file: File): void {
    this.resumeService.uploadResume(file).subscribe({
      next: (resume) => {
        this.resumes.push(resume);
        this.error = null;
      },
      error: (err) => this.error = 'Failed to upload resume'
    });
  }

  selectResume(resume: Resume): void {
    this.selectedResume = resume;
    this.analysisResult = null;
    this.error = null;
  }

  analyzeResume(): void {
    if (this.selectedResume?.id) {
      this.resumeService.analyzeResume(this.selectedResume.id).subscribe({
        next: (result) => {
          this.analysisResult = result;
          this.error = null;
        },
        error: (err) => this.error = 'Failed to analyze resume'
      });
    }
  }
}

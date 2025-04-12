import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnalysisService } from '../../services/analysis.service';
import { AnalysisResult } from '../../models/analysis-result.model';

type SectionKey = keyof AnalysisResult['sections'];

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  analysisResult: AnalysisResult | null = null;
  loading = true;
  error = '';
  sectionKeys: SectionKey[] = ['readability', 'formatting', 'keywordDensity', 'clarity'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadAnalysis();
  }

  private loadAnalysis() {
    this.http.get<AnalysisResult>('/api/analysis').subscribe({
      next: (result) => {
        this.analysisResult = result;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading analysis results. Please try again.';
        this.loading = false;
        console.error('Analysis error:', error);
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'primary';
    if (score >= 60) return 'accent';
    return 'warn';
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }

  navigateToDownload() {
    this.router.navigate(['/download']);
  }
}

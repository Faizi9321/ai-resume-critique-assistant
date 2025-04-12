import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../models/resume.model';
import { AnalysisResult } from '../models/analysis-result.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  uploadResume(file: File): Observable<AnalysisResult> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post<AnalysisResult>(`${this.apiUrl}/upload`, formData);
  }

  analyzeResume(resumeId: string): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>(`${this.apiUrl}/analysis`, { resumeId });
  }

  getResume(resumeId: string): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/resume/${resumeId}`);
  }

  getResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/resumes`);
  }
}

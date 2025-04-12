import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResult } from '../models/analysis-result.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private apiUrl = '/api/analysis';

  constructor(private http: HttpClient) {}

  analyzeResume(file: File): Observable<AnalysisResult> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post<AnalysisResult>(this.apiUrl, formData);
  }
}

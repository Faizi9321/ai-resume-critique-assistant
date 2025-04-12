import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursorAIService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  analyzeResume(resumeContent: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, { content: resumeContent });
  }

  chatWithAI(message: string, context?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, { message, context });
  }

  enhanceResume(resumeContent: string, suggestions: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/enhance`, { content: resumeContent, suggestions });
  }
}

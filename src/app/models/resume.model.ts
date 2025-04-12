import { AnalysisResult } from './analysis-result.model';

export interface Resume {
  id?: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  analysisResult?: AnalysisResult;
}

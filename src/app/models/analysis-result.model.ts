export interface AnalysisResult {
  overallScore: number;
  sections: {
    readability: {
      score: number;
      suggestions: string[];
    };
    content: {
      score: number;
      suggestions: string[];
    };
    formatting: {
      score: number;
      suggestions: string[];
    };
  };
}

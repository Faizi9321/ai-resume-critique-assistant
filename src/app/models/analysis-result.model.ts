export interface AnalysisResult {
  overallScore: number;
  sections: {
    readability: {
      score: number;
      suggestions: string[];
    };
    formatting: {
      score: number;
      suggestions: string[];
    };
    keywordDensity: {
      score: number;
      suggestions: string[];
    };
    clarity: {
      score: number;
      suggestions: string[];
    };
  };
}

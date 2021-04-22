export interface User {
  email: string;
  displayName: string;
  totalGamesPlayed?: number;
  totalGamesWon?: number;
  totalGamesLost?: number;
  totalQuestionsAnswered?: number;
  totalRightAnswers?: number;
  totalWrongAnswers?: number;
  bestCategory?: string;
  worstCategory?: string;
}

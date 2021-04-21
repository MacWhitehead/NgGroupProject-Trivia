export interface User {
  uid: string;
  email: string;
  displayName: string;
  totalGamesPlayed: number;
  totalGamesWon: number;
  totalGamesLost: number;
  totalQuestionsAnswered: number;
  totalRightAnswers: number;
  totalWrongAnswers: number;
  bestCategory: string;
  worstCategory: string;
}

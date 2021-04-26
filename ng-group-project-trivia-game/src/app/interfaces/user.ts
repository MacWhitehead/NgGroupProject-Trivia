export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  stats: {
    gamesPlayed: number,
    gamesWon: any[],
    gamesLost: any[],
    questionsAnswered: number,
    questionsRight: number,
    questionsWrong: number,
    bestCategory: string,
    worstCategory: string
}
}

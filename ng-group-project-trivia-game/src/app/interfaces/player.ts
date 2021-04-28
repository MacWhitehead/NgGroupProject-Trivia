export interface Player {
    username: string,
    id: string,
    stats: {
        gamesPlayed: number,
        gamesWon: number,
        gamesLost: number,
        questionsAnswered: number,
        questionsRight: any[],
        questionsWrong: any[],
        bestCategory: string,
        worstCategory: string
    }
}
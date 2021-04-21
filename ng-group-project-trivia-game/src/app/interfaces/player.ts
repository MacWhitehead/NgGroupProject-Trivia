export interface Player {
    username: string,
    id: string,
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

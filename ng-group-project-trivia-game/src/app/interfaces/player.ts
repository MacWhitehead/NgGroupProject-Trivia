export interface Player {
    username: string,
    id: string,
    stats: {
        gamesPlayed: number,
        gamesWon: number,
        gamesLost: number,
        questionsAnswered: number,
        questionsRight: number,
        questionWrong: number,
        bestCategory: string,
        worstCategory: string
    }
}

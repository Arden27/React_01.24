export interface QuizSettings {
  numberOfQuestions: number
  category: { option: string; id: string } | null
  difficulty: { option: string; id: string } | null
  type: { option: string; id: string } | null
  time: number
}

export interface Game {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[]
  correctAnswers: number
  timeSpent: number
}

export interface Stats {
  totalAnsweredCategories: {
    [category: string]: number
  }
  totalAnsweredDifficulties: {
    [category: string]: number
  }
  totalAnsweredTypes: {
    [category: string]: number
  }
  totalAnswered: number
  totalCorrectAnswers: number
}

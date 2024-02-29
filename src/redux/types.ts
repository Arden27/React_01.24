export interface QuizSettings {
  numberOfQuestions: number
  category: { text: string; value: string } | null
  difficulty: { text: string; value: string } | null
  type: { text: string; value: string } | null
  time: { text: string; value: string }
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

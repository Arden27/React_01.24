export interface QuizSettings {
  numberOfQuestions: number
  category: { name: string; id: number } | null
  difficulty: { name: string; id: string } | null
  type: { name: string; id: string } | null
  time: number
}

export interface Game {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[]
  correctAnswers: number
  timeSpent: number
}

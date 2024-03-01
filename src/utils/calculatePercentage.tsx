export const calculatePercentage = (correctAnswers: number, totalQuestions: number) => {
  if (totalQuestions === 0) {
    return 0 // Return 0% if there are no questions
  }
  return Math.round((correctAnswers / totalQuestions) * 100)
}
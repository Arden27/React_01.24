export const calculatePercentage = (correctAnswers: number, totalQuestions: number) => {
  if (totalQuestions === 0) {
    return 0
  }
  return Math.round((correctAnswers / totalQuestions) * 100)
}

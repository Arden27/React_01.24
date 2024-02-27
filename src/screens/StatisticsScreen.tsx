import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Button } from '@/components/Button'
import { resetStats } from '@/redux/slices/stats'
import storage from 'redux-persist/lib/storage'

export function StatisticsScreen() {
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(resetStats())

    storage.removeItem('persist:stats')
  }

  const answeredCategories = useSelector((state: RootState) => state.stats.totalAnsweredCategories)
  const answeredDifficulties = useSelector(
    (state: RootState) => state.stats.totalAnsweredDifficulties
  )
  const answeredTypes = useSelector((state: RootState) => state.stats.totalAnsweredTypes)
  const totalAnswered = useSelector((state: RootState) => state.stats.totalAnswered)
  const correctAnswered = useSelector((state: RootState) => state.stats.totalCorrectAnswers)
  return (
    <>
      {JSON.stringify(totalAnswered)}
      <br></br>
      {JSON.stringify(correctAnswered)}
      <br></br>
      {JSON.stringify(answeredCategories)}
      <br></br>
      {JSON.stringify(answeredDifficulties)}
      <br></br>
      {JSON.stringify(answeredTypes)}
      <Button format="sm fill border" onClick={handleReset}>
        CLear Statistics
      </Button>
    </>
  )
}

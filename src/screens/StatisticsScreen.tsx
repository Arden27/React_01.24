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

  const answeredCategories = useSelector((state: RootState) => state.stats.answeredCategories)
  return (
    <>
      {JSON.stringify(answeredCategories)}
      <Button format="sm fill border" onClick={handleReset}>
        CLear Statistics
      </Button>
    </>
  )
}

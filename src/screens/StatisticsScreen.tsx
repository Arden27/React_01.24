import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export function StatisticsScreen() {
  const answeredCategories = useSelector((state: RootState) => state.stats.answeredCategories)
  return <>
    {JSON.stringify(answeredCategories)}
  </>
}

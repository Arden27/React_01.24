import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/Layout'
import { CreateQuizScreen } from '@/screens/CreateQuizScreen'
import { ResultScreen } from '@/screens/ResultScreen'
import { PlayQuizScreen } from '@/screens/PlayQuizScreen'
import { StatisticsScreen } from '@/screens/StatisticsScreen'
import { Test } from '@/screens/Test'

export enum ROUTES {
  root = '/',
  play = '/play',
  result = '/result',
  statistics = '/statistics',
  test = '/test'
}

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CreateQuizScreen />
      },
      {
        path: ROUTES.play,
        element: <PlayQuizScreen />
      },
      {
        path: ROUTES.result,
        element: <ResultScreen />
      },
      {
        path: ROUTES.statistics,
        element: <StatisticsScreen />
      },
      {
        path: ROUTES.test,
        element: <Test />
      }
    ]
  }
])

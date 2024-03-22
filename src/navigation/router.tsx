import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/Layout'
import { CreateQuizScreen } from '@/screens/CreateQuizScreen'
import { ResultScreen } from '@/screens/ResultScreen'
import { PlayQuizScreen } from '@/screens/PlayQuizScreen'
import { StatisticsScreen } from '@/screens/StatisticsScreen'
import { Test } from '@/screens/Test'
import { Test2 } from '@/screens/Test2'

export enum ROUTES {
  root = '/',
  play = '/play',
  result = '/result',
  statistics = '/statistics',
  test = '/test',
  test2 = '/test2'
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
      },
      {
        path: ROUTES.test2,
        element: <Test2 />
      }
    ]
  }
])

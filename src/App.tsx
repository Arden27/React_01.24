import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout'
import { CreateQuizScreen } from '@/screens/CreateQuizScreen'
import { ResultScreen } from '@/screens/ResultScreen'
import { PlayQuizScreen } from '@/screens/PlayQuizScreen'
import { StatisticsScreen } from '@/screens/StatisticsScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CreateQuizScreen />
      },
      {
        path: '/play',
        element: <PlayQuizScreen />
      },
      {
        path: '/result',
        element: <ResultScreen />
      },
      {
        path: '/statistics',
        element: <StatisticsScreen />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

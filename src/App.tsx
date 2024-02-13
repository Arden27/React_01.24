import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateQuizScreen } from '@/screens/CreateQuizScreen'
import { ResultScreen } from '@/screens/ResultScreen'
import { PlayQuizScreen } from '@/screens/PlayQuizScreen'
import { StatisticsScreen } from '@/screens/StatisticsScreen'

const router = createBrowserRouter([
  {
    path: '/',
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
])

function App() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <RouterProvider router={router} />
    </main>
  )
}

export default App

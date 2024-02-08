import { useState } from 'react'
import CreateQuizScreen from '@/screens/CreateQuizScreen'
import PlayQuizScreen from './screens/PlayQuizScreen'

type QuizState = 'create' | 'play' | 'result'

function App() {
  const [quizState, setQuizState] = useState<QuizState>('create')

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      {quizState === 'play' ? (
        <PlayQuizScreen setQuizState={setQuizState} />
      ) : (
        <CreateQuizScreen setQuizState={setQuizState} />
      )}
    </main>
  )
}

export default App

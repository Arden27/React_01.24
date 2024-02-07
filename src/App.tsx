import { useState } from 'react'
import CreateQuizScreen from '@/screens/CreateQuizScreen'
import PlayQuizScreen from './screens/PlayQuizScreen'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  return <>{isPlaying ? <PlayQuizScreen setIsPlaying={setIsPlaying}/> : <CreateQuizScreen setIsPlaying={setIsPlaying} />}</>
}

export default App

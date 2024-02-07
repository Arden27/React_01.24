import { Dispatch, SetStateAction } from 'react'
import Button from '@/components/Button'

interface PlayQuizScreenProps {
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export default function PlayQuizScreen({ setIsPlaying }: PlayQuizScreenProps) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <div className=''>
        <h3>Question</h3>
        <h3 className='text-center'>3 of 15</h3>
      </div>
      <h2 className="w-2/3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi consequatur perferendis
        minus eligendi fugit doloribus velit ad! Error quam quae earum, itaque nisi velit laborum
        quis sapiente odit ducimus aliquam.
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Button format="lg border">Answer 1</Button>
          <Button format="lg border">Answer 2</Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button format="lg border">Answer 3</Button>
          <Button format="lg border">Answer 4</Button>
        </div>
      </div>
      <Button
        format="sm border"
        className=" hover:bg-red-700 hover:text-bg"
        onClick={() => setIsPlaying(false)}>
        End Quiz
      </Button>
    </main>
  )
}

import { SetQuizStateProps } from './sharedTypes'
import Button from '@/components/Button'
import CountdownTimer from '@/components/CountdownTimer'

export default function PlayQuizScreen({ setQuizState }: SetQuizStateProps) {
  return (
    <div className="relative m-lg flex flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg3 to-bg2 p-lg shadow-2xl max-w-2xl">
      <CountdownTimer
        className="flex-start slide-in-bottom absolute -top-lg right-xl -z-10 flex rounded-tl-[1rem] rounded-tr-[1rem] border-2 border-solid border-text bg-gradient-to-b from-bg2 to-bg p-xs pt-3xs text-lg shadow-2xl"
        initialTime={42}
      />
      <div className="flex flex-col gap-2xs text-center">
        <h3>Question 3 of 15</h3>
      </div>
      <h2 className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi consequatur perferendis
        minus eligendi fugit doloribus velit ad! Error quam quae earum, itaque nisi velit laborum
        quis sapiente odit ducimus aliquam.
      </h2>
      <div className="flex flex-col gap-2" onClick={() => setQuizState('result')}>
        <div className="flex flex-row gap-2">
          <Button format="lg border" className='bg-bg'>Answer 1</Button>
          <Button format="lg border" className='bg-bg'>Answer 2</Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button format="lg border" className='bg-bg'>Answer 3</Button>
          <Button format="lg border" className='bg-bg'>Answer 4</Button>
        </div>
      </div>
      <Button
        format="sm border"
        className=" hover:bg-red-700 hover:text-bg"
        onClick={() => setQuizState('create')}>
        End Quiz
      </Button>
    </div>
  )
}

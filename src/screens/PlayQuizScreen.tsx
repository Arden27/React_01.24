import { SetQuizStateProps } from './sharedTypes'
import Button from '@/components/Button'

export default function PlayQuizScreen({ setQuizState }: SetQuizStateProps) {
  return (
    <div className="m-lg flex flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-bg3 p-lg shadow-lg">
      <div className="">
        <h3>Question</h3>
        <h3 className="text-center">3 of 15</h3>
      </div>
      <h2 className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi consequatur perferendis
        minus eligendi fugit doloribus velit ad! Error quam quae earum, itaque nisi velit laborum
        quis sapiente odit ducimus aliquam.
      </h2>
      <div className="flex flex-col gap-2" onClick={() => setQuizState('result')}>
        <div className="flex flex-row gap-2">
          <Button format="lg border fill">Answer 1</Button>
          <Button format="lg border fill">Answer 2</Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button format="lg border fill">Answer 3</Button>
          <Button format="lg border fill">Answer 4</Button>
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

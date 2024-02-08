import Button from '@/components/Button'
import { SetQuizStateProps } from './sharedTypes'

export default function ResultScreen({ setQuizState }: SetQuizStateProps) {
  return (
    <div className="m-lg flex flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-bg3 p-lg shadow-lg">
      <h1>Results</h1>
      <h2>Thank you for completing this quiz. Here are your results</h2>
      <div className="flex flex-row gap-sm">
        <div
          className="!hover:text-header relative flex flex-col items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-sm font-btn text-sm uppercase
      text-text ">
          <h2>Time:</h2>
          <h3>00:00:42</h3>
        </div>
        <div
          className="relative flex flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-text p-md font-btn text-sm uppercase text-bg3
       transition-colors duration-300 ease-in-out hover:text-header active:top-[2px] active:opacity-90 shadow-lg ">
          <h2>Correct Answers:</h2>
          <div className="flex flex-row items-center">
            <h3
              className="!hover:text-header  relative flex items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-xs font-btn text-xl uppercase
      text-text transition-colors duration-300 ease-in-out hover:text-header active:top-[2px] active:opacity-90  ">
              3 / 15
            </h3>
            <div className="p-sm text-md">78%</div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-row justify-between">
        <div className="self-start text-start">
          <h3 className="text-lg">Quiz Settings</h3>
          <ul className="ml-sm [&>*>span]:font-btn [&>*]:p-3xs">
            <li>
              Category: <span>Any</span>
            </li>
            <li>
              Difficulty: <span>Hard</span>
            </li>
            <li>
              Type: <span>Multiple Choice</span>
            </li>
            <li>
              Time: <span>2M</span>
            </li>
          </ul>
        </div>

        <div className="flex h-full flex-col items-end justify-end gap-xs">
          <Button format="sm border" onClick={() => setQuizState('play')}>
            Restart
          </Button>
          <Button format="lg border" onClick={() => setQuizState('create')}>
            Choose another quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

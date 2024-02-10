import { Button } from '@/components/Button'
import { SetQuizStateProps } from './sharedTypes'
import RestartIcon from '@/assets/svg/restart.svg?react'

export function ResultScreen({ setQuizState }: SetQuizStateProps) {
  return (
    <div className="relative m-lg flex flex-col items-center justify-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 p-lg shadow-lg">
      <h3 className="flex-start slide-in-bottom absolute -top-lg right-xl -z-10 flex rounded-tl-[1rem] rounded-tr-[1rem] border-2 border-solid border-text bg-gradient-to-b from-bg2 to-bg p-xs pt-3xs text-lg shadow-2xl">
        00:12
      </h3>
      <h1>Results</h1>
      <h2 className="text-center">Thank you for completing this quiz. Here are your results</h2>
      <div className="flex flex-row gap-sm">
        <div
          className="!hover:text-header relative flex flex-col items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-sm font-btn text-sm uppercase
      text-text ">
          <h2>Time</h2>
          <h3>00:42</h3>
        </div>
        <div
          className="relative flex flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-text p-md text-center font-btn text-sm uppercase
       text-bg3 shadow-lg">
          <h2>Correct Answers</h2>
          <div className="flex flex-row items-center">
            <h3
              className="!hover:text-header  relative flex items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-xs font-btn text-xl uppercase
      text-text">
              3 / 15
            </h3>
            <div className="p-xs text-md">78%</div>
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
          <Button format="sm border" onClick={() => setQuizState('play')} className="relative ">
            <div className="relative flex h-full w-full flex-row items-center justify-center gap-3xs">
              <RestartIcon className="h-md w-md" />
              Restart
            </div>
          </Button>
          <Button format="lg border" className="bg-bg" onClick={() => setQuizState('create')}>
            Choose another quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

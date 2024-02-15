import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import RestartIcon from '@/assets/svg/restart.svg?react'
import { ROUTES } from '@/navigation/router'

export function ResultScreen() {
  const navigate = useNavigate()

  return (
    <>
      <div className=''>
        
      </div>
      {/* <div className="relative z-30 flex max-w-xl flex-col items-center justify-center gap-lg rounded-[2rem] border-2 border-solid border-text bg-green-300 hover:top-10 h-[500px] w-[300px]"></div> */}
      <div className="relative z-20 flex max-w-xl flex-col items-center justify-center gap-lg rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 p-lg shadow-lg transition duration-[3000ms]">
        <h1 className="text-2xl ">Results</h1>
        <p className="">Thank you for completing this quiz. Here are your results:</p>
        <div className="flex max-w-md flex-row gap-sm">
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

        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-xs ">
            <h3 className="text-lg">Quiz Settings</h3>
            <ul className="[&>*>span]:font-btn [&>*]:p-3xs">
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

          <div className=" mx-sm flex h-full max-w-md flex-row items-center justify-center  gap-sm">
            <Button format="sm border" onClick={() => navigate(ROUTES.play)} className="relative ">
              <div className="relative flex h-full w-full flex-row items-center justify-center gap-3xs">
                <RestartIcon className="h-md w-md" />
                Restart
              </div>
            </Button>
            <Button
              format="lg border fill"
              className="w-full"
              onClick={() => navigate(ROUTES.root)}>
              Choose another quiz
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

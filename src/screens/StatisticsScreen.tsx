import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/router'
import { RootState } from '@/redux/store'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { resetStats } from '@/redux/slices/stats'
import storage from 'redux-persist/lib/storage'
import { calculatePercentage } from '@/utils/calculatePercentage'
import he from 'he'

export function StatisticsScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleReset = () => {
    navigate(ROUTES.root)
    dispatch(resetStats())
    storage.removeItem('persist:stats')
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const {
    totalAnswered,
    totalCorrectAnswers,
    totalAnsweredCategories,
    totalAnsweredDifficulties,
    totalAnsweredTypes
  } = useSelector((state: RootState) => state.stats)
  return (
    <>
      <div className="relative col-start-2 row-start-2 grid grid-rows-[auto_auto_1fr_auto]  place-items-center gap-md rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 shadow-lg">
        <h1 className="text-xl font-bold">Statistics</h1>

        {totalAnswered ? (
          <>
            <div className="relative flex flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-text p-xs text-center font-btn text-sm uppercase text-bg3 shadow-lg">
              <h2>Correct Answers</h2>
              <div className="flex flex-row items-center">
                <h3 className="relative flex items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-2xs font-btn text-xl uppercase text-text">
                  {totalCorrectAnswers} / {totalAnswered}
                </h3>
                <div className="p-xs text-md">
                  {calculatePercentage(totalCorrectAnswers, totalAnswered)}%
                </div>
              </div>
            </div>

            <div className="h-full w-full overflow-hidden rounded-[2rem] border-2  border-solid border-text p-sm">
              <div className=" h-full overflow-y-scroll [&>ul>li>span]:px-2xs [&>ul>li>span]:font-btn [&>ul>li]:ml-sm [&>ul>li]:flex [&>ul>li]:items-end [&>ul>li]:justify-between [&>ul>li]:p-3xs">
                <ul className="">
                  <h2>Categories</h2>
                  {Object.entries(totalAnsweredCategories).map(([category, count]) => (
                    <li className="" key={category}>
                      {he.decode(category)}: <span>{count}</span>
                    </li>
                  ))}
                </ul>
                <ul>
                  <h2>Difficulties</h2>
                  {Object.entries(totalAnsweredDifficulties).map(([difficulty, count]) => (
                    <li key={difficulty}>
                      {capitalizeFirstLetter(difficulty)}: <span>{count}</span>
                    </li>
                  ))}
                </ul>
                <ul>
                  <h2>Types</h2>
                  {Object.entries(totalAnsweredTypes).map(([type, count]) => (
                    <li key={type}>
                      {type === 'multiple' ? 'Multiple choice' : 'True / False'}:{' '}
                      <span>{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p>Nothing here yet</p>
        )}

        <div className="flex place-items-center gap-xs">
          <Button format="lg border" className="bg-bg" onClick={() => navigate(ROUTES.root)}>
            Back
          </Button>

          {totalAnswered !== 0 && (
            <Button
              format="sm border"
              className="opacity-80 hover:opacity-100"
              onClick={toggleModal}>
              CLear Statistics
            </Button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleDialog={toggleModal}
        confirmAction={handleReset}
        message="Are you sure?"
        additionalMessage="This will delete all statistics"
        confirmButtonMessage="Delete"
        cancelButtonMessage="Cancel"
      />
    </>
  )
}

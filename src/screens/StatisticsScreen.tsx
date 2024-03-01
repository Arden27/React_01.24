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

export function StatisticsScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleReset = () => {
    dispatch(resetStats())
    storage.removeItem('persist:stats')
  }

  const answeredCategories = useSelector((state: RootState) => state.stats.totalAnsweredCategories)
  const answeredDifficulties = useSelector(
    (state: RootState) => state.stats.totalAnsweredDifficulties
  )
  const answeredTypes = useSelector((state: RootState) => state.stats.totalAnsweredTypes)
  const totalAnswered = useSelector((state: RootState) => state.stats.totalAnswered)
  const correctAnswered = useSelector((state: RootState) => state.stats.totalCorrectAnswers)
  return (
    <>
      <div className="relative m-lg flex max-w-xl flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-gradient-to-r from-bg2 to-bg3 p-lg shadow-lg">
        <h1>Statistics</h1>
        <div
          className="relative flex flex-col items-center justify-center gap-xs rounded-[2rem] border-2 border-solid border-text bg-text p-md text-center font-btn text-sm uppercase
       text-bg3 shadow-lg">
          <h2>Correct Answers</h2>
          <div className="flex flex-row items-center">
            <h3
              className="relative flex items-center justify-center rounded-[2rem] border-2 border-solid border-text bg-bg3 p-xs font-btn text-xl uppercase
      text-text">
              {correctAnswered} / {totalAnswered}
            </h3>
            <div className="p-xs text-md">
              {calculatePercentage(correctAnswered, totalAnswered)}%
            </div>
          </div>
        </div>
        {JSON.stringify(totalAnswered)}
        <br></br>
        {JSON.stringify(correctAnswered)}
        <br></br>
        {JSON.stringify(answeredCategories)}
        <br></br>
        {JSON.stringify(answeredDifficulties)}
        <br></br>
        {JSON.stringify(answeredTypes)}
        <Button format="lg border" className="bg-bg" onClick={() => navigate(ROUTES.root)}>
          Choose another quiz
        </Button>
        <Button format="sm border" className="opacity-80 hover:opacity-100" onClick={toggleModal}>
          CLear Statistics
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleDialog={toggleModal}
        confirmAction={handleReset}
        message="Are you sure?"
        additionalMessage="This will delete all statistics"
        confirmButtonMessage="Delete statistics"
        cancelButtonMessage="Cancel"
      />
    </>
  )
}

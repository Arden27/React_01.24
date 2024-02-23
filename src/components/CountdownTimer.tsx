import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/router'
import { setTimeSpent } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { formatTime } from '@/utils/formatTime'

type CountdownTimerProps = {
  initialTime: number
  className?: string
}

export function CountdownTimer({ initialTime, className }: CountdownTimerProps) {
  const [timer, setTimer] = useState<number>(initialTime)
  const timerRef = useRef<number>(initialTime)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer > 0 ? prevTimer - 1 : 0
        timerRef.current = newTimer
        return newTimer
      })
    }, 1000)

    return () => {
      dispatch(setTimeSpent(timerRef.current))
      clearInterval(interval)
    }
  }, [dispatch])

  if (timer === 0) {
    navigate(ROUTES.result)
  }

  return <h3 className={className}>{formatTime(timer)}</h3>
}

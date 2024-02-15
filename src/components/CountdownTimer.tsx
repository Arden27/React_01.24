import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/router'

type CountdownTimerProps = {
  initialTime: number
  className?: string
}

export function CountdownTimer({ initialTime, className }: CountdownTimerProps) {
  const [timer, setTimer] = useState<number>(initialTime)

  const navigate = useNavigate()

  if (timer === 0) {
    navigate(ROUTES.result)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTime = `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`

  return <h3 className={className}>{formattedTime}</h3>
}

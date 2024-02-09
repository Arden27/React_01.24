import { useState, useEffect } from 'react'

type CountdownTimerProps = {
  initialTime: number
  className?: string
}

export function CountdownTimer({ initialTime, className }: CountdownTimerProps) {
  const [timer, setTimer] = useState<number>(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTime = `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`

  return <h3 className={className}>{formattedTime}</h3>
}

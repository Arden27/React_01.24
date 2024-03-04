import { useState, useEffect, CSSProperties } from 'react'

const MAX_TRANSITION_TIME = 5000
const MIN_TRANSITION_TIME = 500

const getRandomComponent = (minValue: number, maxValue: number): string => {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue)
    .toString(16)
    .padStart(2, '0')
}

const getRandomColor = (): string => {
  const red = getRandomComponent(30, 150)
  const green = getRandomComponent(30, 180)
  const blue = getRandomComponent(30, 205)

  return `#${red}${green}${blue}`
}

const getRandomAngle = (): number => {
  return Math.floor(Math.random() * 360)
}

export function DynamicBackground() {
  
  const transitionTime = Math.floor(Math.random() * (MAX_TRANSITION_TIME - MIN_TRANSITION_TIME)) + MIN_TRANSITION_TIME;

  // Gradient colors
  const [backgroundGradientFrom, setBackgroundGradientFrom] = useState<string>(getRandomColor())
  const [backgroundGradientTo, setBackgroundGradientTo] = useState<string>(getRandomColor())
  const [foregroundGradientFrom, setForegroundGradientFrom] = useState<string>(getRandomColor())
  const [foregroundGradientTo, setForegroundGradientTo] = useState<string>(getRandomColor())

  // Gradient angles
  const [backgroundAngle, setBackgroundAngle] = useState<number>(getRandomAngle())
  const [foregroundAngle, setForegroundAngle] = useState<number>(getRandomAngle())

  // Other states
  const [opacity, setOpacity] = useState<number>(1)
  const [rendered, setRendered] = useState<boolean>(false)

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setRendered(true)
    }, 200)

    return () => {
      clearTimeout(initialTimer)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (opacity === 1) {
        setBackgroundGradientFrom(getRandomColor())
        setBackgroundGradientTo(getRandomColor())
        setBackgroundAngle(getRandomAngle())
        setOpacity(0)
      } else {
        setForegroundGradientFrom(getRandomColor())
        setForegroundGradientTo(getRandomColor())
        setForegroundAngle(getRandomAngle())
        setOpacity(1)
      }
    }, transitionTime)

    return () => {
      clearTimeout(timer)
    }
  }, [opacity])

  const foregroundStyle: CSSProperties = {
    opacity: opacity,
    transition: `opacity ${transitionTime / 1000}s ease-in`,
    backgroundImage: `linear-gradient(${foregroundAngle}deg, ${foregroundGradientFrom}, ${foregroundGradientTo})`,
    backgroundSize: '100% 100%',
    position: 'absolute',
    inset: 0,
    zIndex: 1
  }

  const backgroundStyle: CSSProperties = {
    opacity: 1,
    backgroundImage: `linear-gradient(${backgroundAngle}deg, ${backgroundGradientFrom}, ${backgroundGradientTo})`,
    backgroundSize: '100% 100%',
    position: 'absolute',
    inset: 0,
    zIndex: 0
  }

  return (
    <div
      className={`opacity-0 ${
        rendered ? 'opacity-50' : ''
      } absolute inset-0 min-h-screen transition-opacity duration-[3000ms] ease-in-out`}>
      <div style={backgroundStyle}></div>
      <div style={foregroundStyle}></div>
    </div>
  )
}

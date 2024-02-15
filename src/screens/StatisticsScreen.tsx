import { useState } from 'react'
import { SetQuantityGroup } from '@/components/SetQuantityGroup'

export function StatisticsScreen() {
  const [cardCount, setCardCount] = useState(64)
  const [gapSize, setGapSize] = useState(1)
  const [scalingGap, setScalingGap] = useState(0.0015) // State for scaling gap
  const [isHovered, setIsHovered] = useState(true)

  const getColor = (index: number) => {
    const hue = (index * 137) % 360
    const saturation = 70
    const lightness = 60
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  const getScale = (index: number) => {
    return 1 - index * scalingGap // Use scalingGap in the calculation
  }

  return (
    <div className="ml-lg mt-xs flex h-screen w-screen flex-col items-start justify-start gap-sm">
      <div className="relative flex flex-row gap-sm">
        {/* SetQuantityGroup for Number of Cards */}
        <div className="flex flex-col items-center">
          <h3 className="text-center">Number of Cards: </h3>
          <div className="flex">
            <SetQuantityGroup
              min={1}
              max={256}
              className="relative rounded-[2rem] border-2 border-text bg-bg3"
              classNameButtons="text-lg"
              classNameInput="text-lg"
              initialState={cardCount}
              setExternalQuantity={setCardCount}
            />
          </div>
        </div>

        {/* SetQuantityGroup for Gap Size */}
        <div className="flex flex-col">
          <h3 className="text-center">Gap Size: </h3>
          <div className="flex">
            <SetQuantityGroup
              min={1}
              max={256}
              className="relative rounded-[2rem] border-2 border-text bg-bg3"
              classNameButtons="text-lg"
              classNameInput="text-lg"
              initialState={gapSize}
              setExternalQuantity={setGapSize}
            />
          </div>
        </div>

        {/* SetQuantityGroup for Scaling Gap */}
        <div className="flex flex-col">
          <h3 className="text-center">Scaling Gap: </h3>
          <div className="flex">
            <SetQuantityGroup
              min={-10.0}
              max={1}
              step={0.0001}
              className="relative w-48 rounded-[2rem] border-2 border-text bg-bg3"
              classNameButtons="text-lg"
              classNameInput="text-lg w-3xl"
              initialState={scalingGap}
              setExternalQuantity={setScalingGap}
            />
          </div>
        </div>
      </div>

      {/* Card Display Section */}
      <div
        className="group relative flex h-[500px] w-[300px] max-w-xl flex-col items-center justify-center gap-lg rounded-[2rem] border-solid border-text bg-gradient-to-r from-bg3 to-bg2 shadow-lg transition duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(true)}>
        {Array.from({ length: cardCount }, (_, index) => (
          <div
            key={index}
            className="absolute flex h-full w-full max-w-xl flex-col items-center justify-center gap-lg rounded-[2rem] shadow-lg transition duration-500 ease-in-out"
            style={{
              zIndex: -10 - index * 1,
              backgroundColor: getColor(index),
              transform: isHovered
                ? `translate(${gapSize * index}px, ${gapSize * index}px) scale(${getScale(index)})`
                : `scale(${getScale(index)})`
            }}>
            {/* ... other children elements ... */}
          </div>
        ))}
      </div>
    </div>
  )
}

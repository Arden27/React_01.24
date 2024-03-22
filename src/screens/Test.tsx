import { useState } from 'react'
import { Button } from '@/components/Button'
import { SetQuantityGroup } from '@/components/SetQuantityGroup'

export function Test() {
  const [oneStartRow, setOneStartRow] = useState(1)
  const [oneStartCol, setOneStartCol] = useState(1)
  const [oneEndRow, setOneEndRow] = useState(1)
  const [oneEndCol, setOneEndCol] = useState(1)

  const [twoStartRow, setTwoStartRow] = useState(0)
  const [twoStartCol, setTwoStartCol] = useState(0)
  const [twoEndRow, setTwoEndRow] = useState(0)
  const [twoEndCol, setTwoEndCol] = useState(0)

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '100px 100px 100px 100px',
    gridTemplateRows: '100px 100px 100px 100px'
    // transform: 'rotateX(180deg)'
  }

  const oneStyle = {
    gridArea: `${oneStartRow} / ${oneStartCol} / ${oneEndRow} / ${oneEndCol}`
  }

  const twoStyle = {
    gridArea: `${twoStartRow} / ${twoStartCol} / ${twoEndRow} / ${twoEndCol}`
  }


  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <div className="text-xl">X start</div>
          <SetQuantityGroup min={1} max={10} onChange={setOneStartRow} />
          <div className="text-xl">X end</div>
          <SetQuantityGroup min={1} max={10} onChange={setOneEndRow} />
        </div>
        <div>
          <div className="text-xl">Y start</div>
          <SetQuantityGroup min={1} max={10} onChange={setOneStartCol} />
          <div className="text-xl">Y end</div>
          <SetQuantityGroup min={1} max={10} onChange={setOneEndCol} />
        </div>
        <div className='grid col-span-2 col-'></div>
        <div>
          <div className="text-xl">X start</div>
          <SetQuantityGroup min={1} max={100} onChange={setTwoStartRow} />
          <div className="text-xl">X end</div>
          <SetQuantityGroup min={1} max={100} onChange={setTwoEndRow} />
        </div>
        <div>
          <div className="text-xl">Y start</div>
          <SetQuantityGroup min={1} max={100} onChange={setTwoStartCol} />
          <div className="text-xl">Y end</div>
          <SetQuantityGroup min={1} max={100} onChange={setTwoEndCol} />
        </div>
      </div>
      <div style={gridStyle} className="bg-red-300 transition duration-500 ">
        <div style={oneStyle} className="bg-blue-300">
          Dupa
        </div>

        <div style={twoStyle} className="bg-green-300">
          b
        </div>
      </div>
    </>
  )
}

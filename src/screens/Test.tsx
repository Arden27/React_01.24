export function Test({}) {
  return (
    <div>
      {/* <div className="grid grid-cols-3">
        <div className="col-span-3 grid grid-cols-subgrid">
          <div>Item 1 (Aligned with Column 1 of Parent)</div>
          <div>Item 2 (Aligned with Column 2 of Parent)</div>
          <div>Item 3 (Aligned with Column 3 of Parent)</div>
        </div>
        
      </div> */}

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 grid grid-cols-3">
          <div>Item 1 (Aligned with Column 1 of Parent)</div>
          <div>Item 2 (Aligned with Column 2 of Parent)</div>
          <div>Item 3 (Aligned with Column 3 of Parent)</div>
        </div>
        {/* <div className="col-span-3 grid grid-cols-3 gap-10">
          <div>Item 1 (Aligned with Column 1 of Parent)</div>
          <div>Item 2 (Aligned with Column 2 of Parent)</div>
          <div>Item 3 (Aligned with Column 3 of Parent)</div>
        </div> */}
      </div>
    </div>
  )
}

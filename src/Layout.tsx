import { Outlet } from 'react-router-dom'
import { DynamicBackground } from './components/DynamicBackground'

export function Layout() {
  return (
    <main
      className="grid h-screen  
    grid-cols-[minmax(theme(spacing.2xs),auto)_minmax(auto,theme(screens.sm))_minmax(theme(spacing.2xs),auto)] bg-red-600
    grid-rows-[minmax(theme(spacing.3xl),auto)_minmax(520px,auto)_minmax(theme(spacing.3xl),auto)] [&>*]:p-md ">
      <DynamicBackground />
      <Outlet />
    </main>
  )
}

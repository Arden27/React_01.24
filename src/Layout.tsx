import { Outlet } from 'react-router-dom'
import { DynamicBackground } from './components/DynamicBackground'

export function Layout() {
  return (
    <main
      className="grid min-h-screen 
    grid-cols-[minmax(theme(spacing.2xs),auto)_minmax(auto,40ch)_minmax(theme(spacing.2xs),auto)] grid-rows-[minmax(theme(spacing.xl),auto)_minmax(auto,550px)_minmax(theme(spacing.xl),auto)]
     [&>*]:p-sm ">
      <DynamicBackground />
      <Outlet />
    </main>
  )
}

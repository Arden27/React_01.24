import { Outlet } from 'react-router-dom'
import { DynamicBackground } from './components/DynamicBackground'

export function Layout() {
  return (
    <main className="">
      {/* <DynamicBackground /> */}
      <Outlet />
    </main>
  )
}

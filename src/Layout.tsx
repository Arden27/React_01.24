import { Outlet } from 'react-router-dom'
import { DynamicBackground } from './components/DynamicBackground'

export function Layout() {
  return (
    <main className="grid h-screen w-screen place-items-center gap-2">
      <DynamicBackground />
      <Outlet />
    </main>
  )
}

import { Outlet } from 'react-router-dom'
import { DynamicBackground } from './components/DynamicBackground'

export function Layout() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <DynamicBackground />
      <Outlet />
    </main>
  )
}

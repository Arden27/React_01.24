import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Outlet />
    </main>
  )
}

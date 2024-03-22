import { Button } from '@/components/Button'
import React, { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'

const UserContext = createContext()

function UserContextProvider({ children }) {
  const name = 'Artem'
  return <UserContext.Provider value={name}>{children}</UserContext.Provider>
}

export function Test2({}) {
  return (
    <UserContextProvider>
      <Child />
    </UserContextProvider>
  )
}

function Child() {
  return <LastChild />
}

function LastChild() {
  const user = useContext(UserContext)
  return <p>Hello {user}</p>
}

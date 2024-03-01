import { useEffect, RefObject } from 'react'

type Handler = () => void

export function useOutsideClick(refs: RefObject<HTMLElement>[], handler: Handler) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, handler])
}
/**
 * Custom hook to trigger a specified handler function when a click occurs outside the specified ref(s).
 *
 * @param {Array} refs - An array of refs to elements that should not trigger the handler when clicked.
 * @param {function} handler - The function to trigger when a click outside the specified ref(s) occurs.
 */
import { useEffect, RefObject } from 'react'

type Handler = () => void

export default function useOutsideClick(refs: RefObject<HTMLElement>[], handler: Handler) {
  useEffect(() => {
    // Function to execute on document mousedown
    const handleClickOutside = (event: MouseEvent) => {
      // Checking if click was outside all refs
      if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
        handler() // Call handler if click was outside
      }
    }

    // Adding mousedown event listener
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup - removing mousedown event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, handler]) // Dependency array - will rerun if refs or handler changes
}

// Usage:
// In your component file:

// Import the useOutsideClick hook
// import useOutsideClick from './useOutsideClick';

// ... Inside your component:
// const node = useRef();
// const buttonRef = useRef(null);

// Define your outside click handler
// const handleOutsideClick = () => {
//    // Your code here - e.g., dispatch(closeChat());
// };

// Use the hook
// useOutsideClick([node, buttonRef], handleOutsideClick);

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/Button'

export function Test() {
  const [isVisible, setIsVisible] = useState(true)
  const [value, setValue] = useState(0)

  const toggleAnimation = () => {
    setIsVisible(false) // First hide
    setTimeout(() => {
      setValue((prev) => prev + 1) // Then change value
      setIsVisible(true) // Show again to trigger animation
    }, 100) // The delay ensures that the component is fully hidden before restarting the animation
  }

  useEffect(() => {
    // Trigger the animation on initial render
    setIsVisible(true)
  }, [])

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    },
    hidden: {}
  }

  const itemVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  return (
    <>
      <Button format='lg border fill' onClick={toggleAnimation}>Change</Button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={value} // Key changes on every button click
            initial="hidden"
            animate="visible"
            exit="hidden"
            className='grid grid-cols-2'
            variants={containerVariants}>
            {[...Array(4)].map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                Div {value}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

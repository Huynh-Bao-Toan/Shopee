import { ReactNode, useRef, useState } from 'react'
import {
  useFloating,
  FloatingPortal,
  useInteractions,
  useHover,
  arrow,
  FloatingArrow,
  safePolygon,
  shift
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  children: ReactNode
  className?: string
  renderPopOver: ReactNode
}
function Popover({ children, className, renderPopOver }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      arrow({
        element: arrowRef
      }),
      shift()
    ]
  })
  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      className={className || 'flex justify-around items-center w-28 h-8 cursor-pointer hover:opacity-70'}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className='w-[10%] bg-white shadow-sm z-50 px-2 py-3 flex flex-col justify-start items-start rounded-sm'
            >
              {renderPopOver}
              <FloatingArrow ref={arrowRef} context={context} fill='White' />
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Popover

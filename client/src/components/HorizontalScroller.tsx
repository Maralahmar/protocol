import { useRef, useState, useCallback } from 'react'

interface HorizontalScrollerProps {
  children: React.ReactNode
}

export default function HorizontalScroller({ children }: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasMoved = useRef(false)
  const pointerIdRef = useRef<number | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!scrollRef.current) return
    hasMoved.current = false
    startX.current = e.clientX
    scrollLeftStart.current = scrollRef.current.scrollLeft
    pointerIdRef.current = e.pointerId
    // الماوس فقط: استخدام السحب اليدوي. اللمس: التمرير الأصلي للمتصفح
    if (e.pointerType === 'mouse') {
      setIsDragging(true)
      scrollRef.current.setPointerCapture(e.pointerId)
    }
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!scrollRef.current) return
      if (e.pointerType !== 'mouse') return
      if (!isDragging) return
      hasMoved.current = true
      e.preventDefault()
      const walk = startX.current - e.clientX
      scrollRef.current.scrollLeft = scrollLeftStart.current + walk
    },
    [isDragging]
  )

  const handlePointerUp = useCallback(() => {
    if (scrollRef.current && pointerIdRef.current !== null && isDragging) {
      try {
        scrollRef.current.releasePointerCapture(pointerIdRef.current)
      } catch {
        /* ignore */
      }
      pointerIdRef.current = null
    }
    setIsDragging(false)
  }, [isDragging])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label="Horizontal scroll"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClickCapture={handleClick}
      className={`w-full overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth horizontal-scroll-smooth ${
        isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
      style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
    >
      <div className="flex gap-4 sm:gap-5 lg:gap-6 min-w-max pb-2 snap-x snap-mandatory content-container-padding">
        {children}
      </div>
    </div>
  )
}

import BarChartAnimated from './components/BarChartAnimated.tsx'
import { MdOutlineWifiTetheringError } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRef, useState, useLayoutEffect } from 'react'
import { VscGraph } from 'react-icons/vsc'
import { FaGear } from 'react-icons/fa6'
import { motion } from 'framer-motion'

type Results = {
  success: boolean
  bubble_time?: number
  merge_time?: number
  quick_by_sales_time?: number
  quick_by_prices_time?: number
}

function App() {
  const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL ?? window.location.href) + 'api/sort_data'

  const OFFSET_Y = -5
  const animationDelay = (index: number) => index / 10

  const [results, setResults] = useState<Results | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const sortButtonRef = useRef<HTMLButtonElement | null>(null)

  const contentRef = useRef<HTMLSpanElement | null>(null)
  const [btnWidthPx, setBtnWidthPx] = useState<number | null>(null)

  const HORIZONTAL_PADDING_PX = 16 * 2

  useLayoutEffect(() => {
    const measure = () => {
      const el = contentRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = Math.ceil(rect.width + HORIZONTAL_PADDING_PX)
      setBtnWidthPx(total)
    }

    measure()

    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [loading, error, results])

  const getSortingData = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(BACKEND_URL, { method: 'GET' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as Results
      setResults(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('Fetch error:', err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        h-full py-16 md:py-20 px-4 md:px-0
        grid grid-cols-1 grid-rows-[auto_auto_auto_1fr] gap-4 justify-items-center 
      "
    >
      <motion.h1
        initial={{ y: OFFSET_Y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay(0) }}
        className="
          font-heading font-bold text-4xl text-center
          bg-gradient-to-r from-pear-750 to-pear-550 bg-clip-text text-transparent
          flex items-center justify-center
        "
      >
        Sorting Algorithms
      </motion.h1>

      <motion.p
        initial={{ y: OFFSET_Y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay(1) }}
        className="font-body text-center"
      >
        The same sorting exercice, but using Actix-web for backend and React for frontend
      </motion.p>

      <motion.button
        ref={sortButtonRef}
        onClick={getSortingData}
        className="
          text-md md:text-[1rem] font-body text-white font-bold
          inline-flex items-center justify-center
          py-1 px-4 rounded-lg
          bg-gradient-to-r from-pear-750 to-pear-550
          shadow-md shadow-gray-900/10
          filter hover:brightness-110 active:brightness-125
        "
        initial={{ y: OFFSET_Y, opacity: 0, scale: 1, width: btnWidthPx ? `${btnWidthPx}px` : 'auto' }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          width: btnWidthPx ? `${btnWidthPx}px` : 'auto'
        }}
        transition={{
          width: { type: 'spring', stiffness: 900, damping: 40 },
          scale: { type: 'spring', stiffness: 900, damping: 25 },
          y: { duration: 0.5, ease: 'easeOut', delay: animationDelay(3) },
          opacity: { duration: 0.5, ease: 'easeOut', delay: animationDelay(3) }
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 1.15 }}
        disabled={loading}
        style={{ overflow: 'hidden' }}
      >
        <span ref={contentRef} className="flex items-center gap-2">
          {loading ? (
            <>
              <FaGear className="animate-spin" />
              <span>Sorting</span>
            </>
          ) : (
            'Sort'
          )}
        </span>
      </motion.button>

      <motion.div
        initial={{ y: OFFSET_Y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay(4) }}
        className="
          bg-gray-50 w-full md:w-[70vw]
          rounded-xl shadow-xl shadow-gray-900/5 border-2 border-gray-950/10
          flex flex-col items-center justify-center p-6
        "
      >
        {error && !loading &&
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 900, damping: 25 }}
          >
            <MdOutlineWifiTetheringError className="text-6xl text-red-600"/>
            <div className="text-md text-center">{error}</div>
          </motion.div>
        }
        {loading && !error && 
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 900, damping: 25 }}
          >
            <AiOutlineLoading3Quarters 
              className="
                animate-spin text-5xl text-pear-500
              "
            /> 
          </motion.div>
        }
        {!loading && !error && results === null && 
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 900, damping: 25 }}
            className="flex flex-col items-center gap-2"
          >
            <VscGraph className="text-5xl text-pear-500" />
            Your results will apear here!
          </motion.div>
        }
        {!loading && !error && results !== null && 
          <motion.div
            initial={{ y: -OFFSET_Y, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <BarChartAnimated
              data={Object.entries(results)
                .filter(([key]) => key !== "success")
                .map(([key, value]) => ({
                  name: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
                  value: Number(value)
                }))}
            />
          </motion.div>
        }
      </motion.div>
    </div>
  )
}

export default App
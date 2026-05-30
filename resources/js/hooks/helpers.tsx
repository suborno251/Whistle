import { useState, useEffect } from 'react'

// ─── WINDOW WIDTH ───────────────────────────────────────────────────────────────────
export const useWindowWidth = () => {
    const [width, setWidth] = useState(() => {
        if (typeof window === 'undefined') return 0
        return window.visualViewport?.width ?? window.innerWidth
    })

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.visualViewport?.width ?? window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        window.visualViewport?.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.visualViewport?.removeEventListener('resize', handleResize)
        }
    }, [])

    return width
}
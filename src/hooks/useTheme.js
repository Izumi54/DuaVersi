import { useState, useEffect } from 'react'

/**
 * Custom Hook untuk Dark Mode
 * Menggunakan localStorage untuk simpan preferensi
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(false)
    const [loading, setLoading] = useState(true)

    // Load theme dari localStorage saat mount
    useEffect(() => {
        const loadTheme = () => {
            try {
                const saved = localStorage.getItem('duaversi_theme')
                const prefersDark = saved === 'dark'
                setIsDark(prefersDark)

                // Apply theme ke HTML element
                if (prefersDark) {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
            } catch (error) {
                console.error('Error loading theme:', error)
            } finally {
                setLoading(false)
            }
        }

        loadTheme()
    }, [])

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)

        // Save to localStorage
        localStorage.setItem('duaversi_theme', newTheme ? 'dark' : 'light')

        // Apply to DOM
        if (newTheme) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Set specific theme
    const setTheme = (theme) => {
        const isDarkTheme = theme === 'dark'
        setIsDark(isDarkTheme)
        localStorage.setItem('duaversi_theme', theme)

        if (isDarkTheme) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return {
        isDark,
        loading,
        toggleTheme,
        setTheme,
        theme: isDark ? 'dark' : 'light'
    }
}

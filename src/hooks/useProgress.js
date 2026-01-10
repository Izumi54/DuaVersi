import { useState, useEffect } from 'react'

/**
 * Custom Hook untuk Progress Tracking
 * Menggunakan localStorage untuk simpan data
 */
export function useProgress() {
    const [completedTopics, setCompletedTopics] = useState([])
    const [loading, setLoading] = useState(true)

    // Load progress dari localStorage saat mount
    useEffect(() => {
        const loadProgress = () => {
            try {
                const saved = localStorage.getItem('duaversi_progress')
                if (saved) {
                    const data = JSON.parse(saved)
                    setCompletedTopics(data.completedTopics || [])
                }
            } catch (error) {
                console.error('Error loading progress:', error)
            } finally {
                setLoading(false)
            }
        }

        loadProgress()
    }, [])

    // Save progress ke localStorage
    const saveProgress = (topics) => {
        try {
            const data = {
                completedTopics: topics,
                stats: {
                    totalCompleted: topics.length,
                    lastUpdated: new Date().toISOString()
                }
            }
            localStorage.setItem('duaversi_progress', JSON.stringify(data))
            setCompletedTopics(topics)
        } catch (error) {
            console.error('Error saving progress:', error)
        }
    }

    // Cek apakah topik sudah selesai
    const isTopicCompleted = (topikId) => {
        return completedTopics.includes(topikId)
    }

    // Toggle completion status
    const toggleTopicCompletion = (topikId) => {
        const newCompleted = isTopicCompleted(topikId)
            ? completedTopics.filter(id => id !== topikId) // Remove
            : [...completedTopics, topikId] // Add

        saveProgress(newCompleted)
        return !isTopicCompleted(topikId) // Return new status
    }

    // Get progress untuk mata kuliah tertentu
    const getMatkulProgress = (topikList) => {
        if (!topikList || topikList.length === 0) {
            return { completed: 0, total: 0, percentage: 0 }
        }

        const completed = topikList.filter(topik =>
            completedTopics.includes(topik.id)
        ).length

        const total = topikList.length
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

        return { completed, total, percentage }
    }

    // Get semua progress stats
    const getAllProgress = () => {
        return {
            totalCompleted: completedTopics.length,
            completedTopics: completedTopics
        }
    }

    // Clear all progress (untuk testing atau reset)
    const clearProgress = () => {
        localStorage.removeItem('duaversi_progress')
        setCompletedTopics([])
    }

    return {
        loading,
        completedTopics,
        isTopicCompleted,
        toggleTopicCompletion,
        getMatkulProgress,
        getAllProgress,
        clearProgress
    }
}

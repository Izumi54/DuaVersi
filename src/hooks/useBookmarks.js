import { useState, useEffect } from 'react'

/**
 * Custom Hook untuk Bookmark
 * Menggunakan localStorage untuk simpan data (pola sama dengan useProgress).
 * Dibuat di Fase 2 agar halaman materi & bookmark tidak lagi membaca
 * localStorage secara tersebar dengan setState langsung di effect halaman.
 */
export function useBookmarks() {
    const [bookmarkIds, setBookmarkIds] = useState([])
    const [loading, setLoading] = useState(true)

    // Load bookmark dari localStorage saat mount
    useEffect(() => {
        const loadBookmarks = () => {
            try {
                const saved = localStorage.getItem('duaversi_bookmarks')
                if (saved) {
                    setBookmarkIds(JSON.parse(saved))
                }
            } catch (error) {
                console.error('Error loading bookmarks:', error)
            } finally {
                setLoading(false)
            }
        }

        loadBookmarks()
    }, [])

    // Cek apakah topik di-bookmark
    const isBookmarked = (topikId) => bookmarkIds.includes(topikId)

    // Toggle bookmark satu topik; mengembalikan status barunya
    const toggleBookmark = (topikId) => {
        const updated = isBookmarked(topikId)
            ? bookmarkIds.filter(id => id !== topikId)
            : [...bookmarkIds, topikId]
        try {
            localStorage.setItem('duaversi_bookmarks', JSON.stringify(updated))
        } catch (error) {
            console.error('Error saving bookmarks:', error)
        }
        setBookmarkIds(updated)
        return updated.includes(topikId)
    }

    // Hapus bookmark (dipakai halaman bookmark)
    const removeBookmark = (topikId) => {
        const updated = bookmarkIds.filter(id => id !== topikId)
        try {
            localStorage.setItem('duaversi_bookmarks', JSON.stringify(updated))
        } catch (error) {
            console.error('Error saving bookmarks:', error)
        }
        setBookmarkIds(updated)
    }

    return {
        loading,
        bookmarkIds,
        isBookmarked,
        toggleBookmark,
        removeBookmark
    }
}

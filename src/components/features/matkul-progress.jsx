'use client'

import { useProgress } from '@/hooks/useProgress'
import ProgressBar from '@/components/ui/progress-bar'

/**
 * Client component wrapper untuk progress bar
 * Karena mata kuliah page adalah server component
 */
export default function MatkulProgressSection({ daftarTopik }) {
    const { getMatkulProgress } = useProgress()

    // Calculate progress
    const { completed, total, percentage } = getMatkulProgress(daftarTopik)

    if (total === 0) {
        return null // Tidak tampilkan kalau tidak ada topik
    }

    return (
        <div className="mb-8">
            <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
            >
                <ProgressBar
                    completed={completed}
                    total={total}
                    showLabel={true}
                    showPercentage={true}
                    color="primary"
                    size="large"
                />

                {/* Additional Stats */}
                <div className="flex gap-6 mt-4">
                    <div>
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Selesai:
                        </span>
                        <span className="ml-2 font-bold" style={{ color: 'var(--color-secondary)' }}>
                            ✅ {completed} topik
                        </span>
                    </div>
                    <div>
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Belum:
                        </span>
                        <span className="ml-2 font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            ⏳ {total - completed} topik
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

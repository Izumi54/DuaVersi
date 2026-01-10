import clsx from 'clsx'

/**
 * Progress Bar Component
 * Menampilkan progress visual dengan persentase
 */
export default function ProgressBar({
    completed,
    total,
    showLabel = true,
    showPercentage = true,
    color = 'primary', // primary, secondary, success
    size = 'medium' // small, medium, large
}) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

    // Color variants
    const colorClasses = {
        primary: 'bg-[var(--color-primary)]',
        secondary: 'bg-[var(--color-secondary)]',
        success: 'bg-[var(--color-secondary)]'
    }

    // Size variants
    const heightClasses = {
        small: 'h-2',
        medium: 'h-3',
        large: 'h-4'
    }

    return (
        <div className="w-full">
            {/* Label */}
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        Progress Belajar
                    </span>
                    {showPercentage && (
                        <span
                            className="text-sm font-bold"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            {percentage}%
                        </span>
                    )}
                </div>
            )}

            {/* Progress Bar Container */}
            <div
                className={clsx(
                    'w-full rounded-full overflow-hidden',
                    heightClasses[size]
                )}
                style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
            >
                {/* Progress Fill */}
                <div
                    className={clsx(
                        'h-full transition-all duration-500 ease-out rounded-full',
                        colorClasses[color]
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Stats Text */}
            {showLabel && (
                <div
                    className="text-xs mt-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {completed} dari {total} topik selesai
                </div>
            )}
        </div>
    )
}

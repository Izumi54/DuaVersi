import clsx from 'clsx'

/**
 * Component: Kartu (Card)
 * Container card reusable - Modern & Professional
 */
export default function Kartu({
    children,
    className = '',
    hover = false,
    padding = 'medium',
    onClick
}) {
    const kelasBase = 'rounded-md border transition-all duration-200'
    const kelasHover = hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer' : ''

    const kelasPadding = {
        none: 'p-0',
        small: 'p-3',
        medium: 'p-4 md:p-6',
        large: 'p-6 md:p-8'
    }

    return (
        <div
            onClick={onClick}
            className={clsx(
                kelasBase,
                kelasHover,
                kelasPadding[padding],
                className
            )}
            style={{
                backgroundColor: 'var(--color-surface-light)',
                borderColor: 'var(--color-border-light)'
            }}
        >
            {children}
        </div>
    )
}

/**
 * Component: KartuHeader
 * Header section untuk Kartu
 */
export function KartuHeader({ children, className = '' }) {
    return (
        <div className={clsx('mb-4', className)}>
            {children}
        </div>
    )
}

/**
 * Component: KartuBody
 * Body section untuk Kartu
 */
export function KartuBody({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

/**
 * Component: KartuFooter
 * Footer section untuk Kartu
 */
export function KartuFooter({ children, className = '' }) {
    return (
        <div className={clsx('mt-4', className)}>
            {children}
        </div>
    )
}

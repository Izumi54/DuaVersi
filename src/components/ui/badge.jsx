import clsx from 'clsx'

/**
 * Component: Badge
 * Badge untuk label, tag, atau status
 */
export default function Badge({
    children,
    variant = 'default',
    ukuran = 'medium',
    className = ''
}) {
    const kelasBase = 'inline-flex items-center font-medium rounded-full'

    const kelasUkuran = {
        small: 'px-2 py-0.5 text-xs',
        medium: 'px-3 py-1 text-sm',
        large: 'px-4 py-1.5 text-base'
    }

    const kelasVariant = {
        default: 'bg-opacity-10',
        primary: 'bg-opacity-10',
        secondary: 'bg-opacity-10',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800'
    }

    // Inline styles untuk custom colors
    const styleVariant = {
        default: {
            backgroundColor: 'rgba(31, 41, 55, 0.1)',
            color: 'var(--color-text-primary)'
        },
        primary: {
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            color: 'var(--color-primary)'
        },
        secondary: {
            backgroundColor: 'rgba(5, 150, 105, 0.1)',
            color: 'var(--color-secondary)'
        }
    }

    return (
        <span
            className={clsx(
                kelasBase,
                kelasVariant[variant],
                kelasUkuran[ukuran],
                className
            )}
            style={['default', 'primary', 'secondary'].includes(variant) ? styleVariant[variant] : undefined}
        >
            {children}
        </span>
    )
}

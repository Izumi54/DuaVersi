import clsx from 'clsx'

/**
 * Component: Tombol (Button)
 * Reusable button - Modern & Professional
 */
export default function Tombol({
    children,
    variant = 'primary',
    ukuran = 'medium',
    onClick,
    disabled = false,
    type = 'button',
    className = ''
}) {
    const kelasBase = 'font-medium rounded-md transition-all duration-200 inline-flex items-center justify-center'

    const kelasVariant = {
        primary: 'text-white hover:opacity-90',
        secondary: 'text-white hover:opacity-90',
        outline: 'bg-transparent border-2 hover:bg-opacity-10',
        ghost: 'bg-transparent hover:bg-opacity-10'
    }

    const kelasUkuran = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-5 py-2.5 text-sm',
        large: 'px-6 py-3 text-base'
    }

    const kelasDisabled = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    // Inline styles untuk warna (karena Tailwind v4 custom colors)
    const styleVariant = {
        primary: { backgroundColor: 'var(--color-primary)' },
        secondary: { backgroundColor: 'var(--color-secondary)' },
        outline: {
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)'
        },
        ghost: { color: 'var(--color-text-primary)' }
    }

    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={clsx(
                kelasBase,
                kelasVariant[variant],
                kelasUkuran[ukuran],
                kelasDisabled,
                className
            )}
            style={styleVariant[variant]}
        >
            {children}
        </button>
    )
}

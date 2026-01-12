import clsx from 'clsx'

/**
 * Component: Badge
 * Small label/tag - Modern & Professional
 */
export default function Badge({
    children,
    variant = 'default',
    ukuran = 'medium',
    className = ''
}) {
    const kelasBase = 'inline-flex items-center font-medium rounded-md border'

    const kelasUkuran = {
        small: 'px-2 py-0.5 text-xs',
        medium: 'px-2.5 py-1 text-sm',
        large: 'px-3 py-1.5 text-base'
    }

    // Outline style - more professional
    const kelasVariant = {
        default: 'border-gray-300 text-gray-700 bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800',
        primary: 'border-indigo-300 text-indigo-700 bg-indigo-50 dark:border-indigo-600 dark:text-indigo-300 dark:bg-indigo-900',
        secondary: 'border-emerald-300 text-emerald-700 bg-emerald-50 dark:border-emerald-600 dark:text-emerald-300 dark:bg-emerald-900',
        success: 'border-green-300 text-green-700 bg-green-50 dark:border-green-600 dark:text-green-300 dark:bg-green-900',
        warning: 'border-amber-300 text-amber-700 bg-amber-50 dark:border-amber-600 dark:text-amber-300 dark:bg-amber-900',
        error: 'border-red-300 text-red-700 bg-red-50 dark:border-red-600 dark:text-red-300 dark:bg-red-900',
        info: 'border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:bg-blue-900'
    }

    return (
        <span
            className={clsx(
                kelasBase,
                kelasVariant[variant],
                kelasUkuran[ukuran],
                className
            )}
            style={undefined}
        >
            {children}
        </span>
    )
}

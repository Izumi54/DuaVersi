import clsx from 'clsx'

/**
 * Component: Input
 * Input field reusable untuk form
 */
export default function Input({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    disabled = false,
    className = '',
    icon,
    ...props
}) {
    const kelasBase = 'w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2'
    const kelasDisabled = disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }}>
                    {icon}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={clsx(
                    kelasBase,
                    kelasDisabled,
                    icon && 'pl-10',
                    className
                )}
                style={{
                    borderColor: 'var(--color-bg-light)',
                    backgroundColor: 'var(--color-surface-light)',
                    color: 'var(--color-text-primary)'
                }}
                {...props}
            />
        </div>
    )
}

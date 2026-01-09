import Link from 'next/link'

/**
 * Component: Breadcrumb
 * Breadcrumb navigation
 */
export default function Breadcrumb({ items = [] }) {
    if (!items || items.length === 0) return null

    return (
        <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
                {/* Home Link */}
                <li>
                    <Link
                        href="/"
                        className="hover:opacity-70 transition"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        🏠 Beranda
                    </Link>
                </li>

                {/* Breadcrumb Items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={index} className="flex items-center space-x-2">
                            <span style={{ color: 'var(--color-text-secondary)' }}>›</span>
                            {isLast ? (
                                <span
                                    className="font-medium"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:opacity-70 transition"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

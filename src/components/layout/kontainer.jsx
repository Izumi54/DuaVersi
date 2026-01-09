/**
 * Component: Kontainer
 * Container wrapper untuk konsistensi layout
 */
export default function Kontainer({ children, className = '' }) {
    return (
        <div className={`container mx-auto px-4 ${className}`}>
            {children}
        </div>
    )
}

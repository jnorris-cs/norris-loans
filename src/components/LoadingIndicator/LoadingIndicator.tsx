interface LoadingIndicatorProps { text?: string, className?: string }

export default ({ text = 'Loading...', className }: LoadingIndicatorProps) => (
    <div className={className}>
        {text}
    </div>
)
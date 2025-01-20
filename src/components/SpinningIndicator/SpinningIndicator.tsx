interface SpinningIndicatorProps {
	className?: string;
	text?: string;
}
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SpinningIndicator = ({
	className,
	text = 'Loading...',
}: SpinningIndicatorProps) => (
	<div className={className}>
		<FontAwesomeIcon
			className="mr2 fa-spin"
			icon={faSpinner}
		/>
		{text}
	</div>
);

export default SpinningIndicator;

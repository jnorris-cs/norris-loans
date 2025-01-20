interface SpinningIndicatorProps {
	text?: string;
	className?: string;
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SpinningIndicator = ({
	text = 'Loading...',
	className,
}: SpinningIndicatorProps) => (
	<div className={className}>
		<FontAwesomeIcon
			icon={faSpinner}
			className="mr2 fa-spin"
		/>
		{text}
	</div>
);

export default SpinningIndicator;

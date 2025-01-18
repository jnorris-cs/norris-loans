interface LoadingIndicatorProps {
	text?: string;
	className?: string;
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIndicator = ({
	text = "Loading...",
	className,
}: LoadingIndicatorProps) => (
	<div className={className}>
		<FontAwesomeIcon icon={faSpinner} className="mr2 fa-spin" />
		{text}
	</div>
);

export default LoadingIndicator;

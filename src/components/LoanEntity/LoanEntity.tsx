import { useCallback, useState } from "react";
import type { LoanEntityMetadata } from "../../types";
import LoanField from "../LoanField/LoanField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface LoanEntityProps {
	entity: LoanEntityMetadata;
	values?: Record<string, unknown>;
}

const LoanEntity = ({ entity }: LoanEntityProps) => {
	const [showFields, setShowFields] = useState(true);

	const toggleFieldVisibility = useCallback(() => {
		setShowFields(!showFields);
	}, [setShowFields, showFields]);

	return (
		<fieldset className="bw0 pa0 mb4">
			<legend className="mb2">
				<span className="fw6 f3 mr2">{entity.name}</span>
				<button
					className="pa0 bw0 bg-transparent"
					onClick={toggleFieldVisibility}
				>
					<FontAwesomeIcon icon={showFields ? faChevronDown : faChevronUp} />
				</button>
			</legend>
			<></>
			{showFields
				? entity.fields.map((field) => (
						<LoanField field={field} key={field.field} />
					))
				: false}
		</fieldset>
	);
};

export default LoanEntity;

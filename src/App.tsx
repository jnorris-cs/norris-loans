import './App.css';
import 'tachyons';
import SpinningIndicator from 'components/SpinningIndicator/SpinningIndicator';
import LoanForm from 'components/LoanForm/LoanForm';
import useMetadata from 'hooks/useMetadata/useMetadata';

const App = () => {
	const { isLoadingMetadata, fieldsMetadata } = useMetadata();

	return (
		<div className="content pa3">
			<h1 className="ma0">Norris Loans</h1>
			{isLoadingMetadata ? (
				<SpinningIndicator className="mt3" />
			) : (
				<LoanForm fields={fieldsMetadata} />
			)}
		</div>
	);
};

export default App;

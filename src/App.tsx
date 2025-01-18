import "./App.css";
import "tachyons";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import useMetadata from "./hooks/useMetadata/useMetadata";

const App = () => {
	const { isLoadingMetadata } = useMetadata();

	return (
		<div className="content pa3">
			<h1 className="ma0">Norris Loans</h1>
			{isLoadingMetadata ? <LoadingIndicator className="mt3" /> : "yay"}
		</div>
	);
};

export default App;

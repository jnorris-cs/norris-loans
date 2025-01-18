import "./App.css";
import "tachyons";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";

const App = () => {
	return (
		<div className="content pa3">
			<h1 className="ma0">Norris Loans</h1>
			<LoadingIndicator className="mt3" />
		</div>
	);
};

export default App;

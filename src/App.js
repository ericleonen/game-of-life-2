import { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import Simulation from './components/Simulation';

function App() {
	const [rules, setRules] = useState([]);

	return (
		<div className="App">
			<SideBar rules={rules} setRules={setRules} />
			<Simulation rules={rules} />
		</div>
	);
}

export default App;

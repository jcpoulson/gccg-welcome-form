import './App.css';
import gccgLogo from "./assets/Grace21.png"


// Components
import Form from './pages/Form';

const App: React.FC = () => {

	return (
		<>
			<div>
				<a href="https://www.gracecov.org/georgetown/" target="_blank">
					<img src={gccgLogo} className="logo gccg" alt="gccg logo" />
				</a>
			</div>
			<Form />
		</>
	)
}

export default App

import './App.css';
import gccgLogo from "./assets/Grace21.png"

import { Routes, Route } from 'react-router';


// Components
import Form from './pages/Form';
import Complete from './pages/Complete';

const App: React.FC = () => {

	return (
		<>
			<div>
				<a href="https://www.gracecov.org/georgetown/" target="_blank">
					<img src={gccgLogo} className="logo gccg" alt="gccg logo" />
				</a>
			</div>
			
			<Routes>
				<Route path='/' element={<Form />} />
				<Route path='/complete' element={<Complete />} />
			</Routes>
		</>
	)
}

export default App


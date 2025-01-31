import { useState } from 'react'

import sampleData from '../data'

import "../App.css";
import AutocompleteTextField from '../components/AutoCompleteField';
import BeenHereBefore from '../components/BeenHereBefore';
import { Button } from '@mui/material';

type Props = object

const Form: React.FC<Props> = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [beenHereBefore, setBeenHereBefore] = useState<boolean | null>(null);


	const [displayEmail, setDisplayEmail] = useState(false);


	const autoFillOutForm = (arg: string) => {
		// For auto-populating the rest of the form upon clicking a value
		const findPersonData = sampleData.find(person => person.name === arg || person.email === arg);

		if (findPersonData) {
			setName(findPersonData.name);
			setEmail(findPersonData.email);
			setBeenHereBefore(findPersonData.beenHereBefore);
		}

	}


	const names = sampleData.map(person => person.name);
	const emails = sampleData.map(person => person.email);


    return (
        <>
		<h1>Welcome to GCCG</h1>
		<div className="card formPaper">
		
            <div className="formArea">
				<AutocompleteTextField
					label="Name"
					suggestions={names}
					formValue={name}
					setFormValue={setName}
					autoFillOutForm={autoFillOutForm}
				/>
			</div>

			<div className="formArea">
				<BeenHereBefore beenHereBefore={beenHereBefore} setFormValue={setBeenHereBefore} setDisplayEmail={setDisplayEmail} />
			</div>

			{
				displayEmail ? 
				<div className="formArea">
				<AutocompleteTextField
					label="Email"
					suggestions={emails}
					formValue={email}
					setFormValue={setEmail}
					autoFillOutForm={autoFillOutForm}
				/>
			</div>
			: null
			}


			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>


			<div className="formArea">
				<Button variant='contained'>Submit</Button>
				<Button variant='contained' color='inherit' onClick={() => {
					setName('')
					setEmail('')
					setBeenHereBefore(null)
				}} >Clear</Button>
			</div>
		</div>
		<p className="read-the-docs">
			Click on the logos to learn more
		</p>
        </>
    )
}

export default Form
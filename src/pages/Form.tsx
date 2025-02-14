import { useState, useEffect } from 'react'

import sampleData from '../data'

import "../App.css";
import AutocompleteTextField from '../components/AutoCompleteField';
import BeenHereBefore from '../components/BeenHereBefore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { populationScriptEndpoint } from './googleSheetsFunctions';
import { getCurrentDateFormattedPadded } from '../helpers';

type Props = object

const Form: React.FC<Props> = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [beenHereBefore, setBeenHereBefore] = useState<boolean | null>(null);
	const [displayEmail, setDisplayEmail] = useState(false);


	let navigate = useNavigate();
	const formattedDate = getCurrentDateFormattedPadded();

	
	useEffect(() => {
		fetch(`${populationScriptEndpoint}?name=${formattedDate}`)
			.then(response => response.json())
			.then(data => {
				console.log(data); // Handle the response (success or error)
				if(data.sheetCreated){
					// Do something if sheet was created
				} else if(data.sheetExists) {
					// Do something if sheet already exists
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}, [])


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

	async function handleSubmissionToGoogleSheets() {

		const dataToSend = {
			name: name,
			email: email,
			beenHereBefore: beenHereBefore === true ? "Yes" : "No",
			sheetName: formattedDate
		  };


		  fetch(populationScriptEndpoint, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataToSend)
		  })
		  .then(response => response.json())
		  .then(data => {
			console.log('Success:', data);
		  })
		  .catch(error => {
			console.error('Error:', error);
		  });
	}


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
				: 
					null
			}


			{
				!displayEmail ?
					<p>
						Email not needed if you have been here before
					</p>
				:
					null
			}


			<div className="formArea">
				<Button variant='contained' onClick={async () => {
					// handle submission to google sheets
					await handleSubmissionToGoogleSheets();
					navigate('/complete')
				}}>Submit</Button>
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
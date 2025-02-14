import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

type Props = {}

const Complete: React.FC<Props> = ({ }) => {
	const [ttl, setTtl] = useState(5);
	let navigate = useNavigate()

	useEffect(() => {
		if (ttl === 0) {
			navigate('/')
		}

		setTimeout(() => {
			setTtl(ttl - 1)
		}, 1000)
	}, [ttl])

    return (
        <>
		<h1>Form Sumbission Complete</h1>
		<div className="card formPaper">
		
            <div className="formArea">
				
			</div>


			<p>
				Returning to form in {ttl}
			</p>


			<div className="formArea">
				
			</div>
		</div>
		<p className="read-the-docs">
			Click on the logos to learn more
		</p>
        </>
    )
}

export default Complete
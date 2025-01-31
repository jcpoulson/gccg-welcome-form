import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type Props = {
    beenHereBefore: boolean | null
    setFormValue: (arg: boolean) => void;
    setDisplayEmail: (arg: boolean) => void;
}

const BeenHereBefore: React.FC<Props> = ({ beenHereBefore, setFormValue, setDisplayEmail }) => {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Have you been here before?</FormLabel>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={beenHereBefore}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Yes" onClick={() => setFormValue(true)}/>
                    <FormControlLabel value={false} control={<Radio />} label="No" onClick={() => { 
                        setFormValue(false)
                        setDisplayEmail(true)
                    }} />
                </RadioGroup>
            </div>
        </FormControl>
    );
}

export default BeenHereBefore;

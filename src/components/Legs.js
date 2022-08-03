import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { ListItemText } from '@mui/material';

function Legs(props) {
    const handleChange = (event) => {
        const value = event.target.value;

        if (value.indexOf("any") > -1) {
            props.setFilteredLegs(props.filteredLegs.length === props.legs.length ? [] : props.legs);
            return;
          }
        props.setFilteredLegs(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return(
        <FormControl fullWidth>
            <InputLabel id="legs-select-label">Legs</InputLabel>
            <Select
                multiple
                labelId="legs-select-label"
                id="legs-select"
                value={props.filteredLegs}
                label="Legs"
                onChange={handleChange}
                // renderValue={(selected) => selected.join(', ')}
                renderValue={(selected) => {
                    if(selected.length === props.legs.length) return 'any'
                    // if(1) return selected
                    else return selected.join(', ')
                    }
                }
            >
                <MenuItem key='any' value='any'>
                    <Checkbox checked={props.filteredLegs.length === props.legs.length} />
                    <ListItemText primary='any' />
                </MenuItem>
                {props.legs.map((item) => (
                    <MenuItem key={item} value={item}>
                        <Checkbox checked={props.filteredLegs.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default Legs
import { Button, ButtonGroup} from "@mui/material"

function Roles(props) {
    return(
        <ButtonGroup size='small'>
            {props.roles.map((role, i) => 
                <Button
                    variant="contained"
                    key={i}
                    onClick={()=>props.filterByRole(role)}
                    color={(props.filteredRoles.includes(role) && 'secondary') || 'primary'}
                    >
                        {role}
                </Button>
            )}
        </ButtonGroup>
    )
}

export default Roles
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button, Chip, Typography } from "@mui/material"
import { Link } from "react-router-dom";

function HeroCard(props) { 
    if(props.hero===undefined) {
        return null
    }

    const isDisabledYourTeam = 
            props.enemyTeam.includes(props.hero.id)
            || (!props.yourTeam.includes(props.hero.id) && props.yourTeam.length === 5)

    const isDisabledEnemyTeam = 
            props.yourTeam.includes(props.hero.id)
            || (!props.enemyTeam.includes(props.hero.id) && props.enemyTeam.length === 5)
            
    const roleChips = props.hero.roles.map((role, i) => <Chip label={role} key={i} />)
    return(
        <Card variant="outlined" sx={{ maxWidth: 384 }}>
            <CardHeader title={props.hero.localized_name} />
            <CardMedia
                component="img"
                height="216"
                image={`https://cdn.cloudflare.steamstatic.com/${props.hero.img}?w=164&h=144&fit=crop&auto=format`}
                alt={props.localized_name}
            />
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                    {props.hero.attack_type}
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                    {`win rate: ${props.hero.winRate}%`}
                </Typography>
                {roleChips}
            </CardContent>
            <CardActions>
                <Link
                    to={`/heroes/${props.hero.id}`}
                    state={props.hero}
                >
                    <Button size="small" variant='outlined' sx={{ mr: 1}}>View Details</Button>
                </Link>
                <Button
                    size="small" 
                    variant='contained'
                    onClick={()=>props.pick(1)}
                    disabled={isDisabledYourTeam}
                >
                    {(props.yourTeam.includes(props.hero.id) && 'UNPICK') || 'PICK'}
                </Button>
                <Button
                    size="small" 
                    variant='contained'
                    onClick={()=>props.pick(2)}
                    disabled={isDisabledEnemyTeam}
                >
                    {(props.enemyTeam.includes(props.hero.id) && 'UNPICK ') || 'PICK '}ENEMY
                </Button>
            </CardActions>
        </Card>
    )
}

export default HeroCard
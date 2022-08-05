import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material"
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
    return(
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardHeader title={props.hero.localized_name} />
            <CardMedia
                component="img"
                height="140"
                image={`https://cdn.cloudflare.steamstatic.com/${props.hero.img}?w=164&h=144&fit=crop&auto=format`}
                alt="props.name"
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                details go here
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {`win rate (this month): ${props.hero.winRate}%`}
                </Typography>
            </CardContent>
            <CardActions>
                <Link
                    to={`/heroes/${props.hero.id}`}
                    key={props.hero.id}
                >
                    <Button size="small" variant='outlined'>View Details</Button>
                </Link>
                <Button
                    size="small" 
                    variant='outlined'
                    onClick={()=>props.pick(1)}
                    disabled={isDisabledYourTeam}
                >
                    PICK</Button>
                <Button
                    size="small" 
                    variant='outlined'
                    onClick={()=>props.pick(2)}
                    disabled={isDisabledEnemyTeam}
                >
                    PICK ENEMY</Button>
            </CardActions>
        </Card>
    )
}

export default HeroCard
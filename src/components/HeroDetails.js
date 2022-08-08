import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, Chip, Container, Stack } from "@mui/material"
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as items from '../items.json'
import ItemGrid from './ItemGrid';

function HeroDetails() {
    const [heroItems, setHeroItems] = useState()
    const location = useLocation();
    const hero = location.state; 

    const getPopularItems = () => {
        const url = `https://api.opendota.com/api/heroes/${hero.id}/itemPopularity`
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                response.json()
                    .then(data => setHeroItems(data))
                    .catch((error) => {
                        console.error('There has been a problem with the item fetch:', error);
                    });
        })
    }

    useEffect(getPopularItems, [hero.id])

    const roleChips = hero.roles.map((role, i) => <Chip label={role} key={i} />)

    const itemGridEarly = heroItems ? <ItemGrid items={Object.entries(heroItems.early_game_items)} itemDb={items}/> : null
    const itemGridLate = heroItems ? <ItemGrid items={Object.entries(heroItems.late_game_items)} itemDb={items}/> : null

    return hero ? (

        <Container>
            <Stack direction="row" spacing={2}>
                <Card variant="outlined" sx={{ maxWidth: 384 }}>
                    <CardHeader title={hero.localized_name} />
                    <CardMedia
                        component="img"
                        height="216"
                        image={`https://cdn.cloudflare.steamstatic.com/${hero.img}?w=164&h=144&fit=crop&auto=format`}
                        alt={hero.localized_name}
                    />
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                        {hero.attack_type}
                        </Typography>
                        <div className='hero-details-roles'>
                            {roleChips}
                        </div>
                        <Typography color="text.secondary">
                            {`Win rate: ${hero.winRate}%`}
                        </Typography>
                        <Typography color="text.secondary">
                            {`Legs: ${hero.legs}`}
                        </Typography>
                        <Typography color="text.secondary">
                            {`Base armour: ${hero.base_armor}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link
                            to={`/draft`}
                        >
                            <Button size="small" variant='outlined'>Return to Draft</Button>
                        </Link>
                    </CardActions>
                </Card>
                <div>
                    <Typography variant="h5" >Popular Items (Early)</Typography>
                    {itemGridEarly}
                </div>
                <div>
                    <Typography variant="h5" >Popular Items (Late)</Typography>
                    {itemGridLate}
                </div>
                
            </Stack>
        </Container>
      ) : (
        <CircularProgress />
      );
}

export default HeroDetails
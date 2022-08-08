import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, Chip } from "@mui/material"
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as items from '../items.json'
import ItemGrid from './ItemGrid';

function HeroDetails() {
    const [heroItems, setHeroItems] = useState()
    // const { heroId } = useParams();
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

    // const earlyItems =     
    //     heroItems ? Object.entries(heroItems.early_game_items)
    //             .map(x => {
    //                 const item = Object.values(items).find(i => i.id === parseInt(x))
    //                 return (
    //                     <div>
    //                         <img src={`https://cdn.cloudflare.steamstatic.com/${item.img}`} alt={item.dname} key={item.id}/>
    //                         <h5>{item.dname}</h5>
    //                     </div>
    //                 )
    //             })
    //             : null

    const itemGrid = heroItems ? <ItemGrid earlyItems={Object.entries(heroItems.early_game_items)} itemDb={items}/> : null

    return hero ? (

        <div>
            <Card variant="outlined" sx={{ maxWidth: 384 }}>
            <CardHeader title={hero.localized_name} />
            <CardMedia
                component="img"
                height="216"
                image={`https://cdn.cloudflare.steamstatic.com/${hero.img}?w=164&h=144&fit=crop&auto=format`}
                alt={hero.localized_name}
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {hero.attack_type}
                </Typography>
                {roleChips}
                <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                    {`win rate: ${hero.winRate}%`}
                    {/* {console.log(Object.values(items))} */}
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
            {itemGrid}
        </div>
      ) : (
        <CircularProgress />
      );
}

export default HeroDetails
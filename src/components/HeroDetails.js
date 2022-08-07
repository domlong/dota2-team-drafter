import { CircularProgress } from '@mui/material';
import { useParams } from "react-router-dom";
import mockResponseData from "../dummyHeroData";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material"
import { Link } from "react-router-dom";

function HeroDetails() {

    const { heroId } = useParams();
    const hero = mockResponseData.heroes.find(hero => hero.id===parseInt(heroId))

    return hero ? (

        <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardHeader title={hero.localized_name} />
        <CardMedia
            component="img"
            height="140"
            image={`https://cdn.cloudflare.steamstatic.com/${hero.img}?w=164&h=144&fit=crop&auto=format`}
            alt="props.name"
        />
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            details go here
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {`win rate: ${hero.winRate}%`}
            </Typography>
        </CardContent>
        <CardActions>
            <Link
                to={`/draft`}
                // key={props.hero.id}
            >
                <Button size="small" variant='outlined'>Return to Draft</Button>
            </Link>
        </CardActions>
    </Card>
      ) : (
        <CircularProgress />
      );
}

export default HeroDetails


import { CircularProgress } from '@mui/material';
import { useParams } from "react-router-dom";
import mockResponseData from "../dummyHeroData";

function HeroDetails() {

    const { heroId } = useParams();
    const hero = mockResponseData.heroes.find(hero => hero.id===parseInt(heroId))

    return hero ? (
        <div>
          <h1>{hero.localized_name}</h1>
          <img
            src={`https://cdn.cloudflare.steamstatic.com/${hero.img}?w=164&h=144&fit=crop&auto=format`}
            srcSet={`https://cdn.cloudflare.steamstatic.com/${hero.img}?w=164&h=144&fit=crop&auto=format&dpr=2 2x`}
            alt={hero.localized_name}
            loading="lazy"
          />
        </div>
      ) : (
        <CircularProgress />
      );
}

export default HeroDetails
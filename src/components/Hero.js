import { ImageListItem } from "@mui/material"

function Hero(props) {

    return(
        <ImageListItem 
            key={props.hero.id}
            id={props.hero.id}
            sx={{ opacity: props.isActive ? "100%" : "30%" }}
            >
        <img
            src={`https://cdn.cloudflare.steamstatic.com/${props.hero.img}?w=164&h=144&fit=crop&auto=format`}
            srcSet={`https://cdn.cloudflare.steamstatic.com/${props.hero.img}?w=164&h=144&fit=crop&auto=format&dpr=2 2x`}
            alt={props.hero.localized_name}
            loading="lazy"
            onClick={()=>props.selectHero(props.hero.id)}
        />
        </ImageListItem>
    )
}

export default Hero
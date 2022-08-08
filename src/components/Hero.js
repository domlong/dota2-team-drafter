import { ImageListItem } from "@mui/material"

function Hero(props) {
    let imageUrl = props.hero.img
    if(props.showIcon) {
        imageUrl = props.hero.icon
    }
    return(
        <ImageListItem 
            key={props.hero.id}
            id={props.hero.id}
            sx={{ opacity: props.isActive ? "100%" : "30%" }}
            >
        <img
            src={`https://cdn.cloudflare.steamstatic.com/${imageUrl}?w=164&h=144&fit=crop&auto=format`}
            alt={props.hero.localized_name}
            loading="lazy"
            onClick={()=>props.selectHero(props.hero.id)}
        />
        </ImageListItem>
    )
}

export default Hero
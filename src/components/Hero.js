import { ImageListItem, ImageListItemBar } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../demo'


function Hero(props) {
    let imageUrl = props.hero.img
    if(props.showIcon) {
        imageUrl = props.hero.icon
    }
    return(
        <ThemeProvider theme={theme}>
            <ImageListItem 
            key={props.hero.id}
            id={props.hero.id}
            sx={{ opacity: props.isActive ? "100%" : "30%", }}
            className='zoom'
            onClick={()=>props.selectHero(props.hero.id)}
            >
                <img
                    src={`https://cdn.cloudflare.steamstatic.com/${imageUrl}?w=164&h=144&fit=crop&auto=format`}
                    alt={props.hero.localized_name}
                    loading="lazy"
                    
                />
                <ImageListItemBar
                    title={props.hero.localized_name}
                    position="bottom"
                    className="hidden-title"
                />
        
            </ImageListItem>
        </ThemeProvider>
    )
}

export default Hero
import { ImageList } from "@mui/material"
import Hero from "./Hero"

function HeroGrid(props) {
    if(props.heroes === undefined || props.heroes.length===0) return null
    return(
        <ImageList cols={10}>
            {props.heroes.map((hero) => (
                <Hero
                    key={hero.id}
                    hero={hero}
                    selectHero={props.selectHero}
                    isActive={props.highlightedHeroes.includes(hero.id)}
                    />
            ))}
        </ImageList>
    )
}

export default HeroGrid
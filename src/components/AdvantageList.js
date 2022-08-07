import { ImageList } from "@mui/material"
import Hero from "./Hero"

function AdvantageList(props) {
    if(props.heroes === undefined || props.heroes.length===0 || props.list === undefined || props.list.length===0) return null
    return(
        <ImageList cols={6}>
            {props.list.map((item) => (
                <div>
                    <Hero
                    key={item.id}
                    hero={props.heroes.find(x => x.id === item.id)}
                    selectHero={props.selectHero}
                    isActive={true}
                    />
                    <p>{`${item.advantage}%`}</p>
                </div>
            ))}
        </ImageList>
    )
}

export default AdvantageList
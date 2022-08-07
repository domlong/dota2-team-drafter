import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function AdvantageList(props) {
    if(props.heroes === undefined || props.heroes.length===0 || props.list === undefined || props.list.length===0) return null

    // stole from some dude's github
    // https://gist.github.com/mlocati/7210513
    function perc2color2(perc,min,max) {
        let tempPerc = perc > max ? max : perc < min ? min : perc
        var base = (max - min);

        if (base === 0) { tempPerc = 100; }
        else {
            tempPerc = (tempPerc - min) / base * 100; 
        }
        var r, g, b = 0;
        if (tempPerc < 50) {
            r = 255;
            g = Math.round(5.1 * tempPerc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * tempPerc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    return(
        <List cols={1} style={{maxHeight: 460, overflow: 'auto'}}>
            {props.list.map((item) => {
                const hero = props.heroes.find(x => x.id === item.id)
                return (
                <ListItem
                    key={item.id}
                    onClick={()=>props.selectHero(item.id)}
                    sx={{ bgcolor: perc2color2(item.advantage,-15,15)}}
                >
                    <ListItemIcon>
                        <img
                            src={`https://cdn.cloudflare.steamstatic.com/${hero.icon}?w=164&h=144&fit=crop&auto=format`}
                            // srcSet={`https://cdn.cloudflare.steamstatic.com/${props.hero.img}?w=164&h=144&fit=crop&auto=format&dpr=2 2x`}
                            alt={hero.localized_name}
                            loading="lazy"
                        />
                    </ListItemIcon>
                    <ListItemText primary={`${item.advantage}%`}/>
                </ListItem>
            )})}
        </List>
    )
}

export default AdvantageList
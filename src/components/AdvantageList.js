import Hero from "./Hero"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function AdvantageList(props) {
    if(props.heroes === undefined || props.heroes.length===0 || props.list === undefined || props.list.length===0) return null

    // stole from some dude's github
    // https://gist.github.com/mlocati/7210513
    function perc2color(perc) {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    return(
        <List cols={1} style={{maxHeight: 500, overflow: 'auto'}}>
            {props.list.map((item) => (
                <ListItem key={item.id} sx={{ bgcolor: perc2color(item.advantage*4+50)}}
                onClick={()=>props.selectHero(item.id)}>
                    <ListItemIcon>
                            <Hero
                                hero={props.heroes.find(x => x.id === item.id)}
                                selectHero={props.selectHero}
                                isActive={true}
                                showIcon={true}
                                />  
                    </ListItemIcon>
                    <ListItemText primary={`${item.advantage}%`}/>
                </ListItem>
            ))}
        </List>
    )
}

export default AdvantageList
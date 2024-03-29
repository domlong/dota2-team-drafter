import { useState, useEffect } from "react"
import { CircularProgress, TextField, Stack, Button, Typography} from '@mui/material';
import { Box } from "@mui/system";
import HeroGrid from "./HeroGrid"
import Roles from "./Roles";
import Legs from "./Legs";
import HeroCard from "./HeroCard";
import AdvantageList from "./AdvantageList";
import {heroMap} from "../dotabuffHeroMap";
import {advantages} from "../matchupAdvantages";

function DraftPage() {
    const [heroes, setHeroes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredRoles, setFilteredRoles] = useState([])
    const [filteredLegs, setFilteredLegs] = useState([0,2,4,6,8])
    const [activeHero, setActiveHero] = useState(0)
    const attributes = ['str', 'agi', 'int', 'all']
    const [yourTeam, setYourTeam] = useState([])
    const [enemyTeam, setEnemyTeam] = useState([])

    const legs = heroes
                    .reduce((prev, curr) => {
                        !prev.includes(curr.legs) && prev.push(curr.legs)
                        return prev
                    }, [])
                    .sort()

    const roles = heroes
                    .reduce((prev, curr) => {
                        curr.roles.forEach(role => !prev.includes(role) && prev.push(role))
                        return prev
                    }, [])
                    .sort()

    const selectHero = (heroId) => {
        if (activeHero === heroId) {
            setActiveHero(-1)
        }
        else setActiveHero(heroId)
    }    

    const filterSearchTerm = () => {
        if(searchTerm === '') {
            return []
        }
        else {
            const filteredIds = 
                    [...heroes].filter(hero => hero.localized_name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                                .map(hero => hero.id)
            if(filteredIds.length>0) return filteredIds
            else return []
        }
    }

    const setHighlightedHeroes = () => {
        const emptySearch = searchTerm.length === 0
        const allRolesActive = filteredRoles.length === 0
        const allHeroesActive = emptySearch && allRolesActive && filteredLegs.length === legs.length

        return heroes
            .filter(hero => {
                const heroHasActiveRoles = filteredRoles.every(r => hero.roles.indexOf(r) >= 0)
                const heroMatchesSearch = filteredHeroes.includes(hero.id)
                const heroHasEnoughLegs = filteredLegs.includes(hero.legs)
                const heroIsDrafted = [...yourTeam, ...enemyTeam].includes(hero.id)
                return (
                    ((emptySearch && heroHasActiveRoles && heroHasEnoughLegs)
                    || (emptySearch && heroHasEnoughLegs && allRolesActive)
                    || (heroHasActiveRoles && heroMatchesSearch)
                    || (allRolesActive && heroMatchesSearch)
                    || allHeroesActive)
                    && !heroIsDrafted
                )
            })
            .map(hero => hero.id)
    }

    const filteredHeroes = filterSearchTerm()
    const highlightedHeroes = setHighlightedHeroes()

    const filterByRole = (role) => {
        if(filteredRoles.includes(role)) {
            setFilteredRoles(filteredRoles.filter(item => item !== role))
        }
        else {
            setFilteredRoles([role, ...filteredRoles])
        }
    }

    const filterByLegs = (legs) => {
        if(filteredLegs.includes(legs)) {
            setFilteredLegs(filteredLegs.filter(item => item !== legs))
        }
        else {
            setFilteredLegs([legs, ...filteredLegs])
        }
    }

    // this is jank I know
    // returns pre-formatted percentage as float accurate to 3 sig figures e.g. 52.7
    const calculateWinRate = (hero) => {
        const picks = Object.keys(hero).filter(s => s.endsWith('pick', 6)).map(x => hero[x])
        const wins = Object.keys(hero).filter(s => s.endsWith('win', 5)).map(x => hero[x])
        const totalPicks = picks.reduce((partialSum, next) => partialSum + next, 0) || 1
        const totalWins = wins.reduce((partialSum, next) => partialSum + next, 0) || 0
        const winRate = totalWins/totalPicks
        return Math.round((winRate + Number.EPSILON) * 1000) / 10
    }

    const getHeroStats = () => {
        const url = 'https://api.opendota.com/api/heroStats'
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                response.json()
                    .then(data => {
                        setHeroes(data
                            .map(hero => (
                                {...hero,
                                winRate: calculateWinRate(hero)}
                            ))
                        )
                    })
                .catch((error) => {
                    console.error('There has been a problem with the hero fetch:', error);
                });
        })
    }

    useEffect(getHeroStats, [])

    // 1=yours, 2=enemy
    const pickHero = (heroId, team) => {
        if(team===1) {
            let tempTeam = [...yourTeam]
            if(tempTeam.includes(heroId)) {
                tempTeam = tempTeam.filter(x => x !== heroId)
            }
            else tempTeam.push(heroId)
            setYourTeam(tempTeam)
        }
        else if (team===2) {
            let tempTeam = [...enemyTeam]
            if(tempTeam.includes(heroId)) {
                tempTeam = tempTeam.filter(x => x !== heroId)
            }
            else tempTeam.push(heroId)
            setEnemyTeam(tempTeam)
        }
    }

    const heroGrids = attributes.map(attr => 
        <HeroGrid
            key={attr}
            heroes={heroes.filter(hero => hero.primary_attr === attr)}
            highlightedHeroes={highlightedHeroes}
            selectHero={selectHero}
            cols={11}
            className={'hero-grid'}/>
    )

    /*  The openDota API doesn't return advantage scores, and the process is complicated enough that it's not feasible to calculate ourselves.
        I've used a (pre-written) web scraper to grab the advantage data from Dotabuff.com, but it returns in the form of {heroName, advantageScore},
        where heroName is different from the API names.
        So I constructed a basic mapping template (dotabuffHeroMap.js) between this info and what the API spits out.
        This code performs that mapping.
    */
    const advantageMap = 
            Object
                .entries(advantages)
                .map(x => {
                    return { 
                        "id": heroMap.find(y => x[0]===y.name).id,
                        "matchups": 
                            Object
                                .entries(x[1])
                                .map(m => {
                                    return {
                                        "id": heroMap.find(x => x.name===m[0]).id,
                                        "advantage": m[1]
                                    }
                                })
                    }
                })

    const sumMatchupAdvantage = (team) => {
        const mapSum = advantageMap
                        .filter(x => team.includes(x.id))
                        .reduce((prev,curr) => {
                            curr.matchups.forEach(item => prev.set(item.id, (prev.get(item.id) || 0) + item.advantage))
                            return prev
                        }, new Map())
        const arraySum = Array.from(mapSum)
                            .map(([id, advantage]) => ({id, advantage: Math.round((advantage + Number.EPSILON) * 100) / 100}))
                            .sort((a,b) => b.advantage - a.advantage)
        return arraySum
    }

    const matchupSuggestions = sumMatchupAdvantage(enemyTeam)

    const bestPicks = <AdvantageList
                            heroes={heroes}
                            list={matchupSuggestions.filter(h => 
                                !(yourTeam.includes(h.id) || enemyTeam.includes(h.id))).slice(0,15)}
                            selectHero={selectHero}
                            sx={{ flexGrow: '2' }}/>

    const worstPicks = <AdvantageList
                            heroes={heroes}
                            list={matchupSuggestions.filter(h => 
                                !(yourTeam.includes(h.id) || enemyTeam.includes(h.id))).slice(matchupSuggestions.length/2).reverse().slice(0,15)}
                            selectHero={selectHero}/>

    const clearDraft = () => {
        setYourTeam([])
        setEnemyTeam([])
    }

    if(heroes.length===0) {
        return <CircularProgress />
    }
    else return(
        <Box sx={{ ml:5, mr: 5, mt: 1 }}>
            <Stack direction="row" spacing={4}>
                <Stack sx={{ maxWidth: '60%' }}>
                    <TextField id="filled-basic" label="search" variant="outlined" onChange={(e)=>setSearchTerm(e.target.value)} />
                    {heroGrids}
                    <Stack direction="row" spacing={2}>
                        <Roles roles={roles} filteredRoles={filteredRoles} filterByRole={filterByRole}/>
                        <Legs legs={legs} filterLegs={filterByLegs} filteredLegs={filteredLegs} setFilteredLegs={setFilteredLegs} />
                    </Stack>
                </Stack>
                <Stack>
                    <Stack direction="row" spacing={2} >
                        <HeroCard hero={heroes.find(hero => hero.id === activeHero)} pick={(team)=>pickHero(activeHero,team)} yourTeam={yourTeam} enemyTeam={enemyTeam}/>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" >{enemyTeam.length > 0 && 'Best picks'}</Typography>
                            {bestPicks}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5">{enemyTeam.length > 0 && 'Worst picks'}</Typography>
                            {worstPicks}
                        </Box>
                    </Stack>
                    {yourTeam.length > 0 ? <Typography variant="h5" >Your team</Typography> : null}
                    <HeroGrid
                        heroes={yourTeam.map(id => heroes.find(hero => hero.id === id))}
                        highlightedHeroes={heroes.map(hero => hero.id)}
                        selectHero={selectHero}
                        cols={5}/>
                    {enemyTeam.length > 0 ? <Typography variant="h5" >Enemy team</Typography> : null}
                    <HeroGrid
                        heroes={enemyTeam.map(id => heroes.find(hero => hero.id === id))}
                        highlightedHeroes={heroes.map(hero => hero.id)}
                        selectHero={selectHero}
                        cols={5}/>
                    {yourTeam.length > 0 ?
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={()=>clearDraft()}
                            disabled={yourTeam.length + enemyTeam.length === 0}
                            sx={{ maxWidth: '20%' }}
                        >
                            RESET DRAFT
                        </Button>
                        : null
                    }
                </Stack>
            </Stack>
        </Box>
    )
}

export default DraftPage
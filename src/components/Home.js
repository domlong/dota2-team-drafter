import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';

function Home() {
    return (
        <Container>
            <h1 className="home-banner">DOTA2 Team Drafter :D</h1>
            <Outlet />
        </Container>
    )
}

export default Home
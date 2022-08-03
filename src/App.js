import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from './components/Home';
import DraftPage from './components/DraftPage';
import HeroDetails from './components/HeroDetails';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink> | 
        <NavLink to="/draft">Draft</NavLink> | 
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
            {/* <Route index element={<Home />} /> */}
        <Route path="draft" element={<DraftPage />}/>
            {/* <Route path=":teamId" element={<Team />} /> */}
            {/* <Route path="new" element={<NewTeamForm />} /> */}
            {/* <Route index element={<LeagueStandings />} /> */}
        <Route path="heroes/:heroId" element={<HeroDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from './components/Home';
import DraftPage from './components/DraftPage';
import HeroDetails from './components/HeroDetails';
import NotFound from './components/NotFound';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter>
      <nav className='main-nav'>
        <NavLink to="/">Home</NavLink> | 
        <NavLink to="/draft">Draft</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="draft" element={<DraftPage />}/>
        <Route path="heroes/:heroId" element={<HeroDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

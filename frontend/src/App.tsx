import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TheGame from './pages/TheGame';
import GameRules from './pages/GameRules';
import GameHistory from './pages/GameHistory';
import GameGlossary from './pages/GameGlossary';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import TheClub from './pages/TheClub';
import Contact from './pages/Contact';
import Join from './pages/Join';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/the-game" element={<TheGame />} />
          <Route path="/the-game/rules" element={<GameRules />} />
          <Route path="/the-game/history" element={<GameHistory />} />
          <Route path="/the-game/glossary" element={<GameGlossary />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/the-club" element={<TheClub />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Join />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

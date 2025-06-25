import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChooseTeam from './pages/ChooseTeam';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Navbar from './components/Navbar';

export default function App() {
  const tg = window.Telegram.WebApp;
  const navigate = useNavigate();
  const [user, setUser] = useState(tg.initDataUnsafe?.user);
  const [theme, setTheme] = useState('map');
  const [team, setTeam] = useState<string | null>(null);

  useEffect(() => {
    tg.ready();
  }, []);

  useEffect(() => {
    tg.MainButton.onClick(() => {
      if (window.location.pathname === '/choose') navigate('/home');
    });
    tg.MainButton.hide();
  }, [team]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<ChooseTeam team={team} setTeam={setTeam}/>} />
        <Route path="/home" element={<Home user={user} team={team}/>}/>
        <Route path="/stats" element={<Statistics />} />
      </Routes>
      {window.location.pathname !== '/choose' && (
        <Navbar theme={theme} setTheme={t => { setTheme(t); navigate(t==='map' ? '/home':'/stats') }}/>)
      }
    </div>
  );
}

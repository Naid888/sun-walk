import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [steps, setSteps] = useState(4567);
  const [coins, setCoins] = useState(123);
  const [collecting, setCollecting] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUsername(user.first_name);
      setAvatar(user.photo_url);
    }
  }, []);

  const formatCoins = (num) => {
    if (num >= 1000000) return `${Math.floor(num / 1000000)}m ${Math.floor((num % 1000000) / 1000)}k`;
    if (num >= 10000) return `${Math.floor(num / 1000)}k`;
    return num;
  };

  const handleCollect = () => {
    setCollecting(true);
    setTimeout(() => {
      setCoins((prev) => prev + steps);
      setSteps(0);
      setCollecting(false);
    }, 1200); // Эффект сбора
  };

  return (
    <div className="app">
      <div className="header">
        {avatar && <img src={avatar} alt="avatar" className="avatar" />}
        <span className="username">{username || 'Guest'}</span>
        <div className={`coin-icon ${coins >= 0 ? 'active' : ''}`}>
          💰 {formatCoins(coins)}
        </div>
      </div>

      <div className="step-counter">
        <h2>{steps} steps</h2>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
          />
        </div>
        {steps > 10000 && <span className="energy-bonus">⚡ Energy bonus</span>}
      </div>

      <button
        className={`collect-btn ${collecting ? 'disabled' : ''}`}
        onClick={handleCollect}
        disabled={collecting}
      >
        {collecting ? 'Collecting...' : 'Collect Steps'}
      </button>

      <div className="footer-nav">
        <button className="nav-btn">Statistic</button>
        <button className="nav-btn">Market</button>
        <button className="nav-btn">Map</button>
        <button className="nav-btn">Clan</button>
        <button className="nav-btn">Settings</button>
      </div>
    </div>
  );
};

export default App;

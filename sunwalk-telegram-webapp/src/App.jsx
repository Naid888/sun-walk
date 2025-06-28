import React from 'react';
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';

function App() {
  useEffect(() => {
    WebApp.ready();
  }, []);

  return (
    <div className="App">
      <h1>Hello, Sun Walk!</h1>
      <p>Telegram WebApp работает корректно.</p>
    </div>
  );
}

export default App;

import { FC } from 'react';
import './Navbar.css';
type Props = { theme: string; setTheme: (t:string)=>void };
const icons = [
  { id:'stats', text:'Statistics', icon:'📊' },
  { id:'market', text:'Market', icon:'💼' },
  { id:'map', text:'Map', icon:'📍' },
  { id:'clan', text:'Clan', icon:'👤' },
  { id:'settings', text:'Settings', icon:'⚙️' },
];
const Navbar: FC<Props> = ({ theme, setTheme }) => (
  <div className="navbar">
    {icons.map(i => (
      <div
        key={i.id}
        className={`item ${theme===i.id?'active':''}`}
        onClick={() => setTheme(i.id)}
      >
        <span className="icon">{i.icon}</span>
        <span>{i.text}</span>
      </div>
    ))}
  </div>
);
export default Navbar;

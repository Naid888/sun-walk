import { FC, useEffect } from 'react';
type Props = { team: string | null, setTeam: (t:string)=>void };
const teams = ['Bears','Dogs','Cats','Squirrel','Snail','Sloth','Lezech','Zebra'];

const ChooseTeam: FC<Props> = ({ team, setTeam }) => {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    tg.MainButton.setText('Start');
    if (team) tg.MainButton.show();
    else tg.MainButton.hide();
  }, [team]);

  return (
    <div style={{ padding: 16, textAlign:'center' }}>
      <h1>CHOOSE YOUR TEAM</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {teams.map(t => (
          <div
            key={t}
            onClick={() => setTeam(t)}
            style={{
              border: team===t ? '4px solid #FFCC00' : '4px solid transparent',
              borderRadius: 12,
              padding:8,
              cursor:'pointer'
            }}
          >
            <img src={`/assets/${t}.png`} alt={t} style={{ width:'100%' }} />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChooseTeam;

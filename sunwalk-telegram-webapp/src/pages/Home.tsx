import { FC, useEffect, useState } from 'react';
type Props = { user: any; team: string | null };

export const fmt = (v:number) => {
  if (v>=1e6) return Math.floor(v/1e6)+'m '+Math.floor((v%1e6)/1e3)+'k';
  if (v>=1e3) return Math.floor(v/1e3)+'k';
  return v+'';
};

const Home: FC<Props> = ({ user, team }) => {
  const tg = window.Telegram.WebApp;
  const [steps, setSteps] = useState(0);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    fetch('/api/initial').then(res => res.json()).then(data => {
      setSteps(data.todaySteps);
      setCoins(data.balance);
    });
  }, []);

  const collect = async () => {
    const earned = steps;
    setSteps(0);
    const resp = await fetch('/api/collect', {
      method:'POST', body: JSON.stringify({ earned }), headers:{ 'Content-Type':'application/json' }
    });
    const d=await resp.json();
    setCoins(d.balance);
  };

  return (
    <div style={{ padding: 16, textAlign:'center' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <img src={user?.photo_url} alt="avatar" style={{ width:40, height:40, borderRadius:'50%' }} />
        <span style={{fontWeight:600}}>{user?.username}</span>
        <span style={{
          background:'#F5FEE2',
          padding:'4px 8px',
          borderRadius:16,
        }}>⭐ {fmt(coins)}</span>
      </div>
      <div style={{ marginTop:24 }}>
        {/* Mascot */}
        <img src={`/assets/${team}.png`} alt={team||'team'} style={{ width:200 }} />
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center', marginTop:-180
        }}>
          <div style={{ width:20, height:200, background:'#E0F2C3', borderRadius:10, position:'relative' }}>
            <div style={{
              position:'absolute', bottom:0, width:'100%',
              height:`${Math.min(steps/100,100)}%`,
              background:'#A2D149', borderRadius:10
            }} />
            <span style={{
              position:'absolute', bottom:4, left:-24,
              fontSize:20
            }}>⚡</span>
          </div>
          <span style={{ fontSize:48, marginLeft:24 }}>{steps.toLocaleString()}</span>
        </div>
        <button onClick={collect} style={{
          background:'#FFCC00',
          border:'none',
          padding:'16px 32px',
          borderRadius:32,
          fontSize:24,
          marginTop:16
        }}>Collect steps</button>
      </div>
    </div>
  );
};
export default Home;

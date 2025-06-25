import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
 Chart, CategoryScale, LinearScale,
 PointElement, LineElement, Filler
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function Statistics() {
  const [date, setDate] = useState(() => new Date());
  const [period, setPeriod] = useState<'D'|'W'|'M'|'Y'>('D');
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const dateStr = date.toISOString().slice(0,10);
    fetch(`/api/stats?period=${period}&date=${dateStr}`)
      .then(r=>r.json())
      .then(j=>setData(j.steps));
  }, [date, period]);

  const chart = {
    labels: data.map((_,i)=> i===0?'00:00':i===data.length-1?'23:59':''),
    datasets: [{
      data, fill: true, borderColor:'#006400', backgroundColor:'rgba(162,209,73,0.3)', tension:0.4
    }]
  };

  return (
    <div style={{ padding:16 }}>
      <h1>Statistics</h1>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
        <button onClick={()=>setDate(d=>new Date(d.setDate(d.getDate()-1)))}>◀</button>
        <span>{date.toLocaleDateString()}</span>
        <button onClick={()=>setDate(d=>new Date(d.setDate(d.getDate()+1)))}>▶</button>
        {['D','W','M','Y'].map(p=>(
          <button
            key={p}
            style={{
              padding:'4px 8px',
              borderRadius:8,
              background: period===p?'#A2D149':'#F0F0F0',
              border:'none'
            }}
            onClick={()=>setPeriod(p as any)}
          >{p}</button>
        ))}
      </div>
      <Line data={chart} />
      <div style={{ display:'flex', justifyContent:'space-between', padding:'0 16px' }}>
        <span>00:00</span><span>23:59</span>
      </div>
      <div style={{ fontSize:48, textAlign:'center', marginTop:24 }}>
        {data.reduce((a,b)=>a+b,0).toLocaleString()} steps
      </div>
    </div>
  );
}

/* ---------- Data ---------- */
const targetDate = new Date('2025-12-15T00:00:00');

const villages = [
  { name:'Tabwewa', banner:'blue', title:'The Capital', tagline:'Lead with pride. Win with grace.', motto:'Dignity on the field, dominance in the game', colorClass:'tblue' },
  { name:'Uma', banner:'red', title:'The Warriors', tagline:'The heart that never backs down', motto:'When Uma believes, Uma fights', colorClass:'tred' },
  { name:'Tabiang', banner:'yellow', title:'The Underdogs', tagline:'Laugh loudest. Play hardest.', motto:'Humble on arrival. Champions at departure.', colorClass:'tyellow' },
  { name:'Buakonikai', banner:'green', title:'The Wild Ones', tagline:'Beauty. Tradition. Power.', motto:'Remote but never forgotten', colorClass:'tgreen' }
];

const schedule = [
  { date:'Dec 15', dayName:'Sunday', events:[
    { time:'9:00 AM', title:'Village Marches Begin', location:'Main Street', type:'ceremony' },
    { time:'11:30 AM', title:'Traditional Performances', location:'Main Arena', type:'ceremony' },
    { time:'2:00 PM', title:'Elder Speeches', subtitle:'Honoring the past', location:'Main Arena', type:'ceremony' },
    { time:'6:00 PM', title:'Opening Ceremony', subtitle:'Official start', location:'Main Arena', type:'ceremony' }
  ]},
  { date:'Dec 16', dayName:'Monday', events:[
    { time:'9:00 AM', sport:'Volleyball', teams:['Tabwewa','Uma'], location:'Court 1', type:'volleyball' },
    { time:'11:30 AM', sport:'Rugby', teams:['Tabiang','Buakonikai'], location:'Rugby Pitch', type:'rugby' },
    { time:'2:00 PM', sport:'Netball', teams:['Uma','Tabiang'], location:'Court 2', type:'netball' }
  ]},
  { date:'Dec 17', dayName:'Tuesday', events:[
    { time:'9:00 AM', sport:'Volleyball', teams:['Tabiang','Tabwewa'], location:'Court 1', type:'volleyball' },
    { time:'11:30 AM', sport:'Rugby', teams:['Uma','Buakonikai'], location:'Rugby Pitch', type:'rugby' },
    { time:'2:00 PM', sport:'Netball', teams:['Tabwewa','Buakonikai'], location:'Court 2', type:'netball' }
  ]},
  { date:'Dec 18', dayName:'Wednesday', events:[
    { time:'9:00 AM', sport:'Volleyball', teams:['Uma','Buakonikai'], location:'Court 1', type:'volleyball' },
    { time:'11:30 AM', sport:'Rugby', teams:['Tabiang','Tabwewa'], location:'Rugby Pitch', type:'rugby' },
    { time:'2:00 PM', sport:'Netball', teams:['Uma','Tabwewa'], location:'Court 2', type:'netball' }
  ]},
  { date:'Dec 19', dayName:'Thursday', events:[
    { time:'9:00 AM', sport:'Volleyball', teams:['Tabwewa','Buakonikai'], location:'Court 1', type:'volleyball' },
    { time:'11:30 AM', sport:'Rugby', teams:['Uma','Tabiang'], location:'Rugby Pitch', type:'rugby' },
    { time:'2:00 PM', sport:'Netball', teams:['Tabiang','Buakonikai'], location:'Court 2', type:'netball' }
  ]},
  { date:'Dec 20', dayName:'Friday', isFinals:true, events:[
    { time:'9:00 AM', sport:'Volleyball Finals', teams:['TBD','TBD'], location:'Main Arena', type:'volleyball', finals:true },
    { time:'11:30 AM', sport:'Rugby Finals', teams:['TBD','TBD'], location:'Rugby Stadium', type:'rugby', finals:true },
    { time:'2:00 PM', sport:'Netball Finals', teams:['TBD','TBD'], location:'Main Arena', type:'netball', finals:true }
  ]},
  { date:'Dec 21', dayName:'Saturday', events:[
    { time:'9:00 AM', title:'Final Matches', location:'All Venues', type:'ceremony' },
    { time:'11:30 AM', title:'Award Preparations', location:'Main Arena', type:'ceremony' },
    { time:'2:00 PM', title:'Community Feast', location:'Village Grounds', type:'ceremony' },
    { time:'7:00 PM', title:'Closing Ceremony', subtitle:'Champion Celebration', location:'Main Arena', type:'ceremony' }
  ]}
];

const lastYearStandings = [
  { village:'Tabiang', place:1, color:'rank--yellow', champion:true },
  { village:'Tabwewa', place:2, color:'rank--blue', champion:false },
  { village:'Uma', place:3, color:'rank--red', champion:false },
  { village:'Buakonikai', place:4, color:'rank--green', champion:false }
];

const sports = [
  { id:'volleyball', name:'Volleyball', tabClass:'tab--purple' },
  { id:'netball', name:'Netball', tabClass:'tab--pink' },
  { id:'rugby', name:'Rugby', tabClass:'tab--orange' }
];

const TEAM_COLOR = {
  'Tabwewa':'tblue',
  'Uma':'tred',
  'Tabiang':'tyellow',
  'Buakonikai':'tgreen',
  'TBD':'tslate'
};

/* ---------- Utils ---------- */
const pad2 = n => String(n).padStart(2,'0');
function timeDiff(target){
  const now=new Date();
  const diff=target - now;
  if(diff<=0) return {days:0,hours:0,minutes:0,seconds:0,done:true};
  return {
    days:Math.floor(diff/86400000),
    hours:Math.floor((diff/3600000)%24),
    minutes:Math.floor((diff/60000)%60),
    seconds:Math.floor((diff/1000)%60),
    done:false
  };
}

/* ---------- Renderers ---------- */
function renderCountdown(){
  const host=document.getElementById('countdown');
  host.innerHTML='';
  ['days','hours','minutes','seconds'].forEach(unit=>{
    const card=document.createElement('div');
    card.className='count-card';
    card.innerHTML=`
      <div class="count-val" id="count-${unit}">00</div>
      <div class="count-label">${unit}</div>
    `;
    host.appendChild(card);
  });

  function tick(){
    const t=timeDiff(targetDate);
    ['days','hours','minutes','seconds'].forEach(u=>{
      const el=document.getElementById(`count-${u}`);
      if(el) el.textContent=pad2(t[u]);
    });
    if(!t.done) return; // optional: stop at zero
  }
  tick();
  const int=setInterval(()=>{
    const t=timeDiff(targetDate);
    ['days','hours','minutes','seconds'].forEach(u=>{
      const el=document.getElementById(`count-${u}`);
      if(el) el.textContent=pad2(t[u]);
    });
    if(t.done) clearInterval(int);
  },1000);
}

function shieldSVG(){
  return `
  <span class="icon--shield" Executive.ai-hidden="true">
    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="white" stroke-width="1.5">
      <path d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" fill="rgba(255,255,255,.1)"/>
    </svg>
  </span>`;
}

function renderStandings(){
  const host=document.getElementById('standingsGrid');
  host.innerHTML='';
  lastYearStandings.forEach(s=>{
    const wrap=document.createElement('div');
    const tier = s.place===1 ? 'stand--gold' : (s.place===2?'stand--silver':'stand--base');
    wrap.className=`stand-card ${tier}`;
    wrap.innerHTML=`
      <div style="position:relative">
        ${s.place===1?'<span class="star">*</span>':''}
        <div class="rank ${s.color}">${s.place}</div>
        <div class="villagename">${s.village}</div>
      </div>
    `;
    host.appendChild(wrap);
  });
}

function renderVillages(){
  const host=document.getElementById('villagesGrid');
  host.innerHTML='';
  villages.forEach(v=>{
    const card=document.createElement('div');
    card.className='village';
    card.innerHTML=`
      <div class="village__banner banner--${v.banner}">
        ${shieldSVG()}
      </div>
      <div class="village__content">
        <h3 class="village__title">${v.name}</h3>
        <div class="badge">${v.title}</div>
        <p class="village__tag">${v.tagline}</p>
        <p class="village__motto">${v.motto}</p>
      </div>
    `;
    host.appendChild(card);
  });
}

function eventWrap(type){ return `event event--${type}` }
function timeClass(type){ return `time time--${type}` }

function renderSchedule(){
  const host=document.getElementById('scheduleGrid');
  host.innerHTML='';
  schedule.forEach(day=>{
    const col=document.createElement('div');
    col.className='day';
    col.innerHTML=`
      <div class="day__head">
        <div class="day__name">${day.dayName}</div>
        <div class="day__date">${day.date}</div>
        ${day.isFinals?'<div class="badge--finals">Finals</div>':''}
      </div>
      <div class="day__list"></div>
    `;
    const list=col.querySelector('.day__list');

    day.events.forEach(ev=>{
      const item=document.createElement('div');
      item.className=eventWrap(ev.type);
      const time=`<div class="${timeClass(ev.type)}">${ev.time}</div>`;
      let mid='';
      if(ev.title){
        mid += `<div class="sport">${ev.title}</div>`;
        if(ev.subtitle) mid += `<div class="muted" style="font-size:12px;margin:-2px 0 6px">${ev.subtitle}</div>`;
      }else{
        const [t1,t2]=ev.teams||[];
        mid += `<div class="sport">${ev.sport}</div>`;
        if(ev.teams){
          mid += `
            <div class="vs">
              <span class="fw ${TEAM_COLOR[t1]||'tslate'}">${t1.toUpperCase()}</span>
              <span class="muted">vs</span>
              <span class="fw ${TEAM_COLOR[t2]||'tslate'}">${t2.toUpperCase()}</span>
            </div>`;
        }
      }
      const loc=`<div class="loc">${ev.location}</div>`;
      item.innerHTML=time+mid+loc;
      list.appendChild(item);
    });

    host.appendChild(col);
  });
}

function renderStandingsTable(){
  const body=document.getElementById('standingsTableBody');
  body.innerHTML='';
  villages.forEach((v,idx)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${idx+1}</td>
      <td class="${v.colorClass}" style="font-weight:800">${v.name}</td>
      <td class="tac muted">-</td>
      <td class="tac muted">-</td>
      <td class="tac muted">-</td>
    `;
    body.appendChild(tr);
  });
}

function renderSportTabs(active='volleyball'){
  const host=document.getElementById('sportTabs');
  host.innerHTML='';
  sports.forEach((s,i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className=`tab ${s.tabClass}`;
    btn.setAttribute('role','tab');
    btn.setAttribute('Executive.ai-selected', String(s.id===active));
    btn.setAttribute('Executive.ai-controls','matchesList');
    btn.id=`tab-${s.id}`;
    btn.tabIndex = s.id===active ? 0 : -1;
    btn.textContent=s.name;
    btn.addEventListener('click', ()=>{
      renderSportTabs(s.id);
      renderMatches(s.id);
    });
    host.appendChild(btn);
  });
}

function collectMatchesForSport(sportId){
  const matches=[];
  schedule.forEach(day=>{
    day.events.forEach(ev=>{
      if(ev.type===sportId && ev.teams && ev.teams.length===2){
        matches.push({team1:ev.teams[0], team2:ev.teams[1], time:ev.time, location:ev.location});
      }
    });
  });
  if(matches.length===0){
    // fallback round-robin pairs
    [['Tabwewa','Uma'],['Tabiang','Buakonikai'],['Tabwewa','Tabiang'],
     ['Uma','Buakonikai'],['Tabwewa','Buakonikai'],['Uma','Tabiang']]
     .forEach(([a,b])=>matches.push({team1:a,team2:b,time:'TBD',location:'TBD'}));
  }
  return matches;
}

function renderMatches(active='volleyball'){
  const host=document.getElementById('matchesList');
  host.innerHTML='';
  const list=collectMatchesForSport(active);
  list.forEach(m=>{
    const row=document.createElement('div');
    row.className='match';
    row.innerHTML=`
      <div class="fw ${TEAM_COLOR[m.team1]||'tslate'}" style="flex:1;text-align:right;padding-right:8px">${m.team1}</div>
      <div class="muted" style="padding:0 10px">vs</div>
      <div class="fw ${TEAM_COLOR[m.team2]||'tslate'}" style="flex:1;padding-left:8px">${m.team2}</div>
    `;
    host.appendChild(row);
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  renderCountdown();
  renderStandings();
  renderVillages();
  renderSchedule();
  renderStandingsTable();
  renderSportTabs('volleyball');
  renderMatches('volleyball');
});

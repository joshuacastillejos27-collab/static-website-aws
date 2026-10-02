const R=[
["Australian","Albert Park Circuit","Melbourne","2026-03-08","The season opener, run around a lake in a city park."],
["Chinese","Shanghai International Circuit","Shanghai","2026-03-15","A tightening opening corner leads into one of the longest straights of the year."],
["Japanese","Suzuka Circuit","Suzuka","2026-03-29","The only figure-eight layout on the calendar, with a crossover bridge."],
["Bahrain","Bahrain International Circuit","Sakhir","2026-04-12","A desert circuit with heavy braking zones that invite overtakes."],
["Saudi Arabian","Jeddah Corniche Circuit","Jeddah","2026-04-19","A very fast street track lined with walls along the Red Sea."],
["Miami","Miami International Autodrome","Miami Gardens","2026-05-03","Laid out around the Hard Rock Stadium grounds."],
["Canadian","Circuit Gilles Villeneuve","Montréal","2026-05-24","An island circuit best known for the Wall of Champions."],
["Monaco","Circuit de Monaco","Monte Carlo","2026-06-07","Narrow streets where qualifying often decides the race."],
["Barcelona-Catalunya","Circuit de Barcelona-Catalunya","Montmeló","2026-06-14","A long-time testing venue that teams know corner by corner."],
["Austrian","Red Bull Ring","Spielberg","2026-06-28","One of the shortest laps of the year, set in the Styrian hills."],
["British","Silverstone Circuit","Silverstone","2026-07-05","A former airfield with fast, flowing corners."],
["Belgian","Circuit de Spa-Francorchamps","Stavelot","2026-07-19","Home of Eau Rouge and Raidillon in the Ardennes forest."],
["Hungarian","Hungaroring","Budapest","2026-07-26","Tight and twisty, with few places to pass."],
["Dutch","Circuit Zandvoort","Zandvoort","2026-08-23","Banked corners winding through the coastal dunes."],
["Italian","Autodromo Nazionale Monza","Monza","2026-09-06","The Temple of Speed, built around long straights."],
["Madrid","Madring","Madrid","2026-09-13","A new Spanish street-style circuit making its debut."],
["Azerbaijan","Baku City Circuit","Baku","2026-09-26","A long flat-out straight and a narrow section by the old city walls."],
["Singapore","Marina Bay Street Circuit","Singapore","2026-10-11","A humid night race under floodlights."],
["United States","Circuit of the Americas","Austin","2026-10-25","A steep uphill run to Turn 1 and a mix of corners borrowed from other tracks."],
["Mexico City","Autódromo Hermanos Rodríguez","Mexico City","2026-11-01","Thin air at high altitude changes how cars cool and make downforce."],
["São Paulo","Autódromo José Carlos Pace","São Paulo","2026-11-08","Run anticlockwise over rolling ground at Interlagos."],
["Las Vegas","Las Vegas Strip Circuit","Las Vegas","2026-11-21","A late-night race past the casinos on the Strip."],
["Qatar","Lusail International Circuit","Lusail","2026-11-29","A fast, flowing night race with many medium-speed corners."],
["Abu Dhabi","Yas Marina Circuit","Abu Dhabi","2026-12-06","The season finale, started in daylight and finished under lights."]];
const g=document.getElementById('g'),now=new Date();now.setHours(0,0,0,0);
const fmt=d=>new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
let nextIdx=R.findIndex(r=>new Date(r[3]+'T00:00:00')>=now);
const P=[[.8,46,0,.12],[1,30,14,-.08],[.75,40,4,.2],[1.33,28,20,-.1],[1,34,2,.1],[.8,44,10,.18],[.75,32,18,-.06],[1.33,30,6,.14]];
const EXT=['jpg','jpeg','png','webp'];
R.forEach((r,i)=>{
  const done=nextIdx===-1||i<nextIdx,[rt,hv,mt,sd]=P[i%8],w=document.createElement('div');
  w.className='w'+(done?' done':'')+(i===nextIdx?' next-up':'');
  w.dataset.s=done?'done':'up';w.dataset.sd=sd;
  w.style.cssText=`margin-top:${mt}vh;--r:${rt};--hv:${hv}`;
  w.innerHTML=`<div class="gp"><button class="ph" data-n="${i+1}" aria-expanded="false" aria-label="${r[0]} Grand Prix details"><i>images/${i+1}.jpg</i><img alt="${r[0]} Grand Prix, ${r[2]}" loading="lazy"></button>
  <div class="cap"><div class="t"><b>Round ${i+1}</b><span>${fmt(r[3])}</span></div><h2>${r[0]} Grand Prix</h2><p class="c">${r[1]}, ${r[2]}</p>
  <span class="tag">${i===nextIdx?'Next race':done?'Finished':'Upcoming'}</span><div class="more"><p>${r[4]}</p></div></div></div>`;
  const im=w.querySelector('img'),b=w.querySelector('button');let k=0;
  im.onerror=()=>{k++;k<EXT.length?im.src=`images/${i+1}.${EXT[k]}`:im.remove()};
  im.src=`images/${i+1}.${EXT[0]}`;
  w.onclick=()=>b.setAttribute('aria-expanded',w.classList.toggle('open'));
  g.append(w);
});
const hs=document.getElementById('hs'),pb=document.getElementById('pb'),calm=matchMedia('(prefers-reduced-motion:reduce)').matches,K=1.4;
if(calm)hs.classList.add('native');
function size(){if(calm)return;hs.style.height=(Math.max(0,g.scrollWidth-innerWidth)/K+innerHeight)+'px'}
function par(){if(calm)return;
  const dist=Math.max(0,g.scrollWidth-innerWidth),r=hs.getBoundingClientRect(),span=hs.offsetHeight-innerHeight,
  p=span>0?Math.min(1,Math.max(0,-r.top/span)):0;
  g.style.transform=`translateX(${(-p*dist).toFixed(1)}px)`;pb.style.transform=`scaleX(${p})`;
  [...g.children].forEach(w=>{if(w.classList.contains('hide'))return;const b=w.getBoundingClientRect();if(b.right<-200||b.left>innerWidth+200)return;
    w.firstElementChild.style.transform=`translateY(${((b.left+b.width/2-innerWidth/2)*w.dataset.sd*.4).toFixed(1)}px)`})}
addEventListener('scroll',par,{passive:true});addEventListener('resize',()=>{size();par()});addEventListener('load',()=>{size();par()});size();par();
document.getElementById('f').onclick=e=>{
  const f=e.target.dataset.f;if(!f)return;
  document.querySelectorAll('#f button').forEach(x=>x.setAttribute('aria-pressed',x===e.target));
  [...g.children].forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.s!==f));size();par();
};
if(nextIdx>-1){
  const r=R[nextIdx],t=new Date(r[3]+'T14:00:00');
  document.getElementById('nx').textContent=`Next: ${r[0]} Grand Prix`;
  const tick=()=>{let s=Math.max(0,(t-new Date())/1000|0);
    document.getElementById('cd').textContent=`${s/86400|0}d ${s%86400/3600|0}h ${s%3600/60|0}m`};
  tick();setInterval(tick,30000);
}

const st=document.querySelector('.stmt'),W=[],fr=document.createDocumentFragment();
st.childNodes.forEach(n=>n.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){fr.append(t);return}const x=document.createElement('span');x.className='w'+(n.nodeName==='EM'?' e':'');x.textContent=t;fr.append(x);W.push(x)}));
st.textContent='';st.append(fr);
const sec=document.querySelector('.story'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function upd(){const r=sec.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
  W.forEach((w,i)=>{const t=rm?1:Math.min(1,Math.max(0,(p*1.15-i/W.length*.9)/.12));w.style.opacity=.1+.9*t;w.style.transform=`translateY(${(1-t)*.45}em)`})}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();

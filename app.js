const STORAGE_KEY='bukh_taavar_v1';
const markets=[
 {id:'champion',title:'Түрүүлэх бөх',points:50,options:['Улсын аварга','Улсын арслан','Улсын гарьд','Улсын заан','Аймгийн арслан','Залуу улсын цолтон']},
 {id:'runner',title:'Үзүүрлэх бөх',points:35,options:['Улсын аварга','Улсын арслан','Улсын гарьд','Улсын заан','Улсын харцага','Аймгийн арслан']},
 {id:'top4_rank',title:'Их шөвөгт ямар цол давамгайлах вэ?',points:25,options:['Аварга цолтон','Арслан цолтон','Гарьд/заан цолтон','Харцага/начин цолтон','Аймгийн цолтон']},
 {id:'aimag_champ',title:'Аль аймгийн бөх түрүүлэх вэ?',points:40,options:['Архангай','Өвөрхангай','Увс','Ховд','Булган','Төв','Сэлэнгэ','Завхан','Баянхонгор','Хэнтий','Бусад']},
 {id:'new_title',title:'Шинэ улсын цолтон төрөх үү?',points:20,options:['Тийм','Үгүй']},
 {id:'new_lion',title:'Шинэ арслан төрөх үү?',points:30,options:['Тийм','Үгүй']},
 {id:'province_top8',title:'Шөвгийн 8-д аймгийн цолтон үлдэх үү?',points:25,options:['Тийм','Үгүй']},
 {id:'west_region',title:'Баруун бүсийн бөх түрүүлэх үү?',points:22,options:['Тийм','Үгүй']},
 {id:'upset',title:'Том цолтон эрт унах уу?',points:18,options:['3-ын даваанд','4-ийн даваанд','5-ын даваанд','Үгүй']}
];
const demoUsers=[{name:'Бат',points:120,pred:7},{name:'Мөнхөө',points:95,pred:6},{name:'Саруул',points:70,pred:5}];
let state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')||{name:'Та',predictions:{},results:{},points:0,calculated:false};
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));render();}
function renderMarkets(){const root=document.getElementById('marketList');root.innerHTML=markets.map(m=>`<div class="card market"><small>${m.points} оноо</small><h3>${m.title}</h3><div>${m.options.map(o=>`<span class="pill">${o}</span>`).join('')}</div><select id="sel_${m.id}"><option value="">Сонгох</option>${m.options.map(o=>`<option ${state.predictions[m.id]===o?'selected':''}>${o}</option>`).join('')}</select><button onclick="pick('${m.id}')">Таавар хадгалах</button></div>`).join('');}
function renderMy(){const root=document.getElementById('myPredictions');const keys=Object.keys(state.predictions); if(!keys.length){root.className='list empty';root.textContent='Одоогоор таавар өгөөгүй байна.';return}root.className='list';root.innerHTML=keys.map(id=>{const m=markets.find(x=>x.id===id);const p=state.predictions[id];const r=state.results[id];let status=r? (r===p?'<b class="ok">Зөв</b>':'<b class="bad">Буруу</b>'):'<span>Хүлээгдэж байна</span>';return `<div class="item"><div><b>${m.title}</b><br><span>${p}</span></div>${status}</div>`}).join('');}
function renderAdmin(){const root=document.getElementById('adminResults');root.innerHTML=markets.map(m=>`<div class="card market"><h3>${m.title}</h3><select id="res_${m.id}"><option value="">Зөв хариу сонгох</option>${m.options.map(o=>`<option ${state.results[m.id]===o?'selected':''}>${o}</option>`).join('')}</select><button onclick="setResult('${m.id}')">Үр дүн хадгалах</button></div>`).join('');}
function calc(){let pts=0;Object.keys(state.predictions).forEach(id=>{const m=markets.find(x=>x.id===id);if(state.results[id]&&state.results[id]===state.predictions[id]) pts+=m.points;});state.points=pts;state.calculated=true;save();alert('Оноо бодогдлоо: '+pts);}
function renderBoard(){const tbody=document.getElementById('leaderboardBody');const users=[...demoUsers,{name:state.name,points:state.points,pred:Object.keys(state.predictions).length}].sort((a,b)=>b.points-a.points);tbody.innerHTML=users.map((u,i)=>`<tr><td>${i+1}</td><td>${u.name}</td><td>${u.points}</td><td>${u.pred}</td></tr>`).join('');const rank=users.findIndex(u=>u.name===state.name)+1;document.getElementById('rankText').textContent=rank||'-';}
function renderTop(){document.getElementById('userPoints').textContent=state.points;document.getElementById('totalPredictions').textContent=Object.keys(state.predictions).length;}
function render(){renderTop();renderMarkets();renderMy();renderAdmin();renderBoard();}
window.pick=id=>{const v=document.getElementById('sel_'+id).value;if(!v)return alert('Сонголтоо хийнэ үү');state.predictions[id]=v;save();}
window.setResult=id=>{const v=document.getElementById('res_'+id).value;if(!v)return alert('Зөв хариу сонгоно уу');state.results[id]=v;save();}
document.getElementById('calculateBtn').onclick=calc;document.getElementById('resetBtn').onclick=()=>{if(confirm('Бүх demo мэдээллийг устгах уу?')){localStorage.removeItem(STORAGE_KEY);location.reload();}};
document.querySelectorAll('.tabs button').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tabs button,.tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById(btn.dataset.tab).classList.add('active');});
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}render();

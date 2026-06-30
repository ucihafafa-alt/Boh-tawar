const APP_VERSION='3.1.1-fixed';
const DB='bukhTaavarProV31';
const provinces=['Архангай','Баян-Өлгий','Баянхонгор','Булган','Говь-Алтай','Говьсүмбэр','Дархан-Уул','Дорноговь','Дорнод','Дундговь','Завхан','Орхон','Өвөрхангай','Өмнөговь','Сүхбаатар','Сэлэнгэ','Төв','Увс','Ховд','Хөвсгөл','Хэнтий','Улаанбаатар'];
const defaultState={currentUser:null,closed:false,activeTournament:'naadam2026',adminPin:'1234',users:[],events:[{id:'naadam2026',name:'Улсын баяр наадам 2026',type:'Улсын наадам',date:'2026-07-11T09:00:00',status:'Таавар авч байна',location:'Төв цэнгэлдэх хүрээлэн'}],wrestlers:[{id:'w1',name:'О.Хангай',rank:'Улсын аварга',province:'Ховд',photo:''},{id:'w2',name:'Б.Орхонбаяр',rank:'Улсын арслан',province:'Сэлэнгэ',photo:''},{id:'w3',name:'П.Бүрэнтөгс',rank:'Улсын аварга',province:'Увс',photo:''},{id:'w4',name:'Н.Батсуурь',rank:'Дархан аварга',province:'Увс',photo:''},{id:'w5',name:'Ц.Содномдорж',rank:'Улсын арслан',province:'Хөвсгөл',photo:''},{id:'w6',name:'Р.Пүрэвдагва',rank:'Улсын арслан',province:'Архангай',photo:''},{id:'w7',name:'Б.Гончигдамба',rank:'Улсын гарьд',province:'Завхан',photo:''},{id:'w8',name:'Д.Анар',rank:'Улсын начин',province:'Дорнод',photo:''}],predictions:[],results:null,notifications:[{title:'V3.1 засвар',body:'Дутуу js файлуудыг нөхөж, ажиллах багц болголоо.',at:new Date().toISOString()}],settings:{points:{champion:100,runner:70,semi:40,quarter:20,province:30,title:30,combo:120}}};
let S=load(); let tab='home';
function normalizeState(){
 if(!S.events)S.events=[]; if(!S.wrestlers)S.wrestlers=[]; if(!S.predictions)S.predictions=[]; if(!S.users)S.users=[]; if(!S.notifications)S.notifications=[]; if(!S.settings)S.settings=defaultState.settings; if(!S.adminPin)S.adminPin='1234'; if(!S.activeTournament)S.activeTournament=S.events[0]?.id||'naadam2026';
 S.wrestlers=S.wrestlers.map((w,i)=> typeof w==='string'?{id:'w'+i,name:w,rank:'',province:'',photo:''}:{id:w.id||uid(),name:w.name||'',rank:w.rank||'',province:w.province||'',photo:w.photo||''});
 S.users.forEach(u=>{u.avatar=u.avatar||'';u.province=u.province||'';u.age=u.age||'';u.xp=u.xp||u.score||0;u.level=u.level||levelFromXp(u.xp);u.medals=u.medals||[];u.totalPredictions=u.totalPredictions||0;u.correctPredictions=u.correctPredictions||0;u.score=u.score||0;});
}
function load(){try{let s=localStorage.getItem(DB);return s?JSON.parse(s):structuredClone(defaultState)}catch(e){return structuredClone(defaultState)}}
function save(){normalizeState();localStorage.setItem(DB,JSON.stringify(S))}
function resetDemo(){if(confirm('Бүх demo өгөгдлийг цэвэрлэх үү?')){localStorage.removeItem(DB);S=structuredClone(defaultState);save();render()}}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
function me(){return S.users.find(u=>u.id===S.currentUser)}
function currentEvent(){return S.events.find(e=>e.id===S.activeTournament)||S.events[0]}
function wrestlerName(id){return S.wrestlers.find(w=>w.id===id)?.name||id||'-'}
function levelFromXp(xp){return Math.max(1,Math.floor((xp||0)/150)+1)}
function provinceOptions(v=''){return provinces.map(p=>`<option ${p===v?'selected':''}>${p}</option>`).join('')}
function wrestlerOptions(v=''){return S.wrestlers.map(w=>`<option value="${w.id}" ${v===w.id?'selected':''}>${w.name} · ${w.rank}</option>`).join('')}
normalizeState(); save();

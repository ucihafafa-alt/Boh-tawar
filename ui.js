function $(q){return document.querySelector(q)}
function $all(q){return [...document.querySelectorAll(q)]}
function toast(msg){let old=$('.toast'); if(old)old.remove(); let d=document.createElement('div');d.className='toast';d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
function avatarHtml(u,big=false){let letter=(u?.name||'Б')[0];return `<div class="avatar ${big?'big':''}">${u?.avatar?`<img src="${u.avatar}">`:letter}</div>`}
function nav(){let items=[['home','Нүүр'],['predict','Таавар'],['mine','Минийх'],['board','Чансаа'],['profile','Профайл'],['admin','Админ']];return `<div class="tabs">${items.map(i=>`<button class="${tab===i[0]?'active':''}" onclick="tab='${i[0]}';render()">${i[1]}</button>`).join('')}</div>`}
function screen(){if(tab==='home')return home();if(tab==='predict')return predict();if(tab==='mine')return mine();if(tab==='board')return board();if(tab==='profile')return profile();if(tab==='admin')return admin();return home()}
function render(){normalizeState();document.getElementById('app').innerHTML=`<div class="wrap"><div class="topbar"><b>Бөх Таавар Pro</b><span class="muted small">v${APP_VERSION}</span></div>${screen()}<div class="version">${APP_VERSION}</div></div>${nav()}`;bind && bind()}
function checks(n){return $all(`input[name=${n}]:checked`).map(x=>x.value)}
function multi(name,arr=[],limit=8){return S.wrestlers.map(w=>`<label class="choice"><input type="checkbox" name="${name}" value="${w.id}" ${(arr||[]).includes(w.id)?'checked':''} onchange="limitChecks('${name}',${limit})">${w.name} <span class="muted small">${w.rank}</span></label>`).join('')}
function limitChecks(name,limit){let xs=$all(`input[name=${name}]:checked`);if(xs.length>limit){xs[xs.length-1].checked=false;toast(`Хамгийн ихдээ ${limit} сонгоно`)}}

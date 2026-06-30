function bind(){}
window.addEventListener('load',()=>{render(); if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})});

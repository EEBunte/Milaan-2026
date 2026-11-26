const places={
 linate:{name:'Linate Airport',address:'Viale Enrico Forlanini, Segrate',lat:45.4495,lng:9.2783,type:'Vlucht',note:'M4 naar San Babila in circa 12 minuten.'},
 hotel:{name:'Hotel Regency Milano',address:'Via G. Arimondi 12, Milano',lat:45.4915,lng:9.1554,type:'Hotel',note:'Tram 14 vanaf Piazza Firenze naar het centrum.'},
 duomo:{name:'Duomo di Milano',address:'Piazza del Duomo, Milano',lat:45.4642,lng:9.1919,type:'Highlight',note:'Kathedraal en dakterrassen. Tijdslot reserveren.'},
 galleria:{name:'Galleria Vittorio Emanuele II',address:'Piazza del Duomo, Milano',lat:45.4659,lng:9.1901,type:'Winkelen',note:'Historische winkelgalerij naast de Duomo.'},
 montenapoleone:{name:'Via Montenapoleone',address:'Via Montenapoleone, Milano',lat:45.4697,lng:9.1956,type:'Luxe mode',note:'Etalages en flagshipstores in het modedistrict.'},
 buenosaires:{name:'Corso Buenos Aires',address:'Corso Buenos Aires, Milano',lat:45.4793,lng:9.2098,type:'Winkelen',note:'Betaalbare ketens, schoenen en sportkleding.'},
 navigli:{name:'Naviglio Grande',address:'Alzaia Naviglio Grande, Milano',lat:45.4523,lng:9.1740,type:'Diner',note:'Sfeervolle kanalen en restaurants.'},
 sansiro:{name:'Stadio San Siro',address:'Piazzale Angelo Moratti, Milano',lat:45.4781,lng:9.1240,type:'Voetbal',note:'AC Milan - Sunderland, 10 december om 21.00.'},
 cenacolo:{name:'Laatste Avondmaal',address:'Piazza di Santa Maria delle Grazie 2, Milano',lat:45.4660,lng:9.1705,type:'Highlight',note:'Minimaal 30 minuten voor het tijdslot aanmelden.'},
 castello:{name:'Castello Sforzesco',address:'Piazza Castello, Milano',lat:45.4705,lng:9.1791,type:'Highlight',note:'Binnenplaatsen en buitenzijde.'}
};
const days=[
 {label:'Do 10 dec',date:'2026-12-10',items:[
  ['10.00','Aankomst op Linate','Na bagage met M4 naar San Babila, M1 naar Lotto en bus 48 naar het hotel.','linate','OV · 55-70 min'],
  ['11.45','Bagage naar hotel','Bagage afgeven; officiële check-in later.','hotel','Hotel'],
  ['12.00','Lunch Piazza Firenze','Pizzeria of eenvoudige trattoria dicht bij het hotel.','hotel','Lopen · 4-6 min'],
  ['13.10','Centrum en eerste winkels','Cordusio, Piazza Mercanti, Duomo buiten, Galleria en Via Torino.','duomo','Tram 14 · 30-35 min'],
  ['16.20','Inchecken en omkleden','Rustmoment en warme kleding voor de wedstrijd.','hotel','Tram 14 · 30-35 min'],
  ['17.30','Vroeg diner','Pizzeria in de richting van San Siro.','sansiro','Bus 78/M5 · 30-40 min'],
  ['19.30','Aankomst San Siro','Tijd voor controle en de klim naar de derde ring.','sansiro','Uiterlijk 19.30'],
  ['21.00','AC Milan - Sunderland','Longside, third ring.','sansiro','Wedstrijd']
 ]},
 {label:'Vr 11 dec',date:'2026-12-11',items:[
  ['08.30','Ontbijt','Rustig ontbijt in het hotel.','hotel','Hotel'],
  ['09.15','Naar de Duomo','Tram 14 vanaf Piazza Firenze.','duomo','35-40 min'],
  ['10.15','Duomo en dakterrassen','Circa twee uur inclusief toegangscontrole.','duomo','Reserveren'],
  ['12.15','Luxe moderoute','Galleria, La Scala, Via Manzoni, Montenapoleone en Via della Spiga.','montenapoleone','Lopen · ca. 2 km'],
  ['13.30','Lunch','Rond San Babila of Porta Venezia.','montenapoleone','Te voet'],
  ['14.30','Corso Buenos Aires','Ketens, sneakers en eventueel vintage.','buenosaires','Winkelen'],
  ['17.15','Terug en rust','M1 naar Lotto, daarna bus 48 of lopen.','hotel','30-40 min'],
  ['19.15','Naar Navigli','Tram 14 naar Piazzale Cantore, daarna lopen.','navigli','35-45 min'],
  ['20.00','Diner Navigli','Italiaans diner en wandeling langs het kanaal.','navigli','Reserveren']
 ]},
 {label:'Za 12 dec',date:'2026-12-12',items:[
  ['08.30','Ontbijt en uitchecken','Bagage bij het hotel achterlaten.','hotel','Hotel'],
  ['09.10','Naar Santa Maria delle Grazie','Taxi aanbevolen om voldoende marge te houden.','cenacolo','Taxi · 15-25 min'],
  ['09.45','Aanmelden ticketbalie','Minimaal 30 minuten voor het tijdslot.','cenacolo','Op tijd zijn'],
  ['10.15','Laatste Avondmaal','Bezoek en korte blik bij de kerk.','cenacolo','Reserveren'],
  ['11.00','Naar Castello Sforzesco','Mooie wandeling via Corso Magenta.','castello','Lopen · 20-25 min'],
  ['11.25','Castello Sforzesco','Buitenzijde, binnenplaatsen en eventueel Parco Sempione.','castello','Te voet'],
  ['12.30','Snelle lunch Via Dante','Panino, pizza al taglio of verse pasta.','castello','Te voet'],
  ['13.00','Bagage ophalen','Tram 14 via Cordusio/Via Cusani naar Piazza Firenze.','hotel','30-40 min'],
  ['13.40','Naar Linate','Bus 48, M1 en M4; taxi is comfortabeler met bagage.','linate','OV · 55-70 min'],
  ['16.50','Terugvlucht','Vertrek vanaf Linate.','linate','Vlucht']
 ]}
];
let selected=0,map;
const gmaps=(p,mode='transit')=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.address)}&travelmode=${mode}`;
function renderTabs(){daytabs.innerHTML=days.map((d,i)=>`<button class="${i===selected?'active':''}" onclick="selected=${i};renderTabs();renderDay()">${d.label}</button>`).join('')}
function renderDay(){timeline.innerHTML=days[selected].items.map((e,i)=>{let p=places[e[3]],key=`${selected}-${i}`,done=localStorage.getItem('done-'+key);return `<article class="item ${done?'done':''}"><div class="time">${e[0]}</div><div class="event"><h3>${e[1]}</h3><span class="tag">${e[4]}</span><p>${e[2]}</p><div class="actions"><a href="${gmaps(p)}" target="_blank">OV-route</a><a href="${gmaps(p,'walking')}" target="_blank">Lopen</a><button onclick="toggleDone('${key}')">${done?'Heropen':'Gereed'}</button></div></div></article>`}).join('')}
function toggleDone(k){let key='done-'+k;localStorage.getItem(key)?localStorage.removeItem(key):localStorage.setItem(key,'1');renderDay()}
function initMap(){map=L.map('map').setView([45.469,9.184],13);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);Object.values(places).forEach(p=>L.marker([p.lat,p.lng]).addTo(map).bindPopup(`<h3>${p.name}</h3><p>${p.note}</p><a class="btn" target="_blank" href="${gmaps(p)}">Navigeer</a>`))}
function renderPlaces(filter=''){placelist.innerHTML=Object.values(places).filter(p=>(p.name+' '+p.type).toLowerCase().includes(filter.toLowerCase())).map(p=>`<div class="place"><span class="tag">${p.type}</span><h3>${p.name}</h3><p>${p.address}<br>${p.note}</p><div class="actions"><a href="${gmaps(p)}" target="_blank">OV-route</a><a href="${gmaps(p,'walking')}" target="_blank">Lopen</a></div></div>`).join('')}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view,nav button').forEach(x=>x.classList.remove('active'));document.getElementById(b.dataset.view).classList.add('active');b.classList.add('active');if(b.dataset.view==='mapview'){if(!map)initMap();setTimeout(()=>map.invalidateSize(),100)}});
search.oninput=e=>renderPlaces(e.target.value);document.querySelectorAll('[data-check]').forEach(x=>{x.checked=localStorage.getItem('check-'+x.dataset.check)==='1';x.onchange=()=>localStorage.setItem('check-'+x.dataset.check,x.checked?'1':'0')});
let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false});installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;installBtn.hidden=true}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js');renderTabs();renderDay();renderPlaces();

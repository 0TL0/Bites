const WACHTWOORD = 'greenbite2026';
const OPSLAG = 'BITES_DATA';
const FAVOPSLAG = 'BITES_FAV';
const BOODOPSLAG = 'BITES_BOOD';
const NOTITIE_OPSLAG = 'BITES_NOTITIE';

let beheerder = localStorage.getItem('BITES_BEHEER') === 'JA';
let bewerkId = null, sterWaarde = 0;
let toonAlleenFav = false;
let isLijstWeergave = false;

// Standaard recepten
const standaard = [
    {id:1,naam:"Garnalen in knoflook",cat:"Voorgerecht",keuken:"Spaans",tijd:20,pers:2,ster:4,status:"✅ Uitgeprobeerd",foto:"🍤",ing:["400 gr garnalen","4 teentjes knoflook","3 el olijfolie","1 tl rode pepervlokken","1 el peterselie","Sap van halve citroen","Zout en peper"],gerei:["Koekenpan","Lepel"],korte:"Heerlijke Spaanse tapas, in 20 minuten klaar.",stap:"1. Pel de garnalen en dep droog.\n2. Snijd knoflook in plakjes.\n3. Verhit olie en fruit knoflook met chili.\n4. Voeg garnalen toe en bak 3-4 minuten tot ze roze zijn.\n5. Breng op smaak met zout, peper en citroensap.\n6. Bestrooi met peterselie en serveer direct."},
    {id:2,naam:"Beef Teriyaki",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:2,ster:0,status:"⏳ Nog proberen",foto:"🥩",ing:["400 gr rundvlees in dunne reepjes","3 el sojasaus","2 el mirin of rijstwijn","1 el suiker of honing","1 teentje knoflook","1 tl gember","1 el sesamolie","1 lente-ui","Sesamzaadjes"],gerei:["Pan of wok","Lepel"],korte:"Zoete en hartige Japanse stijl.",stap:"1. Snij vlees in dunne reepjes.\n2. Meng sojasaus, mirin, suiker, knoflook en gember.\n3. Marineer 10 minuten.\n4. Bak vlees 4-5 minuten.\n5. Voeg saus toe en laat inkoken."},
    {id:3,naam:"Spaghetti Bolognese",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:40,pers:4,ster:4,status:"✅ Uitgeprobeerd",foto:"🍝",ing:["300 gr spaghetti","500 gr rundergehakt","1 ui","2 teentjes knoflook","1 blik tomatenblokjes","1 blikje tomatenpuree","1 bouillonblokje","Kruiden"],gerei:["Kookpan","Koekenpan"],korte:"Klassieke Italiaanse schotel.",stap:"1. Kook de pasta.\n2. Bak ui, knoflook en gehakt.\n3. Voeg tomaten en kruiden toe.\n4. Laat 25 minuten pruttelen."}
];

// Hulpfuncties
function laadOp(){const s=localStorage.getItem(OPSLAG);return s?JSON.parse(s):standaard}
function bewaarOp(d){localStorage.setItem(OPSLAG,JSON.stringify(d))}
function laadFav(){return JSON.parse(localStorage.getItem(FAVOPSLAG)||'[]')}
function bewaarFav(f){localStorage.setItem(FAVOPSLAG,JSON.stringify(f))}
function laadBood(){return JSON.parse(localStorage.getItem(BOODOPSLAG)||'{}')}
function bewaarBood(b){localStorage.setItem(BOODOPSLAG,JSON.stringify(b))}

// Notitie bewaren
function bewaarNotitie(){localStorage.setItem(NOTITIE_OPSLAG,document.getElementById('notitieVak').value)}
function laadNotitie(){document.getElementById('notitieVak').value=localStorage.getItem(NOTITIE_OPSLAG)||''}

function wisselFilter(){document.getElementById('filterVak').classList.toggle('aan')}
function wisselFav(){toonAlleenFav=!toonAlleenFav;document.getElementById('favKnop').style.fontWeight=toonAlleenFav?'bold':'normal';toonAlles()}
function wisselWeergave(){isLijstWeergave=!isLijstWeergave;document.getElementById('rooster').classList.toggle('lijst',isLijstWeergave);document.getElementById('weergaveKnop').innerHTML=isLijstWeergave?'🖼️ Kaarten':'📋 Lijst'}

function maakSterren(aantal){let h='';for(let i=1;i<=5;i++)h+=i<=aantal?'<span>★</span>':'<span class="leeg">★</span>';return h}
function sluitV(id){document.getElementById(id).classList.remove('aan')}

// Inloggen
function loginVenster(){document.getElementById('ww').value='';document.getElementById('loginV').classList.add('aan')}
function controleerWW(){if(document.getElementById('ww').value===WACHTWOORD){beheerder=true;localStorage.setItem('BITES_BEHEER','JA');sluitV('loginV');werkBij()}else alert('❌ Verkeerd wachtwoord!')}
function werkBij(){document.getElementById('toevoegknop').style.display=beheerder?'flex':'none';document.getElementById('beheer').style.display=beheerder?'inline-flex':'none';document.getElementById('beheerknop').innerHTML=beheerder?'🔓':'🔐'}

// Foto voorbeeld
function werkVoorbeeld(){const v=document.getElementById('f-foto').value;document.getElementById('voorver').innerHTML=`<span>${v}</span>`}
function fotoNaarVoorbeeld(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=x=>{document.getElementById('voorver').innerHTML=`<img src="${x.target.result}">`;document.getElementById('f-foto').value=x.target.result};r.readAsDataURL(f)}

// Sterren kiezen
document.addEventListener('click',e=>{if(e.target.matches('#f-ster span')){sterWaarde=Number(e.target.dataset.waarde);document.querySelectorAll('#f-ster span').forEach((s,i)=>s.classList.toggle('aan',i+1<=sterWaarde))}})

// Alles tonen
function toonAlles(){
    const z=document.getElementById('zoek').value.toLowerCase();
    const c=document.getElementById('cat').value;
    const k=document.getElementById('keuken').value;
    const st=document.getElementById('status').value;
    const so=document.getElementById('sorteer').value;
    const favs=laadFav();
    let lijst=laadOp();
    if(toonAlleenFav)lijst=lijst.filter(r=>favs.includes(r.id));
    lijst=lijst.filter(r=>{
        const alleTekst=`${r.naam} ${r.cat} ${r.keuken} ${(r.ing||[]).join(' ')}`.toLowerCase();
        return (!z||alleTekst.includes(z))&&(!c||r.cat===c)&&(!k||r.keuken===k)&&(!st||r.status===st)
    });
    lijst.sort((a,b)=>{
        if(so==='tijd-ops')return a.tijd-b.tijd;
        if(so==='tijd-afl')return b.tijd-a.tijd;
        if(so==='ster-afl')return(b.ster||0)-(a.ster||0);
        if(so==='naam')return a.naam.localeCompare(b.naam);
        return 0
    });
    const rooster=document.getElementById('rooster');
    rooster.innerHTML='';
    if(lijst.length===0){rooster.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--grijs)">🔍 Geen recepten gevonden</div>`;return}
    lijst.forEach(r=>{
        const kaart=document.createElement('div');
        kaart.className='kaart';
        const isFav=favs.includes(r.id);
        const kl=r.status.includes('✅')?'ja':'nee';
        const inhoudFoto=r.foto.startsWith('data:image')?`<img src="${r.foto}">`:r.foto;
        kaart.innerHTML=`
        <div class="foto">${inhoudFoto}
            <div class="ster-links">${maakSterren(r.ster||0)}</div>
            <button class="fav-knop ${isFav?'ja':''}" onclick="wisselFavRecept(${r.id},event)">★</button>
            ${beheerder?`<button class="bewerk-knop" onclick="bewerkRecept(${r.id},event)">✏️</button>`:''}
            <div class="labels"><span class="label">${r.cat}</span><span class="label">${r.keuken}</span></div>
            <div class="status ${kl}">${r.status}</div>
        </div>
        <div class="inhoud" onclick="toonRecept(${r.id})">
            <h4 class="titel">${r.naam}</h4>
            <p class="beschrijving">${r.korte}</p>
            ${r.gerei?.length?`<div class="gerei">🍳 ${r.gerei.join(', ')}</div>`:''}
            <div class="info"><span>⏱️ ${r.tijd} min</span><span>👥 ${r.pers} pers</span></div>
        </div>`;
        rooster.appendChild(kaart)
    })
}

// Favoriet wisselen
function wisselFavRecept(id,e){e.stopPropagation();const f=laadFav();const i=f.indexOf(id);i>-1?f.splice(i,1):f.push(id);bewaarFav(f);toonAlles()}

// Recept bekijken
function toonRecept(r){if(typeof r==='number')r=laadOp().find(x=>x.id===r);const ingLijst=(r.ing||[]).map((naam,i)=>{const g=laadBood()[r.id]||[];return`<label class="ing-rij"><input type="checkbox" ${g.includes(i)?'checked':''} onchange="wisselIng(${r.id},${i},this.checked)"> ${naam}</label>`}).join('');document.getElementById('detailTitel').innerText=r.naam;document.getElementById('detailInhoud').innerHTML=`
    <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1rem;">
        <div style="width:80px;height:80px;background:rgba(10,18,40,.6);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:2.5rem">${r.foto?.startsWith?.('data:image')?`<img src="${r.foto}" style="width:100%;height:100%;border-radius:10px">`:r.foto}</div>
        <div><p><strong style="color:var(--groen)">Categorie:</strong> ${r.cat}</p><p><strong style="color:var(--groen)">Keuken:</strong> ${r.keuken}</p><p><strong style="color:var(--groen)">Tijd:</strong> ${r.tijd} min</p><p><strong style="color:var(--goud)">Sterren:</strong> ${maakSterren(r.ster||0)}</p></div>
    </div>
    <div style="margin-bottom:.8rem"><h4 style="color:var(--groen);margin-bottom:.3rem">Ingrediënten</h4><div class="ing-lijst">${ingLijst||'Geen'}</div></div>
    <div style="margin-bottom:.8rem"><h4 style="color:var(--groen);margin-bottom:.3rem">Benodigdheden</h4><p style="color:var(--grijs)">${(r.gerei||[]).join(', ')||'Geen'}</p></div>
    <div><h4 style="color:var(--groen);margin-bottom:.3rem">Bereiding</h4><p style="color:var(--grijs);white-space:pre-line">${r.stap||'Geen'}</p></div>
`;document.getElementById('detailV').classList.add('aan');telBood()}

// Boodschappen
function wisselIng(rid,idx,a){const b=laadBood();if(!b[rid])b[rid]=[];const i=b[rid].indexOf(idx);a&&i<0?b[rid].push(idx):!a&&i>-1&&b[rid].splice(i,1);bewaarBood(b);telBood()}
function telBood(){let t=0;Object.values(laadBood()).forEach(x=>t+=x.length);document.getElementById('boodAantal').innerText=t}
function openBoodschap(){const b=laadBood();const r=laadOp();let h='';r.forEach(re=>{if(b[re.id]?.length){h+=`<div style="margin-bottom:.8rem"><strong style="color:var(--groen)">${re.naam}</strong><div style="color:var(--grijs);font-size:.9rem">`;b[re.id].forEach(i=>h+=`• ${re.ing[i]}<br>`);h+=`</div></div>`}});document.getElementById('boodInhoud').innerHTML=h||'<div style="text-align:center;color:var(--grijs);padding:2rem;">Nog geen ingrediënten geselecteerd.</div>';document.getElementById('boodV').classList.add('aan')}

// Formulier openen
function openForm(){if(!beheerder){alert('Log eerst in!');return}bewerkId=null;sterWaarde=0;document.getElementById('formTitel').innerText='➕ Nieuw Recept';document.getElementById('bewerkId').value='';document.getElementById('f-naam').value='';document.getElementById('f-tijd').value=25;document.getElementById('f-pers').value=2;document.getElementById('f-ster').innerHTML='<span data-waarde="1">★</span><span data-waarde="2">★</span><span data-waarde="3">★</span><span data-waarde="4">★</span><span data-waarde="5">★</span>';document.getElementById('f-foto').value='🍽️';document.getElementById('voorver').innerHTML='🍽️';document.getElementById('f-ing').value='';document.getElementById('f-gerei').value='';document.getElementById('f-korte').value='';document.getElementById('f-stap').value='';document.getElementById('verwijderKnop').style.display='none';document.getElementById('formV').classList.add('aan')}

// Recept bewerken
function bewerkRecept(id,e){e.stopPropagation();if(!beheerder){alert('Log eerst in!');return}bewerkId=id;const r=laadOp().find(x=>x.id===id);sterWaarde=r.ster||0;document.getElementById('formT

const WACHTWOORD = 'greenbite2026';
const OPSLAG = 'BITES_DATA';
const NOTITIE_OPSLAG = 'BITES_NOTITIE';

let beheerder = false;
let bewerkId = null;
let sterWaarde = 0;
let toonAlleenFav = false;
let isLijstWeergave = false;

// JOUW 31 RECEPTEN
const standaardRecepten = [
    {id:1,naam:"Garnalen in knoflook",cat:"Voorgerecht",keuken:"Spaans",tijd:20,pers:2,ster:4,fav:false,foto:"🍤",ing:["400 gr garnalen","4 teentjes knoflook","3 el olijfolie","1 tl rode pepervlokken","1 el peterselie","Sap van halve citroen","Zout en peper"],gerei:["Koekenpan","Lepel"],korte:"Heerlijke Spaanse tapas, in 20 minuten klaar."},
    {id:2,naam:"Beef Teriyaki",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:2,ster:0,fav:false,foto:"🥩",ing:["400 gr rundvlees in dunne reepjes","3 el sojasaus","2 el mirin of rijstwijn","1 el suiker of honing","1 teentje knoflook","1 tl gember","1 el sesamolie","1 lente-ui","Sesamzaadjes"],gerei:["Pan of wok","Lepel"],korte:"Zoete en hartige Japanse stijl."},
    {id:3,naam:"Spaghetti Bolognese",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:40,pers:4,ster:4,fav:false,foto:"🍝",ing:["300 gr spaghetti","500 gr rundergehakt","1 ui","2 teentjes knoflook","1 blik tomatenblokjes","1 blikje tomatenpuree","1 groentebouillonblokje","1 tl oregano","Peper en zout","Geraspte kaas"],gerei:["Kookpan","Koekenpan","Lepel"],korte:"Klassieke Italiaanse bolognese saus."},
    {id:4,naam:"Macaroni",cat:"Pasta & Rijst",keuken:"Overig",tijd:30,pers:4,ster:3,fav:false,foto:"🧀",ing:["350 gr macaroni","250 gr gehakt","1 ui","3 teentjes knoflook","1 rode paprika","1 blik tomatenblokjes","1 blikje tomatenpuree","1 el Italiaanse kruiden","Zout en peper","Kaas"],gerei:["Kookpan","Pan"],korte:"Simpele en lekkere schotel."},
    {id:5,naam:"Macaroni met spek of ham",cat:"Pasta & Rijst",keuken:"Overig",tijd:30,pers:4,ster:0,fav:false,foto:"🥓",ing:["350 gr macaroni","150 gr spek of ham","1 ui","1 blik tomatenblokjes","1 blikje tomatenpuree","1 el Italiaanse kruiden","Kaas"],gerei:["Kookpan","Pan"],korte:"Macaroni met spek of ham voor extra smaak."},
    {id:6,naam:"Hamburger, friet en salade",cat:"Hoofdgerecht",keuken:"Overig",tijd:25,pers:2,ster:0,fav:false,foto:"🍔",ing:["2-4 hamburgers","Broodjes","Friet","Sla","Tomaat","Ui","Saus naar smaak"],gerei:["Pan","Oven/friteuse"],korte:"Complete maaltijd in een keer."},
    {id:7,naam:"Gebakken kipfilet met tacokruiden en friet",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:28,pers:2,ster:0,fav:false,foto:"🍗",ing:["2 kipfilets","Tacokruiden","500 gr friet","Olie"],gerei:["Pan","Oven/friteuse"],korte:"Pittige kip met friet."},
    {id:8,naam:"Kapsalon",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🥗",ing:["Shoarma-vlees","Friet","Kaas","IJsbergsla","Komkommer","Tomaat","Knoflooksaus"],gerei:["Ovenschaal","Oven"],korte:"Bekende schotel uit de oven."},
    {id:9,naam:"Taco's gehakt",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:25,pers:3,ster:0,fav:false,foto:"🌮",ing:["Taco schelpen","Gehakt","1 ui","1 paprika","2 teentjes knoflook","Tacokruiden","Sla","Tomaat","Kaas"],gerei:["Pan"],korte:"Pittige taco's met gehakt."},
    {id:10,naam:"Taco's kip",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:25,pers:3,ster:0,fav:false,foto:"🌮",ing:["Taco schelpen","300 gr kipfilet","1 ui","1 paprika","Tacokruiden","Sla","Tomaat","Kaas"],gerei:["Pan"],korte:"Taco's met kip in plaats van gehakt."},
    {id:11,naam:"Nacho Bowl",cat:"Voorgerecht",keuken:"Mexicaans",tijd:20,pers:2,ster:0,fav:false,foto:"🫕",ing:["Nacho chips","Kaas","Gehakt of kip","Guacamole","Zure room","Salsa"],gerei:["Ovenschaal"],korte:"Compleet gevulde schaal."},
    {id:12,naam:"Kip Pizza",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",ing:["Pizzadeeg","Tomatensaus","Kaas","Kipfilet","Groente"],gerei:["Oven","Bakplaat"],korte:"Pizza met kip belegd."},
    {id:13,naam:"Shoarma Pizza",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",ing:["Pizzadeeg","Tomatensaus","Kaas","Shoarma-vlees","Ui"],gerei:["Oven","Bakplaat"],korte:"Pizza met shoarma-vlees."},
    {id:14,naam:"Gehakt Pizza",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",ing:["Pizzadeeg","Tomatensaus","Kaas","Gehakt","Ui"],gerei:["Oven","Bakplaat"],korte:"Pizza met gehakt."},
    {id:15,naam:"Ham Pizza",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",ing:["Pizzadeeg","Tomatensaus","Kaas","Ham"],gerei:["Oven","Bakplaat"],korte:"Simpele pizza met ham."},
    {id:16,naam:"Tonijn Pizza",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",ing:["Pizzadeeg","Tomatensaus","Kaas","Tonijn","Ui"],gerei:["Oven","Bakplaat"],korte:"Pizza met tonijn."},
    {id:17,naam:"Pizza Margherita met paprika en ui",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",ing:["Pizzadeeg","Tomatensaus","Kaas","Paprika","Ui"],gerei:["Oven","Bakplaat"],korte:"Basis pizza met groente."},
    {id:18,naam:"Kip Pesto Pasta",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:30,pers:2,ster:0,fav:false,foto:"🍝",ing:["Pasta","Kipfilet","Peterselie pesto","Room of crème fraîche","Kaas"],gerei:["Kookpan","Koekenpan"],korte:"Romige pasta met pesto en kip."},
    {id:19,naam:"Kip Teriyaki met rijst",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:35,pers:2,ster:0,fav:false,foto:"🍗",ing:["2 kipfilets","Rijst","Sojasaus","Bruine suiker","Knoflook","Gember","Maïs en paprika"],gerei:["Pan","Rijstkoker"],korte:"Kip in zoete Aziatische saus."},
    {id:20,naam:"Bami",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:4,ster:0,fav:false,foto:"🍜",ing:["Bami noedels","Gehakt of kip","1 ui","1 prei","1 wortel","Sojasaus","Ketjap"],gerei:["Wok","Pan"],korte:"Eenvoudige en lekkere bami."},
    {id:21,naam:"Nasi",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:4,ster:0,fav:false,foto:"🍚",ing:["Gekookte rijst","Gehakt of kip","1 ui","2 teentjes knoflook","Sojasaus","Kruiden","Ei"],gerei:["Wok","Pan"],korte:"Gebakken rijst met vlees."},
    {id:22,naam:"Kip en rijst schotel",cat:"Pasta & Rijst",keuken:"Overig",tijd:40,pers:4,ster:0,fav:false,foto:"🍗",ing:["400 gr kip","Rijst","Ui","Knoflook","Paprika","Bouillon"],gerei:["Ovenschaal","Oven"],korte:"Alles in een schotel."},
    {id:23,naam:"Gehaktballetjes in saus",cat:"Vleesgerecht",keuken:"Nederlands",tijd:35,pers:4,ster:0,fav:false,foto:"🍖",ing:["500 gr gehakt","Paneermeel","1 ei","1 ui","Tomatensaus of jus","Pasta of rijst"],gerei:["Pan","Kookpan"],korte:"Hollandse kost."},
    {id:24,naam:"Gebakken zalm met groente en aardappelen",cat:"Visgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🐟",ing:["2 zalmfilets","Aardappelen","Broccoli of sperziebonen","Olie en kruiden"],gerei:["Pan","Oven"],korte:"Lichte en gezonde maaltijd."},
    {id:25,naam:"Kipfilet uit de oven met groente",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:4,ster:0,fav:false,foto:"🥘",ing:["4 kipfilets","Paprika","Ui","Courgette","Tomaat","Kruiden"],gerei:["Ovenschaal","Oven"],korte:"Alles op een schaal en de oven in."},
    {id:26,naam:"Pasta Carbonara",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:25,pers:2,ster:0,fav:false,foto:"🍝",ing:["Pasta","150 gr spek","2 eieren","Geraspte kaas","Peper"],gerei:["Kookpan","Kom"],korte:"Romige pasta zonder room!"},
    {id:27,naam:"Pasta Bolognese met kip",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:35,pers:4,ster:0,fav:false,foto:"🍝",ing:["Pasta","Kipgehakt of fijngesneden kip","Ui","Knoflook","Tomatensaus","Kruiden"],gerei:["Kookpan","Pan"],korte:"Lichtere variant met kip."},
    {id:28,naam:"Chili con Carne",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:45,pers:4,ster:0,fav:false,foto:"🌶️",ing:["500 gr gehakt","1 ui","2 teentjes knoflook","1 blik kidneybonen","1 blik tomatenblokjes","Tacokruiden of chili poeder","Rijst erbij"],gerei:["Pan met dikke bodem"],korte:"Pittige bonen-schotel met gehakt."},
    {id:29,naam:"Kip en groente roerbak",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:20,pers:2,ster:0,fav:false,foto:"🥡",ing:["300 gr kip","Ui","Paprika","Wortel","Sojasaus","Olie"],gerei:["Wok of pan"],korte:"Snel en gezond!"},
    {id:30,naam:"Gehakt met sperziebonen en rijst",cat:"Hoofdgerecht",keuken:"Nederlands",tijd:30,pers:4,ster:0,fav:false,foto:"🍚",ing:["400 gr gehakt","500 gr sperziebonen","Rijst","Ui en knoflook","Kruiden"],gerei:["Pan","Kookpan"],korte:"Compleet en eenvoudig."},
    {id:31,naam:"Kip schnitzel met aardappelen en groente",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🍗",ing:["2 kip schnitzels","Aardappelen","Groente naar keuze","Bloem en ei of paneermeel"],gerei:["Pan"],korte:"Klassieke schnitzel schotel."}
];

// Opslag functies
function laadRecepten() {
    return [...standaardRecepten];
}
function bewaarRecepten(lijst) {
    localStorage.setItem(OPSLAG, JSON.stringify(lijst));
}
function laadNotitie() {
    document.getElementById('notitieVak').value = localStorage.getItem(NOTITIE_OPSLAG) || '';
}
function bewaarNotitie() {
    localStorage.setItem(NOTITIE_OPSLAG, document.getElementById('notitieVak').value);
}

// Venster beheer
function sluitVenster(id) {
    document.getElementById(id).classList.remove('aan');
}
function openVenster(id) {
    document.getElementById(id).classList.add('aan');
}

// Inloggen
function loginVenster() {
    document.getElementById('ww').value = '';
    openVenster('loginV');
}
function controleerWW() {
    if (document.getElementById('ww').value === WACHTWOORD) {
        beheerder = true;
        document.getElementById('toevoegKnop').style.display = 'block';
        sluitVenster('loginV');
    } else {
        alert('❌ Verkeerd wachtwoord!');
    }
}

// Weergave wisselen
function wisselFilter() {
    document.getElementById('filterVak').classList.toggle('aan');
}
function wisselFav() {
    toonAlleenFav = !toonAlleenFav;
    document.getElementById('favKnop').style.fontWeight = toonAlleenFav ? 'bold' : 'normal';
    toonAlles();
}
function wisselWeergave() {
    isLijstWeergave = !isLijstWeergave;
    document.getElementById('rooster').classList.toggle('lijst', isLijstWeergave);
    document.getElementById('weergaveKnop').innerHTML = isLijstWeergave ? '🖼️ Kaarten' : '📋 Lijst';
}

// Sterren tonen
function maakSterren(aantal) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += i <= aantal ? '★' : '<span style="color:rgba(100,90,40,0.3)">★</span>';
    }
    return html;
}

// Favoriet wisselen
function wisselFavStatus(id, e) {
    e.stopPropagation();
    const lijst = laadRecepten();
    const r = lijst.find(x => x.id === id);
    if (r) {
        r.fav = !r.fav;
        bewaarRecepten(lijst);
        toonAlles();
    }
}

// Alle recepten filteren & tonen
function toonAlles() {
    const zoekTerm = document.getElementById('zoek').value.toLowerCase();
    const gekozenCat = document.getElementById('cat').value;
    const gekozenKeuken = document.getElementById('keuken').value;
    const sorteerOp = document.getElementById('sorteer').value;

    let lijst = laadRecepten();

    if (toonAlleenFav) {
        lijst = lijst.filter(r => r.fav);
    }

    lijst = lijst.filter(r => {
        const doorzoek = `${r.naam} ${r.cat} ${r.keuken} ${(r.ing||[]).join(' ')}`.toLowerCase();
        return (!zoekTerm || doorzoek.includes(zoekTerm)) &&
               (!gekozenCat || r.cat === gekozenCat) &&
               (!gekozenKeuken || r.keuken === gekozenKeuken);
    });

    lijst.sort((a, b) => {
        if (sorteerOp === 'tijd-ops') return a.tijd - b.tijd;
        if (sorteerOp === 'tijd-afl') return b.tijd - a.tijd;
        if (sorteerOp === 'ster-afl') return (b.ster || 0) - (a.ster || 0);
        if (sorteerOp === 'naam') return a.naam.localeCompare(b.naam);
        return 0;
    });

    const rooster = document.getElementById('rooster');
    rooster.innerHTML = '';

    if (lijst.length === 0) {
        rooster.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--grijs)">🔍 Geen recepten gevonden</div>`;
        return;
    }

    lijst.forEach(r => {
        const kaart = document.createElement('div');
        kaart.className = 'kaart';
        kaart.innerHTML = `
            <div class="kaart-foto">${r.foto}
                <div class="kaart-ster">${maakSterren(r.ster || 0)}</div>
                <button class="kaart-fav ${r.fav?'ja':''}" onclick="wisselFavStatus(${r.id},event)">★</button>
                ${beheerder ? `<button class="kaart-bewerk" onclick="bewerkRecept(${r.id},event)">✏️</button>` : ''}
                <div class="kaart-labels">
                    <span class="kaart-label">${r.cat}</span>
                    <span class="kaart-label">${r.keuken}</span>
                </div>
            </div>
            <div class="kaart-inhoud" onclick="openReceptDetail(${r.id})">
                <h4 class="kaart-naam">${r.naam}</h4>
                <p class="kaart-kort">${r.korte || ''}</p>
                <div class="kaart-info">
                    <span>⏱️ ${r.tijd} min</span>
                    <span>👥 ${r.pers} pers</span>
                </div>
            </div>`;
        rooster.appendChild(kaart);
    });
}

// Recept details openen
function openReceptDetail(id) {
    const r = laadRecepten().find(x => x.id === id);
    if (!r) return;
    document.getElementById('detailNaam').innerText = r.naam;
    document.getElementById('detailInhoud').innerHTML = `
        <p><strong style="color:var(--groen)">Categorie:</strong> ${r.cat}</p>
        <p><strong style="color:var(--groen)">Keuken:</strong> ${r.keuken}</p>
        <p><strong style="color:var(--groen)">Tijd:</strong> ${r.tijd} min</p>
        <p><strong style="color:var(--groen)">Personen:</strong> ${r.pers}</p>
        <p><strong style="color:var(--goud)">Sterren:</strong> ${maakSterren(r.ster||0)}</p>
        <hr style="border:none;border-top:1px solid var(--rand);margin:0.8rem 0">
        <p><strong style="color:var(--groen)">Ingrediënten:</strong></p>
        <p style="color:var(--grijs)">${(r.ing||[]).join('<br>')}</p>
        ${r.gerei ? `<p style="margin-top:0.8rem"><strong style="color:var(--groen)">Benodigdheden:</strong></p><p style="color:var(--grijs)">${r.gerei.join(', ')}</p>` : ''}
    `;
    openVenster('detailV');
}

// Formulier openen
function openForm() {
    if (!beheerder) { alert('Log eerst in!'); return; }
    bewerkId = null;
    sterWaarde = 0;
    document.getElementById('formTitel').innerText = '➕ Nieuw Recept';
    document.getElementById('bewerkId').value = '';
    document.getElementById('f-naam').value = '';
    document.getElementById('f-tijd').value = 25;
    document.getElementById('f-pers').value = 2;
    document.getElementById('f-ster').innerHTML = '<span data-waarde="1">★</span><span data-waarde="2">★</span><span data-waarde="3">★</span><span data-waarde="4">★</span><span data-waarde="5">★</span>';
    document.getElementById('f-foto').value = '🍽️';
    document.getElementById('f-ing').value = '';
    document.getElementById('verwijderKnop').style.display = 'none';
    openVenster('formV');
}

// Recept bewerken
function bewerkRecept(id, e) {
    e.stopPropagation();
    if (!beheerder) { alert('Log eerst in!'); return; }
    bewerkId = id;
    const r = laadRecepten().find(x => x.id === id);
    sterWaarde = r.ster || 0;
    document.getElementById('formTitel').innerText = '✏️ Bewerken';
    document.getElementById('bewerkId').value = id;
    document.getElementById('f-naam').value = r.naam;
    document.getElementById('f-cat').value = r.cat;
    document.getElementById('f-keuken').value = r.keuken;
    document.getElementById('f-tijd').value = r.tijd;
    document.getElementById('f-pers').value = r.pers;
    document.querySelectorAll('#f-ster span').forEach((s, i) => s.classList.toggle('aan', i + 1 <= sterWaarde));
    document.getElementById('f-foto').value = r.foto;
    document.getElementById('f-ing').value = (r.ing || []).join('\n');
    document.getElementById('verwijderKnop').style.display = 'inline-block';
    openVenster('formV');
}

// Recept opslaan
function bewaarRecept() {
    const naam = document.getElementById('f-naam').value.trim();
    if (!naam) { alert('Vul een naam in!'); return; }

    const nieuw = {
        id: bewerkId || Date.now(),
        naam: naam,
        cat: document.getElementById('f-cat').value,
        keuken: document.getElementById('f-keuken').value,
        tijd: Number(document.getElementById('f-tijd').value) || 20,
        pers: Number(document.getElementById('f-pers').value) || 2,
        ster: sterWaarde,
        fav: false,
        foto: document.getElementById('f-foto').value,
        ing: document.getElementById('f-ing').value.split('\n').filter(x => x.trim())
    };

    const lijst = laadRecepten();
    if (bewerkId) {
        const i = lijst.findIndex(x => x.id === bewerkId);
        nieuw.fav = lijst[i].fav;
        lijst[i] = nieuw;
    } else {
        lijst.push(nieuw);
    }

    bewaarRecepten(lijst);
    sluitVenster('formV');
    toonAlles();
}

// Recept verwijderen
function verwijderRecept() {
    if (!confirm('Weet je het zeker?')) return;
    let lijst = laadRecepten();
    lijst = lijst.filter(x => x.id !== bewerkId);
    bewaarRecepten(lijst);
    sluitVenster('formV');
    toonAlles();
}

// Sterren klikken
document.addEventListener('click', e => {
    if (e.target.matches('#f-ster span')) {
        sterWaarde = Number(e.target.dataset.waarde);
        document.querySelectorAll('#f-ster span').forEach((s, i) => s.classList.toggle('aan', i + 1 <= sterWaarde));
    }
});

// Bij opstarten
window.onload = function () {
    localStorage.clear(); // Wis ALLE oude rommel
    laadNotitie();
    toonAlles();
    document.getElementById('notitieVak').oninput = bewaarNotitie;
};

const WACHTWOORD = 'greenbite2026';
const OPSLAG = 'BITES_DATA';
const NOTITIE_OPSLAG = 'BITES_TAKEN';
const NOTITIE_VAK = 'BITES_NOTITIE';

let beheerder = false;
let bewerkId = null;
let sterWaarde = 0;
let toonAlleenFav = false;
let geselecteerdRecept = null;
let lijstZichtbaar = false;

// JOUW 31 RECEPTEN
const standaardRecepten = [
    {id:1,naam:"Garnalen in knoflook",vertaling:"Gambas al Ajillo",cat:"Voorgerecht",keuken:"Spaans",tijd:20,pers:2,ster:4,fav:false,foto:"🍤",foto2:"",ing:["400 gr garnalen","4 teentjes knoflook","3 el olijfolie","1 tl rode pepervlokken","1 el peterselie","Sap van halve citroen","Zout en peper"],gerei:["Koekenpan","Lepel"],korte:"Heerlijke Spaanse tapas, in 20 minuten klaar.",stap:"Verhit olie. Voeg knoflook en peper toe. Bak garnalen 3-4 min. Bestrooi met peterselie en citroen."},
    {id:2,naam:"Beef Teriyaki",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:2,ster:0,fav:false,foto:"🥩",foto2:"",ing:["400 gr rundvlees in reepjes","3 el sojasaus","2 el mirin","1 el honing","1 teentje knoflook","1 tl gember","1 el sesamolie","1 lente-ui"],gerei:["Wok of pan"],korte:"Zoete en hartige Japanse stijl.",stap:"Marineer vlees. Bak kort. Voeg saus toe en laat inkoken."},
    {id:3,naam:"Spaghetti Bolognese",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:40,pers:4,ster:4,fav:false,foto:"🍝",foto2:"",ing:["300 gr spaghetti","500 gr rundergehakt","1 ui","2 teentjes knoflook","1 blik tomatenblokjes","1 blikje tomatenpuree","1 bouillonblokje","1 tl oregano"],gerei:["Kookpan","Pan"],korte:"Klassieke Italiaanse bolognese.",stap:"Bak ui en knoflook. Voeg gehakt toe. Tomaten en kruiden. 20 min pruttelen."},
    {id:4,naam:"Macaroni",vertaling:"",cat:"Pasta & Rijst",keuken:"Overig",tijd:30,pers:4,ster:3,fav:false,foto:"🧀",foto2:"",ing:["350 gr macaroni","250 gr gehakt","1 ui","3 teentjes knoflook","1 paprika","1 blik tomatenblokjes","1 el Italiaanse kruiden","Kaas"],gerei:["Kookpan","Pan"],korte:"Simpele en lekkere schotel.",stap:"Kook pasta. Bak gehakt en groente. Voeg saus toe. Meng en strooi kaas."},
    {id:5,naam:"Macaroni met spek of ham",vertaling:"",cat:"Pasta & Rijst",keuken:"Overig",tijd:30,pers:4,ster:0,fav:false,foto:"🥓",foto2:"",ing:["350 gr macaroni","150 gr spek of ham","1 ui","1 blik tomatenblokjes","1 el Italiaanse kruiden","Kaas"],gerei:["Kookpan","Pan"],korte:"Macaroni met spek/ham.",stap:"Kook pasta. Bak spek/ui. Voeg saus toe. Meng en kaas erop."},
    {id:6,naam:"Hamburger, friet en salade",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:25,pers:2,ster:0,fav:false,foto:"🍔",foto2:"",ing:["2 hamburgers","Broodjes","Friet","Sla","Tomaat","Ui","Saus"],gerei:["Pan"],korte:"Complete maaltijd.",stap:"Bak hamburgers. Bereid friet. Sla de salade op. Beleg broodjes."},
    {id:7,naam:"Gebakken kipfilet met tacokruiden en friet",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:28,pers:2,ster:0,fav:false,foto:"🍗",foto2:"",ing:["2 kipfilets","Tacokruiden","500 gr friet","Olie"],gerei:["Pan"],korte:"Pittige kip met friet.",stap:"Wrijf kip in met kruiden. Bak in pan. Bereid ondertussen de friet."},
    {id:8,naam:"Kapsalon",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🥗",foto2:"",ing:["Shoarma-vlees","Friet","Kaas","IJsbergsla","Komkommer","Tomaat","Knoflooksaus"],gerei:["Ovenschaal","Oven"],korte:"Bekende schotel uit de oven.",stap:"Friet op schaal, vlees en kaas erop. 10 min in oven. Daarna sla en saus."},
    {id:9,naam:"Taco's gehakt",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:25,pers:3,ster:0,fav:false,foto:"🌮",foto2:"",ing:["Taco schelpen","Gehakt","1 ui","1 paprika","Tacokruiden","Sla","Tomaat","Kaas"],gerei:["Pan"],korte:"Pittige taco's met gehakt.",stap:"Bak gehakt met ui en kruiden. Vul schelpen en beleg."},
    {id:10,naam:"Taco's kip",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:25,pers:3,ster:0,fav:false,foto:"🌮",foto2:"",ing:["Taco schelpen","300 gr kipfilet","1 ui","1 paprika","Tacokruiden","Sla","Tomaat","Kaas"],gerei:["Pan"],korte:"Taco's met kip.",stap:"Bak kip met groente en kruiden. Vul de schelpen."},
    {id:11,naam:"Nacho Bowl",vertaling:"",cat:"Voorgerecht",keuken:"Mexicaans",tijd:20,pers:2,ster:0,fav:false,foto:"🫕",foto2:"",ing:["Nacho chips","Kaas","Gehakt of kip","Guacamole","Zure room","Salsa"],gerei:["Ovenschaal"],korte:"Compleet gevulde schaal.",stap:"Leg chips. Vlees en kaas. 5 min in oven. Saus erbij."},
    {id:12,naam:"Kip Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Kipfilet","Groente"],gerei:["Oven"],korte:"Pizza met kip.",stap:"Beleg en bak 12-15 min op 220°C."},
    {id:13,naam:"Shoarma Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Shoarma-vlees","Ui"],gerei:["Oven"],korte:"Pizza met shoarma.",stap:"Beleg en bak op 220°C."},
    {id:14,naam:"Gehakt Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Gehakt","Ui"],gerei:["Oven"],korte:"Pizza met gehakt.",stap:"Beleg en bak op 220°C."},
    {id:15,naam:"Ham Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Ham"],gerei:["Oven"],korte:"Simpele pizza met ham.",stap:"Beleg en bak op 220°C."},
    {id:16,naam:"Tonijn Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Tonijn","Ui"],gerei:["Oven"],korte:"Pizza met tonijn.",stap:"Beleg en bak op 220°C."},
    {id:17,naam:"Pizza Margherita met paprika en ui",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Paprika","Ui"],gerei:["Oven"],korte:"Basis pizza met groente.",stap:"Beleg en bak op 220°C."},
    {id:18,naam:"Kip Pesto Pasta",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:30,pers:2,ster:0,fav:false,foto:"🍝",foto2:"",ing:["Pasta","Kipfilet","Pesto","Room","Kaas"],gerei:["Kookpan","Pan"],korte:"Romige pasta met pesto.",stap:"Kook pasta. Bak kip. Meng met pesto en room."},
    {id:19,naam:"Kip Teriyaki met rijst",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:35,pers:2,ster:0,fav:false,foto:"🍗",foto2:"",ing:["2 kipfilets","Rijst","Sojasaus","Bruine suiker","Knoflook","Gember"],gerei:["Pan"],korte:"Kip in zoete saus.",stap:"Snij kip. Maak saus. Bak kip en groente. Voeg saus toe."},
    {id:20,naam:"Bami",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:4,ster:0,fav:false,foto:"🍜",foto2:"",ing:["Bami noedels","Gehakt of kip","1 ui","1 prei","1 wortel","Sojasaus","Ketjap"],gerei:["Wok"],korte:"Eenvoudige bami.",stap:"Kook noedels. Vlees en groente roerbak. Voeg saus en noedels toe."},
    {id:21,naam:"Nasi",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:4,ster:0,fav:false,foto:"🍚",foto2:"",ing:["Gekookte rijst","Gehakt of kip","1 ui","2 teentjes knoflook","Sojasaus","Ei"],gerei:["Wok"],korte:"Gebakken rijst met vlees.",stap:"Bak ei. Vlees en groente bakken. Rijst en saus erbij."},
    {id:22,naam:"Kip en rijst schotel",vertaling:"",cat:"Pasta & Rijst",keuken:"Overig",tijd:40,pers:4,ster:0,fav:false,foto:"🍗",foto2:"",ing:["400 gr kip","Rijst","Ui","Knoflook","Paprika","Bouillon"],gerei:["Ovenschaal","Oven"],korte:"Alles in een schotel.",stap:"Alles in schaal. Bouillon erover. 30 min bakken."},
    {id:23,naam:"Gehaktballetjes in saus",vertaling:"",cat:"Vleesgerecht",keuken:"Nederlands",tijd:35,pers:4,ster:0,fav:false,foto:"🍖",foto2:"",ing:["500 gr gehakt","Paneermeel","1 ei","1 ui","Tomatensaus of jus"],gerei:["Pan"],korte:"Hollandse kost.",stap:"Maak balletjes. Bak ze. Voeg saus toe. Laten pruttelen."},
    {id:24,naam:"Gebakken zalm met groente en aardappelen",vertaling:"",cat:"Visgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🐟",foto2:"",ing:["2 zalmfilets","Aardappelen","Broccoli","Olie en kruiden"],gerei:["Pan"],korte:"Lichte en gezonde maaltijd.",stap:"Aardappelen voorbakken. Zalm en groente bakken."},
    {id:25,naam:"Kipfilet uit de oven met groente",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:4,ster:0,fav:false,foto:"🥘",foto2:"",ing:["4 kipfilets","Paprika","Ui","Courgette","Tomaat","Kruiden"],gerei:["Ovenschaal","Oven"],korte:"Alles op een schaal.",stap:"Alles op schaal. 25-30 min op 200°C."},
    {id:26,naam:"Pasta Carbonara",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:25,pers:2,ster:0,fav:false,foto:"🍝",foto2:"",ing:["Pasta","150 gr spek","2 eieren","Geraspte kaas","Peper"],gerei:["Kookpan"],korte:"Romige pasta zonder room!",stap:"Kook pasta. Bak spek. Meng ei en kaas. Combineer snel."},
    {id:27,naam:"Pasta Bolognese met kip",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:35,pers:4,ster:0,fav:false,foto:"🍝",foto2:"",ing:["Pasta","Kipgehakt","Ui","Knoflook","Tomatensaus"],gerei:["Kookpan","Pan"],korte:"Lichtere variant met kip.",stap:"Vlees en ui bakken. Tomaten en kruiden. Laten pruttelen."},
    {id:28,naam:"Chili con Carne",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:45,pers:4,ster:0,fav:false,foto:"🌶️",foto2:"",ing:["500 gr gehakt","1 ui","2 teentjes knoflook","1 blik kidneybonen","1 blik tomatenblokjes","Chilipoeder"],gerei:["Pan"],korte:"Pittige bonen-schotel.",stap:"Vlees en ui bakken. Bonen, tomaten en kruiden. 30 min pruttelen."},
    {id:29,naam:"Kip en groente roerbak",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:20,pers:2,ster:0,fav:false,foto:"🥡",foto2:"",ing:["300 gr kip","Ui","Paprika","Wortel","Sojasaus"],gerei:["Wok"],korte:"Snel en gezond!",stap:"Kip kort bakken. Groente toevoegen. Saus erbij."},
    {id:30,naam:"Gehakt met sperziebonen en rijst",vertaling:"",cat:"Hoofdgerecht",keuken:"Nederlands",tijd:30,pers:4,ster:0,fav:false,foto:"🍚",foto2:"",ing:["400 gr gehakt","500 gr sperziebonen","Rijst","Ui en knoflook"],gerei:["Pan"],korte:"Compleet en eenvoudig.",stap:"Rijst koken. Gehakt met ui bakken. Bonen erbij."},
    {id:31,naam:"Kip schnitzel met aardappelen en groente",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🍗",foto2:"",ing:["2 kip schnitzels","Aardappelen","Groente","Bloem en ei"],gerei:["Pan"],korte:"Klassieke schnitzel.",stap:"Aardappelen koken. Schnitzel paneren en bakken."}
];

// === OPSLAG FUNCTIES ===
function laadRecepten() {
    const opgeslagen = localStorage.getItem(OPSLAG);
    return opgeslagen ? JSON.parse(opgeslagen) : [...standaardRecepten];
}
function bewaarRecepten(lijst) {
    localStorage.setItem(OPSLAG, JSON.stringify(lijst));
}
function laadTaken() {
    const opgeslagen = localStorage.getItem(NOTITIE_OPSLAG);
    return opgeslagen ? JSON.parse(opgeslagen) : {actief:[],archief:[]};
}
function bewaarTaken(lijst) {
    localStorage.setItem(NOTITIE_OPSLAG, JSON.stringify(lijst));
}
function bewaarNotitieTekst() {
    localStorage.setItem(NOTITIE_VAK, document.getElementById('notitieVak').value);
}
function laadNotitieTekst() {
    document.getElementById('notitieVak').value = localStorage.getItem(NOTITIE_VAK) || '';
}

// === VENSTER BEHEER ===
function openVenster(id) {
    document.getElementById(id).classList.add('aan');
    if (id === 'adminPaneel') tekenAdminPaneel();
    if (id === 'notitieV') laadNotitieTekst();
}
function sluitVenster(id) {
    if (id === 'notitieV') bewaarNotitieTekst();
    document.getElementById(id).classList.remove('aan');
}

// === NAVIGATIE ===
function naarOverzicht() {
    document.getElementById('hoofdPagina').style.display = 'block';
    document.getElementById('detailPagina').style.display = 'none';
    geselecteerdRecept = null;
    toonAlles();
}

// === INLOGGEN ===
function loginVenster() {
    document.getElementById('ww').value = '';
    openVenster('loginV');
}
function controleerWW() {
    if (document.getElementById('ww').value === WACHTWOORD) {
        beheerder = true;
        document.getElementById('toevoegKnop').style.display = 'block';
        sluitVenster('loginV');
        openVenster('adminPaneel');
    } else {
        alert('❌ Verkeerd wachtwoord!');
    }
}

// === STERREN WEEGAVE ===
function maakSterren(aantal) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span style="color:${i <= aantal ? '#ffd300' : 'rgba(100,90,40,0.2)'}">★</span>`;
    }
    return html;
}

// === FAVORIETEN ===
function wisselFavStatus(id, e) {
    e.stopPropagation();
    const lijst = laadRecepten();
    const r = lijst.find(x => x.id === id);
    if (r) {
        r.fav = !r.fav;
        bewaarRecepten(lijst);
        toonAlles();
        tekenLijst();
    }
}
function wisselFav() {
    toonAlleenFav = !toonAlleenFav;
    document.getElementById('favKnop').style.fontWeight = toonAlleenFav ? 'bold' : 'normal';
    toonAlles();
}

// === LIJST UITKLAP ===
function wisselLijst() {
    lijstZichtbaar = !lijstZichtbaar;
    document.getElementById('lijstVak').classList.toggle('aan', lijstZichtbaar);
    if (lijstZichtbaar) tekenLijst();
}
function tekenLijst() {
    const lijst = laadRecepten();
    const vak = document.getElementById('lijstInhoud');
    vak.innerHTML = lijst.map(r => `<a href="#" onclick="openRecept(${r.id});return

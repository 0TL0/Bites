const WACHTWOORD = 'greenbite2026';
const OPSLAG = 'BITES_DATA';
const NOTITIE_OPSLAG = 'BITES_TAKEN';

let beheerder = false;
let bewerkId = null;
let sterWaarde = 0;
let toonAlleenFav = false;
let geselecteerdRecept = null;

// ======================================
// JOUW 31 RECEPTEN + UITGEBREIDE VELDEN
// ======================================
const standaardRecepten = [
    {id:1,naam:"Garnalen in knoflook",vertaling:"Gambas al Ajillo / Garlic Shrimp",cat:"Voorgerecht",keuken:"Spaans",tijd:20,pers:2,ster:4,fav:false,foto:"🍤",foto2:"",ing:["400 gr garnalen","4 teentjes knoflook","3 el olijfolie","1 tl rode pepervlokken","1 el peterselie","Sap van halve citroen","Zout en peper"],gerei:["Koekenpan","Lepel"],korte:"Heerlijke Spaanse tapas, in 20 minuten klaar.",stap:"Verhit de olie in een pan op middelhoog vuur. Voeg knoflook en peper toe. Voeg garnalen toe en bak 3-4 minuten. Bestrooi met peterselie en citroensap."},
    {id:2,naam:"Beef Teriyaki",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:2,ster:0,fav:false,foto:"🥩",foto2:"",ing:["400 gr rundvlees in dunne reepjes","3 el sojasaus","2 el mirin of rijstwijn","1 el suiker of honing","1 teentje knoflook","1 tl gember","1 el sesamolie","1 lente-ui","Sesamzaadjes"],gerei:["Pan of wok","Lepel"],korte:"Zoete en hartige Japanse stijl.",stap:"Maak de saus en marineer het vlees. Bak kort in de hete pan. Voeg saus toe en laat inkoken."},
    {id:3,naam:"Spaghetti Bolognese",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:40,pers:4,ster:4,fav:false,foto:"🍝",foto2:"",ing:["300 gr spaghetti","500 gr rundergehakt","1 ui","2 teentjes knoflook","1 blik tomatenblokjes","1 blikje tomatenpuree","1 groentebouillonblokje","1 tl oregano","Peper en zout","Geraspte kaas"],gerei:["Kookpan","Koekenpan","Lepel"],korte:"Klassieke Italiaanse bolognese saus.",stap:"Bak ui en knoflook. Voeg gehakt toe en rul. Voeg tomaten en kruiden toe. Laat 20 minuten zachtjes pruttelen."},
    {id:4,naam:"Macaroni",vertaling:"",cat:"Pasta & Rijst",keuken:"Overig",tijd:30,pers:4,ster:3,fav:false,foto:"🧀",foto2:"",ing:["350 gr macaroni","250 gr gehakt","1 ui","3 teentjes knoflook","1 rode paprika","1 blik tomatenblokjes","1 blikje tomatenpuree","1 el Italiaanse kruiden","Zout en peper","Kaas"],gerei:["Kookpan","Pan"],korte:"Simpele en lekkere schotel.",stap:"Kook de macaroni. Bak gehakt, ui en groente. Voeg saus toe en meng met de pasta. Strooi kaas erover."},
    {id:5,naam:"Macaroni met spek of ham",vertaling:"",cat:"Pasta & Rijst",keuken:"Overig",tijd:30,pers:4,ster:0,fav:false,foto:"🥓",foto2:"",ing:["350 gr macaroni","150 gr spek of ham","1 ui","1 blik tomatenblokjes","1 blikje tomatenpuree","1 el Italiaanse kruiden","Kaas"],gerei:["Kookpan","Pan"],korte:"Macaroni met spek of ham voor extra smaak.",stap:"Kook pasta. Bak spek/ui. Voeg saus toe. Alles mengen en kaas erop."},
    {id:6,naam:"Hamburger, friet en salade",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:25,pers:2,ster:0,fav:false,foto:"🍔",foto2:"",ing:["2-4 hamburgers","Broodjes","Friet","Sla","Tomaat","Ui","Saus naar smaak"],gerei:["Pan","Oven/friteuse"],korte:"Complete maaltijd in een keer.",stap:"Bak de hamburgers. Bereid de friet. Sla de groente op. Beleg de broodjes."},
    {id:7,naam:"Gebakken kipfilet met tacokruiden en friet",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:28,pers:2,ster:0,fav:false,foto:"🍗",foto2:"",ing:["2 kipfilets","Tacokruiden","500 gr friet","Olie"],gerei:["Pan","Oven/friteuse"],korte:"Pittige kip met friet.",stap:"Wrijf kip in met kruiden. Bak in de pan. Bereid ondertussen de friet."},
    {id:8,naam:"Kapsalon",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🥗",foto2:"",ing:["Shoarma-vlees","Friet","Kaas","IJsbergsla","Komkommer","Tomaat","Knoflooksaus"],gerei:["Ovenschaal","Oven"],korte:"Bekende schotel uit de oven.",stap:"Friet op de schaal, vlees erop, kaas erover. 10 min in oven. Daarna sla en saus erop."},
    {id:9,naam:"Taco's gehakt",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:25,pers:3,ster:0,fav:false,foto:"🌮",foto2:"",ing:["Taco schelpen","Gehakt","1 ui","1 paprika","2 teentjes knoflook","Tacokruiden","Sla","Tomaat","Kaas"],gerei:["Pan"],korte:"Pittige taco's met gehakt.",stap:"Bak gehakt met ui en kruiden. Warm de schelpen. Vul en beleg met groente en kaas."},
    {id:10,naam:"Taco's kip",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:25,pers:3,ster:0,fav:false,foto:"🌮",foto2:"",ing:["Taco schelpen","300 gr kipfilet","1 ui","1 paprika","Tacokruiden","Sla","Tomaat","Kaas"],gerei:["Pan"],korte:"Taco's met kip in plaats van gehakt.",stap:"Bak kip met groente en kruiden. Vul de schelpen."},
    {id:11,naam:"Nacho Bowl",vertaling:"",cat:"Voorgerecht",keuken:"Mexicaans",tijd:20,pers:2,ster:0,fav:false,foto:"🫕",foto2:"",ing:["Nacho chips","Kaas","Gehakt of kip","Guacamole","Zure room","Salsa"],gerei:["Ovenschaal"],korte:"Compleet gevulde schaal.",stap:"Leg chips op schaal. Vlees en kaas erop. 5 min in oven. Daarna saus erbij."},
    {id:12,naam:"Kip Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Kipfilet","Groente"],gerei:["Oven","Bakplaat"],korte:"Pizza met kip belegd.",stap:"Beleg de pizza. 12-15 min op 220°C."},
    {id:13,naam:"Shoarma Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Shoarma-vlees","Ui"],gerei:["Oven","Bakplaat"],korte:"Pizza met shoarma-vlees.",stap:"Beleg en bak op 220°C."},
    {id:14,naam:"Gehakt Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Gehakt","Ui"],gerei:["Oven","Bakplaat"],korte:"Pizza met gehakt.",stap:"Beleg en bak op 220°C."},
    {id:15,naam:"Ham Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Ham"],gerei:["Oven","Bakplaat"],korte:"Simpele pizza met ham.",stap:"Beleg en bak op 220°C."},
    {id:16,naam:"Tonijn Pizza",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Tonijn","Ui"],gerei:["Oven","Bakplaat"],korte:"Pizza met tonijn.",stap:"Beleg en bak op 220°C."},
    {id:17,naam:"Pizza Margherita met paprika en ui",vertaling:"",cat:"Hoofdgerecht",keuken:"Italiaans",tijd:40,pers:4,ster:0,fav:false,foto:"🍕",foto2:"",ing:["Pizzadeeg","Tomatensaus","Kaas","Paprika","Ui"],gerei:["Oven","Bakplaat"],korte:"Basis pizza met groente.",stap:"Beleg en bak op 220°C."},
    {id:18,naam:"Kip Pesto Pasta",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:30,pers:2,ster:0,fav:false,foto:"🍝",foto2:"",ing:["Pasta","Kipfilet","Peterselie pesto","Room of crème fraîche","Kaas"],gerei:["Kookpan","Koekenpan"],korte:"Romige pasta met pesto en kip.",stap:"Kook pasta. Bak kip. Meng met pesto en room."},
    {id:19,naam:"Kip Teriyaki met rijst",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:35,pers:2,ster:0,fav:false,foto:"🍗",foto2:"",ing:["2 kipfilets","Rijst","Sojasaus","Bruine suiker","Knoflook","Gember","Maïs en paprika"],gerei:["Pan","Rijstkoker"],korte:"Kip in zoete Aziatische saus.",stap:"Snij kip. Maak saus. Bak kip en groente. Voeg saus toe. Serveer met rijst."},
    {id:20,naam:"Bami",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:4,ster:0,fav:false,foto:"🍜",foto2:"",ing:["Bami noedels","Gehakt of kip","1 ui","1 prei","1 wortel","Sojasaus","Ketjap"],gerei:["Wok","Pan"],korte:"Eenvoudige en lekkere bami.",stap:"Kook noedels. Vlees en groente roerbakken. Voeg saus en noedels toe."},
    {id:21,naam:"Nasi",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:30,pers:4,ster:0,fav:false,foto:"🍚",foto2:"",ing:["Gekookte rijst","Gehakt of kip","1 ui","2 teentjes knoflook","Sojasaus","Kruiden","Ei"],gerei:["Wok","Pan"],korte:"Gebakken rijst met vlees.",stap:"Bak ei en zet weg. Vlees en groente bakken. Rijst en saus erbij. Ei terugdoen."},
    {id:22,naam:"Kip en rijst schotel",vertaling:"",cat:"Pasta & Rijst",keuken:"Overig",tijd:40,pers:4,ster:0,fav:false,foto:"🍗",foto2:"",ing:["400 gr kip","Rijst","Ui","Knoflook","Paprika","Bouillon"],gerei:["Ovenschaal","Oven"],korte:"Alles in een schotel.",stap:"Alles in schaal. Bouillon erover. Afdekken en 30 min bakken."},
    {id:23,naam:"Gehaktballetjes in saus",vertaling:"",cat:"Vleesgerecht",keuken:"Nederlands",tijd:35,pers:4,ster:0,fav:false,foto:"🍖",foto2:"",ing:["500 gr gehakt","Paneermeel","1 ei","1 ui","Tomatensaus of jus","Pasta of rijst"],gerei:["Pan","Kookpan"],korte:"Hollandse kost.",stap:"Maak balletjes. Bak ze. Voeg saus toe. Laat zachtjes pruttelen."},
    {id:24,naam:"Gebakken zalm met groente en aardappelen",vertaling:"",cat:"Visgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🐟",foto2:"",ing:["2 zalmfilets","Aardappelen","Broccoli of sperziebonen","Olie en kruiden"],gerei:["Pan","Oven"],korte:"Lichte en gezonde maaltijd.",stap:"Aardappelen voorbakken. Zalm en groente bakken. Alles op smaak brengen."},
    {id:25,naam:"Kipfilet uit de oven met groente",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:4,ster:0,fav:false,foto:"🥘",foto2:"",ing:["4 kipfilets","Paprika","Ui","Courgette","Tomaat","Kruiden"],gerei:["Ovenschaal","Oven"],korte:"Alles op een schaal en de oven in.",stap:"Alles op schaal. Kruiden. 25-30 min op 200°C."},
    {id:26,naam:"Pasta Carbonara",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:25,pers:2,ster:0,fav:false,foto:"🍝",foto2:"",ing:["Pasta","150 gr spek","2 eieren","Geraspte kaas","Peper"],gerei:["Kookpan","Kom"],korte:"Romige pasta zonder room!",stap:"Kook pasta. Bak spek. Eieren mengen met kaas. Warm pasta met spek. Meng snel met ei-mengsel."},
    {id:27,naam:"Pasta Bolognese met kip",vertaling:"",cat:"Pasta & Rijst",keuken:"Italiaans",tijd:35,pers:4,ster:0,fav:false,foto:"🍝",foto2:"",ing:["Pasta","Kipgehakt of fijngesneden kip","Ui","Knoflook","Tomatensaus","Kruiden"],gerei:["Kookpan","Pan"],korte:"Lichtere variant met kip.",stap:"Vlees met ui bakken. Tomaten en kruiden toevoegen. Laten pruttelen."},
    {id:28,naam:"Chili con Carne",vertaling:"",cat:"Hoofdgerecht",keuken:"Mexicaans",tijd:45,pers:4,ster:0,fav:false,foto:"🌶️",foto2:"",ing:["500 gr gehakt","1 ui","2 teentjes knoflook","1 blik kidneybonen","1 blik tomatenblokjes","Tacokruiden of chili poeder","Rijst erbij"],gerei:["Pan met dikke bodem"],korte:"Pittige bonen-schotel met gehakt.",stap:"Vlees en ui bakken. Kruiden, bonen en tomaten toevoegen. 30 min zachtjes pruttelen."},
    {id:29,naam:"Kip en groente roerbak",vertaling:"",cat:"Hoofdgerecht",keuken:"Aziatisch",tijd:20,pers:2,ster:0,fav:false,foto:"🥡",foto2:"",ing:["300 gr kip","Ui","Paprika","Wortel","Sojasaus","Olie"],gerei:["Wok of pan"],korte:"Snel en gezond!",stap:"Kip kort bakken. Groente toevoegen. Saus erbij. Alles gaar roerbakken."},
    {id:30,naam:"Gehakt met sperziebonen en rijst",vertaling:"",cat:"Hoofdgerecht",keuken:"Nederlands",tijd:30,pers:4,ster:0,fav:false,foto:"🍚",foto2:"",ing:["400 gr gehakt","500 gr sperziebonen","Rijst","Ui en knoflook","Kruiden"],gerei:["Pan","Kookpan"],korte:"Compleet en eenvoudig.",stap:"Rijst koken. Gehakt met ui bakken. Bonen toevoegen en gaar stoven."},
    {id:31,naam:"Kip schnitzel met aardappelen en groente",vertaling:"",cat:"Hoofdgerecht",keuken:"Overig",tijd:35,pers:2,ster:0,fav:false,foto:"🍗",foto2:"",ing:["2 kip schnitzels","Aardappelen","Groente naar keuze","Bloem en ei of paneermeel"],gerei:["Pan"],korte:"Klassieke schnitzel schotel.",stap:"Aardappelen koken. Schnitzel paneren en bakken. Groente bereiden."}
];

// =====================
// OPSLAG FUNCTIES
// =====================
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

// =====================
// VENSTER BEHEER
// =====================
function openVenster(id) {
    document.getElementById(id).classList.add('aan');
    if (id === 'adminPaneel') tekenAdminPaneel();
}
function sluitVenster(id) {
    document.getElementById(id).classList.remove('aan');
}

// =====================
// NAVIGATIE
// =====================
function naarOverzicht() {
    document.getElementById('hoofdPagina').style.display = 'block';
    document.getElementById('detailPagina').style.display = 'none';
    geselecteerdRecept = null;
    toonAlles();
}

// =====================
// INLOGGEN
// =====================
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

// =====================
// STERREN WEEGAVE
// =====================
function maakSterren

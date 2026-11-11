/* Hibi study buddy */
// 16x16 pixel sprites. 8-char rows are mirrored; 16-char rows are used as-is.
window.BUDDY_SPRITES={
max:{name:"Max",species:"Dog",old:"Max",sub:"poodle-schnauzer mix",
 p:{o:"#4A3726",b:"#E3BF7C",d:"#BF8A48",l:"#F8EACB",k:"#1E1712",w:"#FFFFFF",n:"#2B1E16",p:"#F08A9A",t:"#F07D8F"},
 r:["......oo",
    "....ooll",
    "...ollll",
    "..oollbb",
    ".oddobbb",
    "odddolll",
    "odddowkb",
    "odddokkb",
    ".oddobln",
    "..ooplll",
    "....ollk",
    "....ollt",
    "..ooooll",
    "...obooo",
    "...obbbb",
    "...ooooo"],
 colors:[["Max",{}],["Apricot",{b:"#E8A25C",d:"#C27A33",l:"#F6D3A6"}],["Chocolate",{b:"#8A5A3A",d:"#64391F",l:"#C79A74"}],["Silver",{b:"#C9C9CC",d:"#8E8E94",l:"#EFEFF2"}],["Black",{b:"#3A3A40",d:"#232328",l:"#7A7A82",o:"#141418"}]]},
miki:{name:"Miki",species:"Dog",old:"Miki",sub:"cocker spaniel",
 p:{o:"#5A3418",b:"#CF9050",d:"#9C5A26",l:"#F2C894",k:"#1E1712",w:"#FFFFFF",n:"#2B1E16",p:"#F08A9A",t:"#F07D8F",r:"#F06C9B",R:"#C94A7A"},
 r:["........",
    ".....ooo",
    "...oobbb",
    "..obbbbb",
    ".oddbbbb",
    "odddkbbb",
    "odddbkwb",
    "odddbkkb",
    "odddpbll",
    "odddblln",
    "odddbkll",
    "odddblkk",
    ".oddoooo",
    "..oo.obb",
    "....obbb",
    "....oooo"],
 colors:[["Miki",{}],["Red",{b:"#B5652F",d:"#7E3F17",l:"#E3A877"}],["Black",{b:"#3A3A40",d:"#232328",l:"#8A8A92",o:"#141418"}],["Cream",{b:"#EBD3A6",d:"#C9A770",l:"#FAF0DC"}],["Chocolate",{b:"#7A4A2E",d:"#55301A",l:"#B98A68"}]]},
cat:{name:"Luna",species:"Cat",old:"Cat",sub:"curious and cozy",
 p:{o:"#4A3528",b:"#F2A65A",d:"#D9803A",l:"#FBE3C8",k:"#1E1712",w:"#FFFFFF",n:"#E87A8A",p:"#F08A9A",i:"#F4A9B4"},
 r:["..o.....",
    "..oo....",
    "..oio...",
    "..oiooo.",
    "..obbbdd",
    ".obbbbbb",
    ".obbkwbb",
    ".obbkkbb",
    ".opbbbln",
    "..obblkl",
    "...obbbl",
    "....oooo",
    "...obbbb",
    "..obbbbb",
    "..oblbbb",
    "..oooooo"],
 colors:[["Orange",{}],["Gray",{b:"#A9AEB8",d:"#7E8490",l:"#E4E7EC"}],["Black",{b:"#34343A",d:"#1F1F24",l:"#6E6E78",o:"#121216"}],["White",{b:"#F4F2EE",d:"#D9D5CE",l:"#FFFFFF"}],["Cream",{b:"#EBD3A6",d:"#CFAE76",l:"#FAF0DC"}]]},
llama:{name:"Pancho",species:"Llama",old:"Llama",sub:"calm and fluffy",
 p:{o:"#6B5A48",b:"#F3E6D0",s:"#E4D2B2",l:"#FFF8EC",k:"#1E1712",w:"#FFFFFF",n:"#4A3726",i:"#F4A9B4",p:"#F08A9A",r:"#E5533D",y:"#F5B800",g:"#3BA776","1":"#E5533D","2":"#E5533D","3":"#F5B800","4":"#3BA776","5":"#3BA776","6":"#F5B800","7":"#F5B800","8":"#E5533D","9":"#E5533D"},
 r:[".........o...o..",
    "........oio.oio.",
    "........oiollio.",
    "........obbbbbbo",
    "........obbkwbbo",
    "........opbkkbso",
    "........obbbssno",
    ".........obbsko.",
    ".........obboo..",
    ".........obbo...",
    "..oooooooobbo...",
    "oob123456789bo..",
    ".ob123456789bo..",
    ".ooooooooooooo..",
    "..ob......ob....",
    "..oo......oo...."],
 colors:[["Cream",{}],["Chocolate",{b:"#9A6A45",s:"#7C5333",l:"#B98A62"}],["Gray",{b:"#B9B6B0",s:"#9A968F",l:"#D8D5CF"}],["Black",{b:"#3E3A38",s:"#2A2725",l:"#6A6460",o:"#141210"}],["Rainbow",{"1":"#E5533D","2":"#F59A2E","3":"#F5C842","4":"#F5C842","5":"#3BA776","6":"#3BA776","7":"#4FA3E8","8":"#9B6FE0","9":"#9B6FE0",sw:"linear-gradient(135deg,#E5533D,#F5C842,#3BA776,#4FA3E8,#9B6FE0)"}]]},
unicorn:{name:"Glitter",species:"Unicorn",old:"Unicorn",sub:"sparkly, obviously",
 over:{3:"....ry..........",4:"...ryg..........",5:"..rygu..........",6:".ryg............",7:".ygu............",8:".guv............",9:"..uv............",10:"..v............."},
 p:{o:"#5B4A6B",b:"#FFFFFF",s:"#ECE6F5",k:"#1E1712",w:"#FFFFFF",H:"#FBE7A8",n:"#F7A8C4",p:"#F7A8C4",h:"#F5C842",r:"#F2716B",y:"#F9D25C",g:"#6FD39A",u:"#6FB6F2",v:"#B48CF0"},
 r:[".......h",
    ".......H",
    "...o...h",
    "..opooob",
    "..obbbbb",
    "..obbbbb",
    "..obkwbb",
    "..obkkbb",
    "..opbbbb",
    "...obbbb",
    "...obbnb",
    "....obbk",
    "....oooo",
    "...obbbb",
    "...obsbb",
    "...ooooo"],
 colors:[["Rainbow",{}],["Pastel",{r:"#F7B6C8",y:"#FBE3A0",g:"#B8EBCB",u:"#B7DBF8",v:"#D9C6F7"}],["Starry night",{b:"#3C3A6E",s:"#2C2A55",o:"#18163A",r:"#F5C842",y:"#FFFFFF",g:"#9FB6FF",u:"#C9A6E8",v:"#F5C842"}],["Pink",{b:"#FFE3EE",s:"#F7C6D8"}],["Mermaid",{b:"#E2F8F5",s:"#B4E6E0",r:"#3FC1C9",y:"#7ED6DF",g:"#A29BFE",u:"#6C5CE7",v:"#FD79A8"}]]},
chicken:{name:"Pea",species:"Chicken",old:"Chicken",sub:"small but brave",
 p:{o:"#5A4632",b:"#FFFFFF",s:"#EDE6DA",k:"#1E1712",w:"#FFFFFF",c:"#E5533D",y:"#F5A623",p:"#F7A8C4"},
 r:["......cc",
    ".....ccc",
    "....oooo",
    "...obbbb",
    "..obbbbb",
    "..obkwbb",
    "..obkkby",
    "..opbbyy",
    "..obbbbc",
    "..obbbbb",
    ".osbbbbb",
    ".ossbbbb",
    "..osbbbb",
    "...oobbb",
    ".....ooo",
    "....y..."],
 colors:[["White",{}],["Yellow chick",{b:"#FFE27A",s:"#F5C842"}],["Brown hen",{b:"#B8743E",s:"#8F5428"}],["Black",{b:"#3A3A40",s:"#26262B"}],["Bubblegum",{b:"#FFB6D5",s:"#F28DBB"}]]},
pudu:{name:"Puli",species:"Pudú",old:"Pudú",sub:"tiny Chilean deer",
 p:{o:"#3E2A1C",b:"#9C6440",d:"#7A4A2C",l:"#D9A97E",k:"#1E1712",w:"#FFFFFF",n:"#1E1712",p:"#F08A9A",i:"#D98C78"},
 r:["........",
    ".oo....o",
    "oiio..ob",
    "oiidoobb",
    ".odbbbbb",
    "..obbbbb",
    "..obkwbb",
    "..obkkbb",
    "..opbbll",
    "...obbln",
    "....olll",
    ".....ooo",
    "...obbbb",
    "..obbbbb",
    "..odbbbb",
    "..oo.ooo"],
 colors:[["Reddish brown",{}],["Dark brown",{b:"#6B4430",d:"#4E3020",l:"#A9805F"}],["Sandy",{b:"#C08A50",d:"#9C6A35",l:"#E8C79A"}],["Gray",{b:"#8E8378",d:"#6E655C",l:"#BDB4AA"}],["Lavender dream",{b:"#B9A2E8",d:"#9479CF",l:"#E6DBFA"}]]},
capybara:{name:"Don Capi",species:"Capybara",old:"Capybara",sub:"chill level: maximum",
 p:{o:"#4A3426",b:"#B07A4E",d:"#8E5E38",l:"#C8946A",k:"#1E1712",w:"#FFFFFF",n:"#3A2A1E",p:"#E8907E",f:"#F59A2E",g:"#5BAF5B"},
 r:["......g.",
    "......ff",
    "..o..off",
    ".odooooo",
    ".obbbbbb",
    "obbbbbbb",
    "obbbkbbb",
    "obbbkbbb",
    "obpbbbbb",
    "obbbllll",
    "obbblnnl",
    ".obbllll",
    "..oooooo",
    "..obbbbb",
    "..obbbbb",
    "..oooooo"],
 colors:[["Classic",{}],["Sandy",{b:"#C99A5E",d:"#A57A44",l:"#DDB37E"}],["Chocolate",{b:"#7E5434",d:"#5E3C22",l:"#9C6E4C"}],["Pink (why not)",{b:"#F2B6C6",d:"#D98FA5",l:"#F8CDD8"}],["Sky blue",{b:"#9CC9F0",d:"#76A9D8",l:"#C2DEF6"}]]},
axolotl:{name:"Kiki",species:"Axolotl",old:"Axolotl",sub:"always smiling",
 p:{o:"#7A3B57",b:"#F9B8CF",s:"#F59AB8",g:"#E8608F",k:"#1E1712",w:"#FFFFFF",p:"#F57FA6",l:"#FDE0EA"},
 r:["........",
    "g.g.....",
    ".g.oooo.",
    "gggobbbb",
    ".gobbbbb",
    "ggobbbbb",
    ".obbkwbb",
    "gobbkkbb",
    ".obpbbbb",
    "..obbkbb",
    "...obbkk",
    "....oooo",
    "...obbbb",
    "..oblbbb",
    "..oblbbb",
    "..oo.ooo"],
 colors:[["Pink",{}],["Lemon",{b:"#FFD978",s:"#F5C04A",g:"#E8963A",o:"#7A5A20"}],["Lavender",{b:"#D9C6F7",s:"#C2A8F0",g:"#9B6FE0",o:"#4E3A7A"}],["Wild (dark)",{b:"#5E6B5A",s:"#4A5547",g:"#C9A64E",o:"#25301F",l:"#8A9A84"}],["White",{b:"#FAF6F2",s:"#EDE4DC",g:"#F07D9A"}]]},
frog:{name:"Kero",species:"Frog",sub:"ribbit-ready",
 p:{o:"#2F5A1E",b:"#6CC24A",d:"#4E9A33",l:"#D8F0B0",k:"#1E1712",w:"#FFFFFF",p:"#F08A9A"},
 r:["........",
    "........",
    "...oooo.",
    "..owwwwo",
    "..owkkwo",
    ".obwkwwb",
    ".obbbbbb",
    "obpbbbbb",
    "obbkbbbb",
    "obbbkkkk",
    ".obbbbbb",
    "obdollll",
    "obdollll",
    "obbdolll",
    ".oddoooo",
    "oooo...."],
 colors:[["Green",{}],["Lime",{b:"#9BE04A",d:"#6FB52A",l:"#EEF9C8",o:"#3E6A12"}],["Blue",{b:"#4FA3E8",d:"#2F7CC4",l:"#CFE8FB",o:"#1E3F66"}],["Pink",{b:"#F59AC0",d:"#D9709C",l:"#FDE0EC",o:"#7A2F52"}],["Purple",{b:"#A98BE8",d:"#7E5CC9",l:"#E8DDFB",o:"#3E2A6E"}]]}
};

/* ---------- study buddy: pixel pet that keeps you company ---------- */
(function () {
  "use strict";
  if (window.csBuddy) return;
  const SP = window.BUDDY_SPRITES;
  const KEY = "ncs-buddy", MAXT = 30, START_T = 5, FEED_PER_DAY = 5;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };

  /* where hats, glasses and collars sit on each animal (sprite coordinates) */
  const ANCHOR = {
    max:      { hat: [7.5, 1], eyes: [6, [4.5, 10.5]], neck: [7.5, 12] },
    miki:     { hat: [7.5, 1], eyes: [6, [5.5, 9.5]], neck: [7.5, 12] },
    cat:      { hat: [7.5, 3], eyes: [6, [4.5, 10.5]], neck: [7.5, 11] },
    llama:    { hat: [11, 2], eyes: [4, [11.5]], neck: [10.5, 9] },
    unicorn:  { hat: [7.5, 3], eyes: [6, [4.5, 10.5]], neck: [7.5, 12], keep: "hH" },
    chicken:  { hat: [7.5, 2], eyes: [5, [4.5, 10.5]], neck: [7.5, 9], keep: "c" },
    pudu:     { hat: [7.5, 2], eyes: [6, [4.5, 10.5]], neck: [7.5, 11] },
    capybara: { hat: [7.5, 3], eyes: [6, [4, 11]], neck: [7.5, 12] },
    axolotl:  { hat: [7.5, 2], eyes: [6, [4.5, 10.5]], neck: [7.5, 11] },
    frog:     { hat: [7.5, 1], eyes: [4, [4.5, 10.5]], neck: [7.5, 10] }
  };
  const ORDER = ["max", "miki", "cat", "chicken", "llama", "capybara", "pudu", "frog", "axolotl", "unicorn"];

  /* accessories: slot, unlocked at N saved words (w) or N learned words (l) */
  const AP = { s: "#C3CCD6", S: "#7D8894", r: "#E5533D", R: "#A8321F", y: "#F5C842", Y: "#D9A520", w: "#FFFFFF", k: "#1E1712", K: "#4A4A55", g: "#3BA776", G: "#2A7D54", b: "#3B6FD9", p: "#F37BA5", P: "#D9527F", v: "#8E5CD9", V: "#6B3FB5", u: "#6FB6F2", o: "#F5A623", c: "#F6E7CF", h: "#E8C987", H: "#B8924A", n: "#F28C28", N: "#C96A12" };
  /* seasonal hats: worn automatically on those dates (students can turn this off) */
  function easter(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return new Date(y, mo - 1, da); }
  const SEASONS = [
    { id: "s-newyear", name: "New Year party hat", ico: "🎆", when: (m, d) => (m === 12 && d === 31) || (m === 1 && d <= 2), px: ["..ww..", "..yy..", ".yvvy.", ".yyyy.", "yvvvvy"] },
    { id: "s-valentine", name: "Heart boppers", ico: "💘", when: (m, d) => m === 2 && d >= 10 && d <= 14, px: ["pp..pp", "pp..pp", ".k..k.", "kkkkkk"] },
    { id: "s-easter", name: "Bunny ears", ico: "🐰", when: (m, d, y) => { const e = easter(y), t = new Date(y, m - 1, d); const diff = Math.round((t - e) / 864e5); return diff >= -3 && diff <= 1; }, px: ["w....w", "wp..pw", "wp..pw", "ww..ww"] },
    { id: "s-patrias", name: "Chupalla (Fiestas Patrias)", ico: "🇨🇱", when: (m, d) => m === 9 && d >= 14 && d <= 20, px: ["..hhhh..", "..rrbb..", "HhhhhhhH"] },
    { id: "s-halloween", name: "Witch hat", ico: "🎃", when: (m, d) => m === 10 && d >= 24, px: ["....kk..", "...kkk..", "..kkkk..", "..vvvv..", "kkkkkkkk"] },
    { id: "s-xmas", name: "Santa hat", ico: "🎅", when: (m, d) => m === 12 && d <= 26, px: ["......ww", "....rrrw", "..rrrrr.", ".rrrrrr.", "wwwwwwww"] }
  ];
  function season() { const t = window.__bdDate ? new Date(window.__bdDate) : new Date(), m = t.getMonth() + 1, d = t.getDate(), y = t.getFullYear(); return SEASONS.find(x => x.when(m, d, y)) || null; }
  const ITEMS = [
    { id: "bandana", name: "Bandana", ico: "🧣", slot: "neck", w: 5, px: ["rrrrrr", ".rwrr.", "..rr.."] },
    { id: "bowtie", name: "Bow tie", ico: "🎀", slot: "neck", w: 15, px: ["p....p", "ppPPpp", "p....p"] },
    { id: "sunglasses", name: "Sunglasses", ico: "🕶️", slot: "face", w: 25, lens: ["wkk", "kkk"], frame: "k" },
    { id: "party", name: "Party hat", ico: "🥳", slot: "head", w: 40, px: ["..ww..", "..rr..", ".ryyr.", ".rrrr.", "ryyyyr"] },
    { id: "scarf", name: "Cozy scarf", ico: "🧶", slot: "neck", w: 60, px: ["gggggggg", "gwgwgwgg", ".....gG.", ".....gw."] },
    { id: "flowers", name: "Flower crown", ico: "🌸", slot: "head", w: 80, px: ["p.y.p.y.", "GpGyGpGy"] },
    { id: "room", name: "Cozy room", ico: "🏠", slot: "room", w: 100 },
    { id: "beanie", name: "Beanie", ico: "🧢", slot: "head", w: 125, px: ["...ww...", "..bbbb..", ".bbbbbb.", "bbbbbbbb", "wwwwwwww"] },
    { id: "gradcap", name: "Graduation cap", ico: "🎓", slot: "head", w: 150, px: ["kkkkkkkk", "kkkkkkkk", "..kkkky.", "......y."] },
    { id: "hearts", name: "Heart glasses", ico: "💕", slot: "face", w: 175, lens: ["p.p", "ppp", ".p."], frame: "P" },
    { id: "collar", name: "Rainbow collar", ico: "🌈", slot: "neck", w: 200, px: ["ryyguvvr", "...yy..."] },
    { id: "crown", name: "Crown", ico: "👑", slot: "head", w: 250, px: ["y.yy.y", "yyyyyy", "yryuyy"] },
    { id: "wizard", name: "Wizard hat", ico: "🧙", slot: "head", w: 300, px: ["....v...", "...vv...", "..vyvv..", ".vvvvvv.", "vvvVvvvv"] },
    { id: "shiny", name: "Shiny sparkles", ico: "✨", slot: "fx", w: 400 },
    { id: "night", name: "Night sky", ico: "🌙", slot: "room", w: 500 },
    { id: "rainbow", name: "Rainbow room", ico: "🌈", slot: "room", w: 750 },
    { id: "legend", name: "Legend star", ico: "⭐", slot: "badge", w: 1000 },
    /* learned words (marked "I knew it" 3 times in flashcards) */
    { id: "ball", name: "Toy ball", ico: "⚽", slot: "toy", l: 10 },
    { id: "book", name: "Little book", ico: "📘", slot: "toy", l: 25 },
    { id: "plant", name: "Plant", ico: "🪴", slot: "toy", l: 50 },
    { id: "lamp", name: "Lamp", ico: "💡", slot: "toy", l: 100 },
    { id: "trophy", name: "Trophy", ico: "🏆", slot: "toy", l: 200 },
    /* grammar modules: finish every stage */
    { id: "hourglass", name: "Magic hourglass", ico: "⏳", slot: "toy", m: "ps", mt: "Past simple" },
    { id: "globe", name: "Little globe", ico: "🌍", slot: "toy", m: "pp", mt: "Present perfect" },
    { id: "mug", name: "Coffee mug", ico: "☕", slot: "toy", m: "prs", mt: "Present simple" },
    { id: "bell", name: "Little bell", ico: "🔔", slot: "toy", m: "ed", mt: "-ed endings" },
    /* duels (club members): fighting gear */
    { id: "dbanner", name: "Duel banner", ico: "🚩", slot: "toy", dp: 1 },
    { id: "sword", name: "Wooden sword", ico: "🗡️", slot: "toy", dw: 1 },
    { id: "shield", name: "Shield", ico: "🛡️", slot: "toy", dw: 3 },
    { id: "helmet", name: "Knight helmet", ico: "⛑️", slot: "head", dw: 5, px: ["...yy...", "..ssss..", ".ssSSss.", "sSkkkkSs", "sS....Ss"] },
    { id: "armour", name: "Armour stand", ico: "🏰", slot: "toy", dw: 10 },
    { id: "cape", name: "Hero cape", ico: "🦸", slot: "neck", ds: 3, px: ["rrrrrrrr", "rRrrrrRr", "rr....rr"] },
    { id: "headband", name: "Fighter headband", ico: "🥋", slot: "head", dp: 1, px: ["........", "rrrrrrrr", "rwrrrrrr", "......rr", ".......r"] },
    { id: "medal", name: "Champion medal", ico: "🥇", slot: "neck", dw: 2, px: ["b......b", ".b....b.", "..bbbb..", "...yy...", "..yyyy..", "...yy..."] },
    { id: "battleshades", name: "Battle shades", ico: "😎", slot: "face", dw: 7, lens: ["kkk", "kkk"], frame: "r" },
    { id: "laurel", name: "Victory laurel", ico: "🌿", slot: "head", dw: 15, px: ["G.G..G.G", "GGgGGgGG"] }
  ];
  const byId = Object.fromEntries(ITEMS.map(i => [i.id, i]));

  /* ---------- state ---------- */
  function load() { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); return s && typeof s === "object" ? s : {}; } catch (e) { return {}; } }
  let S = load();
  if (S.a === "unicorn") S.ua = true;
  /* Pancho lost the lilac color (everyone has 5 now): move saved llama colors to the right spot */
  if (!S.lm2) { const fix = o => { if (o && o.a === "llama") { if (o.c === 3) o.c = 0; else if ((o.c | 0) > 3) o.c = o.c - 1; } }; fix(S); S.lm2 = 1; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  const COS = ["a", "c", "n", "head", "face", "neck", "room", "shiny", "seas", "snd", "toyOff", "tp"];
  let base = null; /* the saved look, while the buddy window has unsaved edits */
  const pickCos = o => { const r = {}; COS.forEach(k => r[k] = o[k]); return r; };
  const dirty = () => !!base && COS.some(k => JSON.stringify(S[k] == null ? null : S[k]) !== JSON.stringify(base[k] == null ? null : base[k]));
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(base ? Object.assign({}, S, base) : S)); } catch (e) {}
    try { window.__csOnSet && window.__csOnSet(KEY); } catch (e) {}
    try { if (!base) publishPark(); } catch (e) {}
  }
  function publishPark() {
    const P = window.__csPark; if (!P || !P.signedIn()) return;
    if (S.on !== true || !S.a) { P.publish({ on: false }); return; }
    P.publish({ on: true, a: S.a, c: S.c | 0, n: String(S.n || "").slice(0, 16), head: S.head || null, face: S.face || null, neck: S.neck || null, lvl: typeof level === "function" ? level() : 1, cefr: (window.csLevel && window.csLevel().lv) || "", words: counts().words, shiny: !!(S.shiny && S.mw >= 400), ...(typeof duelPub === "function" ? duelPub() : {}) });
  }
  function counts() {
    let words = 0, learned = 0;
    try { const w = JSON.parse(localStorage.getItem("ncs-words") || "[]"); if (Array.isArray(w)) words = w.filter(x => x && x.w).length; } catch (e) {}
    try { const f = JSON.parse(localStorage.getItem("ncs-fc") || "{}"); learned = Object.values(f).filter(v => v >= 3).length; } catch (e) {}
    return { words, learned };
  }
  /* Noa (the teacher account) has everything unlocked and a best-friends buddy */
  const TCH = () => window.__csTeacher === true && !window.__csPreview;  // in "View as", the buddy unlocks only what that member unlocked
  const musicDays = () => Array.isArray(S.mud) ? S.mud.length : 0;
  const modDone = m => { if (TCH()) return true; try { const p = (JSON.parse(localStorage.getItem("ncs-mods") || "{}") || {})[m] || {}; return (p.to && p.to.sc >= 15) || [1, 2, 3, 4, 5, 6, 7].every(n => ((p.b || {})[n] | 0) >= 7); } catch (e) { return false; } };
  const isOpen = it => { if (TCH()) return true; if (it.m) return modDone(it.m); if (it.md != null) return musicDays() >= it.md; if (it.dw != null) return (S.dw | 0) >= it.dw; if (it.ds != null) return (S.dbs | 0) >= it.ds; if (it.dp != null) return (S.dplay | 0) >= it.dp; const c = counts(); return it.w != null ? c.words >= it.w : c.learned >= it.l; };
  const lockTxt = it => it.md != null ? `after studying with music on ${it.md} different days (you have ${Math.min(musicDays(), it.md)})` : it.m ? "when you finish " + it.mt : it.dw != null ? "after " + it.dw + " duel " + (it.dw === 1 ? "win" : "wins") : it.ds != null ? "after " + it.ds + " duel wins in a row" : it.dp != null ? "after your first duel" : it.w != null ? it.w + " words" : it.l + " learned words";
  const atW = it => it.m || it.md != null || it.dw != null || it.ds != null || it.dp != null ? "" : "at ";
  const needTxt = it => it.m ? "⏪" : it.dw != null ? "⚔️" + it.dw : it.ds != null ? "🔥" + it.ds : it.dp != null ? "⚔️" : it.w != null ? it.w : it.l;
  const animal = () => SP[S.a] ? S.a : "max";
  const palette = () => { const d = SP[animal()], c = d.colors[S.c | 0] || d.colors[0]; return Object.assign({}, d.p, c[1]); };
  const nameOf = () => { const n = S.n && String(S.n).trim(), sp = SP[animal()]; return n && n !== sp.old ? n : sp.name; };

  /* ---------- drawing ---------- */
  const W = 20, H = 22, OX = 2, OY = 5;
  function spriteGrid(id, pal, blink) {
    const d = SP[id], g = [];
    d.r.forEach((row, y) => {
      let full = row.length === 16 ? row : row + row.split("").reverse().join("");
      if (d.over && d.over[y]) full = [...full].map((c, x) => d.over[y][x] && d.over[y][x] !== "." ? d.over[y][x] : c).join("");
      g.push([...full]);
    });
    if (blink) {
      const out = g.map(r => r.slice());
      for (let y = 0; y < 15; y++) for (let x = 0; x < 16; x++) {
        const ch = g[y][x];
        if ((ch === "k" || ch === "w") && (g[y + 1][x] === "k" || g[y + 1][x] === "w") && y > 2) out[y][x] = g[y - 1][x] === "o" ? "b" : (g[y - 1][x] === "k" ? "b" : g[y - 1][x]);
      }
      for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if (out[y][x] === "w" && g[y][x] === "w") out[y][x] = "k";
      return out;
    }
    return g;
  }
  function stamp(px, pat, cx, top, pal) {
    const w = Math.max(...pat.map(r => r.length)), x0 = Math.round(cx + 0.5 - w / 2);
    pat.forEach((row, dy) => [...row].forEach((ch, dx) => { if (ch !== "." && pal[ch]) px.push([x0 + dx + OX, top + dy + OY, pal[ch]]); }));
  }
  function drawPet(opts) {
    opts = opts || {};
    const id = opts.a || animal(), pal = opts.pal || palette(), anc = ANCHOR[id];
    const g = spriteGrid(id, pal, opts.blink);
    const px = [];
    g.forEach((row, y) => row.forEach((ch, x) => { if (ch !== "." && ch !== " " && pal[ch]) px.push([x + OX, y + OY, pal[ch]]); }));
    const wear = opts.wear || { head: S.head, face: S.face, neck: S.neck };
    const neck = byId[wear.neck], face = byId[wear.face]; let head = byId[wear.head];
    if (!opts.plain && S.seas !== false) { const se = season(); if (se) head = se; }
    if (neck && neck.px) stamp(px, neck.px, anc.neck[0], anc.neck[1], AP);
    if (face && face.lens) {
      const [ey, cs] = anc.eyes, lw = face.lens[0].length;
      const xs = cs.map(c => Math.round(c + 0.5 - lw / 2));
      xs.forEach(x0 => face.lens.forEach((row, dy) => [...row].forEach((ch, dx) => { if (ch !== ".") px.push([x0 + dx + OX, ey + dy + OY, AP[ch]]); })));
      if (xs.length === 2) for (let x = xs[0] + lw; x < xs[1]; x++) px.push([x + OX, ey + OY, AP[face.frame]]);
      else px.push([xs[0] - 1 + OX, ey + OY, AP[face.frame]]);
    }
    if (head && head.px) stamp(px, head.px, anc.hat[0], anc.hat[1] - head.px.length + 1, AP);
    if (anc.keep && head && head.px) g.forEach((row, y) => row.forEach((ch, x) => { if (anc.keep.includes(ch)) px.push([x + OX, y + OY, pal[ch]]); }));
    return px;
  }
  const rects = (px, dx, dy) => px.map(([x, y, c]) => `<rect x="${x + (dx || 0)}" y="${y + (dy || 0)}" width="1.04" height="1.04" fill="${c}"/>`).join("");
  function petSVG(opts) {
    opts = opts || {};
    return `<svg class="${opts.cls || "bd-svg"}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges" aria-hidden="true">${rects(drawPet(opts))}</svg>`;
  }
  function eggSVG() {
    const E = ["...oooo...", "..occcco..", ".occcbcco.", ".occccccco".slice(0,10), "occbcccbco", "occccccccco".slice(0,10), "ocbcccbcco", "occccccbco", ".occcccco.", "..oooooo.."];
    const P = { o: "#7A5A3A", c: "#FFF6E6", b: "#9ED3F0" }; const px = [];
    E.forEach((r, y) => [...r].forEach((ch, x) => { if (P[ch]) px.push([x + 5, y + 10, P[ch]]); }));
    return `<svg class="bd-svg" viewBox="2 6 16 16" shape-rendering="crispEdges" aria-hidden="true">${rects(px)}</svg>`;
  }
  /* rooms (shown in the buddy panel) */
  function roomSVG(roomId, toys) {
    /* drawn wider than the default view (x -14..54, y -16..26) so you can zoom out */
    const X0 = -14, Y0 = -16, RW = 68, RH = 42; let r = "";
    const R = (x, y, w, h, c) => { r += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`; };
    if (roomId === "room") {
      R(X0, Y0, RW, RH, "#F6E7CF"); for (let y = -14; y < 19; y += 4) for (let x = X0 + ((y + 16) % 8 ? 2 : 4); x < X0 + RW; x += 4) R(x, y, 1, 1, "#EBD3B0");
      R(2, 3, 9, 8, "#7A5A3A"); R(3, 4, 7, 6, "#9ED3F0"); R(6, 4, 1, 6, "#7A5A3A"); R(3, 7, 7, 1, "#7A5A3A"); R(3, 4, 2, 1, "#FFFFFF");
      R(41, 4, 7, 9, "#7A5A3A"); R(42, 5, 5, 7, "#F2B8C6"); R(44, 7, 1, 3, "#E5533D"); R(X0, -6, RW, 1, "#E3C9A2");
      R(X0, 19, RW, 7, "#C89463"); for (let x = X0; x < X0 + RW; x += 7) R(x, 19, 1, 7, "#B07E50"); R(10, 23, 20, 2, "#E5533D"); R(11, 23, 18, 1, "#F07A66");
    } else if (roomId === "cafe") {
      R(X0, Y0, RW, RH, "#5B3A29"); for (let x = X0; x < X0 + RW; x += 3) R(x, Y0, 1, 35, "#53352A");
      R(X0, 6, RW, 13, "#7A4E36"); R(X0, 6, RW, 1, "#94643F");
      R(1, -2, 12, 7, "#3B2A20"); R(2, -1, 10, 5, "#9ED3F0"); R(2, 2, 10, 2, "#BFE3F5"); R(7, -1, 1, 5, "#3B2A20"); R(2, -1, 3, 1, "#FFFFFF");
      R(1, -3, 12, 1, "#C2306F"); for (let x = 1; x < 13; x += 2) R(x, -3, 1, 1, "#F2B8C6");
      R(30, -1, 9, 7, "#2E3A2F"); R(30, -1, 9, 1, "#8A6A3A"); R(31, 1, 4, 1, "#F5F1E6"); R(31, 3, 6, 1, "#F5F1E6"); R(36, 1, 2, 1, "#F5C842"); R(31, 5, 3, 1, "#F2B8C6");
      [[-6, -16], [16, -16], [46, -16]].forEach(([x]) => { R(x + 1, -16, 1, 9, "#2A1C14"); R(x - 1, -7, 5, 2, "#E8A23A"); R(x, -5, 3, 1, "#FFE08A"); });
      R(X0, 19, RW, 7, "#9C6B43"); for (let x = X0; x < X0 + RW; x += 5) R(x, 19, 1, 7, "#86593A"); R(X0, 19, RW, 1, "#B07E50");
      R(-12, 10, 10, 9, "#4A2E21"); R(-12, 10, 10, 1, "#C9A26B"); R(-10, 7, 3, 3, "#D9D9D9"); R(-9, 6, 1, 1, "#9AA3AD"); R(-6, 8, 2, 2, "#FFFFFF"); R(-5, 7, 1, 1, "#C9A26B");
    } else if (roomId === "night") {
      R(X0, Y0, RW, RH, "#1B2350"); R(X0, 10, RW, 9, "#232E66");
      [[3, 2], [9, 5], [15, 1], [22, 4], [27, 2], [35, 6], [6, 9], [18, 8], [31, 10], [12, 12], [37, 13], [2, 14], [-6, 3], [-11, -8], [-3, -13], [7, -5], [19, -11], [28, -6], [44, -9], [50, 2], [46, 12], [-9, 15], [52, -14], [38, -2]].forEach(([x, y]) => R(x, y, 1, 1, "#FFFFFF"));
      R(31, 2, 4, 4, "#FFF3C4"); R(33, 2, 2, 2, "#1B2350"); R(X0, 19, RW, 7, "#2A3A5A"); R(X0, 19, RW, 1, "#3B4F78");
    } else if (roomId === "rainbow") {
      R(X0, Y0, RW, RH, "#CDEBFF"); const C = ["#F2716B", "#F9A35C", "#F9D25C", "#6FD39A", "#6FB6F2", "#B48CF0"];
      for (let y = Y0; y < 19; y++) for (let x = X0; x < X0 + RW; x++) { const d = Math.hypot(x - 19.5, (y - 21) * 1.15); const i = Math.floor((19 - d) / 1.6); if (i >= 0 && i < C.length) R(x, y, 1, 1, C[i]); }
      [[-10, -10], [44, -12], [-4, -4], [48, 6]].forEach(([x, y]) => { R(x, y, 6, 2, "#FFFFFF"); R(x + 1, y - 1, 3, 1, "#FFFFFF"); });
      R(X0, 19, RW, 7, "#7ED07E"); R(X0, 19, RW, 1, "#9BE09B");
    } else {
      R(X0, Y0, RW, RH, "var(--bd-sky)"); R(X0, 20, RW, 6, "var(--bd-grass)"); R(X0, 20, RW, 1, "var(--bd-grass2)");
      [[-10, -9], [42, -12], [24, -6]].forEach(([x, y]) => { R(x, y, 6, 2, "color-mix(in srgb,var(--bd-sky) 40%,#fff)"); R(x + 1, y - 1, 3, 1, "color-mix(in srgb,var(--bd-sky) 40%,#fff)"); });
    }
    const T = { mug: [9, 23, [".s.s..", "s.s...", "wwwww.", "wkkkww", "wwwww.w", "wwwwww.", ".www.."], { w: "#F4F1EA", k: "#6B4226", s: "#C9D3E0" }], bell: [12, 1, ["...k...", "...k...", "..yyy..", ".ywyyy.", ".yyyyy.", "yyyyyyy", "...o..."], { k: "#8A6A3A", y: "#E8B931", w: "#FFF3A0", o: "#B8860B" }], globe: [3, 1, ["...w...", "..bbb..", ".bggbb.", "bbgbbgb", "bgggbbb", ".bbggb.", "..bbb..", "...k...", "..kkk.."], { b: "#4A90E2", g: "#58C26B", k: "#8A6A3A", w: "#FFF3A0" }], hourglass: [30, 1, ["....w....", ".yyyyyyy.", "..vcccv..", "...vsv...", "w...s...w", "...vcv...", "..vsssv..", ".yyyyyyy.", "....w...."], { y: "#E8B931", v: "#9B6BFF", c: "#CDEFFF", s: "#FF8AD8", w: "#FFF3A0" }], ball: [3, 21, [".rr.", "rwrr", "rrwr", ".rr."], { r: "#E5533D", w: "#FFFFFF" }], book: [31, 22, ["bbbbb", "bwwwb", "bbbbb"], { b: "#3B6FD9", w: "#FFFFFF" }],
      plant: [34, 14, ["g.g.", ".gg.", "gggg", ".gg.", "oooo", ".oo."], { g: "#3BA776", o: "#C0673A" }], lamp: [1, 11, ["yyyy", "yyyy", ".kk.", ".k..", ".k..", ".k..", ".k..", "kkk."], { y: "#F9D25C", k: "#4A3A2A" }],
      trophy: [28, 19, ["yyyyy", "yyyyy", ".yyy.", "..y..", ".kkk."], { y: "#F5C842", k: "#7A5A3A" }],
      dbanner: [36, 3, ["k....", "krrrr", "krwrr", "krrrr", "k.rr.", "k....", "k....", "k...."], { k: "#5A4632", r: "#C2306F", w: "#F5C842" }],
      sword: [24, 18, ["....w", "...s.", "..s..", "hs...", ".h..."], { w: "#FFFFFF", s: "#C9A26B", h: "#7A5A3A" }],
      shield: [20, 20, ["bbbbb", "bybyb", "bbybb", ".bbb.", "..b.."], { b: "#3B6FD9", y: "#F5C842" }],
      armour: [-6, 12, [".sss.", "sSsSs", ".sss.", "sssss", ".s.s.", ".s.s.", "kkkkk"], { s: "#C3CCD6", S: "#7D8894", k: "#5A4632" }] };
    toys.forEach(t => { const d = T[t]; if (!d) return; const at = (S.tp && S.tp[t]) || [d[0], d[1]]; r += `<g class="bd-toy" data-toyg="${t}"><rect x="${at[0] - .5}" y="${at[1] - .5}" width="${d[2][0].length + 1}" height="${d[2].length + 1}" fill="transparent"/>`; d[2].forEach((row, dy) => [...row].forEach((ch, dx) => { if (d[3][ch]) R(at[0] + dx, at[1] + dy, 1, 1, d[3][ch]); })); r += `</g>`; });
    return r;
  }
  function gardenSVG() {
    const days = (S.gd || []).slice(-38), C = ["#F37BA5", "#F5C842", "#E5533D", "#8E5CD9", "#6FB6F2", "#FFFFFF", "#F59A2E"]; let r = "";
    days.forEach((day, i) => {
      let h = 0; for (const ch of day) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
      const x = i < 19 ? 1 + i * 2 : 2 + (i - 19) * 2, tall = i < 19 ? 0 : 1;
      r += `<rect x="${x}" y="${24 - tall}" width="1" height="${2 + tall}" fill="#3BA776"/><rect x="${x}" y="${23 - tall}" width="1" height="1" fill="${C[h % C.length]}"/>`;
      if (h % 3 === 0) r += `<rect x="${x + (i < 19 ? 1 : -1)}" y="${25}" width="1" height="1" fill="#2A7D54"/>`;
    });
    return r;
  }
  function markStudy() { const d = today(); if (!Array.isArray(S.gd)) S.gd = []; if (S.gd[S.gd.length - 1] === d || S.gd.includes(d)) return false; S.gd.push(d); save(); return true; }
  /* zoom: 0 = closer, 1 = normal, 2 and 3 = see more of the room (kept on this device) */
  const ZW = [30, 40, 52, 64];
  let zoom = 1; try { const zr = localStorage.getItem("cs-bd-zoom"), z = +zr; if (zr !== null && zr !== "" && z >= 0 && z < ZW.length) zoom = z; } catch (e) {}
  /* zoomed in: centred on the buddy's face (about y = 12); zoomed out: floor stays at the bottom */
  function zoomBox() { const w = ZW[zoom], h = w * 26 / 40; return `${20 - w / 2} ${Math.min(26 - h, 12 - h / 2)} ${w} ${h}`; }
  function stageSVG(opts) {
    opts = opts || {};
    const toys = ITEMS.filter(i => i.slot === "toy" && isOpen(i) && !(S.toyOff || []).includes(i.id)).map(i => i.id);
    const room = opts.room !== undefined ? opts.room : S.room;
    return `<svg class="bd-stage-svg" viewBox="${opts.plain ? "0 0 40 26" : zoomBox()}" shape-rendering="crispEdges" role="img" aria-label="${esc(nameOf())}">${roomSVG(room, toys)}<g class="bd-stg-pet" id="${opts.plain ? "" : "bdStgPet"}">${rects(drawPet(opts), 10, 0)}</g>${opts.plain ? "" : gardenSVG()}</svg>`;
  }

  if (window.__bdRender) { window.csBuddyArt = { svg: petSVG, sprites: SP, palFor: (a, c) => Object.assign({}, SP[a].p, ((SP[a].colors[c | 0] || SP[a].colors[0])[1])), LV: [0, 20, 50, 100, 170, 260, 380, 530, 720, 950] }; return; }
  /* ---------- styles ---------- */
  const css = `
.bd{position:fixed;right:calc(18px + env(safe-area-inset-right,0px));bottom:calc(78px + env(safe-area-inset-bottom,0px));z-index:14;display:flex;align-items:flex-end;gap:8px;pointer-events:none}
.bd[hidden]{display:none}
html.cs-focus .bd,html.cs-focus .bd-mini{display:none!important}
@media print{.bd,.bd-mini,.bd-modal,.bd-back{display:none!important}}
.bd-pet{all:unset;pointer-events:auto;cursor:pointer;display:block;width:84px;height:92px;position:relative;filter:drop-shadow(0 3px 0 rgba(0,0,0,.12));-webkit-tap-highlight-color:transparent}
.bd-pet:focus-visible{outline:3px solid var(--bright,#5BD38E);outline-offset:3px;border-radius:12px}
.bd-svg{width:100%;height:100%;display:block;image-rendering:pixelated}
.bd-pet .bd-svg{animation:bdBob 1.6s steps(1) infinite}
@keyframes bdBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.bd-pet.hop .bd-svg{animation:bdHop .45s steps(2) 2}
@keyframes bdHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.bd-pet.walk .bd-svg{animation:bdWalk .6s steps(3) 1}
@keyframes bdWalk{0%{transform:translateX(18px)}100%{transform:translateX(0)}}
.bd-pet.sleep .bd-svg{animation:none}
.bd-z{position:absolute;top:-6px;right:-2px;font:800 14px var(--body,sans-serif);color:var(--muted,#888);animation:bdZ 2.4s ease-in-out infinite;pointer-events:none}
@keyframes bdZ{0%{opacity:0;transform:translate(0,6px)}40%{opacity:1}100%{opacity:0;transform:translate(8px,-10px)}}
.bd-fx{position:absolute;pointer-events:none;font-size:18px;animation:bdFloat 1.2s ease-out forwards}
@keyframes bdFloat{from{opacity:1;transform:translateY(0) scale(.8)}to{opacity:0;transform:translateY(-44px) scale(1.15)}}
.bd-shiny::after{content:"✦";position:absolute;top:2px;left:4px;color:#F9D25C;font-size:12px;animation:bdTw 1.8s ease-in-out infinite;pointer-events:none;text-shadow:0 0 4px #fff}
.bd-shiny::before{content:"✦";position:absolute;bottom:14px;right:2px;color:#B7E4FF;font-size:10px;animation:bdTw 1.8s ease-in-out .9s infinite;pointer-events:none;text-shadow:0 0 4px #fff}
@keyframes bdTw{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.1)}}
.bd-bub{pointer-events:auto;background:var(--surface,#fff);color:var(--ink,#222);border:1.5px solid var(--line,#ddd);border-radius:14px 14px 4px 14px;box-shadow:0 8px 24px rgba(0,0,0,.14);padding:9px 11px;font:600 13.5px/1.4 var(--body,sans-serif);max-width:270px;margin-bottom:34px}
.bd-bub[hidden]{display:none}
.bd-bub .bd-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;align-items:center}
.bd-acts-l{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.bd-bub .bd-tuck{margin-left:auto;padding:6px 9px}
.bd-b small{font-size:11px;opacity:.8;font-weight:700}
.bd-gear{all:unset;cursor:pointer;font-size:15px;line-height:1;padding:3px 5px;border-radius:8px}.bd-gear:hover,.bd-gear:focus-visible{background:color-mix(in srgb,var(--green,#2E8B57) 18%,transparent);outline:none}
.bd-ic-nm{display:inline-flex;align-items:center;gap:4px}
.park-scene{position:absolute;left:10px;top:10px;z-index:7}.park-scene select{height:36px;border-radius:10px;border:1.5px solid var(--line,#ddd);background:var(--surface,#fff);color:var(--ink,#111);font:700 14px var(--body,sans-serif);padding:0 8px;box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer;width:auto}
.park-world.sc-day{background:radial-gradient(ellipse 34% 30% at 50% 52%,color-mix(in srgb,#F5C842 22%,#9BD88A) 0 98%,transparent 100%),linear-gradient(180deg,#BFE6FF 0 14%,#9BD88A 14% 100%)!important}
.park-world.sc-night{background:radial-gradient(ellipse 34% 30% at 50% 52%,#3E6B3A 0 98%,transparent 100%),linear-gradient(180deg,#151F42 0 14%,#2E5230 14% 100%)!important}
.park-world.sc-beach{background:radial-gradient(ellipse 34% 30% at 50% 52%,#7FD3E8 0 98%,transparent 100%),linear-gradient(180deg,#9FDBFF 0 14%,#F3DDA4 14% 100%)!important}
.park-world.sc-forest{background:radial-gradient(ellipse 34% 30% at 50% 52%,#5E8F4E 0 98%,transparent 100%),linear-gradient(180deg,#2F5D3A 0 14%,#3F6E3C 14% 100%)!important}
.park-world.sc-snow{background:radial-gradient(ellipse 34% 30% at 50% 52%,#BFE3F2 0 98%,transparent 100%),linear-gradient(180deg,#C9D8E8 0 14%,#F4F8FC 14% 100%)!important}
.park-world.sc-sunset{background:radial-gradient(ellipse 34% 30% at 50% 52%,color-mix(in srgb,#F5A142 30%,#8CC07A) 0 98%,transparent 100%),linear-gradient(180deg,#F59E7A 0 7%,#C47AA8 14%,#86B86F 14% 100%)!important}
.duel-board{margin:18px 0 0;padding:16px 18px;border-radius:18px;border:1.5px solid color-mix(in srgb,#C2306F 40%,var(--line,#ddd));background:linear-gradient(135deg,color-mix(in srgb,#C2306F 9%,var(--surface,#fff)),color-mix(in srgb,#F5C842 8%,var(--surface,#fff)))}
.duel-board[hidden]{display:none}
.duel-h{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:10px 12px}.duel-h h2{margin:0 4px 0 0;font-size:22px}.duel-h .duel-stats{margin:0}#duelBoard .duel-h h2{margin:0 4px 0 0}#parkLegend.park-legend{margin:8px 2px 0}.duel-sub{margin:10px 0 6px;font-size:13.5px;font-weight:700;color:var(--muted,#666)}.duel-rec{font-size:14px;color:var(--muted,#666);flex:1}
.duel-stats{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 4px}.duel-stats span{font-size:13.5px;padding:4px 12px;border-radius:99px;background:var(--surface,#fff);border:1px solid var(--line,#ddd);color:var(--muted,#666)}.duel-stats b{color:var(--ink,#111);font-size:15px}
.duel-gh{margin:16px 0 0;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted,#666)}.duel-gh small{text-transform:none;letter-spacing:0;font-weight:600;margin-left:6px}
.duel-gearg{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px}
.dgt{display:flex;flex-direction:column;align-items:center;gap:2px;text-align:center;padding:10px 6px;border-radius:12px;background:var(--surface,#fff);border:1px solid var(--line,#ddd);opacity:.55}
.dgt.on{opacity:1;border-color:color-mix(in srgb,#F5C842 55%,var(--line,#ddd))}.dgt .dgi{font-size:22px;line-height:1.2}.dgt b{font-size:13px}.dgt small{font-size:11.5px;color:var(--muted,#666);line-height:1.25}
.duel-board h3{margin:14px 0 6px;font-size:15px}
.duel-card{padding:10px 12px;border-radius:14px;background:var(--surface,#fff);border:1.5px solid var(--line,#ddd);margin:6px 0;font-size:14.5px}
.duel-card.inc{border-color:#C2306F}.duel-card.mine{border-color:var(--green,#2E8B57)}
.duel-t{margin-bottom:4px}.duel-row{display:grid;grid-template-columns:minmax(60px,110px) 1fr 30px;gap:8px;align-items:center;font-size:14px}
.duel-bar{height:9px;border-radius:99px;background:var(--surface-2,#eee);overflow:hidden}.duel-bar i{display:block;height:100%;background:linear-gradient(90deg,#C2306F,#F5C842);border-radius:99px}
.duel-done{margin:0;padding-left:18px;font-size:14px}.duel-done li{margin:3px 0}
.duel-gear{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:12px}.dg{font-size:12.5px;font-weight:700;padding:3px 9px;border-radius:99px;background:var(--surface-2,#eee);opacity:.6}.dg.on{opacity:1;background:color-mix(in srgb,#F5C842 30%,var(--surface,#fff))}
.duel-pick{display:flex;flex-direction:column;gap:6px}.duel-opt{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:12px;border:1.5px solid var(--line,#ddd);cursor:pointer}
.duel-opt:has(input:checked){border-color:#C2306F;background:color-mix(in srgb,#C2306F 8%,transparent)}.duel-opt span{display:flex;flex-direction:column;gap:2px}.duel-opt small{color:var(--muted,#666);font-size:13px}
.park-b .pinfo .pi-1,.park-b .pinfo .pi-2{display:block}.park-b .pinfo .pi-1 small{font-weight:600;opacity:.7}.park-b .pinfo .pi-3{display:flex;gap:8px;justify-content:center}.park-b .pinfo .pi-3:empty{display:none}.park-b .pinfo .pi-3 .pb-feed{margin-top:6px}
.pb-duel{background:linear-gradient(90deg,#C2306F,#E58A2E)!important;color:#fff!important}
.bd-bub .bd-msg+.bd-acts{margin-top:8px}
.bd-b{all:unset;box-sizing:border-box;cursor:pointer;font:800 13px var(--body,sans-serif);padding:6px 10px;border-radius:999px;border:1.5px solid var(--line,#ddd);background:var(--surface-2,var(--surface,#fff));color:var(--ink,#222);white-space:nowrap}
.bd-b:hover{border-color:var(--green,#2E8B57)}
.bd-b:focus-visible{outline:3px solid var(--bright,#5BD38E)}
.bd-b.go{background:var(--green,#2E8B57);border-color:var(--green,#2E8B57);color:#fff}
.bd-b[disabled]{opacity:.45;cursor:not-allowed}
.bd-mini{all:unset;position:fixed;right:calc(24px + env(safe-area-inset-right,0px));bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:14;cursor:pointer;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:17px;background:var(--surface,#fff);border:1.5px solid var(--line,#ddd);box-shadow:0 4px 12px rgba(0,0,0,.12)}
.bd-mini[hidden]{display:none}
.bd-tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.bd-tile{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:2px;padding:12px;border-radius:14px;border:1.5px solid var(--line,#ddd);background:var(--surface-2,#f6f6f6);transition:transform .12s,border-color .12s}
.bd-tile:hover{transform:translateY(-2px);border-color:var(--bright,#4a8)}
.bd-tile:focus-visible{outline:3px solid var(--bright,#4a8);outline-offset:2px}
.bd-tile b{font-size:15px}
.bd-tile>span:last-child{font-size:12px;color:var(--muted,#777)}
.bd-tile-ico{font-size:22px;line-height:1.1}
.bd-tiles .bd-tile:last-child:nth-child(odd){grid-column:1/-1}
.bd-lv{margin-top:12px;font-size:13px}
.bd-lv .bd-bar{margin-top:5px}
.bd-earn{margin:4px 0 8px;padding-left:18px;font-size:13px}
.bd-earn li{margin:3px 0}
.bd-set{align-items:center;gap:8px;font-size:14px;cursor:pointer;margin-bottom:10px}
.bd-animal.locked{opacity:.55;cursor:pointer}
.bd-flash{animation:bdFlash .8s}
@keyframes bdFlash{0%,100%{background:transparent}30%{background:rgba(255,200,0,.25)}}
.bd-err{margin:8px 0;padding:10px 12px;border-radius:12px;background:rgba(229,83,61,.15);border:1.5px solid #E5533D;font-size:14px}
.bd-confirm{position:sticky;bottom:0;margin:12px -4px 0;padding:14px;border-radius:14px;background:var(--surface,#fff);border:2px solid #E0A100;box-shadow:0 -6px 20px rgba(0,0,0,.25)}
.bd-confirm p{margin:0 0 10px;font-size:14px}
.bd-back{position:fixed;inset:0;background:rgba(10,14,30,.45);z-index:60}
.bd-back[hidden],.bd-modal[hidden]{display:none}
.bd-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:61;width:min(460px,calc(100vw - 24px));max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:auto;background:var(--surface,#fff);color:var(--ink,#222);border:1.5px solid var(--line,#ddd);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.3);padding:16px 16px 18px;font-family:var(--body,sans-serif)}
.bd-modal h3{margin:0;font:800 19px var(--display,var(--body,sans-serif))}
.bd-modal h4{margin:16px 0 8px;font:700 11px var(--mono,monospace);letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#777)}
.bd-top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.bd-x{all:unset;cursor:pointer;font-size:24px;line-height:1;padding:2px 8px;border-radius:8px;color:var(--muted,#777)}
.bd-x:focus-visible{outline:3px solid var(--bright,#5BD38E)}
.bd-stage{margin:12px auto 10px;max-width:340px;border-radius:14px;overflow:hidden;border:1.5px solid var(--line,#ddd);position:relative;--bd-sky:color-mix(in srgb,var(--green,#2E8B57) 8%,var(--surface,#fff));--bd-grass:color-mix(in srgb,var(--green,#2E8B57) 30%,var(--surface,#fff));--bd-grass2:color-mix(in srgb,var(--green,#2E8B57) 45%,var(--surface,#fff))}
.bd-stage .bd-stg-pet{animation:bdBobS 1.6s steps(1) infinite}
@keyframes bdBobS{0%,100%{transform:translateY(0)}50%{transform:translateY(-.6px)}}
.bd-stage.hop .bd-stg-pet{animation:bdHopS .45s steps(2) 2}
@keyframes bdHopS{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}
.bd-stage .bd-fx{font-size:22px}
html.cs-calm .bd-stage .bd-stg-pet{animation:none}
.bd-sw button.locked{opacity:.55;font-size:11px;line-height:1;cursor:pointer}
.bd-sw button.pv,.bd-chip.pv{outline:2.5px dashed var(--ink,#222);outline-offset:2px;opacity:1}
.bd-chip.locked{opacity:.6}
.bd-pv{position:absolute;left:6px;right:6px;bottom:6px;display:flex;align-items:center;gap:8px;padding:6px 8px 6px 6px;border-radius:10px;font-size:12.5px;line-height:1.35;color:#fff;background:rgba(15,20,30,.78);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);pointer-events:auto;animation:bdPvIn .18s ease-out}
.bd-pv b{color:#FFE08A}
.bd-pv-tag{flex:none;font-weight:800;font-size:11.5px;padding:3px 7px;border-radius:999px;background:#F5B800;color:#2a1d00;white-space:nowrap}
.bd-pv-txt{flex:1;min-width:0}
.bd-pv-x{flex:none;all:unset;cursor:pointer;width:24px;height:24px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.16);font-size:12px}
.bd-pv-x:hover,.bd-pv-x:focus-visible{background:rgba(255,255,255,.3)}
@keyframes bdPvIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
html.cs-calm .bd-pv{animation:none}
/* study music: your buddy in its room with a record player */
.music-play.ms-has{display:flex!important;flex-direction:column;align-items:stretch;gap:0;padding:0!important;overflow:hidden;border-radius:16px!important;width:100%}
.ms-scene{display:block;position:relative;line-height:0;--bd-sky:color-mix(in srgb,var(--green,#2E8B57) 8%,var(--surface,#fff));--bd-grass:color-mix(in srgb,var(--green,#2E8B57) 24%,var(--surface,#fff));--bd-grass2:color-mix(in srgb,var(--green,#2E8B57) 38%,var(--surface,#fff))}
.ms-scene svg{display:block;width:100%;height:auto;image-rendering:pixelated}
.ms-cap{display:flex;align-items:center;justify-content:center;gap:8px;padding:9px 12px;font-weight:800}
.ms-scene .ms-pet{animation:msBreathe 3.2s steps(1) infinite}
.ms-scene .ms-blink{opacity:0;animation:msBlink 5s steps(1) infinite}
.ms-scene .ms-disc2,.ms-scene .ms-note{display:none}
.ms-scene .ms-arm-on{display:none}
.ms-on .ms-pet{animation:msNod .5s steps(1) infinite}
.ms-music .ms-disc1{animation:msSpinA .6s steps(1) infinite}.ms-music .ms-disc2{display:inline;animation:msSpinB .6s steps(1) infinite}
.ms-music .ms-arm-off{display:none}.ms-music .ms-arm-on{display:inline}
.ms-music .ms-note{display:inline;animation:msNote 2.4s linear infinite}
.ms-music .ms-note.n2{animation-delay:.8s}.ms-music .ms-note.n3{animation-delay:1.6s}
.ms-scene .ms-wave{opacity:0}.ms-scene .ms-led{opacity:.35}
.ms-noise .ms-wave{animation:msWave 1.4s ease-in-out infinite}.ms-noise .ms-wave.w2{animation-delay:.35s}.ms-noise .ms-led{opacity:1}
@keyframes msWave{0%,100%{opacity:0}40%{opacity:.85}}
.ms-on .ms-lamp{fill:#FFE08A}
@keyframes msBreathe{0%,70%{transform:none}71%,100%{transform:translateY(.4px)}}
@keyframes msBlink{0%,94%{opacity:0}95%,100%{opacity:1}}
@keyframes msNod{0%,49%{transform:none}50%,100%{transform:translateY(.6px)}}
@keyframes msSpinA{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes msSpinB{0%,49%{opacity:0}50%,100%{opacity:1}}
@keyframes msNote{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(-3px,-9px);opacity:0}}
html.cs-calm .ms-scene *{animation:none!important}html.cs-calm .ms-music .ms-disc2,html.cs-calm .ms-music .ms-note{display:none}html.cs-calm .ms-noise .ms-wave{opacity:.6}
.ms-scene .ms-rain{animation:msRain .7s linear infinite}.ms-scene .ms-rain.r1{animation-delay:-.35s}
.ms-scene .ms-steam{animation:msSteam 2.6s ease-in-out infinite}
.ms-on .ms-fl{animation:msTw 1.6s steps(1) infinite}.ms-on .ms-fl:nth-of-type(2n){animation-delay:.8s}
@keyframes msRain{from{transform:translate(0,0)}to{transform:translate(-1px,12px)}}
@keyframes msSteam{0%{transform:translateY(0);opacity:.2}50%{opacity:.6}100%{transform:translateY(-2px);opacity:0}}
@keyframes msTw{0%,49%{opacity:1}50%,100%{opacity:.45}}
.ms-tip{font-size:12.5px;color:var(--muted,#667);padding:0 12px 8px;line-height:1.35;font-weight:600}
.bd-stage-svg{display:block;width:100%;height:auto;image-rendering:pixelated;cursor:default;touch-action:none}#bdStgPet{cursor:pointer}
.bd-stage-wrap{position:relative;max-width:340px;margin:12px auto 10px}.bd-stage-wrap .bd-stage{margin:0}
.bd-zoom{position:absolute;right:6px;top:6px;display:flex;flex-direction:column;gap:4px}
.bd-zoom button{all:unset;box-sizing:border-box;cursor:pointer;width:26px;height:26px;display:grid;place-items:center;border-radius:8px;background:color-mix(in srgb,var(--surface,#fff) 85%,transparent);border:1px solid var(--line,#ddd);font:800 15px var(--body,sans-serif);color:var(--ink,#222)}
.bd-zoom button:disabled{opacity:.35;cursor:default}
.bd-toy{cursor:grab}.bd-toy.dragging{cursor:grabbing;opacity:.85}
.bd-moving .bd-stage-svg{cursor:crosshair;outline:2px dashed var(--green,#2E8B57);outline-offset:-2px}
.bd-movehint{margin:0 0 8px;text-align:center}
.bd-topr{display:flex;align-items:center;gap:2px}.bd-set-ico{font-size:18px;padding:4px 7px}
.bd-name{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.bd-name input{font:800 17px var(--body,sans-serif);color:var(--ink,#222);background:transparent;border:1.5px dashed var(--line,#ddd);border-radius:10px;padding:5px 9px;width:12ch;min-width:0}
.bd-treats{font:800 14px var(--body,sans-serif);white-space:nowrap}
.bd-name{flex-direction:column;justify-content:center;gap:6px;margin-top:8px}
.bd-name input{text-align:center}
.bd-name + .bd-row{justify-content:center}
.bd-row{display:flex;flex-wrap:wrap;gap:6px}
.bd-chip{all:unset;box-sizing:border-box;cursor:pointer;font:700 13px var(--body,sans-serif);padding:6px 10px;border-radius:999px;border:1.5px solid var(--line,#ddd);background:var(--surface,#fff);color:var(--ink,#222);display:inline-flex;align-items:center;gap:5px}
.bd-chip[aria-pressed="true"]{border-color:var(--green,#2E8B57);background:color-mix(in srgb,var(--green,#2E8B57) 16%,var(--surface,#fff))}
.bd-chip[disabled]{cursor:default;opacity:.5}
.bd-chip:focus-visible{outline:3px solid var(--bright,#5BD38E)}
.bd-chip .bd-new{font:800 9.5px var(--mono,monospace);background:#E5533D;color:#fff;border-radius:6px;padding:1px 4px}
.bd-small{font-size:12.5px;color:var(--muted,#777);margin:6px 0 0;line-height:1.45}
.bd-prog{margin:4px 0 2px;font-size:13.5px}
.bd-bar{height:9px;border-radius:9px;background:var(--line,#ddd);overflow:hidden;margin:5px 0 8px}
.bd-bar i{display:block;height:100%;background:var(--green,#2E8B57);border-radius:9px}
.bd-animals{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:6px}
.bd-animal{all:unset;box-sizing:border-box;cursor:pointer;border:1.5px solid var(--line,#ddd);border-radius:12px;padding:4px 2px 5px;text-align:center;font:700 11.5px var(--body,sans-serif);color:var(--ink,#222)}
.bd-animal svg{width:48px;height:52px;display:block;margin:0 auto}
.bd-animal[aria-pressed="true"]{border-color:var(--green,#2E8B57);background:color-mix(in srgb,var(--green,#2E8B57) 14%,var(--surface,#fff))}
.bd-animal:focus-visible{outline:3px solid var(--bright,#5BD38E)}
.bd-sw{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px;align-items:center}
.bd-sw button{width:26px;height:26px;border-radius:50%;border:2px solid var(--line,#ddd);padding:0;cursor:pointer}
.bd-sw button[aria-pressed="true"]{outline:2.5px solid var(--ink,#222);outline-offset:2px}
.bd-sw span{font-size:12.5px;color:var(--muted,#777);margin-left:4px}
.bd-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;margin-top:18px;padding-top:12px;border-top:1px dashed var(--line,#ddd)}
.bd-foot .bd-link{all:unset;cursor:pointer;font-size:13px;color:var(--muted,#777);text-decoration:underline}
.bd-pet.bd-yawn .bd-svg{animation:bdYawn 1.4s steps(4) 1;transform-origin:50% 100%}
@keyframes bdYawn{0%,100%{transform:scale(1,1)}30%{transform:scale(1.06,.94)}60%{transform:scale(.95,1.07)}}
.bd-pet.bd-look .bd-svg{animation:bdLook 2.2s steps(1) 1}
@keyframes bdLook{0%,100%{transform:scaleX(1)}25%{transform:translateX(-3px)}50%{transform:scaleX(-1)}75%{transform:scaleX(-1) translateX(-3px)}}
.bd-pet.bd-spin .bd-svg{animation:bdSpin .9s steps(6) 1}
@keyframes bdSpin{0%{transform:scaleX(1)}25%{transform:scaleX(0) translateY(-6px)}50%{transform:scaleX(-1) translateY(-10px)}75%{transform:scaleX(0) translateY(-6px)}100%{transform:scaleX(1)}}
.bd-pet.bd-dance .bd-svg{animation:bdDance 1.3s steps(1) 1}
@keyframes bdDance{0%,100%{transform:rotate(0)}16%{transform:rotate(-10deg) translateY(-4px)}33%{transform:rotate(10deg)}50%{transform:rotate(-10deg) translateY(-4px)}66%{transform:rotate(10deg)}83%{transform:translateY(-6px)}}
.bd-prop{position:absolute;pointer-events:none;font-size:16px;line-height:1}
.bd-yawntxt{top:-10px;left:50%;transform:translateX(-50%);font:700 11px var(--body,sans-serif);color:var(--muted,#888);white-space:nowrap}
.bd-fly{top:-20px;left:-60px;animation:bdFly 4.2s ease-in-out forwards}
@keyframes bdFly{0%{transform:translate(0,10px)}25%{transform:translate(40px,-14px)}50%{transform:translate(70px,6px)}75%{transform:translate(100px,-18px)}100%{transform:translate(150px,-40px);opacity:0}}
.bd-ball{bottom:0;left:-40px;animation:bdBall 2.4s ease-out forwards}
@keyframes bdBall{0%{transform:translate(0,0)}20%{transform:translate(14px,-22px)}40%{transform:translate(28px,0)}60%{transform:translate(38px,-10px)}80%{transform:translate(46px,0)}100%{transform:translate(50px,0);opacity:0}}
.bd-book{bottom:6px;left:-14px;font-size:18px;animation:bdRead 2s steps(2) infinite}
@keyframes bdRead{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
.bd-note,.bd-note2{top:0;right:-6px;animation:bdFloat 2.6s ease-out forwards}
.bd-note2{right:auto;left:-4px}
.bd-hearts{letter-spacing:-2px;font-size:13px}
.bd-pet.bd-nervous .bd-svg{animation:bdNerv .65s steps(2) 2}
@keyframes bdNerv{0%,100%{transform:translateX(0)}50%{transform:translateX(-2px)}}
.bd-sweat{top:8px;right:4px;font-size:13px;animation:bdSweat 1.6s ease-in forwards}
@keyframes bdSweat{from{transform:translateY(0);opacity:1}to{transform:translateY(14px);opacity:0}}
.bd-stbub{position:absolute;left:6px;top:6px;max-width:46%;background:color-mix(in srgb,var(--surface,#fff) 82%,transparent);color:var(--ink,#222);border:1px solid var(--line,#ddd);border-radius:12px 12px 12px 3px;padding:5px 9px;font:700 12px/1.35 var(--body,sans-serif);box-shadow:0 4px 12px rgba(0,0,0,.15);text-align:left;pointer-events:none;backdrop-filter:blur(2px);transform-origin:bottom right}
.bd-stbub.in{animation:bdSay .22s ease-out}@keyframes bdSay{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.bd-stbub.in{animation:none}}
.bd-stbub[hidden]{display:none}
@keyframes bdPop{from{opacity:0;transform:translate(-50%,6px)}to{opacity:1;transform:translate(-50%,0)}}
html.cs-calm .bd-prop{display:none}
html.cs-calm .bd-pet .bd-svg,html.cs-calm .bd-pet.hop .bd-svg,html.cs-calm .bd-pet.walk .bd-svg{animation:none}
html.cs-calm .bd-shiny::before,html.cs-calm .bd-shiny::after{animation:none;opacity:.8}
html.cs-calm .bd-z{animation:none;opacity:.8}
@media (prefers-reduced-motion:reduce){.bd-pet .bd-svg,.bd-pet.hop .bd-svg,.bd-pet.walk .bd-svg{animation:none}}
.bd.dragging{transform:translate(var(--dx,0),var(--dy,0));transition:none}.bd.dragging .bd-pet{cursor:grabbing;filter:drop-shadow(0 10px 8px rgba(0,0,0,.3))}
.bd.at-bl,.bd.at-ml{right:auto;left:calc(18px + env(safe-area-inset-left,0px));flex-direction:row-reverse}
.bd.at-mr,.bd.at-ml{bottom:42vh}
.bd.at-tr{bottom:auto;top:calc(86px + env(safe-area-inset-top,0px));align-items:flex-start}
@media (min-width:901px){.bd.at-bl,.bd.at-ml{left:calc(max(0px,(100vw - 1280px) / 2) + 262px)}}
.bd-ic{margin:-2px 0 8px;padding-bottom:8px;border-bottom:1px solid var(--line,#ddd)}
.bd-ic-top{display:flex;justify-content:space-between;gap:10px;align-items:center}
.bd-ic-top span{font-size:12px;opacity:.8}
.bd-ic .bd-bar{margin:5px 0 4px}
.bd-ic-sub{font-size:12px;opacity:.8}
@media (max-width:640px){.bd.at-bl,.bd.at-ml{left:calc(12px + env(safe-area-inset-left,0px))}.bd{bottom:calc(74px + env(safe-area-inset-bottom,0px));right:calc(12px + env(safe-area-inset-right,0px))}.bd-pet{width:64px;height:70px}.bd-bub{max-width:min(260px,calc(100vw - 100px));margin-bottom:28px}}
`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- corner widget ---------- */
  const root = document.createElement("div"); root.className = "bd"; root.id = "buddy"; root.hidden = true;
  root.innerHTML = `<div class="bd-bub" id="bdBub" role="status" aria-live="polite" hidden></div><button class="bd-pet" id="bdPet" type="button"></button>`;
  const mini = document.createElement("button"); mini.className = "bd-mini"; mini.id = "bdMini"; mini.type = "button"; mini.hidden = true; mini.textContent = "🐾"; mini.setAttribute("aria-label", "Show your study buddy");
  const back = document.createElement("div"); back.className = "bd-back"; back.hidden = true;
  const modal = document.createElement("div"); modal.className = "bd-modal"; modal.id = "bdModal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-labelledby", "bdTitle"); modal.hidden = true;
  document.body.append(root, mini, back, modal);
  const petBtn = $("bdPet"), bub = $("bdBub");

  let blinkOn = false, sleeping = false, lastAct = Date.now(), bubTimer = 0;
  function paintPet() {
    if (S.on === undefined) { petBtn.innerHTML = eggSVG(); petBtn.setAttribute("aria-label", "A mystery egg. Tap it!"); petBtn.classList.remove("bd-shiny"); return; }
    petBtn.innerHTML = petSVG({ blink: blinkOn || sleeping }) + (sleeping ? '<span class="bd-z" aria-hidden="true">z</span>' : "");
    petBtn.setAttribute("aria-label", nameOf() + ", your study buddy. Tap to pet.");
    petBtn.classList.toggle("bd-shiny", !!S.shiny && isOpen(byId.shiny));
    petBtn.classList.toggle("sleep", sleeping);
    if (S.on === true) setFavicon(true);
  }
  let favKey = "", favOrig = null;
  function setFavicon(on) {
    let l = document.querySelector('link[rel~="icon"]');
    if (!l) { l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); }
    if (favOrig === null) favOrig = l.getAttribute("href") || "";
    if (!on) { if (favKey) { favKey = ""; l.setAttribute("href", favOrig); l.removeAttribute("type"); document.querySelectorAll('link[rel~="icon"][data-bd-off]').forEach(x => { x.setAttribute("href", x.dataset.bdOff); delete x.dataset.bdOff; }); const a = document.querySelector('link[rel="apple-touch-icon"][data-bd-orig]'); if (a) { a.setAttribute("href", a.dataset.bdOrig); delete a.dataset.bdOrig; } } return; }
    const key = [animal(), S.c | 0, S.head, S.face, S.neck, S.seas, season() && season().id].join("|"); if (key === favKey) return; favKey = key;
    const svg = petSVG().replace('<svg class="bd-svg" viewBox="0 0 20 22"', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 2.5 19 19"');
    l.setAttribute("type", "image/svg+xml"); l.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
    /* the other (PNG) icon would win in some browsers: park it while the buddy is the icon */
    document.querySelectorAll('link[rel~="icon"]').forEach(x => { if (x !== l && !x.dataset.bdOff) { x.dataset.bdOff = x.getAttribute("href") || ""; x.removeAttribute("href"); } });
    appIcon(svg);
  }
  /* iPhone "Add to Home Screen" uses this picture: the buddy on a soft blue tile */
  function appIcon(svg) {
    try {
      const img = new Image(), c = document.createElement("canvas"); c.width = c.height = 180;
      img.onload = () => { const x = c.getContext("2d"); const g = x.createLinearGradient(0, 0, 180, 180); g.addColorStop(0, "#DCE9FF"); g.addColorStop(1, "#B9D2FF"); x.fillStyle = g; x.fillRect(0, 0, 180, 180); x.imageSmoothingEnabled = false; x.drawImage(img, 18, 14, 144, 144);
        let a = document.querySelector('link[rel="apple-touch-icon"]'); if (!a) { a = document.createElement("link"); a.rel = "apple-touch-icon"; document.head.appendChild(a); }
        if (!a.dataset.bdOrig) a.dataset.bdOrig = a.getAttribute("href") || ""; a.setAttribute("href", c.toDataURL("image/png")); };
      img.src = "data:image/svg+xml," + encodeURIComponent(svg.replace("<svg ", '<svg width="180" height="180" '));
    } catch (e) {}
  }
  function visible() {
    const show = S.on === true || S.on === undefined;
    root.hidden = !show || !!S.min; mini.hidden = !(S.on === true && S.min);
    if (show) paintPet();
    setFavicon(S.on === true && !!S.a);
  }
  function fx(ch, n) {
    for (let i = 0; i < (n || 3); i++) {
      const s = document.createElement("span"); s.className = "bd-fx"; s.textContent = Array.isArray(ch) ? ch[i % ch.length] : ch;
      s.style.left = (8 + i * 16) + "px"; s.style.top = "0px"; s.style.animationDelay = (i * .13) + "s";
      petBtn.appendChild(s); setTimeout(() => s.remove(), 1500);
    }
  }
  function hop() { petBtn.classList.remove("hop", "walk"); void petBtn.offsetWidth; petBtn.classList.add("hop"); setTimeout(() => petBtn.classList.remove("hop"), 1000); }
  let stTimer = 0;
  function stageSay(html, ms) {
    const st = document.getElementById("bdStage"); if (!st || modal.hidden || mode !== "main") return;
    let b = st.querySelector(".bd-stbub"); if (!b) { b = document.createElement("div"); b.className = "bd-stbub"; b.setAttribute("role", "status"); st.appendChild(b); }
    b.innerHTML = html; b.hidden = false; b.style.left = b.style.top = "6px";
    /* sit just above-left of the buddy, wherever it is at this zoom */
    const pg = document.getElementById("bdStgPet");
    if (pg) { const sr = st.getBoundingClientRect(), pr = pg.getBoundingClientRect(), bw = b.offsetWidth, bh = b.offsetHeight;
      let L = pr.left - sr.left - bw * .45, T = pr.top - sr.top - bh - 4;
      if (T < 6) { T = 6; L = pr.left - sr.left - bw - 6; }
      b.style.left = Math.round(Math.max(6, Math.min(sr.width - bw - 6, L))) + "px"; b.style.top = Math.round(Math.max(6, T)) + "px"; }
    b.classList.remove("in"); void b.offsetWidth; b.classList.add("in");
    clearTimeout(stTimer); stTimer = setTimeout(() => { b.hidden = true; }, Math.min(ms || 4000, 6000));
  }
  function say(html, acts, ms) {
    if (!modal.hidden && mode === "main") {
      /* inside the home menu the name/level card is already below the picture: only show what the buddy says, small, in a corner */
      if (html) { const t = document.createElement("div"); t.innerHTML = html; t.querySelectorAll(".bd-ic").forEach(x => x.remove()); const h = t.innerHTML.trim(); if (h) setTimeout(() => stageSay(h, ms), 0); }
      return; }
    clearTimeout(bubTimer);
    bub.innerHTML = (html ? `<div class="bd-msg">${html}</div>` : "") + (acts ? `<div class="bd-acts">${acts}</div>` : "");
    bub.hidden = false;
    if (ms !== 0) bubTimer = setTimeout(() => { bub.hidden = true; }, ms || 5000);
  }
  function hideBub() { clearTimeout(bubTimer); bub.hidden = true; }
  const petsLeft = () => Math.max(0, 5 - (S.pd && S.pd[0] === today() ? S.pd[1] : 0));
  const gearBtn = () => `<button class="bd-gear" type="button" data-bd="open" aria-label="Open ${esc(nameOf())}'s home" title="${esc(nameOf())}'s home: wardrobe, room, progress">🏠</button>`;
  /* Feed + Pet on the left, tuck away on the right. Pass gear=true when the message has no name card (the gear lives next to the name). */
  const menuActs = gear => `<span class="bd-acts-l"><button class="bd-b go" type="button" data-bd="feed">🍪 Feed (${S.t | 0})</button><button class="bd-b" type="button" data-bd="pet" title="${petsLeft() ? petsLeft() + " more pets today give friendship points" : "You can always pet, friendship points come back tomorrow"}">✋ Pet${petsLeft() ? ` (${petsLeft()})` : ""}</button>${gear ? gearBtn() : ""}</span><button class="bd-b bd-tuck" type="button" data-bd="min" aria-label="Tuck your buddy away" title="Tuck away">🐾</button>`;

  /* ---------- friendship ---------- */
  const LV = [0, 20, 50, 100, 170, 260, 380, 530, 720, 950];
  const LV_WHAT = ["Blinks, bounces and naps", "Yawns and stretches", "Dances when you save a word", "Looks around curiously", "Watches butterflies 🦋", "Plays with its ball ⚽", "Hums along to your music 🎵", "Reads its book during the study timer 📖", "Spins and does happy jumps", "Best friends 💛"];
  if (S.fp != null && !S.fpm) { S.fpm = {}; S.fpm[S.a && SP[S.a] ? S.a : "max"] = S.fp | 0; }
  const fpOf = a => TCH() ? Math.max(1000, (S.fpm && S.fpm[a || animal()]) | 0) : (S.fpm && S.fpm[a || animal()]) | 0;
  const lvlOf = p => { let l = 1; LV.forEach((t, i) => { if (p >= t) l = i + 1; }); return l; };
  const level = a => lvlOf(fpOf(a));
  function addFP(n) {
    const a = animal(), before = level(a); if (!S.fpm) S.fpm = {}; S.fpm[a] = fpOf(a) + n; save();
    const after = level(a);
    if (after > before) setTimeout(() => { hop(); fx(["💛", "✨", "💛"]); say(`💛 Friendship level <b>${after}</b> with ${esc(nameOf())}! New: ${esc(LV_WHAT[after - 1])}.`, `<button class="bd-b" type="button" data-bd="open">See ${esc(nameOf())}</button>`, 8000); if (!modal.hidden) { renderModal(); stageReact(["💛", "✨", "💛"]); } }, 1300);
  }
  const IDIOMS = [["a piece of cake", "muy fácil 🍰"], ["break the ice", "romper el hielo 🧊"], ["hit the books", "ponerse a estudiar 📚"], ["under the weather", "medio enfermo 🤒"], ["call it a day", "dar por terminado el día"], ["on the same page", "estar de acuerdo"], ["get the hang of it", "agarrarle la mano"], ["once in a blue moon", "muy de vez en cuando 🌙"], ["cost an arm and a leg", "costar un ojo de la cara"], ["take it easy", "tomárselo con calma"], ["better late than never", "más vale tarde que nunca"], ["practice makes perfect", "la práctica hace al maestro"]];
  function chatLine() {
    const l = level(), pick = a => a[Math.floor(Math.random() * a.length)];
    const opts = [() => pick(["♥", "*wiggles*", "Hi!", "Happy to study with you!"])];
    if (l >= 3) opts.push(() => pick(["You're doing great.", "One word at a time.", "Proud of you!", "Tiny steps still count."]));
    if (l >= 5) opts.push(() => { const w = (document.getElementById("twWord") || {}).textContent; return w ? `Remember <b>${esc(w)}</b>? It's today's word.` : "Did you see today's word?"; });
    if (l >= 6) opts.push(() => { let n = 0; try { const c = Date.now() - 7 * 864e5; n = JSON.parse(localStorage.getItem("ncs-words") || "[]").filter(x => x && x.t >= c).length; } catch (e) {} return n ? `You saved <b>${n}</b> ${n === 1 ? "word" : "words"} this week! 🎉` : "Let's find a new word this week?"; });
    if (l >= 7) opts.push(() => { const [e, sp] = pick(IDIOMS); return `Idiom time: <b>${esc(e)}</b> = ${esc(sp)}`; });
    if (l >= 10) opts.push(() => `Best friends forever 💛`);
    return pick(opts)();
  }
  function friendName() { const t = (document.getElementById("authWho") || {}).textContent || ""; const n = t.split(" · ")[0].trim(); return n && !n.includes("@") && n !== "You" ? n.split(/\s+/)[0] : ""; }

  /* ---------- idle animations (unlocked by friendship) ---------- */
  let lastIdle = Date.now(), propEl = null;
  function anim(cls, ms) { petBtn.classList.remove("hop", "walk", "bd-yawn", "bd-look", "bd-spin", "bd-dance"); void petBtn.offsetWidth; petBtn.classList.add(cls); setTimeout(() => petBtn.classList.remove(cls), ms || 1400); }
  function prop(ch, cls, ms) { const s = document.createElement("span"); s.className = "bd-prop " + cls; s.textContent = ch; s.setAttribute("aria-hidden", "true"); petBtn.appendChild(s); setTimeout(() => s.remove(), ms || 3000); }
  function yawn() { blinkOn = true; paintPet(); anim("bd-yawn", 1500); prop("*yawn*", "bd-yawntxt", 1500); setTimeout(() => { blinkOn = false; paintPet(); }, 1400); }
  const IDLE = [
    [2, yawn],
    [4, () => anim("bd-look", 2200)],
    [5, () => { prop("🦋", "bd-fly", 4200); setTimeout(() => anim("bd-look", 2200), 800); }],
    [6, () => { if (!isOpen(byId.ball) || (S.toyOff || []).includes("ball")) return false; prop("⚽", "bd-ball", 2400); setTimeout(hop, 500); }],
    [9, () => { anim("bd-spin", 900); setTimeout(hop, 900); }]
  ];
  function idleTick() {
    if (S.on !== true || root.hidden || document.hidden || sleeping || !bub.hidden || !modal.hidden) return;
    if (document.documentElement.classList.contains("cs-calm")) return;
    const ae = document.activeElement; if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName)) return;
    const l = level(), now = Date.now();
    // book while the study timer runs, music notes while music plays
    const timerOn = l >= 8 && ((document.getElementById("csTGo") || {}).textContent === "Pause");
    if (timerOn && !petBtn.querySelector(".bd-book")) prop("📖", "bd-book", 14000);
    const musicOn = l >= 7 && (document.getElementById("musicPlay") || { getAttribute: () => "" }).getAttribute("aria-pressed") === "true";
    if (musicOn && now - lastIdle > 9000 && Math.random() < .5) { prop("🎵", "bd-note", 2600); setTimeout(() => prop("🎶", "bd-note2", 2600), 700); lastIdle = now; return; }
    if (now - lastAct < 12000 || now - lastIdle < 35000) return;
    const opts = IDLE.filter(([n]) => l >= n);
    if (!opts.length) return;
    lastIdle = now;
    const f = opts[Math.floor(Math.random() * opts.length)][1];
    if (f() === false) yawn();
  }
  setInterval(idleTick, 5000);
  /* sometimes show a trick a few seconds after something good happens */
  function maybeTrick() { if (Math.random() < .3 && Date.now() - lastIdle > 35000) setTimeout(() => { const a = lastAct; lastAct = 0; idleTick(); lastAct = a; }, 5200); }

  /* ---------- actions ---------- */
  /* ---------- little 8-bit animal sounds (about 1 in 4 taps) ---------- */
  let sac = null;
  const sndOn = () => S.snd !== false && !document.documentElement.classList.contains("cs-calm");
  function tone(type, f0, f1, t0, dur, vol, opts) {
    opts = opts || {};
    const o = sac.createOscillator(), g = sac.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t0); if (opts.mid) o.frequency.linearRampToValueAtTime(opts.mid, t0 + dur * .45); o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t0 + dur);
    if (opts.vib) { const l = sac.createOscillator(), lg = sac.createGain(); l.frequency.value = opts.vib; lg.gain.value = opts.vd || 20; l.connect(lg).connect(o.frequency); l.start(t0); l.stop(t0 + dur + .05); }
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + .015); g.gain.setValueAtTime(vol, t0 + dur * .6); g.gain.exponentialRampToValueAtTime(.001, t0 + dur);
    let out = g;
    if (opts.trem) { const tg = sac.createGain(), l = sac.createOscillator(), lg = sac.createGain(); l.frequency.value = opts.trem; lg.gain.value = .5; tg.gain.value = .5; l.connect(lg).connect(tg.gain); l.start(t0); l.stop(t0 + dur + .05); g.connect(tg); out = tg; }
    const lp = sac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = opts.lp || 3000;
    o.connect(g); out.connect(lp).connect(sac.destination); o.start(t0); o.stop(t0 + dur + .05);
  }
  function animalSound(a, force) {
    if (!sndOn() || (!force && Math.random() > .25)) return;
    try {
      if (!sac) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; sac = new AC(); }
      if (sac.state === "suspended") sac.resume();
      const t = sac.currentTime + .02, V = .12;
      if (a === "max" || a === "miki") { const f = a === "max" ? 330 : 470; tone("square", f, f * .55, t, .12, V, { lp: 1400 }); tone("square", f * 1.05, f * .5, t + .2, .14, V, { lp: 1400 }); }
      else if (a === "cat") tone("sawtooth", 480, 420, t, .55, V * .8, { mid: 820, lp: 1800, vib: 6, vd: 15 });
      else if (a === "chicken") [0, .13, .26].forEach((d, i) => tone("square", i === 2 ? 900 : 700, 450, t + d, .09, V * .8, { lp: 2200 }));
      else if (a === "frog") { tone("square", 260, 200, t, .16, V, { trem: 40, lp: 900 }); tone("square", 300, 230, t + .22, .2, V, { trem: 40, lp: 900 }); }
      else if (a === "llama") tone("triangle", 230, 210, t, .6, V * 1.3, { mid: 260, vib: 4, vd: 6, lp: 1200 });
      else if (a === "unicorn") [1047, 1319, 1568, 2093].forEach((f, i) => tone("sine", f, f, t + i * .09, .35, V * .7, { lp: 6000 }));
      else if (a === "pudu") tone("sawtooth", 620, 540, t, .38, V * .7, { vib: 9, vd: 40, lp: 2000 });
      else if (a === "capybara") { tone("sine", 1100, 1500, t, .1, V, { lp: 5000 }); tone("sine", 1200, 1650, t + .16, .12, V, { lp: 5000 }); }
      else if (a === "axolotl") { tone("sine", 280, 900, t, .08, V * 1.2, { lp: 4000 }); tone("sine", 340, 1100, t + .14, .07, V, { lp: 4000 }); }
    } catch (e) {}
  }
  function petIt() {
    hop(); fx(["💛", "🩷", "💛"]); animalSound(animal());
    if (!S.pd || S.pd[0] !== today()) S.pd = [today(), 0];
    if (S.pd[1] < 5) { S.pd[1]++; addFP(1); }
    refreshPanel(document.activeElement && document.activeElement.dataset && document.activeElement.dataset.m === "pet" ? '[data-m="pet"]' : null, ["💛", "🩷", "💛"]);
    say(infoLine() + (Math.random() < .35 ? "" : chatLine()), menuActs(), 6500);
  }
  function infoLine() {
    const l = level(), p = fpOf(), nxt = LV[l], fed = S.fd && S.fd[0] === today() ? S.fd[1] : 0;
    const mood = fed >= FEED_PER_DAY ? "full 😋" : fed === 0 && (S.t | 0) > 0 ? "a little hungry 🍪" : "happy 😊";
    const pct = nxt ? Math.max(4, Math.round((p - LV[l - 1]) / (nxt - LV[l - 1]) * 100)) : 100;
    return `<div class="bd-ic"><div class="bd-ic-top"><span class="bd-ic-nm"><b>${esc(nameOf())}</b>${gearBtn()}</span><span>Level ${l} 💛</span></div><div class="bd-bar" aria-hidden="true"><i style="width:${pct}%"></i></div><div class="bd-ic-sub">Feeling ${mood} · 🍪 ${S.t | 0}/${MAXT}${nxt ? ` · next: ${esc(LV_WHAT[l])}` : " · best friends!"}</div></div>`;
  }
  function pvOpts(extra) {
    if (pv && pv.a) return Object.assign({ a: pv.a, pal: SP[pv.a].p, wear: {} }, extra || {});
    const o = Object.assign({ wear: { head: S.head, face: S.face, neck: S.neck } }, extra || {});
    if (pv && pv.c != null) o.pal = palIdx(animal(), pv.c);
    if (pv && pv.slot) { if (pv.slot === "room") o.room = pv.item; else o.wear = Object.assign({}, o.wear, { [pv.slot]: pv.item }); }
    return o;
  }
  function paintStagePet(blink) { const g = document.getElementById("bdStgPet"); if (g && !modal.hidden && mode === "main") g.innerHTML = rects(drawPet(pvOpts({ blink })), 10, 0); }
  function stageReact(em) {
    const st = document.getElementById("bdStage"); if (!st || modal.hidden) return;
    st.classList.remove("hop"); void st.offsetWidth; st.classList.add("hop"); setTimeout(() => st.classList.remove("hop"), 1000);
    (em || []).forEach((ch, i) => { const s = document.createElement("span"); s.className = "bd-fx"; s.textContent = ch; s.style.left = (38 + i * 10) + "%"; s.style.top = "18%"; s.style.animationDelay = (i * .13) + "s"; st.appendChild(s); setTimeout(() => s.remove(), 1500); });
  }
  function refreshPanel(focusSel, em) {
    if (modal.hidden || mode !== "main") return;
    const sc = modal.scrollTop; renderModal(); modal.scrollTop = sc;
    const f = focusSel && modal.querySelector(focusSel); if (f) f.focus();
    stageReact(em);
  }
  function feed() {
    if (S.fd && S.fd[0] === today() && S.fd[1] >= FEED_PER_DAY) { say("I'm full! 😋 Let's study instead.", "", 3500); return; }
    if (!(S.t > 0)) { say("No treats left. Save a new word or finish a flashcard round to earn more 🍪", `<button class="bd-b" type="button" data-bd="open">How it works</button>`, 6500); return; }
    S.t -= 1; S.fd = [today(), (S.fd && S.fd[0] === today() ? S.fd[1] : 0) + 1]; addFP(3);
    hop(); fx(["🍪", "😋", "💛"]);
    say(infoLine() + ["Nom nom! 😋", "Yum, thank you!", "Delicious 🍪", "*happy crunching*"][Math.floor(Math.random() * 4)], menuActs(), 4500);
    refreshPanel('[data-m="feed"]', ["🍪", "😋", "💛"]);
  }
  function setMin(v) { S.min = !!v; save(); hideBub(); visible(); if (!v) { petBtn.focus(); hop(); } else mini.focus(); }

  const SPOTS = ["br", "bl", "mr", "ml", "tr"];
  function setSpot(k) { SPOTS.forEach(x => root.classList.remove("at-" + x)); if (k && k !== "br") root.classList.add("at-" + k); try { localStorage.setItem("cs-bd-spot", k || "br"); } catch (e) {} }
  try { const k = localStorage.getItem("cs-bd-spot"); if (SPOTS.includes(k)) setSpot(k); } catch (e) {}
  let drag = null, justDragged = false;
  petBtn.style.touchAction = "none";
  petBtn.addEventListener("pointerdown", e => { if (e.button) return; drag = { x: e.clientX, y: e.clientY, on: false, id: e.pointerId }; });
  window.addEventListener("pointermove", e => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.on) { if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 9) return; drag.on = true; root.classList.add("dragging"); hideBub(); try { petBtn.setPointerCapture(drag.id); } catch (er) {} }
    const r = petBtn.getBoundingClientRect();
    root.style.setProperty("--dx", (e.clientX - drag.x) + "px"); root.style.setProperty("--dy", (e.clientY - drag.y) + "px");
  });
  const endDrag = e => {
    if (!drag) return; const d = drag; drag = null; if (!d.on) return;
    justDragged = true; setTimeout(() => justDragged = false, 50);
    root.classList.remove("dragging"); root.style.removeProperty("--dx"); root.style.removeProperty("--dy");
    const left = e.clientX < innerWidth / 2, mid = e.clientY < innerHeight * .62;
    setSpot(!left && e.clientY < innerHeight * .28 ? "tr" : (mid ? "m" : "b") + (left ? "l" : "r")); hop();
  };
  window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);
  petBtn.addEventListener("click", e => {
    if (justDragged) { e.stopImmediatePropagation(); return; }
    wake();
    if (S.on === undefined) { openModal("adopt"); return; }
    petIt();
  });
  mini.addEventListener("click", () => setMin(false));
  bub.addEventListener("click", e => {
    const b = e.target.closest("[data-bd]"); if (!b) return;
    const a = b.dataset.bd;
    if (a === "feed") feed(); else if (a === "pet") petIt(); else if (a === "open") { hideBub(); openModal(); } else if (a === "min") setMin(true);
    else if (a === "adopt") { hideBub(); openModal("adopt"); } else if (a === "later") { hideBub(); }
    else if (a === "duels") { hideBub(); if (window.csGo) window.csGo("park"); setTimeout(() => { const d = $("duelBoard"); if (d) d.scrollIntoView({ behavior: "smooth", block: "start" }); }, 900); }
  });

  /* ---------- panel ---------- */
  let mode = "main", draft = null, returnFocus = null, pv = null, sec = null, confirmOpen = false, moving = null, toyDrag = null;
  const SECT = { wardrobe: "👕 Wardrobe", room: "🏠 Room", buddy: "🐾 Change buddy", progress: "📈 Progress", settings: "⚙️ Settings" };
  const pvAnimal = () => (pv && pv.a ? pv.a : mode === "adopt" ? draft.a : animal());
  const palIdx = (a, c) => Object.assign({}, SP[a].p, (SP[a].colors[c | 0] || SP[a].colors[0])[1]);
  function pvBanner() {
    if (!pv) return "";
    const a = pvAnimal();
    const what = pv.a ? `<b>${esc(SP[pv.a].name)} the ${esc(SP[pv.a].species.toLowerCase())}</b> · unlocks at ${UNI_AT} learned words (you have ${counts().learned})` : pv.c != null ? `<b>${esc(SP[a].colors[pv.c][0])}</b> · unlocks at ${COLOR_AT[pv.c]} words` : (() => { const it = byId[pv.item]; return `<b>${esc(it.name)}</b> · unlocks ${atW(it)}${lockTxt(it)}`; })();
    /* sits on top of the picture (nothing gets pushed down); the ✕ only outside "adopt", where you're already choosing */
    return `<div class="bd-pv" role="status"><span class="bd-pv-tag">🔒 Preview</span><span class="bd-pv-txt">${what}</span>${mode === "adopt" ? "" : `<button class="bd-pv-x" type="button" data-m="pvoff" aria-label="Stop previewing" title="Stop previewing">✕</button>`}</div>`;
  }
  function openModal(m) {
    mode = m || "main"; returnFocus = document.activeElement; pv = null; confirmOpen = false; sec = null;
    if (mode !== "adopt" && !base) base = pickCos(S);
    draft = mode === "adopt" ? { a: S.a && SP[S.a] ? S.a : "max", c: S.c | 0, n: S.n || "" } : null;
    renderModal(); back.hidden = false; modal.hidden = false;
    setTimeout(() => { const f = modal.querySelector(mode === "adopt" ? ".bd-animal[aria-pressed=true]" : "#bdClose"); if (f) f.focus(); }, 30);
  }
  function reallyClose() { moving = null; toyDrag = null; pv = null; confirmOpen = false; sec = null; base = null; modal.hidden = true; back.hidden = true; if (returnFocus && returnFocus.focus) try { returnFocus.focus(); } catch (e) {} }
  function closeModal() {
    /* closing again while "Save your changes?" is showing = Don't save */
    if (confirmOpen && mode !== "adopt" && base) { Object.assign(S, base); commit(); reallyClose(); return; }
    if (mode !== "adopt" && dirty()) { confirmOpen = true; renderModal(); const b = modal.querySelector('.bd-confirm [data-m="save"]'); if (b) b.focus(); return; }
    reallyClose();
  }
  function commit() { base = null; save(); paintPet(); }
  back.addEventListener("click", closeModal);
  modal.addEventListener("keydown", e => {
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key === "Tab") { const f = [...modal.querySelectorAll("button:not([disabled]),input,[tabindex='0']")].filter(x => x.offsetParent); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  const UNI_AT = 150;
  const uniOpen = () => TCH() || S.ua === true || counts().learned >= UNI_AT;
  function animalGrid(sel, col) {
    return `<div class="bd-animals" role="group" aria-label="Choose an animal">${ORDER.map(id => id === "unicorn" && !uniOpen() ? `<button class="bd-animal locked" type="button" data-unilock="1" aria-disabled="true" title="Tap to preview · unlocks at ${UNI_AT} learned words" aria-pressed="${!!(pv && pv.a)}">${petSVG({ a: id, pal: SP[id].p, wear: {}, plain: true })}🔒 ${esc(SP[id].name)}<small style="display:block;font-size:10px;color:var(--muted,#777);font-weight:600">${UNI_AT} learned words</small></button>` : `<button class="bd-animal" type="button" data-pick="${id}" aria-pressed="${id === sel}">${petSVG({ a: id, pal: id === sel ? Object.assign({}, SP[id].p, (SP[id].colors[col | 0] || SP[id].colors[0])[1]) : SP[id].p, wear: {}, plain: true })}${esc(SP[id].name)}${SP[id].species ? `<small style="display:block;font-size:10px;color:var(--muted,#777);font-weight:600">${esc(SP[id].species)}</small>` : ""}${fpOf(id) ? `<small style="display:block;font-size:10.5px;color:var(--muted,#777)">💛 ${level(id)}</small>` : ""}</button>`).join("")}</div>${uniOpen() ? "" : `<p class="bd-small" id="bdUniNote" style="margin:6px 0 0">🦄 <b>${esc(SP.unicorn.name)} the unicorn</b> is the rarest buddy: she unlocks when you've <b>learned ${UNI_AT} words</b> in flashcards (you have ${counts().learned}).</p>`}`;
  }
  const COLOR_AT = [0, 0, 10, 20, 35, 50];
  const colorOpen = i => TCH() || counts().words >= (COLOR_AT[i] || 0);
  function swatches(id, sel) {
    const d = SP[id], next = d.colors.findIndex((x, i) => !colorOpen(i));
    return `<div class="bd-sw" role="group" aria-label="Choose a color">${d.colors.map(([n, p], i) => { const open = colorOpen(i); return `<button type="button" data-col="${i}" aria-pressed="${i === sel}" aria-label="${esc(n)}${open ? "" : ", unlocks at " + COLOR_AT[i] + " words"}" title="${esc(n)}${open ? "" : " · unlocks at " + COLOR_AT[i] + " words"}" ${open ? "" : 'aria-disabled="true"'} class="${open ? "" : "locked"}${pv && pv.c === i ? " pv" : ""}" style="background:${p.sw || (id === "unicorn" ? (p.b || p.r || d.p.r) : (p.b || d.p.b))}">${open ? "" : "🔒"}</button>`; }).join("")}<span>${esc((d.colors[sel] || d.colors[0])[0])}${next > 0 ? ` · next color at ${COLOR_AT[next]} words` : ""}</span></div>`;
  }
  function renderModal() {
    if (mode === "adopt") {
      const d = draft, pal = Object.assign({}, SP[d.a].p, (SP[d.a].colors[d.c] || [0, {}])[1]);
      modal.innerHTML = `<div class="bd-top"><h3 id="bdTitle">Adopt a study buddy 🐾</h3><button class="bd-x" id="bdClose" type="button" aria-label="Close">×</button></div>
        <p class="bd-small" style="margin-top:8px">A little friend who keeps you company while you study. Feed it treats you earn by saving words and practicing. It never gets sick or sad if you're away, it just naps.</p>
        <div class="bd-stage">${stageSVG(pv && pv.a ? { a: pv.a, pal: SP[pv.a].p, wear: {}, room: null, plain: true } : { a: d.a, pal: pv && pv.c != null ? palIdx(d.a, pv.c) : pal, wear: {}, room: null, plain: true })}${pvBanner()}</div>
        <h4>Choose your buddy</h4>${animalGrid(d.a, d.c)}${swatches(d.a, d.c)}
        <h4>Give it a name</h4><div class="bd-name"><input id="bdNameIn" type="text" maxlength="16" placeholder="${esc(SP[d.a].name)}" value="${esc(d.n)}" aria-label="Your buddy's name" autocomplete="off"></div>
        <div class="bd-foot"><button class="bd-link" type="button" data-m="nothanks">No thanks</button><button class="bd-b go" type="button" data-m="adopt">Adopt ${esc(d.n.trim() || SP[d.a].name)}!</button></div>`;
      return;
    }
    const c = counts(), wear = { head: S.head, face: S.face, neck: S.neck };
    const nextW = ITEMS.filter(i => i.w != null && c.words < i.w)[0], prevW = [...ITEMS.filter(i => i.w != null && c.words >= i.w)].pop();
    const nextL = ITEMS.filter(i => i.l != null && c.learned < i.l)[0], prevL = [...ITEMS.filter(i => i.l != null && c.learned >= i.l)].pop();
    const pct = (n, lo, hi) => Math.max(4, Math.min(100, Math.round((n - lo) / Math.max(1, hi - lo) * 100)));
    const seen = new Set(S.seen || []);
    const chip = (it, slot) => {
      const open = isOpen(it), on = S[slot] === it.id;
      return `<button type="button" data-wear="${slot}" data-item="${it.id}" aria-pressed="${on}" ${open ? "" : 'aria-disabled="true" data-locked="1"'} class="bd-chip${open ? "" : " locked"}${pv && pv.item === it.id ? " pv" : ""}" title="${open ? esc(it.name) : "Tap to preview · unlocks " + atW(it) + lockTxt(it)}">${open ? it.ico : "🔒"} ${esc(it.name)}${open ? (seen.has(it.id) ? "" : ' <span class="bd-new">NEW</span>') : ` <small>· ${needTxt(it)}</small>`}</button>`;
    };
    const slotRow = (slot, label) => `<div style="margin-bottom:10px"><div class="bd-small" style="margin:0 0 5px;font-weight:700">${label}</div><div class="bd-row"><button class="bd-chip" type="button" data-wear="${slot}" data-item="" aria-pressed="${!S[slot]}">${slot === "room" ? "🌱 Garden" : "None"}</button>${ITEMS.filter(i => i.slot === slot).map(i => chip(i, slot === "room" ? "room" : slot)).join("")}</div></div>`;
    const legend = isOpen(byId.legend), l = level();
    const newIn = slots => ITEMS.filter(i => slots.includes(i.slot) && isOpen(i) && !seen.has(i.id)).length;
    const nb = n => n ? ` <span class="bd-new">${n} NEW</span>` : "";
    const top = `<div class="bd-top"><h3 id="bdTitle">${sec ? SECT[sec] : "🏠 " + esc(nameOf()) + "'s home"}</h3><span class="bd-topr">${sec !== "settings" ? `<button class="bd-x bd-set-ico" type="button" data-sec="settings" aria-label="Buddy settings" title="Settings: sounds, seasonal outfits, hide">⚙️</button>` : ""}<button class="bd-x" id="bdClose" type="button" aria-label="Close">×</button></span></div>`;
    const stage = `<div class="bd-stage-wrap"><div class="bd-stage${S.shiny && isOpen(byId.shiny) ? " bd-shiny" : ""}${moving ? " bd-moving" : ""}" id="bdStage" title="Tap your buddy to pet it · drag a toy to move it">${stageSVG(pvOpts())}${pvBanner()}</div><div class="bd-zoom" role="group" aria-label="Zoom"><button type="button" data-zoom="-1" aria-label="Zoom in" title="Zoom in" ${zoom === 0 ? "disabled" : ""}>＋</button><button type="button" data-zoom="1" aria-label="Zoom out" title="Zoom out: see more of the room" ${zoom === ZW.length - 1 ? "disabled" : ""}>－</button></div></div>${sec === "room" ? `<p class="bd-small bd-movehint">${moving ? `Now tap where the <b>${esc(byId[moving].name.toLowerCase())}</b> should go.` : "✋ Drag a toy in the picture to move it (or tap it, then tap its new spot)."}${S.tp && Object.keys(S.tp).length ? ` <button class="bd-link" type="button" data-m="toyreset">Put toys back</button>` : ""}</p>` : ""}`;
    const foot = `<div class="bd-foot">${sec ? `<button class="bd-link" type="button" data-m="back">← Back</button>` : `<span></span>`}<button class="bd-b go" type="button" data-m="save">${dirty() ? "Save changes" : "Save"}</button></div>`;
    const confirmBox = confirmOpen ? `<div class="bd-confirm" role="alertdialog" aria-labelledby="bdCfT"><p id="bdCfT"><b>Save your changes?</b><br>Your changes won't be saved unless you tap <b>Save</b>.</p><div class="bd-row" style="justify-content:flex-end"><button class="bd-b" type="button" data-m="keep" style="background:transparent">Keep editing</button><button class="bd-b" type="button" data-m="discard">Don't save</button><button class="bd-b go" type="button" data-m="save">Save</button></div></div>` : "";
    let body = "";
    if (!sec) {
      const fp = fpOf(), nxt = LV[l], pctL = nxt ? Math.max(4, Math.round((fp - LV[l - 1]) / (nxt - LV[l - 1]) * 100)) : 100;
      const tile = (k, ico, t, sub) => `<button class="bd-tile" type="button" data-sec="${k}"><span class="bd-tile-ico" aria-hidden="true">${ico}</span><b>${t}</b><span>${sub}</span></button>`;
      body = `<div class="bd-name"><input id="bdNameIn" type="text" maxlength="16" value="${esc(nameOf())}" aria-label="Your buddy's name" autocomplete="off"><span class="bd-treats" title="Treats">🍪 ${S.t | 0} / ${MAXT}</span></div>
      <div class="bd-row" style="margin-top:10px"><button class="bd-b go" type="button" data-m="feed">🍪 Feed</button><button class="bd-b" type="button" data-m="pet">✋ Pet</button></div>
      <div class="bd-lv"><span><b>Level ${l}</b> 💛${l >= 10 ? " · best friends!" : nxt ? ` · next: ${esc(LV_WHAT[l])}` : ""}</span><div class="bd-bar" aria-hidden="true"><i style="width:${pctL}%"></i></div></div>
      <div class="bd-tiles">
        ${tile("wardrobe", "👕", "Wardrobe", "Hats, glasses & more" + nb(newIn(["head", "face", "neck"])))}
        ${tile("room", "🏠", "Room", "Background, toys & garden" + nb(newIn(["room", "toy"])))}
        ${tile("progress", "📈", "Progress", `${c.words} words · ${c.learned} learned`)}
        ${tile("buddy", "🐾", "Change buddy", "Animal & color")}
      </div>`;
    } else if (sec === "wardrobe") {
      body = `${slotRow("head", "Head")}${slotRow("face", "Face")}${slotRow("neck", "Neck")}
      ${isOpen(byId.shiny) ? `<label class="bd-row" style="align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" id="bdShiny" ${S.shiny ? "checked" : ""}> ✨ Shiny sparkles</label>` : `<p class="bd-small">🔒 <b>Shiny sparkles</b> at 400 words · ⭐ <b>Legend star</b> at 1,000 words</p>`}
      <p class="bd-small">New clothes unlock as you save more words. Tap a 🔒 item to preview it.</p>`;
    } else if (sec === "room") {
      const n = (S.gd || []).length, toys = ITEMS.filter(i => i.slot === "toy");
      body = `${slotRow("room", "Background")}
      <div class="bd-small" style="margin:4px 0 5px;font-weight:700">Toys</div><div class="bd-row">${toys.map(t => isOpen(t) ? `<button type="button" class="bd-chip" data-toy="${t.id}" aria-pressed="${!(S.toyOff || []).includes(t.id)}" title="${(S.toyOff || []).includes(t.id) ? "Hidden · tap to put it back in the room" : "In the room · tap to put it away"}">${t.ico} ${esc(t.name)}</button>` : `<span class="bd-chip locked" title="Unlocks ${atW(t)}${lockTxt(t)}">🔒 ${esc(t.name)} <small>· ${needTxt(t)}</small></span>`).join("")}</div>
      <p class="bd-small">Tap a toy to put it away or bring it back. New toys show up in the room by themselves: they unlock as you <b>learn</b> words in flashcards (tap <b>✓ I knew it</b> 3 times on a word). The ⏳ hourglass and 🌍 globe come from finishing grammar modules.</p>
      <p class="bd-small" style="margin:0 0 8px">🌱 <b>Study garden:</b> ${n ? `${n} ${n === 1 ? "flower" : "flowers"}. ` : ""}A new flower grows on every day you study. Missed days don't matter, your flowers stay.${n > 38 ? ` (Showing your newest 38.)` : ""}</p>`;
    } else if (sec === "buddy") {
      body = `${animalGrid(animal(), S.c | 0)}${swatches(animal(), S.c | 0)}<p class="bd-small">Each buddy has its own friendship level. Your treats, words and unlocks are shared by all of them.</p>`;
    } else if (sec === "progress") {
      const fp = fpOf(), nxt = LV[l];
      body = `<h4 style="margin-top:4px">Friendship</h4><div class="bd-prog"><span class="bd-hearts" aria-label="Friendship level ${l} of 10">${"💛".repeat(l)}<span style="opacity:.25">${"🤍".repeat(10 - l)}</span></span> <b>Level ${l}</b>${l >= 10 ? " · best friends!" : ""}</div>${nxt ? `<div class="bd-bar" aria-hidden="true"><i style="width:${Math.max(4, Math.round((fp - LV[l - 1]) / (nxt - LV[l - 1]) * 100))}%"></i></div><div class="bd-small" style="margin:0">Next: <b>${esc(LV_WHAT[l])}</b></div>` : ""}
      <p class="bd-small">Friendship grows when you feed your buddy (<b>+3</b>), pet it (<b>+1</b>, up to 5 a day), visit (<b>+2</b> a day) and get a perfect grammar round (<b>+3</b>).</p>
      <h4>Your words</h4>
      <div class="bd-prog"><b>${c.words}</b> ${c.words === 1 ? "word" : "words"} saved${nextW ? ` · next: ${nextW.ico} <b>${esc(nextW.name)}</b> at ${nextW.w}` : " · everything unlocked! 🎉"}</div>
      ${nextW ? `<div class="bd-bar" aria-hidden="true"><i style="width:${pct(c.words, prevW ? prevW.w : 0, nextW.w)}%"></i></div>` : ""}
      <div class="bd-prog"><b>${c.learned}</b> ${c.learned === 1 ? "word" : "words"} learned${nextL ? ` · next: ${nextL.ico} <b>${esc(nextL.name)}</b> at ${nextL.l}` : " · every toy unlocked! 🎉"}</div>
      ${nextL ? `<div class="bd-bar" aria-hidden="true"><i style="width:${pct(c.learned, prevL ? prevL.l : 0, nextL.l)}%"></i></div>` : ""}
      <div class="bd-prog">⏪ <b>Past simple:</b> ${modDone("ps") ? "⏳ Magic hourglass unlocked! ✨" : `finish it in Practice to get the ⏳ <b>Magic hourglass</b>`}</div>
      <div class="bd-prog">🌍 <b>Present perfect:</b> ${modDone("pp") ? "🌍 Little globe unlocked! ✨" : `finish it in Practice to get the 🌍 <b>Little globe</b>`}</div>
      ${canDuel(duelMeRole) ? `<h4>Duels ⚔️</h4><div class="bd-prog"><b>${S.dw | 0}</b> ${(S.dw | 0) === 1 ? "win" : "wins"} · <b>${S.dl | 0}</b> ${(S.dl | 0) === 1 ? "loss" : "losses"}${(S.dbs | 0) >= 2 ? ` · best streak 🔥 ${S.dbs}` : ""}</div><div class="duel-gear">${gearLine()}</div>` : ""}
      <h4>How to earn treats 🍪</h4>
      <ul class="bd-earn"><li>Save a new word: <b>+1</b> (up to 10 a day)</li><li>Finish a flashcard round of 5+ cards: <b>+3</b> (up to 5 a day)</li><li>Finish a grammar round: <b>+2</b> (up to 3 a day)</li><li>Write a good sentence: <b>+1</b> (up to 5 a day)</li><li>Say it out loud: <b>+1</b> (up to 3 a day)</li><li>Weekly goal: <b>+5</b> · Rare park treat: <b>+2</b></li></ul>
      <p class="bd-small">Your jar holds ${MAXT} treats, and your buddy eats up to ${FEED_PER_DAY} a day.</p>`;
    } else if (sec === "settings") {
      const se = season();
      body = `<label class="bd-row bd-set"><input type="checkbox" id="bdSnd" ${S.snd !== false ? "checked" : ""}> 🔊 Buddy sounds <span class="bd-small" style="margin:0">(sometimes, when you tap a buddy)</span></label>
      <label class="bd-row bd-set"><input type="checkbox" id="bdSeas" ${S.seas !== false ? "checked" : ""}> 🗓️ Seasonal outfits${se ? ` <span class="bd-small" style="margin:0">(now: ${se.ico} ${esc(se.name)})</span>` : ` <span class="bd-small" style="margin:0">(Halloween, Christmas, Fiestas Patrias and more)</span>`}</label>
      <p class="bd-small">Tip: you can drag your buddy to another spot on the screen.</p>
      <button class="bd-link" type="button" data-m="hide" style="margin-top:6px">Hide my buddy</button>`;
    }
    modal.innerHTML = top + stage + body + foot + confirmBox;
    // everything visible in the panel counts as seen
    if (sec === "wardrobe" || sec === "room") { const sl = sec === "wardrobe" ? ["head", "face", "neck", "fx", "badge"] : ["room", "toy"]; const add = ITEMS.filter(i => isOpen(i) && sl.includes(i.slot) && !seen.has(i.id)).map(i => i.id); if (add.length) { S.seen = [...seen, ...add]; save(); } }
  }
  /* move toys: drag them in the picture, or tap one and then tap its new spot */
  let toyJust = false;
  function svgPt(e) { const sv = modal.querySelector(".bd-stage-svg"); if (!sv || !sv.getScreenCTM()) return null; const p = sv.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(sv.getScreenCTM().inverse()); }
  const toySize = id => { const g = modal.querySelector(`[data-toyg="${id}"] rect`); return g ? [+g.getAttribute("width") - 1, +g.getAttribute("height") - 1] : [4, 4]; };
  function placeToy(id, pt, off) {
    const [w, h] = toySize(id); off = off || [w / 2, h / 2];
    const x = Math.round(Math.max(-14, Math.min(54 - w, pt.x - off[0]))), y = Math.round(Math.max(-16, Math.min(26 - h, pt.y - off[1])));
    S.tp = Object.assign({}, S.tp || {}, { [id]: [x, y] }); save();
  }
  modal.addEventListener("pointerdown", e => {
    const tg = e.target.closest("#bdStage [data-toyg]"); if (!tg || pv) return;
    const pt = svgPt(e), r = tg.querySelector("rect"); if (!pt) return;
    toyDrag = { id: tg.dataset.toyg, x: e.clientX, y: e.clientY, off: [pt.x - (+r.getAttribute("x") + .5), pt.y - (+r.getAttribute("y") + .5)], on: false, g: tg };
    e.preventDefault();
  });
  window.addEventListener("pointermove", e => {
    if (!toyDrag) return;
    if (!toyDrag.on && Math.hypot(e.clientX - toyDrag.x, e.clientY - toyDrag.y) < 6) return;
    toyDrag.on = true; const p0 = svgPt({ clientX: toyDrag.x, clientY: toyDrag.y }), p1 = svgPt(e); if (!p0 || !p1) return;
    toyDrag.g.setAttribute("transform", `translate(${p1.x - p0.x} ${p1.y - p0.y})`); toyDrag.g.classList.add("dragging");
  });
  window.addEventListener("pointerup", e => {
    if (!toyDrag) return; const d = toyDrag; toyDrag = null; if (!d.on) return;
    const pt = svgPt(e); if (pt) placeToy(d.id, pt, d.off); moving = null; toyJust = true; setTimeout(() => toyJust = false, 60);
    const sc = modal.scrollTop; renderModal(); modal.scrollTop = sc; const sb = modal.querySelector('.bd-foot [data-m="save"]'); if (sb) sb.textContent = dirty() ? "Save changes" : "Save";
  });
  modal.addEventListener("click", e => {
    if (e.target.closest("#bdClose")) { closeModal(); return; }
    const pick = e.target.closest("[data-pick]"), col = e.target.closest("[data-col]"), m = e.target.closest("[data-m]"), w = e.target.closest("[data-wear]");
    if (mode === "adopt") {
      const nin = $("bdNameIn"); if (nin) draft.n = nin.value;
      if (e.target.closest("[data-unilock]")) { pv = { a: "unicorn" }; renderModal(); const f = modal.querySelector("[data-unilock]"); if (f) f.focus(); return; }
      if (pick) { pv = null; draft.a = pick.dataset.pick; draft.c = 0; renderModal(); modal.querySelector(`[data-pick="${draft.a}"]`).focus(); return; }
      if (m && m.dataset.m === "pvoff") { pv = null; renderModal(); return; }
      if (col && !colorOpen(+col.dataset.col)) { pv = { c: +col.dataset.col }; renderModal(); const f = modal.querySelector(`[data-col="${pv.c}"]`); if (f) f.focus(); return; }
      if (pick) pv = null;
      if (col) { pv = null; draft.c = +col.dataset.col; renderModal(); modal.querySelector(`[data-col="${draft.c}"]`).focus(); return; }
      if (m && m.dataset.m === "adopt") {
        favKey = ""; S.on = true; S.hi = today(); S.a = draft.a; S.c = draft.c; S.n = draft.n.trim().slice(0, 16);
        if (S.t == null) S.t = START_T; if (S.mw == null) S.mw = counts().words; S.min = false; S.seen = ITEMS.filter(isOpen).map(i => i.id);
        save(); closeModal(); visible(); hop(); fx(["💛", "🎉", "💛"]);
        say(`Hi! I'm <b>${esc(nameOf())}</b> 👋 I brought ${S.t} treats. Tap me anytime.`, menuActs(true), 7000);
        updateToggle();
        return;
      }
      if (m && m.dataset.m === "nothanks") { S.on = false; save(); closeModal(); visible(); updateToggle(); toastMsg("No problem. You can adopt a buddy anytime in Settings."); return; }
      return;
    }
    if (m && ["save", "discard", "keep", "back"].includes(m.dataset.m)) {
      const a = m.dataset.m;
      if (a === "save") {
        if (pv) { const box = modal.querySelector(".bd-pv"); const what = pv.a ? `${SP[pv.a].name} is still locked` : pv.c != null ? `That color is still locked` : `That item is still locked`; let er = modal.querySelector(".bd-err"); if (!er) { er = document.createElement("p"); er.className = "bd-err"; er.setAttribute("role", "alert"); (box || modal.querySelector(".bd-foot")).insertAdjacentElement(box ? "afterend" : "beforebegin", er); } er.innerHTML = `🔒 <b>${what}</b>, so it can't be saved yet. Choose one you've unlocked.`; return; }
        const was = dirty(); commit();
        if (sec) { sec = null; base = pickCos(S); renderModal(); modal.scrollTop = 0; const f = modal.querySelector(".bd-tile"); if (f) f.focus(); if (was) toastMsg("Saved ✓"); return; }
        reallyClose(); if (was) toastMsg("Saved ✓"); return; }
      if (a === "discard") { Object.assign(S, base); commit(); reallyClose(); return; }
      if (a === "keep") { confirmOpen = false; renderModal(); return; }
      if (a === "back") { sec = null; pv = null; renderModal(); const f = modal.querySelector(".bd-tile"); if (f) f.focus(); return; }
    }
    const st = e.target.closest("[data-sec]"); if (st) { moving = null; sec = st.dataset.sec; pv = null; renderModal(); modal.scrollTop = 0; const f = modal.querySelector('[data-m="back"]'); if (f) f.focus(); return; }
    if (e.target.closest("[data-unilock]")) { pv = { a: "unicorn" }; renderModal(); const f = modal.querySelector("[data-unilock]"); if (f) f.focus(); return; }
    if (pick) { pv = null; S.a = pick.dataset.pick; S.c = 0; save(); renderModal(); modal.querySelector(`[data-pick="${S.a}"]`).focus(); return; }
    if (m && m.dataset.m === "pvoff") { pv = null; renderModal(); return; }
    if (col && !colorOpen(+col.dataset.col)) { pv = { c: +col.dataset.col }; renderModal(); const f = modal.querySelector(`[data-col="${pv.c}"]`); if (f) f.focus(); return; }
    if (w && w.dataset.locked) { pv = { slot: w.dataset.wear, item: w.dataset.item }; renderModal(); const f = modal.querySelector(`[data-wear="${pv.slot}"][data-item="${pv.item}"]`); if (f) f.focus(); return; }
    if (pick || col || w) pv = null;
    if (col) { S.c = +col.dataset.col; save(); renderModal(); modal.querySelector(`[data-col="${S.c}"]`).focus(); return; }
    if (w) { const slot = w.dataset.wear; S[slot] = w.dataset.item || null; save(); renderModal(); const f = modal.querySelector(`[data-wear="${slot}"][data-item="${w.dataset.item}"]`); if (f) f.focus(); return; }
    const ty = e.target.closest("[data-toy]");
    if (ty) { const id = ty.dataset.toy, off = new Set(S.toyOff || []); off.has(id) ? off.delete(id) : off.add(id); S.toyOff = [...off]; save(); renderModal(); const f = modal.querySelector(`[data-toy="${id}"]`); if (f) f.focus(); return; }
    const zb = e.target.closest("[data-zoom]");
    if (zb) { zoom = Math.max(0, Math.min(ZW.length - 1, zoom + +zb.dataset.zoom)); try { localStorage.setItem("cs-bd-zoom", zoom); } catch (er) {} const sc = modal.scrollTop; renderModal(); modal.scrollTop = sc; const f = modal.querySelector(`[data-zoom="${zb.dataset.zoom}"]`); if (f && !f.disabled) f.focus(); return; }
    if (m && m.dataset.m === "toyreset") { S.tp = null; moving = null; save(); renderModal(); return; }
    if (e.target.closest("#bdStage")) {
      if (toyJust) return;
      const tg = e.target.closest("[data-toyg]");
      if (moving) { const pt = svgPt(e); if (pt) placeToy(moving, pt); moving = null; renderModal(); return; }
      if (tg) { moving = tg.dataset.toyg; renderModal(); return; }
      if (e.target.closest("#bdStgPet")) petIt(); /* only a tap on the buddy itself pets it */
      return; }
    if (m) {
      const a = m.dataset.m;
      if (a === "feed") feed(); else if (a === "pet") petIt(); else if (a === "close") closeModal();
      else if (a === "hide") { commit(); S.on = false; save(); reallyClose(); visible(); updateToggle(); toastMsg("Your buddy is napping. Bring it back anytime in Settings."); }
    }
  });
  modal.addEventListener("input", e => {
    if (e.target.id !== "bdNameIn") return;
    if (mode === "adopt") { draft.n = e.target.value; const b = modal.querySelector('[data-m="adopt"]'); if (b) b.textContent = "Adopt " + (draft.n.trim() || SP[draft.a].name) + "!"; return; }
    S.n = e.target.value.slice(0, 16); save(); const sb = modal.querySelector('.bd-foot [data-m="save"]'); if (sb) sb.textContent = dirty() ? "Save changes" : "Save";
  });
  modal.addEventListener("change", e => { if (e.target.id === "bdSnd") { S.snd = e.target.checked; save(); renderModal(); if (S.snd) animalSound(animal(), true); return; } if (e.target.id === "bdSeas") { S.seas = e.target.checked; save(); renderModal(); return; } if (e.target.id === "bdShiny") { S.shiny = e.target.checked; save(); renderModal(); } });
  function toastMsg(t) { if (typeof window.toast === "function") window.toast(t); else say(esc(t), "", 3500); }

  /* ---------- earning treats & unlocks ---------- */
  let rawWords = null;
  function checkWords() {
    let raw; try { raw = localStorage.getItem("ncs-words"); } catch (e) { return; }
    if (raw === rawWords) return; rawWords = raw;
    if (S.on !== true) return;
    const c = counts();
    if (S.mw == null) { S.mw = c.words; save(); return; }
    if (c.words > S.mw) {
      const gain = c.words - S.mw, before = S.mw; S.mw = c.words;
      if (!S.wd || S.wd[0] !== today()) S.wd = [today(), 0];
      const give = Math.max(0, Math.min(gain, 10 - S.wd[1])); S.wd[1] += give;
      const old = S.t | 0; S.t = Math.min(MAXT, old + give); markStudy(); save();
      const unlocked = ITEMS.filter(i => i.w != null && before < i.w && c.words >= i.w);
      wake(); hop();
      if (unlocked.length) { fx(["🎉", "✨", "🎉"]); say(`🎉 New for ${esc(nameOf())}: <b>${unlocked.map(i => i.ico + " " + esc(i.name)).join(", ")}</b>!`, `<button class="bd-b go" type="button" data-bd="open">Try it on</button>`, 9000); }
      else if (S.t > old) { if (level() >= 3) anim("bd-dance", 1300); fx("🍪", 1); say(`+${S.t - old} 🍪 Nice word!`, "", 2600); }
      else say("Treat jar's full (30) 🍪 Time for a snack?", menuActs(true), 4000);
    }
  }
  document.addEventListener("cs-said", () => {
    if (S.on !== true) return;
    if (!S.sy || S.sy[0] !== today()) S.sy = [today(), 0];
    let gave = 0; if (S.sy[1] < 3 && (S.t | 0) < MAXT) { S.sy[1]++; S.t = (S.t | 0) + 1; gave = 1; }
    const grew = markStudy(); save(); wake(); hop(); fx(["🎤", "💛", "✨"]);
    say("I heard you! Great pronunciation 🎤" + (gave ? " +1 🍪" : "") + (grew ? "<br>🌱 A new flower grew in your garden!" : ""), "", 3000);
  });
  document.addEventListener("cs-kudos", () => {
    if (S.on !== true) return;
    addFP(3); wake(); hop(); fx(["💌", "💛", "🎉"]);
    say(`${esc(nameOf())} is so proud of you! 💛 +3 friendship`, "", 4000);
  });
  document.addEventListener("cs-sentence", e => {
    if (S.on !== true) return;
    const grew = markStudy();
    if (!S.sd || S.sd[0] !== today()) S.sd = [today(), 0];
    /* 1–3 treats depending on the stars (rated for the student's own level), up to 10 a day */
    const want = Math.max(1, Math.min(3, (e.detail && e.detail.stars) | 0 || 1));
    let gave = 0; if (S.sd[1] < 10 && (S.t | 0) < MAXT) { gave = Math.min(want, 10 - S.sd[1], MAXT - (S.t | 0)); S.sd[1] += gave; S.t = (S.t | 0) + gave; }
    if (want === 3) addFP(1);
    save(); wake(); hop(); fx(want === 3 ? ["🌟", "✍️", "🌟"] : ["✍️", "💛", "✨"]);
    say((e.detail && e.detail.result === "great" ? (want === 3 ? "Wow, ambitious sentence! 🌟" : "What a sentence! 🎉") : "Nice try, you're close! 👍") + (gave ? ` +${gave} 🍪` : "") + (want === 3 ? " +1 💛" : "") + (grew ? "<br>🌱 A new flower grew in your garden!" : ""), "", 3800);
  });
  document.addEventListener("cs-modround", () => { if (!S.grd || S.grd[0] !== today()) S.grd = [today(), 0]; if (S.grd[1] < 5) { S.grd[1]++; S.gr = (S.gr | 0) + 1; save(); } });
  document.addEventListener("cs-modround", e => {
    if (S.on !== true) return;
    const d = e.detail || {};
    if (!S.md || S.md[0] !== today()) S.md = [today(), 0];
    let gave = 0; if (S.md[1] < 3) { S.md[1]++; const old = S.t | 0; S.t = Math.min(MAXT, old + 2); gave = S.t - old; }
    if (d.perfect) addFP(3);
    const grew = markStudy(); save(); wake(); hop();
    if (d.finished) { const toy = d.toy || "⏳ Magic hourglass"; fx(["✨", toy.split(" ")[0], "✨"]); say(`🎉 You finished a grammar module! New magic toy for ${esc(nameOf())}: <b>${esc(toy)}</b>`, `<button class="bd-b go" type="button" data-bd="open">See it</button>`, 9000); return; }
    fx(d.perfect ? ["⭐", "💛", "⭐"] : ["🍪", "💛", "✨"]); maybeTrick();
    say((d.perfect ? "Perfect round! ⭐ +3 friendship" : "Round done! 💪") + (gave ? ` +${gave} 🍪` : "") + (grew ? "<br>🌱 A new flower grew in your garden!" : ""), "", 4000);
  });
  document.addEventListener("cs-weekgoal", () => {
    if (S.on !== true) return;
    const old = S.t | 0; S.t = Math.min(MAXT, old + 5); addFP(5); save(); wake(); hop(); fx(["🎯", "🎉", "💛"]);
    say(`Weekly goal done! 🎯 +5 friendship${S.t > old ? ` and +${S.t - old} 🍪` : ""}`, "", 5000);
  });
  document.addEventListener("cs-fcround", e => { maybeTrick();
    if (S.on !== true) return;
    const n = e.detail && e.detail.n != null ? e.detail.n : 99;
    const c = counts(), before = S.lc == null ? c.learned : S.lc; S.lc = c.learned;
    if (!S.fr || S.fr[0] !== today()) S.fr = [today(), 0];
    const old = S.t | 0; if (n >= 5 && S.fr[1] < 5) { S.fr[1]++; S.t = Math.min(MAXT, old + 3); }
    markStudy(); save(); wake(); hop(); fx(["🍪", "💛", "🍪"]);
    if (n < 5) { say("Round done! 💪 Rounds with 5 or more cards earn treats 🍪", "", 3800); return; }
    const toys = ITEMS.filter(i => i.l != null && before < i.l && c.learned >= i.l);
    if (toys.length) say(`🎉 You've learned ${c.learned} words! New toy: <b>${toys.map(i => i.ico + " " + esc(i.name)).join(", ")}</b>`, `<button class="bd-b go" type="button" data-bd="open">See it</button>`, 9000);
    else say(S.t > old ? `Round done! +${S.t - old} 🍪` : "Round done! Treat jar's full 🍪", "", 3500);
  });
  document.addEventListener("click", e => {
    if (S.on !== true || root.hidden) return;
    if (e.target.closest("#fcKnew")) {
      if (markStudy()) setTimeout(() => say("🌱 A new flower grew in your study garden!", "", 3000), 900);
      const cur = currentCard();
      if (cur && cur.missed) { wake(); hop(); fx(["🎉", "💛", "🎉"]); say(["You got it this time! 🎉", "Yes! You remembered it!", "Look at you! 🎉"][Math.floor(Math.random() * 3)], "", 2600); }
      else if (Math.random() < .5) hop();
    } else if (e.target.closest("#fcMiss")) { if (markStudy()) setTimeout(() => say("🌱 A new flower grew in your study garden!", "", 3000), 900); }
    else if (!e.target.closest("#buddy") && !bub.hidden && !e.target.closest(".bd-bub")) hideBub();
  }, true);
  window.addEventListener("hashchange", () => { if (S.on === true && !root.hidden && !sleeping) { petBtn.classList.remove("walk", "hop"); void petBtn.offsetWidth; petBtn.classList.add("walk"); setTimeout(() => petBtn.classList.remove("walk"), 700); } });

  /* flashcards: nervous on words you missed before */
  function currentCard() {
    const f = document.getElementById("fcFront"); if (!f) return null;
    const t = f.textContent.trim(); if (!t) return null;
    let words = [], fc = {}; try { words = JSON.parse(localStorage.getItem("ncs-words") || "[]"); fc = JSON.parse(localStorage.getItem("ncs-fc") || "{}"); } catch (e) {}
    const x = words.find(w => w && (w.w === t || w.m === t)); if (!x) return null;
    return { id: x.id, missed: fc[x.id] === 0 };
  }
  let lastCardTxt = "";
  function onCard() {
    if (S.on !== true || root.hidden) return;
    const v = document.getElementById("v-quiz"); if (!v || v.hidden) return;
    const f = document.getElementById("fcFront"), t = f ? f.textContent : ""; if (t === lastCardTxt) return; lastCardTxt = t;
    const cur = currentCard(); if (!cur || !cur.missed) return;
    anim("bd-nervous", 1300); if (!document.documentElement.classList.contains("cs-calm")) prop("💧", "bd-sweat", 1600);
    if (Math.random() < .35 && bub.hidden) say(["Ooh, this one's tricky…", "We've got this one!", "Hmm, I remember this one being hard 👀"][Math.floor(Math.random() * 3)], "", 2400);
  }
  (function watchCards() { const f = document.getElementById("fcFront"); if (!f) return; new MutationObserver(onCard).observe(f, { childList: true, characterData: true, subtree: true }); })();

  /* blink & nap */
  function wake() { lastAct = Date.now(); if (sleeping) { sleeping = false; paintPet(); } }
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach(ev => window.addEventListener(ev, () => { lastAct = Date.now(); if (sleeping) wake(); }, { passive: true }));
  setInterval(() => {
    if (S.on !== true || root.hidden || document.hidden) return;
    if (!sleeping && Date.now() - lastAct > 3 * 60 * 1000) { sleeping = true; paintPet(); return; }
    if (!sleeping && !document.documentElement.classList.contains("cs-calm") && Math.random() < .35) { blinkOn = true; paintPet(); paintStagePet(true); setTimeout(() => { blinkOn = false; paintPet(); paintStagePet(false); }, 180); }
  }, 2500);
  setInterval(checkWords, 1500);

  /* ---------- Settings toggle (inside the ⚙ panel) ---------- */
  function updateToggle() { const t = $("csBuddyT"); if (t) t.checked = S.on === true; }
  function injectToggle() {
    const p = $("csPanel"); if (!p || $("csBuddyT")) return;
    const secs = p.querySelectorAll(".cs-sec"); const last = secs[secs.length - 1]; if (!last) return;
    const sec = document.createElement("div"); sec.className = "cs-sec";
    sec.innerHTML = `<h4>Study buddy</h4><label class="cs-tog"><input type="checkbox" id="csBuddyT"><span><b>Show my study buddy</b><small>A little pixel pet in the corner that you feed with treats you earn by studying.</small></span></label>`;
    p.insertBefore(sec, $("csInstallSec") || last);
    const t = $("csBuddyT"); updateToggle();
    t.addEventListener("change", () => {
      if (t.checked) { if (!S.a) { const csx = $("csClose"); if (csx) csx.click(); openModal("adopt"); t.checked = false; return; } S.on = true; S.min = false; save(); visible(); hop(); }
      else { S.on = false; save(); visible(); }
    });
  }
  new MutationObserver(injectToggle).observe(document.body, { childList: true, subtree: true });
  injectToggle();

  /* ---------- start ---------- */
  if (S.on === true && S.mw == null) { S.mw = counts().words; save(); }
  rawWords = (() => { try { return localStorage.getItem("ncs-words"); } catch (e) { return null; } })();
  if (S.on === true) { const c = counts(); if (c.words > (S.mw | 0)) { rawWords = null; } }
  visible();
  if (S.on === undefined) setTimeout(() => { if (S.on === undefined && !document.documentElement.classList.contains("cs-calm")) say("Something's inside this egg… 🥚", `<button class="bd-b go" type="button" data-bd="adopt">Take a look</button><button class="bd-b" type="button" data-bd="later">Later</button>`, 9000); }, 4000);
  else if (S.on === true) {
    if (S.hi !== today()) { S.hi = today(); addFP(2); }
    if (!S.min) setTimeout(() => { if (sleeping || !bub.hidden) return; const fn = friendName(); say(level() >= 10 ? `Hi${fn ? " " + esc(fn) : ""}! Best friends forever 💛` : level() >= 4 && fn ? `Hi ${esc(fn)}! 👋` : "Hi again! 👋", "", 2600); }, 2500);
  }
  window.addEventListener("storage", e => { if (e.key === KEY) { S = load(); visible(); if (!modal.hidden) renderModal(); } });

  /* ---------- love between buddies ---------- */
  const lovedKey = "cs-parklove";
  function lovedToday(uid) { try { const m = JSON.parse(localStorage.getItem(lovedKey) || "{}"); return m[uid] === today(); } catch (e) { return false; } }
  function markLoved(uid) { try { const m = JSON.parse(localStorage.getItem(lovedKey) || "{}"); Object.keys(m).forEach(k => { if (m[k] !== today()) delete m[k]; }); m[uid] = today(); localStorage.setItem(lovedKey, JSON.stringify(m)); } catch (e) {} }
  function parkToast(pb, t) { const s = document.createElement("span"); s.className = "park-tip"; s.textContent = t; s.style.left = pb.style.left; s.style.top = "calc(" + pb.style.top + " + 46px)"; pb.parentNode.appendChild(s); setTimeout(() => s.remove(), 2600); }
  async function sendLove(pb) {
    const uid = pb.dataset.uid, bn = pb.dataset.bn || "them";
    if (lovedToday(uid)) { parkToast(pb, "You already sent " + bn + " love today 💛"); return; }
    const P = window.__csPark; if (!P || !P.heart) return;
    try { await P.heart(uid, pb.dataset.a); markLoved(uid); parkToast(pb, "💛 Love sent to " + bn + "! (+2 friendship)"); }
    catch (e) { if (/permission/i.test(String(e && (e.code || e.message)))) { markLoved(uid); parkToast(pb, "You already sent " + bn + " love today 💛"); } else parkToast(pb, "Couldn't send love. Try again."); }
  }
  const fedKey = () => "cs-fed-" + today();
  const fedToday = uid => { try { return (JSON.parse(localStorage.getItem(fedKey()) || "[]")).includes(uid); } catch (e) { return false; } };
  const markFed = uid => { try { const l = JSON.parse(localStorage.getItem(fedKey()) || "[]"); l.push(uid); localStorage.setItem(fedKey(), JSON.stringify(l)); } catch (e) {} };
  async function feedOther(pb) {
    const uid = pb.dataset.uid, bn = pb.dataset.bn || "them";
    if (fedToday(uid)) { parkToast(pb, "You already fed " + bn + " today 🍪"); return; }
    if ((S.t | 0) < 1) { parkToast(pb, "You don't have any treats. Study a little to earn some 🍪"); return; }
    const P = window.__csPark; if (!P || !P.feed) return;
    try { await P.feed(uid, pb.dataset.a); S.t = (S.t | 0) - 1; save(); markFed(uid); parkToast(pb, "🍪 You fed " + bn + "! (+3 friendship for them)"); const b = pb.querySelector(".pb-feed"); if (b) b.remove(); }
    catch (e) { if (/permission/i.test(String(e && (e.code || e.message)))) { markFed(uid); parkToast(pb, "You already fed " + bn + " today 🍪"); } else parkToast(pb, "Couldn't feed them. Try again."); }
  }
  async function claimLove() {
    const P = window.__csPark; if (!P || !P.claim || S.on !== true) return;
    let got = []; try { got = await P.claim(); } catch (e) { return; }
    if (!got.length) return;
    if (!S.fpm) S.fpm = {};
    let fp = 0, fed = 0;
    got.forEach(h => { const a = SP[h.a] ? h.a : animal(), n = h.kind === "feed" ? 3 : 2; if (h.kind === "feed") fed++; fp += n; S.fpm[a] = ((S.fpm[a]) | 0) + n; });
    save();
    const names = [...new Set(got.map(h => h.first).filter(Boolean))];
    const who = names.length ? (names.length > 2 ? names.slice(0, 2).join(", ") + " and " + (names.length - 2) + " more" : names.join(" and ")) : (got.length === 1 ? "A friend" : got.length + " friends");
    setTimeout(() => { if (root.hidden) return; wake(); hop(); fx(["💛", "💌", "💛"]); say(`💌 <b>${esc(who)}</b> ${fed === got.length ? "fed your buddy a treat" : fed ? "sent love and treats to your buddy" : "sent your buddy love"} in the Buddy park! +${fp} friendship`, `<button class="bd-b" type="button" data-bd="open">See ${esc(nameOf())}</button>`, 9000); }, 3500);
  }
  /* ---------- buddy park ---------- */
  /* park scenes: each person picks theirs (Auto follows the light/dark theme) */
  const SCENES = {
    auto: { n: "✨ Auto" }, day: { n: "🌳 Park" }, night: { n: "🌙 Night" }, beach: { n: "🏖️ Beach", d: [["🌴", 3, 18], ["🌴", 90, 20], ["⛱️", 6, 70], ["🐚", 90, 76], ["🦀", 26, 93], ["🐚", 72, 92], ["⛵", 48, 4], ["☁️", 20, 3], ["☀️", 84, 3], ["🌊", 12, 44], ["🌊", 86, 46]] },
    forest: { n: "🌲 Forest", d: [["🌲", 3, 16], ["🌲", 90, 18], ["🌲", 2, 70], ["🌲", 92, 74], ["🍄", 24, 92], ["🌿", 70, 93], ["🦊", 47, 95], ["🌲", 20, 3], ["🌲", 72, 5], ["🍄", 12, 44], ["🐿️", 86, 46]] },
    snow: { n: "❄️ Snow", d: [["🌲", 3, 16], ["⛄", 90, 18], ["🌲", 2, 70], ["🌲", 92, 74], ["❄️", 24, 92], ["❄️", 70, 93], ["🛷", 47, 95], ["☁️", 20, 3], ["❄️", 72, 5], ["❄️", 12, 44], ["⛄", 86, 46]] },
    sunset: { n: "🌅 Sunset", d: [["🌳", 3, 16], ["🌲", 90, 18], ["🌳", 2, 70], ["🌲", 92, 74], ["🌷", 24, 92], ["🌼", 70, 93], ["🌻", 47, 95], ["🌅", 20, 3], ["🐦", 72, 5], ["🌼", 12, 44], ["🌷", 86, 46]] }
  };
  const BASE_DECO = [["🌳", 3, 16], ["🌲", 90, 18], ["🌳", 2, 70], ["🌲", 92, 74], ["🌷", 24, 92], ["🌼", 70, 93], ["🌻", 47, 95], ["☁️", 20, 3], ["☁️", 72, 5], ["🌼", 12, 44], ["🌷", 86, 46]];
  const sceneNow = () => { let v = "auto"; try { v = JSON.parse(localStorage.getItem("ncs-park-scene") || '"auto"'); } catch (e) {} return SCENES[v] ? v : "auto"; };
  const decoFor = sc => ((SCENES[sc] && SCENES[sc].d) || (sc === "night" ? BASE_DECO.map(d => d[0] === "☁️" ? (d[1] < 50 ? ["🌙", d[1], d[2]] : ["✨", d[1], d[2]]) : d) : BASE_DECO))
    .map(([e, x, y]) => `<span class="park-deco" style="left:${x}%;top:${y}%" aria-hidden="true">${e}</span>`).join("");
  let parkBusy = false;
  document.addEventListener("change", e => { const t = e.target.closest("[data-pscene]"); if (!t) return; const v = t.value; try { localStorage.setItem("ncs-park-scene", JSON.stringify(v)); window.__csOnSet && window.__csOnSet("ncs-park-scene"); } catch (er) {}
    const w = $("parkWorld"); if (w) { w.className = "park-world sc-" + v; w.querySelectorAll(".park-deco").forEach(x => x.remove()); w.insertAdjacentHTML("afterbegin", decoFor(v)); } });
  function palFor(x) { const d = SP[x.a]; return Object.assign({}, d.p, (d.colors[x.c | 0] || d.colors[0])[1]); }
  async function renderPark() {
    const el = $("parkArea"), v = $("v-park"); if (!el || !v || v.hidden || parkBusy) return;
    const msg = h => { el.innerHTML = decoFor(sceneNow()) + `<div class="park-msg"><div>${h}</div></div>`; };
    const P = window.__csPark;
    if (!P) { msg("Opening the park gates… 🌳"); setTimeout(renderPark, 1500); return; }
    if (!P.signedIn()) { msg(`<b>Sign in to visit the park 🌳</b><p class="bd-small">The park shows the study buddies of everyone who uses Hibi: all roaming around together.</p><button class="bd-b go" type="button" data-park="signin">Sign in with Google</button>`); return; }
    parkBusy = true; msg("Opening the park gates… 🌳");
    let list = [];
    try { list = await P.list(); }
    catch (e) { parkBusy = false; msg(/permission/i.test(String(e && (e.code || e.message))) ? "The park isn't open yet. Check back soon! 🌳" : `Couldn't load the park. <button class="bd-b" type="button" data-park="retry">Try again</button>`); return; }
    parkBusy = false;
    const listAll = list.slice();
    const mine = list.find(x => x.me);
    list = list.filter(x => !x.me && x.on && SP[x.a] && !(x.role && x.role.hidden));
    if (S.on === true && S.a) list.push({ me: true, words: counts().words, a: S.a, c: S.c | 0, n: S.n, head: S.head, face: S.face, neck: S.neck, lvl: level(), role: mine ? mine.role : {}, first: "" });
    if (!list.length) { msg(`The park is empty right now. <b>Adopt a buddy</b> to be the first one here! 🥚<br><button class="bd-b go" type="button" data-park="adopt" style="margin-top:10px">Adopt a buddy</button>`); return; }
    /* everyone roams the whole park: start spread out, each one where there's the most room */
    const pos = [];
    list.forEach(x => { let best = null, bestD = -1; for (let k = 0; k < 14; k++) { const p = spot(); const d = pos.reduce((m, o) => Math.min(m, Math.hypot((p[0] - o[1]) * 1.2, p[1] - o[2])), 999); if (d > bestD) { bestD = d; best = p; } } pos.push([x, best[0], best[1]]); });
    const wc = x => (x.me ? counts().words : x.words | 0);
    if (!document.getElementById("parkLegend")) el.insertAdjacentHTML("afterend", `<p class="park-legend" id="parkLegend">✨ The glow shows friendship: <span class="lg1">silver</span> at level 4, <span class="lg2">gold</span> at level 7, <span class="lg3">rainbow</span> at level 10.</p>`);
    const sc = sceneNow();
    el.innerHTML = `<div class="park-scene"><label><select data-pscene aria-label="Park scene">${Object.keys(SCENES).map(k => `<option value="${k}" ${k === sc ? "selected" : ""}>${SCENES[k].n}</option>`).join("")}</select></label></div><div class="park-zoom" role="group" aria-label="Zoom"><button type="button" data-pz="-1" aria-label="Zoom out">−</button><button type="button" data-pz="0" aria-label="Fit the whole park">⤢</button><button type="button" data-pz="1" aria-label="Zoom in">+</button></div>
      <div class="park-vp" id="parkVp"><div class="park-world sc-${sc}" id="parkWorld">${decoFor(sc)}${pos.map(([x, l, t]) => {
      const bn = (x.n && String(x.n).trim() && String(x.n).trim() !== SP[x.a].old ? String(x.n).trim() : SP[x.a].name), owner = x.me ? "You" : (x.first ? x.first + "'s buddy" : "");
      const info = `<span class="pi-1"><b>${esc(bn)}</b>${owner ? ` <small>· ${esc(owner)}</small>` : ""}</span><span class="pi-2">📚 ${wc(x)} ${wc(x) === 1 ? "word" : "words"}${x.lvl > 1 ? ` · 💛 ${x.lvl | 0}` : ""}${(() => { const c = x.me ? (window.csLevel ? window.csLevel().lv : "") : (x.cefr || (x.role && x.role.lv) || ""); return c ? ` · 📊 ${esc(String(c).slice(0, 7))}` : ""; })()}</span>`;
      const lv = x.lvl | 0 || 1, tier = lv >= 10 ? 3 : lv >= 7 ? 2 : lv >= 4 ? 1 : 0;
      return `<button class="park-b${x.me ? " me" : ""}${tier ? " tier-" + tier : ""}" type="button" data-uid="${x.me ? "" : esc(x.uid || "")}" data-a="${esc(x.a)}" data-bn="${esc(bn)}" data-lvl="${x.lvl | 0 || 1}" data-zone="${x.role && x.role.club === false ? "p" : "c"}" style="left:${l}%;top:${t}%" aria-label="${esc(bn)}${owner ? ", " + esc(x.me ? "your buddy" : x.first + "'s buddy") : ""}, ${wc(x)} words, friendship level ${x.lvl | 0 || 1}"><span class="pinfo">${info}<span class="pi-3">${!x.me && x.uid ? `<span class="pb-feed" role="button" tabindex="0" data-feed="1" aria-label="Feed ${esc(bn)} a treat">🍪 Feed</span>` : ""}${!x.me && x.uid && canDuel(mine && mine.role) && canDuel(x.role) && !(window.__csPreview && window.__csPreview.kind === "private") ? `<span class="pb-feed pb-duel" role="button" tabindex="0" data-duel="${esc(x.uid)}" data-first="${esc(x.first || "")}" aria-label="Challenge ${esc(x.first || bn)} to a duel">⚔️ Duel</span>` : ""}${!x.me && x.uid && canDuel(mine && mine.role) && canDuel(x.role) && window.__clubDM ? `<span class="pb-feed pb-dm" role="button" tabindex="0" data-pdm="${esc(x.uid)}" data-first="${esc(x.first || "")}" aria-label="Message ${esc(x.first || bn)}">💬 Message</span>` : ""}</span></span>${tier ? `<span class="pb-aura" aria-hidden="true">${tier === 3 ? "<i>✦</i><i>✦</i><i>✦</i>" : tier === 2 ? "<i>✦</i>" : ""}</span>` : ""}<span class="pb-flip">${petSVG({ a: x.a, pal: palFor(x), wear: { head: x.head, face: x.face, neck: x.neck }, plain: true })}</span><span class="pn">${esc(bn)}</span></button>`;
    }).join("")}</div></div>`;
    applyZoom(false); startPark(); dropTreat();
    try { duelSync(listAll); } catch (e) { console.warn("duels", e); }
  }
  /* ---------- park: zoom ---------- */
  const ZL = [0.6, 0.8, 1, 1.35, 1.8, 2.4];
  let pz = (() => { const def = window.innerWidth < 640 ? .8 : 1; try { const v = +localStorage.getItem("cs-parkz"); return ZL.includes(v) && localStorage.getItem("cs-parkz") ? v : def; } catch (e) { return def; } })();
  function applyZoom(keepCenter) {
    const vp = $("parkVp"), w = $("parkWorld"); if (!vp || !w) return;
    const cx = (vp.scrollLeft + vp.clientWidth / 2) / Math.max(1, vp.scrollWidth), cy = (vp.scrollTop + vp.clientHeight / 2) / Math.max(1, vp.scrollHeight);
    w.style.setProperty("--z", pz); w.style.setProperty("--zw", Math.max(1, pz));
    const ar = $("parkArea"); ar.querySelectorAll("[data-pz]").forEach(b => { const d = +b.dataset.pz; b.disabled = d < 0 ? pz <= ZL[0] : d > 0 ? pz >= ZL[ZL.length - 1] : pz === (window.innerWidth < 640 ? .8 : 1); });
    requestAnimationFrame(() => { const nx = keepCenter ? cx : .5, ny = keepCenter ? cy : .5; vp.scrollLeft = nx * vp.scrollWidth - vp.clientWidth / 2; vp.scrollTop = ny * vp.scrollHeight - vp.clientHeight / 2; });
  }
  document.addEventListener("click", e => {
    const z = e.target.closest("[data-pz]"); if (!z) return;
    const d = +z.dataset.pz, i = ZL.indexOf(pz);
    pz = d === 0 ? (window.innerWidth < 640 ? .8 : 1) : ZL[Math.max(0, Math.min(ZL.length - 1, i + d))];
    try { localStorage.setItem("cs-parkz", String(pz)); } catch (err) {}
    applyZoom(d !== 0);
  });
  /* ---------- park: buddies wander, play and say hi ---------- */
  let parkTick = null;
  const calm = () => document.documentElement.classList.contains("cs-calm") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  function spot(zone) {
    return [8 + Math.random() * 84, 24 + Math.random() * 62];
  }
  /* try a few spots and take the one with the most room around it */
  function freeSpot(b) {
    const others = [...document.querySelectorAll("#parkWorld .park-b")].filter(x => x !== b).map(x => [parseFloat(x.style.left), parseFloat(x.style.top)]);
    let best = null, bestD = -1;
    for (let i = 0; i < 8; i++) { const p = spot(b.dataset.zone); const d = others.reduce((m, o) => Math.min(m, Math.hypot((p[0] - o[0]) * 1.2, p[1] - o[1])), 999); if (d > bestD) { bestD = d; best = p; } }
    return best;
  }
  function moveTo(b, l, t) {
    const ol = parseFloat(b.style.left) || 50;
    b.querySelector(".pb-flip").classList.toggle("left", l < ol - .5);
    b.classList.add("walking"); b.style.left = l + "%"; b.style.top = t + "%";
    clearTimeout(b._wt); b._wt = setTimeout(() => b.classList.remove("walking"), 3000);
  }
  function parkFx(b, ch, cls) { const w = $("parkWorld"); if (!w) return; const s = document.createElement("span"); s.className = "park-fx" + (cls ? " " + cls : ""); s.textContent = ch; s.style.left = b.style.left; s.style.top = "calc(" + b.style.top + " - 40px)"; w.appendChild(s); setTimeout(() => s.remove(), 2400); }
  function playAnim(b) {
    const l = +b.dataset.lvl || 1, opts = [["hop", 1]];
    if (l >= 2) opts.push(["yawn", 2]); if (l >= 3) opts.push(["dance", 3]); if (l >= 4) opts.push(["look", 4]); if (l >= 5) opts.push(["fly", 5]); if (l >= 6) opts.push(["ball", 6]); if (l >= 7) opts.push(["music", 7]); if (l >= 8) opts.push(["book", 8]); if (l >= 9) opts.push(["spin", 9]);
    const [k] = opts[Math.floor(Math.random() * opts.length)];
    const cls = { hop: "hop", yawn: "p-yawn", dance: "p-dance", look: "p-look", spin: "p-spin" }[k];
    if (cls) { b.classList.remove("hop", "p-yawn", "p-dance", "p-look", "p-spin"); void b.offsetWidth; b.classList.add(cls); setTimeout(() => b.classList.remove(cls), 2200); }
    if (k === "fly") parkFx(b, "🦋", "pf-fly"); else if (k === "ball") parkFx(b, "⚽", "pf-ball"); else if (k === "music") { parkFx(b, "🎵"); setTimeout(() => parkFx(b, "🎶"), 500); } else if (k === "book") parkFx(b, "📖", "pf-book"); else if (k === "yawn") parkFx(b, "💤", "pf-small");
  }
  function meet(a, b) {
    const bl = parseFloat(b.style.left), bt = parseFloat(b.style.top), side = (parseFloat(a.style.left) < bl) ? -1 : 1;
    moveTo(a, Math.max(5, Math.min(95, bl + side * 7)), bt);
    setTimeout(() => {
      if (!document.body.contains(a)) return;
      a.querySelector(".pb-flip").classList.toggle("left", side > 0);
      b.querySelector(".pb-flip").classList.toggle("left", side < 0);
      [a, b].forEach(x => { x.classList.remove("hop"); void x.offsetWidth; x.classList.add("hop"); setTimeout(() => x.classList.remove("hop"), 1000); });
      parkFx(a, "👋"); setTimeout(() => parkFx(b, ["💛", "😊", "🤝", "✨"][Math.floor(Math.random() * 4)]), 350);
    }, 3100);
  }
  /* ---------- park: a rare treat to find (max one find a day, ~1 in 3 visits) ---------- */
  function dropTreat() {
    const w = $("parkWorld"); if (!w || !S.on) return;
    const d = today(); if (S.pt && S.pt[0] === d) return;
    if (!S.pr || S.pr[0] !== d) S.pr = [d, Math.random() < .35 ? 1 : 0];
    if (!S.pr[1]) return;
    const [l, t] = spot("p");
    const b = document.createElement("button"); b.type = "button"; b.className = "park-treat"; b.textContent = "🍪";
    b.setAttribute("aria-label", "A treat! Tap to pick it up"); b.title = "A treat! Tap to pick it up";
    b.style.left = l + "%"; b.style.top = t + "%"; w.appendChild(b);
  }
  document.addEventListener("click", e => {
    const b = e.target.closest(".park-treat"); if (!b) return;
    e.stopPropagation();
    if ((S.t | 0) >= MAXT) { toastMsg(`Your treat jar is full (${MAXT}/${MAXT}). Feed your buddy and come back for this one, it will wait for you 🍪`); return; }
    const old = S.t | 0; S.t = Math.min(MAXT, old + 2); S.pt = [today()]; S.pr = [today(), 0]; save();
    b.remove();
    toastMsg(`You found ${S.t - old === 2 ? "2 treats" : "a treat"} in the park! 🍪 (${S.t}/${MAXT})`);
  }, true);
  function startPark() {
    clearInterval(parkTick);
    if (calm()) return;
    let n = 0;
    parkTick = setInterval(() => {
      const v = $("v-park"); if (!v || v.hidden) { clearInterval(parkTick); return; }
      if (document.hidden) return;
      const bs = [...document.querySelectorAll("#parkWorld .park-b")].filter(b => !b.matches(":hover") && !b.classList.contains("show-info")); if (!bs.length) return;
      n++;
      if (n % 4 === 0 && bs.length > 1) { const a = bs[Math.floor(Math.random() * bs.length)]; let b = bs[Math.floor(Math.random() * bs.length)]; if (a === b) b = bs[(bs.indexOf(a) + 1) % bs.length]; meet(a, b); return; }
      bs.forEach(b => { if (Math.random() < .3 && !b.classList.contains("walking")) { const [l, t] = freeSpot(b); moveTo(b, l, t); } else if (Math.random() < .2) playAnim(b); });
    }, 2600);
  }
  document.addEventListener("click", e => {
    const pb = e.target.closest(".park-b");
    const dm = e.target.closest("[data-pdm]"); if (dm) { e.preventDefault(); e.stopPropagation(); if (window.__clubDM) window.__clubDM(dm.dataset.pdm, dm.dataset.first); return; }
    const dz = e.target.closest("[data-duel]"); if (dz) { e.preventDefault(); e.stopPropagation(); duelDialog(dz.dataset.duel, dz.dataset.first); return; }
    if (pb && e.target.closest("[data-feed]")) { e.preventDefault(); e.stopPropagation(); clearTimeout(pb._it); pb._it = setTimeout(() => pb.classList.remove("show-info"), 4000); feedOther(pb); ["🍪", "💛", "🍪"].forEach((ch, i) => setTimeout(() => parkFx(pb, ch), i * 130)); return; }
    if (pb && pb.dataset.a) animalSound(pb.dataset.a);
    if (pb && !pb.classList.contains("me") && pb.dataset.uid) sendLove(pb);
    if (pb) {
      document.querySelectorAll(".park-b.show-info").forEach(x => { if (x !== pb) x.classList.remove("show-info"); });
      pb.classList.add("show-info"); clearTimeout(pb._it); pb._it = setTimeout(() => pb.classList.remove("show-info"), pb.querySelector(".pb-feed") ? 6500 : 3500);
      pb.classList.remove("hop"); void pb.offsetWidth; pb.classList.add("hop"); setTimeout(() => pb.classList.remove("hop"), 1000);
      ["💛", "👋", "💛"].forEach((ch, i) => setTimeout(() => parkFx(pb, ch), i * 130));
      return;
    }
    const a = e.target.closest("[data-park]"); if (!a) return;
    if (a.dataset.park === "signin" && window.csSignIn) window.csSignIn(); else if (a.dataset.park === "retry") renderPark(); else if (a.dataset.park === "adopt") openModal("adopt");
  });
  (function watchPark() { const v = $("v-park"); if (!v) return; new MutationObserver(() => { if (!v.hidden) renderPark(); }).observe(v, { attributes: true, attributeFilter: ["hidden"] }); if (!v.hidden) renderPark(); })();
  /* ---------- ⚔️ duels: club members (and "both") challenge each other for 7 days ----------
     Everything lives in each person's own park doc: dz = challenges I sent, da = ones I accepted,
     dn = ones I declined, dsc = my score in each duel. Both sides work out the winner the same way. */
  const DAY = 864e5, DUEL_LEN = 7 * DAY, OPEN_MAX = 3;
  const DT = {
    race: { ico: "📚", name: "Word race", how: "Who saves more new words in 7 days?" },
    first15: { ico: "🏁", name: "First to 15", how: "The first one to save 15 new words wins (7 days max)." },
    cards: { ico: "🃏", name: "Flashcard duel", how: "Who learns more words in flashcards in 7 days? (✓ I knew it, 3 times on a word)" },
    gram: { ico: "🧠", name: "Grammar duel", how: "Who finishes more grammar practice rounds in 7 days? (up to 5 a day count)" }
  };
  const canDuel = r => !(r && r.private && r.club === false) && !(r && r.hidden);
  let duelList = null, duelMeRole = null, lastDuelCheck = 0;
  function wordsSince(st, en) {
    let w = []; try { w = JSON.parse(localStorage.getItem("ncs-words") || "[]") || []; } catch (e) {}
    const per = {}; w.forEach(x => { if (!x || !x.w || !x.t || x.t < st || x.t > en || !(x.m || x.def) || !x.e) return; const d = new Date(x.t).toDateString(); per[d] = (per[d] || 0) + 1; });
    return Object.values(per).reduce((n, v) => n + Math.min(10, v), 0);
  }
  function myScore(d) {
    if (!d || !d.st) return 0; const en = d.st + DUEL_LEN;
    if (d.ty === "cards") return Math.max(0, counts().learned - (d.lb | 0));
    if (d.ty === "gram") return Math.max(0, (S.gr | 0) - (d.gb | 0));
    const n = wordsSince(d.st, en); return d.ty === "first15" ? Math.min(15, n) : n;
  }
  function duelPub() {
    const now = Date.now(), dsc = {};
    Object.entries(S.dd || {}).forEach(([id, d]) => { if (d.st && !(S.dr || {})[id]) dsc[id] = myScore(d); });
    return { dz: (S.dz || []).filter(x => now - x.at < 10 * DAY), da: S.da || {}, dn: (S.dn || []).slice(-20), dsc, dw: S.dw | 0, dl: S.dl | 0 };
  }
  /* all duels I can see, from everyone's park docs */
  function duelsFrom(list) {
    const by = {}; list.forEach(x => { by[x.me ? "me" : x.uid] = x; });
    const P = window.__csPark, meUid = (P && P.uid && P.uid()) || (by.me || {}).uid, meDoc = Object.assign({}, by.me || {}, { uid: meUid }), out = [], now = Date.now();
    const docs = list.filter(x => !x.me).concat([Object.assign({}, meDoc, { me: true, dz: S.dz || [] })]);
    docs.forEach(x => (x.dz || []).forEach(z => {
      const fromMe = !!x.me, toMe = z.to === meUid;
      const T = toMe ? meDoc : docs.find(y => y.uid === z.to); if (!T) return;
      const acc = toMe ? (S.da || {})[z.id] : (T.da || {})[z.id], dec = (toMe ? S.dn || [] : T.dn || []).includes(z.id);
      const fromName = fromMe ? "You" : x.first || "Someone", toName = toMe ? "You" : T.first || "Someone";
      const end = acc ? acc + DUEL_LEN : 0;
      const fs = fromMe ? myScore((S.dd || {})[z.id]) : ((x.dsc || {})[z.id] | 0), ts = toMe ? myScore((S.dd || {})[z.id]) : ((T.dsc || {})[z.id] | 0);
      let st = dec ? "declined" : !acc ? (now - z.at > 3 * DAY ? "expired" : "pending") : now > end || (z.ty === "first15" && (fs >= 15 || ts >= 15)) ? "done" : "live";
      out.push({ id: z.id, ty: z.ty, from: fromMe ? meUid : x.uid, to: z.to, fromName, toName, fromMe, toMe, at: z.at, acc, end, fs, ts, st });
    }));
    return out;
  }
  function award(d) {
    S.dr = S.dr || {}; if (S.dr[d.id]) return;
    const mine = d.fromMe ? d.fs : d.ts, theirs = d.fromMe ? d.ts : d.fs, opp = d.fromMe ? d.toName : d.fromName;
    const res = mine > theirs ? "w" : mine < theirs ? "l" : "d"; S.dr[d.id] = res;
    S.dplay = (S.dplay | 0) + 1; const before = ITEMS.filter(i => (i.dw != null || i.ds != null || i.dp != null) && isOpen(i)).map(i => i.id);
    if (res === "w") { S.dw = (S.dw | 0) + 1; S.dst = (S.dst | 0) + 1; S.dbs = Math.max(S.dbs | 0, S.dst); S.t = Math.min(MAXT + 15, (S.t | 0) + 10); addFP(15); }
    else if (res === "l") { S.dl = (S.dl | 0) + 1; S.dst = 0; S.t = Math.min(MAXT + 15, (S.t | 0) + 2); }
    else { S.t = Math.min(MAXT + 15, (S.t | 0) + 5); }
    const gear = ITEMS.filter(i => (i.dw != null || i.ds != null || i.dp != null) && isOpen(i) && !before.includes(i.id));
    save(); wake(); hop(); fx(res === "w" ? ["🏆", "⚔️", "🏆"] : ["💛", "⚔️", "💛"]);
    say(`${res === "w" ? `🏆 <b>You won</b> your ${DT[d.ty].name.toLowerCase()} against ${esc(opp)} (${mine}–${theirs})! +10 🍪 +15 friendship` : res === "l" ? `⚔️ ${esc(opp)} won your ${DT[d.ty].name.toLowerCase()} (${theirs}–${mine}). Good fight! +2 🍪` : `🤝 Your ${DT[d.ty].name.toLowerCase()} with ${esc(opp)} is a draw (${mine}–${theirs}). +5 🍪`}${gear.length ? `<br>🎁 New: <b>${gear.map(i => i.ico + " " + esc(i.name)).join(", ")}</b>` : ""}`, `<button class="bd-b go" type="button" data-bd="duels">See duels</button>`, 11000);
  }
  function duelSync(list) {
    if (!list || !window.__csPark) return; lastDuelCheck = Date.now();
    const meDoc = list.find(x => x.me) || {}; duelMeRole = meDoc.role || {}; duelList = list;
    const ds = duelsFrom(list); S.dd = S.dd || {}; let ch = false;
    ds.forEach(d => {
      if (!(d.fromMe || d.toMe)) return;
      const mine = S.dd[d.id];
      if (d.acc && mine && !mine.st) { mine.st = d.acc; ch = true; }
      if (d.st === "done" && mine && mine.st && !(S.dr || {})[d.id]) award(d);
      if ((d.st === "declined" || d.st === "expired") && mine && !mine.gone) { mine.gone = 1; ch = true; }
    });
    const fresh = ds.filter(d => d.toMe && d.st === "pending" && !(S.seenDz || []).includes(d.id));
    if (fresh.length) { S.seenDz = (S.seenDz || []).concat(fresh.map(d => d.id)).slice(-40); ch = true;
      const d = fresh[0]; say(`⚔️ <b>${esc(d.fromName)}</b> challenged you to a <b>${DT[d.ty].ico} ${DT[d.ty].name}</b>!`, `<button class="bd-b go" type="button" data-bd="duels">See the challenge</button>`, 12000); }
    if (ch) save();
    renderDuels(ds);
  }
  async function duelCheck() { const P = window.__csPark; if (!P || !P.signedIn() || Date.now() - lastDuelCheck < 6e5) return; try { duelSync(await P.list()); } catch (e) {} }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) setTimeout(duelCheck, 2000); });
  const gearLine = () => ITEMS.filter(i => i.dw != null || i.ds != null || i.dp != null).map(i => `<span class="dg${isOpen(i) ? " on" : ""}" title="${esc(i.name)}${isOpen(i) ? " (unlocked)" : " · unlocks " + lockTxt(i)}">${isOpen(i) ? i.ico : "🔒"} ${esc(i.name)}</span>`).join("");
  function renderDuels(ds) {
    const area = $("parkArea"); if (!area) return;
    let box = $("duelBoard"); if (!box) { box = document.createElement("section"); box.id = "duelBoard"; box.className = "duel-board"; (document.getElementById("parkLegend") || area).insertAdjacentElement("afterend", box); }
    if (!canDuel(duelMeRole) || window.__csPreview && window.__csPreview.kind === "private") { box.hidden = true; return; }
    box.hidden = false; const now = Date.now(), recent = d => d.st === "done" && d.end && now - d.end < 14 * DAY;
    const inc = ds.filter(d => d.toMe && d.st === "pending" && !(S.da || {})[d.id]);
    const mineOpen = ds.filter(d => (d.fromMe || d.toMe) && (d.st === "pending" || d.st === "live"));
    const live = ds.filter(d => d.st === "live").sort((a, b) => (b.fromMe || b.toMe) - (a.fromMe || a.toMe));
    const done = ds.filter(recent).sort((a, b) => b.end - a.end).slice(0, 8);
    const bar = (n, mx) => `<i style="width:${Math.min(100, Math.round(n / Math.max(1, mx) * 100))}%"></i>`;
    const left = d => { const h = Math.max(0, Math.round((d.end - now) / 36e5)); return h > 48 ? Math.round(h / 24) + " days left" : h + " h left"; };
    box.innerHTML = `<div class="duel-h"><h2>⚔️ Duels</h2><div class="duel-stats"><span><b>${S.dw | 0}</b> ${(S.dw | 0) === 1 ? "win" : "wins"}</span><span><b>${S.dl | 0}</b> ${(S.dl | 0) === 1 ? "loss" : "losses"}</span>${(S.dst | 0) >= 2 ? `<span>🔥 <b>${S.dst}</b> in a row</span>` : ""}</div><button class="bd-b" type="button" data-dhelp="1">❓ How duels work</button></div>
      ${inc.map(d => `<div class="duel-card inc"><b>${esc(d.fromName)}</b> challenged you to a <b>${DT[d.ty].ico} ${DT[d.ty].name}</b>. <span class="bd-small" style="margin:0">${esc(DT[d.ty].how)}</span><div class="bd-row" style="margin-top:6px"><button class="bd-b go" type="button" data-dacc="${esc(d.id)}">⚔️ Accept</button><button class="bd-b" type="button" data-ddec="${esc(d.id)}">No thanks</button></div></div>`).join("")}
      ${live.length ? `<h3>Live now</h3>${live.map(d => { const mx = d.ty === "first15" ? 15 : Math.max(d.fs, d.ts, 5); return `<div class="duel-card${d.fromMe || d.toMe ? " mine" : ""}"><div class="duel-t">${DT[d.ty].ico} <b>${DT[d.ty].name}</b> <span class="bd-small" style="margin:0">· ${left(d)}</span></div>
        <div class="duel-row"><span>${esc(d.fromName)}</span><span class="duel-bar">${bar(d.fs, mx)}</span><b>${d.fs}</b></div><div class="duel-row"><span>${esc(d.toName)}</span><span class="duel-bar">${bar(d.ts, mx)}</span><b>${d.ts}</b></div></div>`; }).join("")}` : ""}
      ${ds.filter(d => d.fromMe && d.st === "pending").map(d => `<div class="duel-card"><span class="bd-small" style="margin:0">⏳ Waiting for <b>${esc(d.toName)}</b> to accept your ${DT[d.ty].ico} ${DT[d.ty].name}.</span></div>`).join("")}
      ${done.length ? `<h3>Recent winners</h3><ul class="duel-done">${done.map(d => `<li>${d.fs === d.ts ? `🤝 ${esc(d.fromName)} and ${esc(d.toName)} drew` : `🏆 <b>${esc(d.fs > d.ts ? d.fromName : d.toName)}</b> beat ${esc(d.fs > d.ts ? d.toName : d.fromName)}`} · ${DT[d.ty].ico} ${DT[d.ty].name} (${Math.max(d.fs, d.ts)}–${Math.min(d.fs, d.ts)})</li>`).join("")}</ul>` : ""}
      ${!inc.length && !live.length && !done.length && !mineOpen.length ? `<p class="bd-small">No duels yet. Tap someone's buddy in the park, then <b>⚔️ Duel</b> to challenge them!</p>` : mineOpen.length < OPEN_MAX ? `<p class="bd-small">Tap a buddy in the park, then <b>⚔️ Duel</b> to start a new one.</p>` : `<p class="bd-small">You have ${OPEN_MAX} duels going. Finish one to start another.</p>`}
      ${(() => { const dz = ITEMS.filter(i => i.dw != null || i.ds != null || i.dp != null), tile = i => `<div class="dgt${isOpen(i) ? " on" : ""}"><span class="dgi" aria-hidden="true">${isOpen(i) ? i.ico : "🔒"}</span><b>${esc(i.name)}</b><small>${isOpen(i) ? "Unlocked ✓" : esc(lockTxt(i))}</small></div>`, ord = i => i.dp != null ? 0 : i.ds != null ? i.ds + 0.5 : i.dw, wear = dz.filter(i => i.slot !== "toy").sort((a, b) => ord(a) - ord(b)), room = dz.filter(i => i.slot === "toy").sort((a, b) => ord(a) - ord(b));
        return `<h3 class="duel-gh">Duel prizes <small>${dz.filter(isOpen).length} of ${dz.length} unlocked</small></h3>
        <p class="duel-sub">👕 For your buddy to wear</p><div class="duel-gearg">${wear.map(tile).join("")}</div>
        <p class="duel-sub">🏠 For your buddy's room</p><div class="duel-gearg">${room.map(tile).join("")}</div>`; })()}`;
  }
  function duelHelp() {
    if (!window.csDialog) return;
    window.csDialog(`<h3 style="margin-top:0">⚔️ How duels work</h3><p>Challenge another club member to a friendly 7-day duel. It starts when they accept.</p><ul>${Object.values(DT).map(t => `<li>${t.ico} <b>${t.name}</b>: ${esc(t.how)}</li>`).join("")}</ul>
      <p class="muted" style="font-size:14px">Only words with a meaning <b>and</b> an example sentence count, up to 10 a day. Scores update when each of you opens Hibi.</p>
      <p><b>Prizes:</b> the winner gets <b>+10 🍪</b> (even past the 30 limit) and <b>+15 friendship</b>. A draw gives +5 🍪, and everyone who finishes a duel gets at least +2 🍪.</p>
      <p><b>Prizes your buddy can wear:</b> 🥋 fighter headband after your first duel · 🥇 champion medal at 2 wins · ⛑️ knight helmet at 5 · 😎 battle shades at 7 · 🌿 victory laurel at 15 · 🦸 hero cape for 3 wins in a row.</p>
      <p><b>Prizes for the room:</b> 🚩 banner after your first duel · 🗡️ sword at 1 win · 🛡️ shield at 3 · 🏰 armour stand at 10.</p>
      <p class="muted" style="font-size:13.5px">You can have up to ${OPEN_MAX} duels at a time, and one at a time with each person.</p>`);
  }
  function duelDialog(uid, first) {
    if (!window.csDialog) return;
    const ds = duelList ? duelsFrom(duelList) : [], open = ds.filter(d => (d.fromMe || d.toMe) && (d.st === "pending" || d.st === "live"));
    if (open.some(d => d.from === uid || d.to === uid)) { toastMsg(`You already have a duel with ${first || "them"} ⚔️`); return; }
    if (open.length >= OPEN_MAX) { toastMsg(`You have ${OPEN_MAX} duels going. Finish one first ⚔️`); return; }
    const dlg = window.csDialog(`<h3 style="margin-top:0">⚔️ Challenge ${esc(first || "them")}</h3><p class="muted" style="margin-top:0">Pick a 7-day duel. It starts when ${esc(first || "they")} accept${first ? "s" : ""}.</p><div class="duel-pick">${Object.entries(DT).map(([k, t], i) => `<label class="duel-opt"><input type="radio" name="dty" value="${k}" ${i ? "" : "checked"}><span><b>${t.ico} ${t.name}</b><small>${esc(t.how)}</small></span></label>`).join("")}</div><div class="note-actions" style="margin-top:12px"><button class="pill-btn pill-green" type="button" data-dgo="1">Send challenge ⚔️</button><button class="swap" type="button" data-dx="1">Cancel</button></div>`);
    dlg.el.addEventListener("click", e => {
      if (e.target.closest("[data-dx]")) { dlg.close(); return; }
      if (!e.target.closest("[data-dgo]")) return;
      const ty = (dlg.el.querySelector("input[name=dty]:checked") || {}).value || "race";
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
      S.dz = (S.dz || []).concat({ id, to: uid, ty, at: Date.now() }).slice(-10);
      S.dd = Object.assign({}, S.dd || {}, { [id]: { ty, lb: counts().learned, gb: S.gr | 0, st: 0 } });
      save(); publishPark(); dlg.close(); toastMsg(`⚔️ Challenge sent to ${first || "them"}!`); lastDuelCheck = 0; setTimeout(renderPark, 1800);
    });
  }
  document.addEventListener("click", e => {
    if (e.target.closest("[data-dhelp]")) { duelHelp(); return; }
    const ac = e.target.closest("[data-dacc]"), dc = e.target.closest("[data-ddec]");
    if (ac) { const id = ac.dataset.dacc, d = (duelList ? duelsFrom(duelList) : []).find(x => x.id === id); if (!d) return;
      const open = duelsFrom(duelList).filter(x => (x.fromMe || x.toMe) && x.st === "live");
      if (open.length >= OPEN_MAX) { toastMsg(`You have ${OPEN_MAX} duels going. Finish one first ⚔️`); return; }
      const now = Date.now(); S.da = Object.assign({}, S.da || {}, { [id]: now }); S.dd = Object.assign({}, S.dd || {}, { [id]: { ty: d.ty, lb: counts().learned, gb: S.gr | 0, st: now } });
      save(); publishPark(); toastMsg(`⚔️ Duel on! Good luck against ${d.fromName}.`); hop(); fx(["⚔️", "💪", "⚔️"]); lastDuelCheck = 0; setTimeout(renderPark, 1800); return; }
    if (dc) { S.dn = (S.dn || []).concat(dc.dataset.ddec).slice(-20); save(); publishPark(); toastMsg("No problem 👍"); setTimeout(renderPark, 1500); }
  });

  window.addEventListener("cs-auth", e => { if (e.detail && e.detail.signedIn) { setTimeout(publishPark, 2500); setTimeout(claimLove, 3000); setTimeout(duelCheck, 5000); } renderPark(); });

  document.addEventListener("cs-teacher", () => { try { paintPet(); if (!modal.hidden) renderModal(); publishPark(); } catch (e) {} });
  /* ---------- study music: the buddy's own lofi study room ----------
     The window follows the time of day where the student is (their device clock), and it rains outside with the rain sounds. */
  function skyPhase() { const h = new Date().getHours() + new Date().getMinutes() / 60; return h >= 5 && h < 8 ? "dawn" : h >= 8 && h < 17 ? "day" : h >= 17 && h < 20.5 ? "sunset" : "night"; }
  const SKY = {
    dawn: { b: ["#F7B3A3", "#F9C9A6", "#FBE1B5", "#FDEBC8"], wall: "#E9CDB8", wall2: "#E2C2AC", glow: .12, sun: ["#FFE7A8", 20] },
    day: { b: ["#7EC3F2", "#93CEF5", "#A9D9F7", "#C3E5F9"], wall: "#EBD9C2", wall2: "#E3CFB6", glow: 0, sun: ["#FFF1A8", 5] },
    sunset: { b: ["#4B3B78", "#B4528A", "#F07E5C", "#F9B565"], wall: "#7A5468", wall2: "#704C60", glow: .3, sun: ["#FFD27A", 22] },
    night: { b: ["#141A3A", "#1B2350", "#252F63", "#30396E"], wall: "#3A3150", wall2: "#342C49", glow: .45, moon: true }
  };
  function studyRoom(rain, kind) {
    const ph = skyPhase(), K = SKY[ph];
    let o = ""; const P = (x, y, w, h, c, cls, op) => { o += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"${cls ? ` class="${cls}"` : ""}${op != null ? ` opacity="${op}"` : ""}/>`; };
    /* wall + wainscot + floor */
    P(-3, 0, 52, 19, K.wall); for (let x = -3; x < 49; x += 4) P(x, 0, 1, 19, K.wall2);
    P(-3, 15, 52, 4, K.wall2); P(-3, 15, 52, 1, "#8A6A52");
    P(-3, 19, 52, 8, "#8C5E3C"); for (let x = -3; x < 49; x += 6) P(x, 19, 1, 8, "#7A4F31"); P(-3, 19, 52, 1, "#A87650");
    P(13, 21, 22, 3, "#C9707A"); P(14, 22, 20, 1, "#E39AA0");
    /* window with the sky */
    o += `<clipPath id="msWin"><rect x="0" y="2" width="12" height="11"/></clipPath><g clip-path="url(#msWin)">`;
    K.b.forEach((c, i) => P(0, 2 + i * 3, 12, 3, rain ? ["#5E6B80", "#6B788C", "#7A869A", "#8792A6"][i] : c));
    if (!rain && K.sun) { P(7, K.sun[1] === 5 ? 4 : 9, 3, 3, K.sun[0]); }
    if (!rain && K.moon) { P(8, 4, 2, 2, "#F4F1DE"); P(9, 4, 1, 1, K.b[0]); [[1, 3], [4, 5], [2, 8], [10, 7], [6, 3]].forEach(([x, y]) => P(x, y, 1, 1, "#FFF7C2", "ms-star")); }
    /* city skyline, lit windows at night */
    [[0, 9, 3], [3, 7, 2], [5, 10, 3], [8, 8, 2], [10, 9, 2]].forEach(([x, y, w]) => { P(x, y, w, 13 - y, ph === "day" || ph === "dawn" ? "#6E7F99" : "#232842"); if (ph !== "day") P(x + 1, y + 1, 1, 1, "#FFD27A", null, .9); });
    if (rain) { for (let i = 0; i < 2; i++) { o += `<g class="ms-rain r${i}">`; [[1, 2], [4, 5], [7, 3], [10, 6], [2, 8], [6, 9], [9, 1], [11, 10], [3, 12], [8, 11]].forEach(([x, y]) => P(x, y - 12 * i, .3, 1.4, "#CFE3F5", null, .85)); o += `</g>`; } }
    o += `</g>`;
    P(-1, 1, 14, 1, "#5A3B2C"); P(-1, 13, 14, 1.5, "#6B4A36"); P(-1, 1, 1, 13, "#5A3B2C"); P(12, 1, 1, 13, "#5A3B2C"); P(5.5, 2, 1, 11, "#5A3B2C"); P(0, 7, 12, .8, "#5A3B2C");
    if (rain) [[2, 4], [9, 6], [4, 10], [10, 11]].forEach(([x, y]) => P(x, y, .6, .6, "#E7F1FA", null, .7));
    /* curtains */
    P(-2, 0, 2, 15, "#D98C8C"); P(12.5, 0, 2, 15, "#D98C8C"); P(-2, 0, 1, 15, "#C77878"); P(13.5, 0, 1, 15, "#C77878"); P(-3, 0, 19, 1, "#8A5A3A");
    /* fairy lights */
    for (let x = 16; x < 47; x += 3) P(x, 1 + (x % 2 ? 1 : 0), 1, 1, ["#FFD27A", "#F2B8C6", "#9ED3F0", "#B9F2A1"][(x / 3 | 0) % 4], "ms-fl", ph === "day" ? .55 : 1);
    /* shelf with books + plant */
    P(33, 6, 13, 1, "#7A4F31"); [[34, "#E5533D", 3], [35, "#5AB8FF", 4], [36, "#F5C842", 3], [37, "#7AC77A", 4], [39, "#B18CFF", 3]].forEach(([x, c, h]) => P(x, 6 - h, 1, h, c));
    P(42, 4, 3, 2, "#C0673A"); P(42, 2, 1, 2, "#4E9F5A"); P(43, 1, 1, 3, "#5DB86A"); P(44, 2, 1, 2, "#4E9F5A");
    /* desk */
    P(31, 14, 16, 1.2, "#9C6B43"); P(31, 15.2, 16, .8, "#7A4F31"); P(32, 16, 1, 9, "#7A4F31"); P(45, 16, 1, 9, "#7A4F31");
    /* lamp + warm glow */
    P(44, 8, 1, 6, "#3B3B45"); P(42, 7, 4, 2, "#F5C842", "ms-lampshade"); P(43, 9, 2, .6, "#FFE9A8");
    if (K.glow) o += `<circle cx="43.5" cy="11" r="9" fill="#FFD27A" opacity="${K.glow * .45}"/><circle cx="43.5" cy="11" r="4.5" fill="#FFE9A8" opacity="${K.glow * .5}"/>`;
    /* mug with steam */
    P(40, 12, 2, 2, "#F2EEE6"); P(42, 12.5, .7, 1, "#F2EEE6"); P(40.5, 12, 1, .5, "#6B3E2A");
    o += `<g class="ms-steam">`; P(40.6, 10, .5, 1, "#FFFFFF", null, .5); P(41.2, 9, .5, 1, "#FFFFFF", null, .4); o += `</g>`;
    if (kind === "noise") {
      /* white-noise machine: the sound comes from here for brown / pink / white noise */
      P(32.5, 10.5, 6, 3.5, "#ECE6DA"); P(32.5, 10.5, 6, .7, "#FFFFFF"); P(33, 13.4, 5, .6, "#CFC6B6");
      for (let x = 33.3; x < 38; x += 1.1) for (let y = 11.6; y < 13.2; y += .9) P(x, y, .5, .5, "#B9AE9C");
      P(37.6, 13.5, .6, .4, "#3DDC97", "ms-led");
      o += `<g class="ms-wave w1">`; P(31.4, 11, .4, 2, "#9ED3F0"); P(39.1, 11, .4, 2, "#9ED3F0"); o += `</g>`;
      o += `<g class="ms-wave w2">`; P(30.4, 10.4, .4, 3.2, "#9ED3F0"); P(40.1, 10.4, .4, 3.2, "#9ED3F0"); o += `</g>`;
    } else {
      /* record player (music) */
      P(32, 11, 7, 3, "#C0673A"); P(32, 11, 7, .7, "#D98A5C"); P(33, 13.3, 5, .7, "#A55530");
      o += `<g class="ms-disc1">`; P(33, 10, 4, 1, "#1F1F24"); P(34, 9.4, 2, .6, "#1F1F24"); P(34.6, 10, .8, .8, "#E5533D"); P(33, 10, .8, 1, "#4A4A55"); o += `</g>`;
      o += `<g class="ms-disc2">`; P(33, 10, 4, 1, "#1F1F24"); P(34, 9.4, 2, .6, "#1F1F24"); P(34.6, 10, .8, .8, "#E5533D"); P(36.2, 10, .8, 1, "#4A4A55"); o += `</g>`;
      o += `<g class="ms-arm-off">`; P(38, 8, .7, 3, "#C3CCD6"); o += `</g><g class="ms-arm-on">`; P(38, 8, .7, 2, "#C3CCD6"); P(37, 9.5, 1.2, .7, "#C3CCD6"); o += `</g>`;
      ["n1", "n2", "n3"].forEach((n, i) => { o += `<text class="ms-note ${n}" x="${33 + i * 1.5}" y="8" font-size="3" fill="${["#F5C842", "#F2B8C6", "#9ED3F0"][i]}">${i === 1 ? "♫" : "♪"}</text>`; });
    }
    /* evening: the whole room gets a little warmer and darker */
    if (ph === "night") P(-3, 0, 52, 27, "#0B0F2A", null, .18);
    return o;
  }
  const RAINY = new Set(["both", "pianorain", "rain"]);
  const curMode = () => { const c = document.querySelector('#musicModes [data-mm][aria-checked="true"]'); return c ? c.dataset.mm : ""; };
  const NOISE = new Set(["brown", "pink", "white"]);
  function musicScene() {
    const has = S.on === true && !!S.a, m = curMode(), rain = RAINY.has(m), kind = NOISE.has(m) ? "noise" : m === "rain" ? "rain" : "music";
    const pet = has ? `<g class="ms-pet">${rects(drawPet({}), 9, 1)}<g class="ms-blink">${rects(drawPet({ blink: true }), 9, 1)}</g></g>` : "";
    return `<svg viewBox="-3 0 51 26" shape-rendering="crispEdges" role="img" aria-label="${has ? esc(nameOf()) + " studying with music in a cozy room" : "A cozy study room with a record player"}">${studyRoom(rain, kind)}${pet}</svg>`;
  }
  function paintMusicScene() {
    const btn = document.getElementById("musicPlay"); if (!btn) return;
    let sc = btn.querySelector(".ms-scene");
    if (!sc) {
      btn.classList.add("ms-has");
      const cap = document.createElement("span"); cap.className = "ms-cap";
      [...btn.childNodes].forEach(n => cap.appendChild(n));
      sc = document.createElement("span"); sc.className = "ms-scene"; sc.setAttribute("aria-hidden", "true");
      btn.appendChild(sc); btn.appendChild(cap);
      const tip = document.createElement("span"); tip.className = "ms-tip"; tip.id = "msTip"; btn.appendChild(tip);
    }
    sc.innerHTML = musicScene();
    const has = S.on === true && !!S.a, tip = btn.querySelector("#msTip");
    if (tip) { tip.textContent = has ? "" : "Adopt a study buddy and it'll study here with you 🐾"; tip.hidden = !tip.textContent; }
    setPlayClasses(sc, btn);
  }
  function setPlayClasses(sc, btn) {
    const on = btn.getAttribute("aria-pressed") === "true", m = curMode();
    sc.classList.toggle("ms-on", on);
    sc.classList.toggle("ms-music", on && !NOISE.has(m) && m !== "rain");
    sc.classList.toggle("ms-noise", on && NOISE.has(m));
  }
  (function musicHook() {
    const btn = document.getElementById("musicPlay"); if (!btn) return;
    paintMusicScene();
    new MutationObserver(() => { const sc = btn.querySelector(".ms-scene"); if (sc) setPlayClasses(sc, btn); })
      .observe(btn, { attributes: true, attributeFilter: ["aria-pressed"] });
    const modes = document.getElementById("musicModes");
    if (modes) new MutationObserver(() => paintMusicScene()).observe(modes, { attributes: true, subtree: true, attributeFilter: ["aria-checked"] });
    const mb = document.getElementById("musicBtn"); if (mb) mb.addEventListener("click", () => setTimeout(paintMusicScene, 0));
    setInterval(() => { const p = document.getElementById("musicPanel"); if (p && !p.hidden) paintMusicScene(); }, 10 * 60000);
  })();

  /* the buddy keeps you company during the study timer: a few short, quiet messages (not in calm mode) */
  let tmSeen = { k: "" };
  document.addEventListener("cs-timer", () => {
    if (S.on !== true || root.hidden || !window.csTimer || document.documentElement.classList.contains("cs-calm")) return;
    const st = window.csTimer.state(); if (!st) return;
    const key = st.mode + ":" + st.len, mark = m => { if (tmSeen[m] === key) return false; tmSeen[m] = key; return true; };
    if (st.run && st.left >= st.len - 2 && mark("start")) { say(st.mode === "focus" ? `Let's focus for ${Math.round(st.len / 60)} minutes! I'll be right here 📚` : "Break time! Stand up, stretch, drink some water 💧", "", 4200); return; }
    if (st.run && st.mode === "focus" && st.len >= 600 && Math.abs(st.left - Math.round(st.len / 2)) <= 1 && mark("half")) { say("Halfway there! You're doing great ✨", "", 3500); return; }
    if (st.run && st.mode === "focus" && st.len >= 900 && st.left <= 300 && st.left >= 298 && mark("five")) { say("5 minutes left. Finish strong 💪", "", 3500); return; }
    if (!st.run && st.left === st.len && tmSeen.lastRun && tmSeen.lastMode === "focus" && st.mode !== "focus" && mark("done")) { hop(); say("You did it! 🍅 Time for a break. Stand up and stretch 🧘", "", 5000); }
    tmSeen.lastRun = st.run; tmSeen.lastMode = st.mode;
  });
  window.csBuddy = { get state() { return S; }, love() { if (S.on !== true) return; addFP(1); if (!root.hidden) { wake(); hop(); fx(["✨", "💛", "✨"]); say("Aww ✨ +1 friendship", "", 2400); } }, addFP, level, season, SEASONS, level, idle: () => { lastIdle = 0; lastAct = 0; idleTick(); }, IDLE, open: openModal, feed, pet: petIt, say: (h, acts, ms) => { if (S.on === true && !root.hidden) say(h, acts || "", ms || 8000); }, portrait: () => petSVG({ a: animal(), pal: palIdx(animal(), S.c | 0), wear: { head: S.head, face: S.face, neck: S.neck }, plain: true }), scene: () => stageSVG({ plain: true }).replace(/var\(--bd-sky\)/g, "#BFE3FF").replace(/var\(--bd-grass2\)/g, "#8CD47E").replace(/var\(--bd-grass\)/g, "#6CC06A"), name: () => nameOf(), items: ITEMS, counts, svg: petSVG, of: x => (x && SP[x.a] ? petSVG({ a: x.a, pal: palFor(x), wear: { head: x.head, face: x.face, neck: x.neck }, plain: true }) : ""),
    treat(n, why) { if (S.on !== true) return false; S.t = Math.min(MAXT + 15, (S.t | 0) + (n | 0)); save(); if (!root.hidden) { wake(); hop(); fx(["🍪", "✨", "🍪"]); } say(`${why ? why + " " : ""}+${n | 0} 🍪`, "", 5000); return true; }, reload() { S = load(); visible(); } };
})();

/* Cheat Sheet study buddy */
// 16x16 pixel sprites. 8-char rows are mirrored; 16-char rows are used as-is.
window.BUDDY_SPRITES={
max:{name:"Max",sub:"poodle-schnauzer mix",
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
miki:{name:"Miki",sub:"cocker spaniel",
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
cat:{name:"Cat",sub:"curious and cozy",
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
llama:{name:"Llama",sub:"calm and fluffy",
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
 colors:[["Cream",{}],["Chocolate",{b:"#9A6A45",s:"#7C5333",l:"#B98A62"}],["Gray",{b:"#B9B6B0",s:"#9A968F",l:"#D8D5CF"}],["Lilac",{b:"#D3C0EC",s:"#B49BD6",l:"#EADFF7"}],["Black",{b:"#3E3A38",s:"#2A2725",l:"#6A6460",o:"#141210"}],["Rainbow",{"1":"#E5533D","2":"#F59A2E","3":"#F5C842","4":"#F5C842","5":"#3BA776","6":"#3BA776","7":"#4FA3E8","8":"#9B6FE0","9":"#9B6FE0",sw:"linear-gradient(135deg,#E5533D,#F5C842,#3BA776,#4FA3E8,#9B6FE0)"}]]},
unicorn:{name:"Unicorn",sub:"sparkly, obviously",
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
 colors:[["Rainbow",{}],["Pastel",{r:"#F7B6C8",y:"#FBE3A0",g:"#B8EBCB",u:"#B7DBF8",v:"#D9C6F7"}],["Starry night",{b:"#3C3A6E",s:"#2C2A55",o:"#18163A",r:"#F5C842",y:"#FFFFFF",g:"#9FB6FF",u:"#C9A6E8",v:"#F5C842"}],["Pink",{b:"#FFE3EE",s:"#F7C6D8"}]]},
chicken:{name:"Chicken",sub:"small but brave",
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
    "....y..y"],
 colors:[["White",{}],["Yellow chick",{b:"#FFE27A",s:"#F5C842"}],["Brown hen",{b:"#B8743E",s:"#8F5428"}],["Black",{b:"#3A3A40",s:"#26262B"}]]},
pudu:{name:"Pudú",sub:"tiny Chilean deer",
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
 colors:[["Reddish brown",{}],["Dark brown",{b:"#6B4430",d:"#4E3020",l:"#A9805F"}],["Sandy",{b:"#C08A50",d:"#9C6A35",l:"#E8C79A"}],["Gray",{b:"#8E8378",d:"#6E655C",l:"#BDB4AA"}]]},
capybara:{name:"Capybara",sub:"chill level: maximum",
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
 colors:[["Classic",{}],["Sandy",{b:"#C99A5E",d:"#A57A44",l:"#DDB37E"}],["Chocolate",{b:"#7E5434",d:"#5E3C22",l:"#9C6E4C"}],["Pink (why not)",{b:"#F2B6C6",d:"#D98FA5",l:"#F8CDD8"}]]},
axolotl:{name:"Axolotl",sub:"always smiling",
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
  const ORDER = ["max", "miki", "cat", "llama", "unicorn", "chicken", "pudu", "capybara", "axolotl", "frog"];

  /* accessories: slot, unlocked at N saved words (w) or N learned words (l) */
  const AP = { r: "#E5533D", R: "#A8321F", y: "#F5C842", Y: "#D9A520", w: "#FFFFFF", k: "#1E1712", K: "#4A4A55", g: "#3BA776", G: "#2A7D54", b: "#3B6FD9", p: "#F37BA5", P: "#D9527F", v: "#8E5CD9", V: "#6B3FB5", u: "#6FB6F2", o: "#F5A623", c: "#F6E7CF", h: "#E8C987", H: "#B8924A", n: "#F28C28", N: "#C96A12" };
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
    { id: "timemachine", name: "Time machine", ico: "🕰️", slot: "toy", m: "ps", mt: "Past simple" }
  ];
  const byId = Object.fromEntries(ITEMS.map(i => [i.id, i]));

  /* ---------- state ---------- */
  function load() { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); return s && typeof s === "object" ? s : {}; } catch (e) { return {}; } }
  let S = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    try { window.__csOnSet && window.__csOnSet(KEY); } catch (e) {}
    try { publishPark(); } catch (e) {}
  }
  function publishPark() {
    const P = window.__csPark; if (!P || !P.signedIn()) return;
    if (S.on !== true || !S.a) { P.publish({ on: false }); return; }
    P.publish({ on: true, a: S.a, c: S.c | 0, n: String(S.n || "").slice(0, 16), head: S.head || null, face: S.face || null, neck: S.neck || null, lvl: typeof level === "function" ? level() : 1, words: counts().words, shiny: !!(S.shiny && S.mw >= 400) });
  }
  function counts() {
    let words = 0, learned = 0;
    try { const w = JSON.parse(localStorage.getItem("ncs-words") || "[]"); if (Array.isArray(w)) words = w.filter(x => x && x.w).length; } catch (e) {}
    try { const f = JSON.parse(localStorage.getItem("ncs-fc") || "{}"); learned = Object.values(f).filter(v => v >= 3).length; } catch (e) {}
    return { words, learned };
  }
  const modDone = m => { try { const p = (JSON.parse(localStorage.getItem("ncs-mods") || "{}") || {})[m] || {}; return [1, 2, 3, 4, 5, 6].every(n => ((p.b || {})[n] | 0) >= 7); } catch (e) { return false; } };
  const isOpen = it => { if (it.m) return modDone(it.m); const c = counts(); return it.w != null ? c.words >= it.w : c.learned >= it.l; };
  const lockTxt = it => it.m ? "when you finish " + it.mt : it.w != null ? it.w + " words" : it.l + " learned words";
  const animal = () => SP[S.a] ? S.a : "max";
  const palette = () => { const d = SP[animal()], c = d.colors[S.c | 0] || d.colors[0]; return Object.assign({}, d.p, c[1]); };
  const nameOf = () => (S.n && String(S.n).trim()) || SP[animal()].name;

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
    const RW = 40, RH = 26; let r = "";
    const R = (x, y, w, h, c) => { r += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`; };
    if (roomId === "room") {
      R(0, 0, RW, RH, "#F6E7CF"); for (let y = 2; y < 19; y += 4) for (let x = (y % 8 ? 2 : 4); x < RW; x += 4) R(x, y, 1, 1, "#EBD3B0");
      R(2, 3, 9, 8, "#7A5A3A"); R(3, 4, 7, 6, "#9ED3F0"); R(6, 4, 1, 6, "#7A5A3A"); R(3, 7, 7, 1, "#7A5A3A"); R(3, 4, 2, 1, "#FFFFFF");
      R(0, 19, RW, 7, "#C89463"); for (let x = 0; x < RW; x += 7) R(x, 19, 1, 7, "#B07E50"); R(10, 23, 20, 2, "#E5533D"); R(11, 23, 18, 1, "#F07A66");
    } else if (roomId === "night") {
      R(0, 0, RW, RH, "#1B2350"); R(0, 10, RW, 9, "#232E66");
      [[3, 2], [9, 5], [15, 1], [22, 4], [27, 2], [35, 6], [6, 9], [18, 8], [31, 10], [12, 12], [37, 13], [2, 14]].forEach(([x, y]) => R(x, y, 1, 1, "#FFFFFF"));
      R(31, 2, 4, 4, "#FFF3C4"); R(33, 2, 2, 2, "#1B2350"); R(0, 19, RW, 7, "#2A3A5A"); R(0, 19, RW, 1, "#3B4F78");
    } else if (roomId === "rainbow") {
      R(0, 0, RW, RH, "#CDEBFF"); const C = ["#F2716B", "#F9A35C", "#F9D25C", "#6FD39A", "#6FB6F2", "#B48CF0"];
      for (let y = 0; y < 19; y++) for (let x = 0; x < RW; x++) { const d = Math.hypot(x - 19.5, (y - 21) * 1.15); const i = Math.floor((19 - d) / 1.6); if (i >= 0 && i < C.length) R(x, y, 1, 1, C[i]); }
      R(0, 19, RW, 7, "#7ED07E"); R(0, 19, RW, 1, "#9BE09B");
    } else {
      R(0, 0, RW, RH, "var(--bd-sky)"); R(0, 20, RW, 6, "var(--bd-grass)"); R(0, 20, RW, 1, "var(--bd-grass2)");
    }
    const T = { timemachine: [33, 3, [".ooo.", "owkwo", "owkko", "owwwo", ".ooo.", "..o.."], { o: "#C79A3B", w: "#FFF6DC", k: "#3A2A1A" }], ball: [3, 21, [".rr.", "rwrr", "rrwr", ".rr."], { r: "#E5533D", w: "#FFFFFF" }], book: [31, 22, ["bbbbb", "bwwwb", "bbbbb"], { b: "#3B6FD9", w: "#FFFFFF" }],
      plant: [34, 14, ["g.g.", ".gg.", "gggg", ".gg.", "oooo", ".oo."], { g: "#3BA776", o: "#C0673A" }], lamp: [1, 11, ["yyyy", "yyyy", ".kk.", ".k..", ".k..", ".k..", ".k..", "kkk."], { y: "#F9D25C", k: "#4A3A2A" }],
      trophy: [28, 19, ["yyyyy", "yyyyy", ".yyy.", "..y..", ".kkk."], { y: "#F5C842", k: "#7A5A3A" }] };
    toys.forEach(t => { const d = T[t]; if (!d) return; d[2].forEach((row, dy) => [...row].forEach((ch, dx) => { if (d[3][ch]) R(d[0] + dx, d[1] + dy, 1, 1, d[3][ch]); })); });
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
  function stageSVG(opts) {
    opts = opts || {};
    const toys = ITEMS.filter(i => i.slot === "toy" && isOpen(i)).map(i => i.id);
    const room = opts.room !== undefined ? opts.room : S.room;
    return `<svg class="bd-stage-svg" viewBox="0 0 40 26" shape-rendering="crispEdges" role="img" aria-label="${esc(nameOf())}">${roomSVG(room, toys)}<g class="bd-stg-pet" id="${opts.plain ? "" : "bdStgPet"}">${rects(drawPet(opts), 10, 0)}</g>${opts.plain ? "" : gardenSVG()}</svg>`;
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
.bd-bub .bd-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}
.bd-bub .bd-msg+.bd-acts{margin-top:8px}
.bd-b{all:unset;box-sizing:border-box;cursor:pointer;font:800 13px var(--body,sans-serif);padding:6px 10px;border-radius:999px;border:1.5px solid var(--line,#ddd);background:var(--surface-2,var(--surface,#fff));color:var(--ink,#222);white-space:nowrap}
.bd-b:hover{border-color:var(--green,#2E8B57)}
.bd-b:focus-visible{outline:3px solid var(--bright,#5BD38E)}
.bd-b.go{background:var(--green,#2E8B57);border-color:var(--green,#2E8B57);color:#fff}
.bd-b[disabled]{opacity:.45;cursor:not-allowed}
.bd-mini{all:unset;position:fixed;right:calc(24px + env(safe-area-inset-right,0px));bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:14;cursor:pointer;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:17px;background:var(--surface,#fff);border:1.5px solid var(--line,#ddd);box-shadow:0 4px 12px rgba(0,0,0,.12)}
.bd-mini[hidden]{display:none}
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
.bd-pv{margin:10px 0 -4px;font-size:13.5px;background:color-mix(in srgb,#F5B800 16%,var(--surface,#fff));border:1.5px solid color-mix(in srgb,#F5B800 50%,var(--line,#ddd));border-radius:12px;padding:7px 10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.bd-pv .bd-b{margin-left:auto;padding:4px 10px}
.bd-stage-svg{display:block;width:100%;height:auto;image-rendering:pixelated;cursor:pointer}
.bd-name{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.bd-name input{font:800 17px var(--body,sans-serif);color:var(--ink,#222);background:transparent;border:1.5px dashed var(--line,#ddd);border-radius:10px;padding:5px 9px;width:12ch;min-width:0}
.bd-treats{margin-left:auto;font:800 14px var(--body,sans-serif);white-space:nowrap}
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
.bd-stbub{position:absolute;left:50%;top:8px;transform:translateX(-50%);max-width:86%;background:var(--surface,#fff);color:var(--ink,#222);border:1.5px solid var(--line,#ddd);border-radius:12px;padding:6px 10px;font:700 13px/1.35 var(--body,sans-serif);box-shadow:0 6px 16px rgba(0,0,0,.18);text-align:center;animation:bdPop .25s ease-out}
.bd-stbub[hidden]{display:none}
@keyframes bdPop{from{opacity:0;transform:translate(-50%,6px)}to{opacity:1;transform:translate(-50%,0)}}
html.cs-calm .bd-prop{display:none}
html.cs-calm .bd-pet .bd-svg,html.cs-calm .bd-pet.hop .bd-svg,html.cs-calm .bd-pet.walk .bd-svg{animation:none}
html.cs-calm .bd-shiny::before,html.cs-calm .bd-shiny::after{animation:none;opacity:.8}
html.cs-calm .bd-z{animation:none;opacity:.8}
@media (prefers-reduced-motion:reduce){.bd-pet .bd-svg,.bd-pet.hop .bd-svg,.bd-pet.walk .bd-svg{animation:none}}
@media (max-width:640px){.bd{bottom:calc(74px + env(safe-area-inset-bottom,0px));right:calc(12px + env(safe-area-inset-right,0px))}.bd-pet{width:64px;height:70px}.bd-bub{max-width:min(260px,calc(100vw - 100px));margin-bottom:28px}}
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
    if (!on) { if (favKey) { favKey = ""; l.setAttribute("href", favOrig); l.removeAttribute("type"); } return; }
    const key = [animal(), S.c | 0, S.head, S.face, S.neck, S.seas, season() && season().id].join("|"); if (key === favKey) return; favKey = key;
    const svg = petSVG().replace('<svg class="bd-svg" viewBox="0 0 20 22"', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.5 2.5 19 19"');
    l.setAttribute("type", "image/svg+xml"); l.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
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
    b.innerHTML = html; b.hidden = false; clearTimeout(stTimer); stTimer = setTimeout(() => { b.hidden = true; }, Math.min(ms || 4000, 6000));
  }
  function say(html, acts, ms) {
    if (!modal.hidden && mode === "main") { if (html) setTimeout(() => stageSay(html, ms), 0); return; }
    clearTimeout(bubTimer);
    bub.innerHTML = (html ? `<div class="bd-msg">${html}</div>` : "") + (acts ? `<div class="bd-acts">${acts}</div>` : "");
    bub.hidden = false;
    if (ms !== 0) bubTimer = setTimeout(() => { bub.hidden = true; }, ms || 5000);
  }
  function hideBub() { clearTimeout(bubTimer); bub.hidden = true; }
  const menuActs = () => `<button class="bd-b go" type="button" data-bd="feed">🍪 Feed (${S.t | 0})</button><button class="bd-b" type="button" data-bd="open">⚙ ${esc(nameOf())}</button><button class="bd-b" type="button" data-bd="min" aria-label="Tuck your buddy away" title="Tuck away">🐾</button>`;

  /* ---------- friendship ---------- */
  const LV = [0, 20, 50, 100, 170, 260, 380, 530, 720, 950];
  const LV_WHAT = ["Blinks, bounces and naps", "Yawns and stretches", "Dances when you save a word", "Looks around curiously", "Watches butterflies 🦋", "Plays with its ball ⚽", "Hums along to your music 🎵", "Reads its book during the study timer 📖", "Spins and does happy jumps", "Best friends 💛"];
  if (S.fp != null && !S.fpm) { S.fpm = {}; S.fpm[S.a && SP[S.a] ? S.a : "max"] = S.fp | 0; }
  const fpOf = a => (S.fpm && S.fpm[a || animal()]) | 0;
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
    [6, () => { if (!isOpen(byId.ball)) return false; prop("⚽", "bd-ball", 2400); setTimeout(hop, 500); }],
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
    if (now - lastAct < 20000 || now - lastIdle < 45000) return;
    const opts = IDLE.filter(([n]) => l >= n);
    if (!opts.length) return;
    lastIdle = now;
    const f = opts[Math.floor(Math.random() * opts.length)][1];
    if (f() === false) yawn();
  }
  setInterval(idleTick, 5000);

  /* ---------- actions ---------- */
  function petIt() {
    hop(); fx(["💛", "🩷", "💛"]);
    if (!S.pd || S.pd[0] !== today()) S.pd = [today(), 0];
    if (S.pd[1] < 10) { S.pd[1]++; addFP(1); }
    refreshPanel(document.activeElement && document.activeElement.dataset && document.activeElement.dataset.m === "pet" ? '[data-m="pet"]' : null, ["💛", "🩷", "💛"]);
    say(Math.random() < .35 ? "" : chatLine(), menuActs(), 6500);
  }
  function pvOpts(extra) {
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
    say(["Nom nom! 😋", "Yum, thank you!", "Delicious 🍪", "*happy crunching*"][Math.floor(Math.random() * 4)], menuActs(), 4000);
    refreshPanel('[data-m="feed"]', ["🍪", "😋", "💛"]);
  }
  function setMin(v) { S.min = !!v; save(); hideBub(); visible(); if (!v) { petBtn.focus(); hop(); } else mini.focus(); }

  petBtn.addEventListener("click", () => {
    wake();
    if (S.on === undefined) { openModal("adopt"); return; }
    petIt();
  });
  mini.addEventListener("click", () => setMin(false));
  bub.addEventListener("click", e => {
    const b = e.target.closest("[data-bd]"); if (!b) return;
    const a = b.dataset.bd;
    if (a === "feed") feed(); else if (a === "open") { hideBub(); openModal(); } else if (a === "min") setMin(true);
    else if (a === "adopt") { hideBub(); openModal("adopt"); } else if (a === "later") { hideBub(); }
  });

  /* ---------- panel ---------- */
  let mode = "main", draft = null, returnFocus = null, pv = null;
  const pvAnimal = () => (mode === "adopt" ? draft.a : animal());
  const palIdx = (a, c) => Object.assign({}, SP[a].p, (SP[a].colors[c | 0] || SP[a].colors[0])[1]);
  function pvBanner() {
    if (!pv) return "";
    const a = pvAnimal();
    const what = pv.c != null ? `<b>${esc(SP[a].colors[pv.c][0])}</b> · unlocks at ${COLOR_AT[pv.c]} words` : (() => { const it = byId[pv.item]; return `<b>${esc(it.name)}</b> · unlocks ${it.m ? "" : "at "}${lockTxt(it)}`; })();
    return `<div class="bd-pv" role="status">👀 Preview: ${what} <button class="bd-b" type="button" data-m="pvoff">Back to my buddy</button></div>`;
  }
  function openModal(m) {
    mode = m || "main"; returnFocus = document.activeElement; pv = null;
    draft = mode === "adopt" ? { a: S.a && SP[S.a] ? S.a : "max", c: S.c | 0, n: S.n || "" } : null;
    renderModal(); back.hidden = false; modal.hidden = false;
    setTimeout(() => { const f = modal.querySelector(mode === "adopt" ? ".bd-animal[aria-pressed=true]" : "#bdClose"); if (f) f.focus(); }, 30);
  }
  function closeModal() { pv = null; modal.hidden = true; back.hidden = true; if (returnFocus && returnFocus.focus) try { returnFocus.focus(); } catch (e) {} }
  back.addEventListener("click", closeModal);
  modal.addEventListener("keydown", e => {
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key === "Tab") { const f = [...modal.querySelectorAll("button:not([disabled]),input,[tabindex='0']")].filter(x => x.offsetParent); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  function animalGrid(sel, col) {
    return `<div class="bd-animals" role="group" aria-label="Choose an animal">${ORDER.map(id => `<button class="bd-animal" type="button" data-pick="${id}" aria-pressed="${id === sel}">${petSVG({ a: id, pal: id === sel ? Object.assign({}, SP[id].p, (SP[id].colors[col | 0] || SP[id].colors[0])[1]) : SP[id].p, wear: {}, plain: true })}${esc(SP[id].name)}${SP[id].species ? `<small style="display:block;font-size:10px;color:var(--muted,#777);font-weight:600">${esc(SP[id].species)}</small>` : ""}${fpOf(id) ? `<small style="display:block;font-size:10.5px;color:var(--muted,#777)">💛 ${level(id)}</small>` : ""}</button>`).join("")}</div>`;
  }
  const COLOR_AT = [0, 0, 10, 20, 35, 50];
  const colorOpen = i => counts().words >= (COLOR_AT[i] || 0);
  function swatches(id, sel) {
    const d = SP[id], next = d.colors.findIndex((x, i) => !colorOpen(i));
    return `<div class="bd-sw" role="group" aria-label="Choose a color">${d.colors.map(([n, p], i) => { const open = colorOpen(i); return `<button type="button" data-col="${i}" aria-pressed="${i === sel}" aria-label="${esc(n)}${open ? "" : ", unlocks at " + COLOR_AT[i] + " words"}" title="${esc(n)}${open ? "" : " · unlocks at " + COLOR_AT[i] + " words"}" ${open ? "" : 'aria-disabled="true"'} class="${open ? "" : "locked"}${pv && pv.c === i ? " pv" : ""}" style="background:${p.sw || (id === "unicorn" ? (p.b || p.r || d.p.r) : (p.b || d.p.b))}">${open ? "" : "🔒"}</button>`; }).join("")}<span>${esc((d.colors[sel] || d.colors[0])[0])}${next > 0 ? ` · next color at ${COLOR_AT[next]} words` : ""}</span></div>`;
  }
  function renderModal() {
    if (mode === "adopt") {
      const d = draft, pal = Object.assign({}, SP[d.a].p, (SP[d.a].colors[d.c] || [0, {}])[1]);
      modal.innerHTML = `<div class="bd-top"><h3 id="bdTitle">Adopt a study buddy 🐾</h3><button class="bd-x" id="bdClose" type="button" aria-label="Close">×</button></div>
        <p class="bd-small" style="margin-top:8px">A little friend who keeps you company while you study. Feed it treats you earn by saving words and practicing. It never gets sick or sad if you're away, it just naps.</p>
        ${pvBanner()}<div class="bd-stage">${stageSVG({ a: d.a, pal: pv && pv.c != null ? palIdx(d.a, pv.c) : pal, wear: {}, room: null, plain: true })}</div>
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
      return `<button type="button" data-wear="${slot}" data-item="${it.id}" aria-pressed="${on}" ${open ? "" : 'aria-disabled="true" data-locked="1"'} class="bd-chip${open ? "" : " locked"}${pv && pv.item === it.id ? " pv" : ""}" title="${open ? esc(it.name) : "Tap to preview · unlocks " + (it.m ? "" : "at ") + lockTxt(it)}">${open ? it.ico : "🔒"} ${esc(it.name)}${open ? (seen.has(it.id) ? "" : ' <span class="bd-new">NEW</span>') : ` <small>· ${it.m ? "⏪" : it.w != null ? it.w : it.l}</small>`}</button>`;
    };
    const slotRow = (slot, label) => `<div style="margin-bottom:10px"><div class="bd-small" style="margin:0 0 5px;font-weight:700">${label}</div><div class="bd-row"><button class="bd-chip" type="button" data-wear="${slot}" data-item="" aria-pressed="${!S[slot]}">${slot === "room" ? "🌱 Garden" : "None"}</button>${ITEMS.filter(i => i.slot === slot).map(i => chip(i, slot === "room" ? "room" : slot)).join("")}</div></div>`;
    const legend = isOpen(byId.legend);
    modal.innerHTML = `<div class="bd-top"><h3 id="bdTitle">${legend ? "⭐ " : ""}${level() >= 10 ? "💛 " : ""}Your study buddy</h3><button class="bd-x" id="bdClose" type="button" aria-label="Close">×</button></div>
      ${pvBanner()}<div class="bd-stage${S.shiny && isOpen(byId.shiny) ? " bd-shiny" : ""}" id="bdStage" title="Tap to pet">${stageSVG(pvOpts())}</div>
      <div class="bd-name"><input id="bdNameIn" type="text" maxlength="16" value="${esc(nameOf())}" aria-label="Your buddy's name" autocomplete="off"><span class="bd-treats" title="Treats">🍪 ${S.t | 0} / ${MAXT}</span></div>
      <div class="bd-row" style="margin-top:10px"><button class="bd-b go" type="button" data-m="feed">🍪 Feed</button><button class="bd-b" type="button" data-m="pet">🤚 Pet</button></div>
      <p class="bd-small">Earn treats: <b>+1</b> for each new word you save, <b>+3</b> for each flashcard round, <b>+2</b> for each grammar round (3 a day), up to ${MAXT}. Your buddy eats up to ${FEED_PER_DAY} treats a day.</p>
      <h4>Friendship</h4>
      ${(() => { const l = level(), p = fpOf(), nxt = LV[l]; return `<div class="bd-prog"><span class="bd-hearts" aria-label="Friendship level ${l} of 10">${"💛".repeat(l)}<span style="opacity:.25">${"🤍".repeat(10 - l)}</span></span> <b>Level ${l}</b>${l >= 10 ? " · best friends!" : ""}</div>${nxt ? `<div class="bd-bar" aria-hidden="true"><i style="width:${Math.max(4, Math.round((p - LV[l - 1]) / (nxt - LV[l - 1]) * 100))}%"></i></div><div class="bd-small" style="margin:0">Next: <b>${esc(LV_WHAT[l])}</b></div>` : ""}<p class="bd-small">Friendship grows when you feed your buddy (<b>+3</b>), pet it (<b>+1</b>, up to 10 a day) and visit (<b>+2</b> a day). New levels unlock new things it does on its own, and it starts sharing little English tips.</p>`; })()}
      <h4>Your progress</h4>
      <div class="bd-prog"><b>${c.words}</b> ${c.words === 1 ? "word" : "words"} saved${nextW ? ` · next: ${nextW.ico} <b>${esc(nextW.name)}</b> at ${nextW.w}` : " · everything unlocked! 🎉"}</div>
      ${nextW ? `<div class="bd-bar" aria-hidden="true"><i style="width:${pct(c.words, prevW ? prevW.w : 0, nextW.w)}%"></i></div>` : ""}
      <div class="bd-prog"><b>${c.learned}</b> ${c.learned === 1 ? "word" : "words"} learned${nextL ? ` · next: ${nextL.ico} <b>${esc(nextL.name)}</b> at ${nextL.l}` : " · every toy unlocked! 🎉"}</div>
      ${nextL ? `<div class="bd-bar" aria-hidden="true"><i style="width:${pct(c.learned, prevL ? prevL.l : 0, nextL.l)}%"></i></div>` : ""}
      <p class="bd-small" style="margin-top:0">A word counts as <b>learned</b> when you tap <b>✓ I knew it</b> on it 3 times in flashcards. Toys show up in your buddy's room.</p>
      <div class="bd-prog">⏪ <b>Grammar:</b> ${modDone("ps") ? "🕰️ Time machine unlocked! 🎉" : `finish the <b>Past simple</b> module in Practice to get the 🕰️ <b>Time machine</b>`}</div>
      <h4>Wardrobe</h4>${slotRow("head", "Head")}${slotRow("face", "Face")}${slotRow("neck", "Neck")}
      <h4>Room</h4>${slotRow("room", "Background")}
      ${(() => { const n = (S.gd || []).length; return `<p class="bd-small" style="margin:0 0 8px">🌱 <b>Study garden:</b> ${n ? `${n} ${n === 1 ? "flower" : "flowers"}. ` : ""}A new flower grows in front of your buddy on every day you study (save a word or practice flashcards). Missed days don't matter, your flowers stay.${n > 38 ? ` (Showing your newest 38.)` : ""}</p>`; })()}
      ${(() => { const se = season(); return `<label class="bd-row" style="align-items:center;gap:8px;font-size:14px;cursor:pointer;margin-bottom:8px"><input type="checkbox" id="bdSeas" ${S.seas !== false ? "checked" : ""}> 🗓️ Seasonal outfits${se ? ` <span class="bd-small" style="margin:0">(now: ${se.ico} ${esc(se.name)})</span>` : ` <span class="bd-small" style="margin:0">(Halloween, Christmas, Fiestas Patrias and more)</span>`}</label>`; })()}
      ${isOpen(byId.shiny) ? `<label class="bd-row" style="align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" id="bdShiny" ${S.shiny ? "checked" : ""}> ✨ Shiny sparkles</label>` : `<p class="bd-small">🔒 <b>Shiny sparkles</b> at 400 words · ⭐ <b>Legend star</b> at 1,000 words</p>`}
      <h4>Change your buddy</h4>${animalGrid(animal(), S.c | 0)}${swatches(animal(), S.c | 0)}
      <div class="bd-foot"><button class="bd-link" type="button" data-m="hide">Hide my buddy</button><button class="bd-b" type="button" data-m="close">Done</button></div>`;
    // everything visible in the panel counts as seen
    const opened = ITEMS.filter(isOpen).map(i => i.id); if (opened.some(i => !seen.has(i))) { S.seen = opened; save(); }
  }
  modal.addEventListener("click", e => {
    if (e.target.closest("#bdClose")) { closeModal(); return; }
    const pick = e.target.closest("[data-pick]"), col = e.target.closest("[data-col]"), m = e.target.closest("[data-m]"), w = e.target.closest("[data-wear]");
    if (mode === "adopt") {
      const nin = $("bdNameIn"); if (nin) draft.n = nin.value;
      if (pick) { pv = null; draft.a = pick.dataset.pick; draft.c = 0; renderModal(); modal.querySelector(`[data-pick="${draft.a}"]`).focus(); return; }
      if (m && m.dataset.m === "pvoff") { pv = null; renderModal(); return; }
      if (col && !colorOpen(+col.dataset.col)) { pv = { c: +col.dataset.col }; renderModal(); const f = modal.querySelector(`[data-col="${pv.c}"]`); if (f) f.focus(); return; }
      if (pick) pv = null;
      if (col) { pv = null; draft.c = +col.dataset.col; renderModal(); modal.querySelector(`[data-col="${draft.c}"]`).focus(); return; }
      if (m && m.dataset.m === "adopt") {
        favKey = ""; S.on = true; S.hi = today(); S.a = draft.a; S.c = draft.c; S.n = draft.n.trim().slice(0, 16);
        if (S.t == null) S.t = START_T; if (S.mw == null) S.mw = counts().words; S.min = false; S.seen = ITEMS.filter(isOpen).map(i => i.id);
        save(); closeModal(); visible(); hop(); fx(["💛", "🎉", "💛"]);
        say(`Hi! I'm <b>${esc(nameOf())}</b> 👋 I brought ${S.t} treats. Tap me anytime.`, menuActs(), 7000);
        updateToggle();
        return;
      }
      if (m && m.dataset.m === "nothanks") { S.on = false; save(); closeModal(); visible(); updateToggle(); toastMsg("No problem. You can adopt a buddy anytime in Settings."); return; }
      return;
    }
    if (pick) { pv = null; S.a = pick.dataset.pick; S.c = 0; save(); renderModal(); paintPet(); modal.querySelector(`[data-pick="${S.a}"]`).focus(); return; }
    if (m && m.dataset.m === "pvoff") { pv = null; renderModal(); return; }
    if (col && !colorOpen(+col.dataset.col)) { pv = { c: +col.dataset.col }; renderModal(); const f = modal.querySelector(`[data-col="${pv.c}"]`); if (f) f.focus(); return; }
    if (w && w.dataset.locked) { pv = { slot: w.dataset.wear, item: w.dataset.item }; renderModal(); const f = modal.querySelector(`[data-wear="${pv.slot}"][data-item="${pv.item}"]`); if (f) f.focus(); return; }
    if (pick || col || w) pv = null;
    if (col) { S.c = +col.dataset.col; save(); renderModal(); paintPet(); modal.querySelector(`[data-col="${S.c}"]`).focus(); return; }
    if (w) { const slot = w.dataset.wear; S[slot] = w.dataset.item || null; save(); renderModal(); paintPet(); const f = modal.querySelector(`[data-wear="${slot}"][data-item="${w.dataset.item}"]`); if (f) f.focus(); return; }
    if (e.target.closest("#bdStage")) { petIt(); return; }
    if (m) {
      const a = m.dataset.m;
      if (a === "feed") feed(); else if (a === "pet") petIt(); else if (a === "close") closeModal();
      else if (a === "hide") { S.on = false; save(); closeModal(); visible(); updateToggle(); toastMsg("Your buddy is napping. Bring it back anytime in Settings."); }
    }
  });
  modal.addEventListener("input", e => {
    if (e.target.id !== "bdNameIn") return;
    if (mode === "adopt") { draft.n = e.target.value; const b = modal.querySelector('[data-m="adopt"]'); if (b) b.textContent = "Adopt " + (draft.n.trim() || SP[draft.a].name) + "!"; return; }
    S.n = e.target.value.slice(0, 16); save(); paintPet();
  });
  modal.addEventListener("change", e => { if (e.target.id === "bdSeas") { S.seas = e.target.checked; save(); renderModal(); paintPet(); return; } if (e.target.id === "bdShiny") { S.shiny = e.target.checked; save(); renderModal(); paintPet(); } });
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
      const old = S.t | 0; S.t = Math.min(MAXT, old + gain); markStudy(); save();
      const unlocked = ITEMS.filter(i => i.w != null && before < i.w && c.words >= i.w);
      wake(); hop();
      if (unlocked.length) { fx(["🎉", "✨", "🎉"]); say(`🎉 New for ${esc(nameOf())}: <b>${unlocked.map(i => i.ico + " " + esc(i.name)).join(", ")}</b>!`, `<button class="bd-b go" type="button" data-bd="open">Try it on</button>`, 9000); }
      else if (S.t > old) { if (level() >= 3) anim("bd-dance", 1300); fx("🍪", 1); say(`+${S.t - old} 🍪 Nice word!`, "", 2600); }
      else say("Treat jar's full (30) 🍪 Time for a snack?", menuActs(), 4000);
    }
  }
  document.addEventListener("cs-said", () => {
    if (S.on !== true) return;
    const grew = markStudy(); wake(); hop(); fx(["🎤", "💛", "✨"]);
    say("I heard you! Great pronunciation 🎤" + (grew ? "<br>🌱 A new flower grew in your garden!" : ""), "", 3000);
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
    let gave = 0; if (S.sd[1] < 5 && (S.t | 0) < MAXT) { S.sd[1]++; S.t = (S.t | 0) + 1; gave = 1; }
    save(); wake(); hop(); fx(["✍️", "💛", "✨"]);
    say((e.detail && e.detail.result === "great" ? "What a sentence! 🎉" : "Nice try, you're close! 👍") + (gave ? " +1 🍪" : "") + (grew ? "<br>🌱 A new flower grew in your garden!" : ""), "", 3500);
  });
  document.addEventListener("cs-modround", e => {
    if (S.on !== true) return;
    const d = e.detail || {};
    if (!S.md || S.md[0] !== today()) S.md = [today(), 0];
    let gave = 0; if (S.md[1] < 3) { S.md[1]++; const old = S.t | 0; S.t = Math.min(MAXT, old + 2); gave = S.t - old; }
    if (d.perfect) addFP(3);
    const grew = markStudy(); save(); wake(); hop();
    if (d.finished) { fx(["🎉", "🕰️", "🎉"]); say(`🎉 You finished the past simple! New toy for ${esc(nameOf())}: <b>🕰️ Time machine</b>`, `<button class="bd-b go" type="button" data-bd="open">See it</button>`, 9000); return; }
    fx(d.perfect ? ["⭐", "💛", "⭐"] : ["🍪", "💛", "✨"]);
    say((d.perfect ? "Perfect round! ⭐ +3 friendship" : "Round done! 💪") + (gave ? ` +${gave} 🍪` : "") + (grew ? "<br>🌱 A new flower grew in your garden!" : ""), "", 4000);
  });
  document.addEventListener("cs-weekgoal", () => {
    if (S.on !== true) return;
    const old = S.t | 0; S.t = Math.min(MAXT, old + 5); addFP(5); save(); wake(); hop(); fx(["🎯", "🎉", "💛"]);
    say(`Weekly goal done! 🎯 +5 friendship${S.t > old ? ` and +${S.t - old} 🍪` : ""}`, "", 5000);
  });
  document.addEventListener("cs-fcround", () => {
    if (S.on !== true) return;
    const c = counts(), before = S.lc == null ? c.learned : S.lc; S.lc = c.learned;
    const old = S.t | 0; S.t = Math.min(MAXT, old + 3); markStudy(); save(); wake(); hop(); fx(["🍪", "💛", "🍪"]);
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
    p.insertBefore(sec, last);
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
  async function claimLove() {
    const P = window.__csPark; if (!P || !P.claim || S.on !== true) return;
    let got = []; try { got = await P.claim(); } catch (e) { return; }
    if (!got.length) return;
    if (!S.fpm) S.fpm = {};
    got.forEach(h => { const a = SP[h.a] ? h.a : animal(); S.fpm[a] = ((S.fpm[a]) | 0) + 2; });
    save();
    const names = [...new Set(got.map(h => h.first).filter(Boolean))];
    const who = names.length ? (names.length > 2 ? names.slice(0, 2).join(", ") + " and " + (names.length - 2) + " more" : names.join(" and ")) : (got.length === 1 ? "A friend" : got.length + " friends");
    setTimeout(() => { if (root.hidden) return; wake(); hop(); fx(["💛", "💌", "💛"]); say(`💌 <b>${esc(who)}</b> sent your buddy love in the Buddy park! +${got.length * 2} friendship`, `<button class="bd-b" type="button" data-bd="open">See ${esc(nameOf())}</button>`, 9000); }, 3500);
  }
  /* ---------- buddy park ---------- */
  const DECO = [["🌳", 3, 16], ["🌲", 90, 18], ["🌳", 2, 70], ["🌲", 92, 74], ["🌷", 24, 92], ["🌼", 70, 93], ["🌻", 47, 95], ["☁️", 20, 3], ["☁️", 72, 5], ["🌼", 12, 44], ["🌷", 86, 46]]
    .map(([e, x, y]) => `<span class="park-deco" style="left:${x}%;top:${y}%" aria-hidden="true">${e}</span>`).join("");
  let parkBusy = false;
  function palFor(x) { const d = SP[x.a]; return Object.assign({}, d.p, (d.colors[x.c | 0] || d.colors[0])[1]); }
  async function renderPark() {
    const el = $("parkArea"), v = $("v-park"); if (!el || !v || v.hidden || parkBusy) return;
    const msg = h => { el.innerHTML = DECO + `<div class="park-msg"><div>${h}</div></div>`; };
    const P = window.__csPark;
    if (!P) { msg("Opening the park gates… 🌳"); setTimeout(renderPark, 1500); return; }
    if (!P.signedIn()) { msg(`<b>Sign in to visit the park 🌳</b><p class="bd-small">The park shows the study buddies of everyone who uses the Cheat Sheet: club members in the middle, private students around the edges.</p><button class="bd-b go" type="button" data-park="signin">Sign in with Google</button>`); return; }
    parkBusy = true; msg("Opening the park gates… 🌳");
    let list = [];
    try { list = await P.list(); }
    catch (e) { parkBusy = false; msg(/permission/i.test(String(e && (e.code || e.message))) ? "The park isn't open yet. Check back soon! 🌳" : `Couldn't load the park. <button class="bd-b" type="button" data-park="retry">Try again</button>`); return; }
    parkBusy = false;
    const mine = list.find(x => x.me);
    list = list.filter(x => !x.me && x.on && SP[x.a] && !(x.role && x.role.hidden));
    if (S.on === true && S.a) list.push({ me: true, words: counts().words, a: S.a, c: S.c | 0, n: S.n, head: S.head, face: S.face, neck: S.neck, lvl: level(), role: mine ? mine.role : {}, first: "" });
    if (!list.length) { msg(`The park is empty right now. <b>Adopt a buddy</b> to be the first one here! 🥚<br><button class="bd-b go" type="button" data-park="adopt" style="margin-top:10px">Adopt a buddy</button>`); return; }
    const club = list.filter(x => !(x.role && x.role.club === false)), priv = list.filter(x => x.role && x.role.club === false);
    const pos = [];
    club.forEach((x, i) => { const n = club.length; if (n === 1) { pos.push([x, 50, 54]); return; } const inner = n > 7 && i % 2; const ang = i / n * Math.PI * 2 - Math.PI / 2; const r = inner ? .45 : 1; pos.push([x, 50 + Math.cos(ang) * 19 * r, 54 + Math.sin(ang) * 17 * r]); });
    priv.forEach((x, i) => { const n = priv.length; const ang = i / n * Math.PI * 2 + Math.PI / 4; pos.push([x, Math.max(9, Math.min(91, 50 + Math.cos(ang) * 39)), Math.max(24, Math.min(84, 55 + Math.sin(ang) * 30))]); });
    const wc = x => (x.me ? counts().words : x.words | 0);
    el.innerHTML = `<div class="park-zoom" role="group" aria-label="Zoom"><button type="button" data-pz="-1" aria-label="Zoom out">−</button><button type="button" data-pz="0" aria-label="Fit the whole park">⤢</button><button type="button" data-pz="1" aria-label="Zoom in">+</button></div>
      <div class="park-vp" id="parkVp"><div class="park-world" id="parkWorld">${DECO}${pos.map(([x, l, t]) => {
      const bn = (x.n && String(x.n).trim()) || SP[x.a].name, owner = x.me ? "You" : (x.first ? x.first + "'s buddy" : "");
      const info = `${owner ? `<b>${esc(owner)}</b>` : ""}${x.lvl > 1 ? ` · 💛 ${x.lvl | 0}` : ""}<br>📚 ${wc(x)} ${wc(x) === 1 ? "word" : "words"}`;
      return `<button class="park-b${x.me ? " me" : ""}" type="button" data-uid="${x.me ? "" : esc(x.uid || "")}" data-a="${esc(x.a)}" data-bn="${esc(bn)}" data-lvl="${x.lvl | 0 || 1}" data-zone="${x.role && x.role.club === false ? "p" : "c"}" style="left:${l}%;top:${t}%" aria-label="${esc(bn)}${owner ? ", " + esc(x.me ? "your buddy" : x.first + "'s buddy") : ""}, ${wc(x)} words, friendship level ${x.lvl | 0 || 1}"><span class="pinfo" aria-hidden="true">${info}</span><span class="pb-flip">${petSVG({ a: x.a, pal: palFor(x), wear: { head: x.head, face: x.face, neck: x.neck }, plain: true })}</span><span class="pn">${esc(bn)}</span></button>`;
    }).join("")}</div></div>`;
    applyZoom(false); startPark(); dropTreat();
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
    if (zone === "p") { const a = Math.random() * Math.PI * 2, r = .82 + Math.random() * .2; return [Math.max(7, Math.min(93, 50 + Math.cos(a) * 39 * r)), Math.max(24, Math.min(86, 55 + Math.sin(a) * 30 * r))]; }
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * .95; return [50 + Math.cos(a) * 23 * r, 54 + Math.sin(a) * 20 * r];
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
    const old = S.t | 0; S.t = Math.min(MAXT, old + 2); S.pt = [today()]; S.pr = [today(), 0]; save();
    b.remove();
    const got = S.t - old;
    toastMsg(got ? `You found ${got === 2 ? "2 treats" : "a treat"} in the park! 🍪 (${S.t}/${MAXT})` : `You found a treat, but your bag is full (${MAXT}/${MAXT}). Feed your buddy first!`);
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
    if (pb && !pb.classList.contains("me") && pb.dataset.uid) sendLove(pb);
    if (pb) {
      document.querySelectorAll(".park-b.show-info").forEach(x => { if (x !== pb) x.classList.remove("show-info"); });
      pb.classList.add("show-info"); clearTimeout(pb._it); pb._it = setTimeout(() => pb.classList.remove("show-info"), 3500);
      pb.classList.remove("hop"); void pb.offsetWidth; pb.classList.add("hop"); setTimeout(() => pb.classList.remove("hop"), 1000);
      ["💛", "👋", "💛"].forEach((ch, i) => setTimeout(() => parkFx(pb, ch), i * 130));
      return;
    }
    const a = e.target.closest("[data-park]"); if (!a) return;
    if (a.dataset.park === "signin" && window.csSignIn) window.csSignIn(); else if (a.dataset.park === "retry") renderPark(); else if (a.dataset.park === "adopt") openModal("adopt");
  });
  (function watchPark() { const v = $("v-park"); if (!v) return; new MutationObserver(() => { if (!v.hidden) renderPark(); }).observe(v, { attributes: true, attributeFilter: ["hidden"] }); if (!v.hidden) renderPark(); })();
  window.addEventListener("cs-auth", e => { if (e.detail && e.detail.signedIn) { setTimeout(publishPark, 2500); setTimeout(claimLove, 3000); } renderPark(); });

  window.csBuddy = { get state() { return S; }, love() { if (S.on !== true) return; addFP(1); if (!root.hidden) { wake(); hop(); fx(["✨", "💛", "✨"]); say("Aww ✨ +1 friendship", "", 2400); } }, addFP, level, season, SEASONS, level, idle: () => { lastIdle = 0; lastAct = 0; idleTick(); }, IDLE, open: openModal, feed, pet: petIt, items: ITEMS, counts, svg: petSVG, reload() { S = load(); visible(); } };
})();

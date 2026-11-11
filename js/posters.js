/* Cut-paper poster art, drawn as inline SVG. One scene per dish, 1950s travel-poster style. */

const C = {
  paper: '#F6EEDC', ink: '#1E1B16', tomato: '#E0432B', brick: '#B5462F', mustard: '#F2B11B', ochre: '#C98A0A',
  teal: '#0F7C82', pine: '#0B4F53', avocado: '#7C9A2E', moss: '#4E6B1A', blue: '#1F3A6E', pink: '#F29CA3', sky: '#BFE0DC', blush: '#F6C9C0',
};

const P = (pts, fill) => `<polygon points="${pts}" fill="${fill}"/>`;
const O = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const D = (d, fill) => `<path d="${d}" fill="${fill}"/>`;

const SCENES = {
  marrakech: () => [C.mustard,
    O(215, 88, 56, C.tomato) +
    P('0,300 0,192 48,187 50,160 92,164 90,300', C.brick) +
    P('118,300 121,94 159,91 162,300', C.paper) +
    P('114,94 114,76 125,77 125,85 135,84 135,76 146,77 146,85 156,84 156,75 166,76 166,94', C.paper) +
    P('131,77 133,50 147,51 149,77', C.blue) +
    D('M132 150 Q132 128 140 127 Q148 128 148 150Z', C.ink) +
    P('160,300 163,171 233,166 237,300', C.pink) +
    O(198, 248, 21, C.ink) + P('177,248 219,248 219,300 177,300', C.ink) +
    P('235,300 238,206 300,200 300,300', C.teal) +
    P('263,300 268,150 277,151 275,300', C.ink) +
    P('272,152 224,128 246,152', C.avocado) + P('272,152 318,126 298,152', C.avocado) +
    P('272,152 238,104 262,134', C.moss) + P('272,152 306,102 284,134', C.moss) + P('272,152 268,94 281,130', C.avocado)],

  osaka: () => [C.blush,
    O(150, 122, 86, C.tomato) +
    P('66,300 84,238 216,238 234,300', C.ink) +
    P('94,240 97,204 203,204 206,240', C.paper) + P('68,210 100,187 200,187 232,210', C.blue) +
    P('111,188 114,159 186,159 189,188', C.paper) + P('90,164 116,144 184,144 210,164', C.blue) +
    P('125,145 128,121 172,121 175,145', C.paper) + P('106,126 150,96 194,126', C.blue) +
    P('140,240 141,218 159,218 160,240', C.ink) +
    D('M0 300 L0 274 Q19 258 38 274 Q57 258 76 274 Q95 258 114 274 Q133 258 152 274 Q171 258 190 274 Q209 258 228 274 Q247 258 266 274 Q285 258 300 272 L300 300Z', C.teal)],

  abuela: () => [C.teal,
    O(68, 78, 42, C.mustard) +
    P('0,300 0,214 70,190 150,211 230,180 300,200 300,300', C.tomato) +
    P('184,238 195,150 235,150 246,238', C.paper) + P('191,151 215,121 239,151', C.ink) +
    `<g transform="rotate(24 215 138)" fill="${C.ink}"><rect x="211" y="72" width="8" height="132"/><rect x="149" y="134" width="132" height="8"/><rect x="219" y="76" width="16" height="50" opacity=".85"/><rect x="195" y="150" width="16" height="50" opacity=".85"/><rect x="227" y="142" width="50" height="16" opacity=".85"/><rect x="153" y="118" width="50" height="16" opacity=".85"/></g>` +
    P('208,238 209,214 221,214 222,238', C.ink) +
    P('0,300 0,251 90,232 190,256 300,236 300,300', C.mustard) +
    P('30,262 34,246 40,262', C.moss) + P('104,256 109,238 114,256', C.moss) + P('262,258 266,243 271,258', C.moss)],

  cairo: () => [C.blue,
    O(226, 70, 34, C.mustard) +
    P('44,40 47,47 54,48 48,52 50,59 44,55 38,59 40,52 34,48 41,47', C.paper) + P('120,62 122,67 127,68 123,71 124,76 120,73 116,76 117,71 113,68 118,67', C.paper) + O(84, 96, 2.5, C.paper) + O(168, 34, 2.5, C.paper) +
    P('208,300 262,214 300,278 300,300', C.pink) +
    P('58,300 160,118 262,300', C.mustard) + P('160,118 262,300 192,300', C.ochre) +
    P('0,300 54,204 110,300', C.tomato) + P('54,204 110,300 76,300', C.brick) +
    P('22,300 27,176 35,176 34,300', C.paper) +
    P('31,178 -8,160 12,180', C.avocado) + P('31,178 70,158 52,180', C.avocado) + P('31,178 4,134 24,164', C.avocado) + P('31,178 58,132 40,164', C.avocado)],

  bouneschlupp: () => [C.avocado,
    O(236, 66, 40, C.tomato) +
    P('0,300 0,196 300,184 300,300', C.paper) + P('0,172 300,160 300,186 0,198', C.paper) +
    D('M70 300 Q70 206 150 203 Q230 206 230 300Z', C.blue) +
    D('M12 300 Q12 238 34 237 Q56 238 56 300Z', C.blue) + D('M244 300 Q244 236 266 235 Q288 236 288 300Z', C.blue) +
    P('0,160 0,150 300,138 300,148', C.ink) +
    `<path d="M34 172 C8 130 66 108 42 66 C30 40 58 22 50 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>` +
    P('40,128 14,116 22,142', C.moss) + P('46,96 76,92 62,116', C.moss) + P('42,60 16,50 24,76', C.moss) + P('48,30 76,22 66,46', C.moss) +
    P('58,104 66,102 74,146 68,150', C.mustard) + P('28,70 35,70 34,112 28,114', C.mustard) + P('60,36 67,34 78,74 72,77', C.mustard)],

  forager: () => [C.pine,
    O(66, 64, 30, C.paper) +
    P('18,300 60,128 102,300', C.teal) + P('198,300 246,108 294,300', C.teal) +
    P('88,300 130,158 172,300', C.avocado) + P('-22,300 14,188 50,300', C.moss) + P('256,300 284,200 312,300', C.moss) +
    P('134,300 142,234 172,234 181,300', C.paper) +
    D('M98 242 Q104 170 158 167 Q212 170 218 242Z', C.tomato) +
    O(130, 212, 7, C.paper) + O(166, 194, 9, C.paper) + O(192, 222, 6, C.paper) + O(150, 228, 4, C.paper) +
    P('236,300 239,272 251,272 254,300', C.paper) + D('M222 275 Q226 248 245 247 Q264 248 268 275Z', C.mustard)],

  kolkata: () => [C.tomato,
    O(150, 112, 62, C.mustard) +
    `<g fill="none" stroke="${C.blue}" stroke-width="5" stroke-linejoin="round"><polyline points="0,215 60,150 75,150 150,205 225,150 240,150 300,215"/><path d="M30 215V183M110 215V176M150 215V205M190 215V176M270 215V183M30 183L60 215M110 176L75 215M190 176L225 215M270 183L240 215"/></g>` +
    P('57,230 60,138 78,138 80,230', C.blue) + P('220,230 222,138 240,138 243,230', C.blue) +
    P('0,213 300,213 300,228 0,228', C.blue) +
    P('0,228 300,228 300,300 0,300', C.teal) +
    P('92,262 168,262 154,280 106,280', C.ink) + P('126,258 129,220 160,256', C.paper) +
    P('200,284 250,281 252,286 202,289', C.pine) + P('20,254 62,251 63,256 22,259', C.pine)],

  istanbul: () => [C.pink,
    O(232, 70, 30, C.mustard) + O(244, 62, 26, C.pink) +
    P('29,300 33,118 44,118 47,300', C.paper) + P('30,120 38,92 46,120', C.ink) +
    P('253,300 257,118 268,118 271,300', C.paper) + P('254,120 262,92 270,120', C.ink) +
    D('M93 222 Q95 150 150 147 Q205 150 207 222Z', C.blue) + P('146,150 150,126 154,150', C.mustard) +
    D('M58 242 Q60 205 92 203 Q124 205 126 242Z', C.teal) + D('M174 242 Q176 205 208 203 Q240 205 242 242Z', C.teal) +
    P('48,300 51,238 249,235 252,300', C.blue) +
    D('M84 300 Q84 262 96 261 Q108 262 108 300Z', C.pink) + D('M138 300 Q138 258 150 257 Q162 258 162 300Z', C.pink) + D('M192 300 Q192 262 204 261 Q216 262 216 300Z', C.pink) +
    P('0,300 0,284 300,279 300,300', C.mustard)],

  hunter: () => [C.mustard,
    O(214, 82, 46, C.paper) +
    P('0,300 0,202 80,140 140,206 210,150 300,216 300,300', C.brick) +
    P('84,300 110,188 136,300', C.pine) + P('28,300 62,148 96,300', C.ink) +
    O(238, 206, 8, C.paper) + O(247, 188, 11, C.paper) + O(260, 166, 14, C.paper) +
    P('168,300 171,250 246,247 249,300', C.ink) + P('158,253 209,214 260,250', C.tomato) +
    P('228,232 229,212 241,212 242,238', C.ink) +
    P('186,282 186,264 203,264 203,282', C.mustard) +
    P('254,300 279,178 304,300', C.pine)],

  moselle: () => [C.sky,
    O(60, 70, 36, C.tomato) +
    P('0,300 0,172 90,130 180,166 300,120 300,300', C.avocado) +
    `<g stroke="${C.moss}" stroke-width="4" stroke-linecap="round"><path d="M10 190L84 150M22 208L120 158M40 224L150 170M200 172L292 140M210 190L296 160"/></g>` +
    P('214,198 216,160 233,160 235,198', C.paper) + P('213,161 225,126 237,161', C.tomato) +
    P('236,200 237,178 263,176 265,200', C.pink) + P('233,180 250,164 268,178', C.brick) +
    P('186,200 187,184 207,183 208,200', C.paper) + P('183,186 197,172 211,185', C.blue) +
    D('M300 214 C222 204 192 250 110 250 C60 250 30 276 0 270 L0 300 L300 300Z', C.blue) +
    P('120,270 160,267 162,272 122,275', C.paper)],

  nonna: () => [C.teal,
    O(226, 76, 44, C.mustard) +
    P('0,300 0,200 100,166 200,196 300,160 300,300', C.ochre) +
    P('139,201 141,172 185,170 187,199', C.paper) + P('133,175 163,151 193,173', C.tomato) + P('157,200 158,184 168,184 169,200', C.ink) +
    `<ellipse cx="60" cy="172" rx="10" ry="44" fill="${C.pine}"/><ellipse cx="86" cy="184" rx="8" ry="34" fill="${C.pine}"/><ellipse cx="252" cy="152" rx="11" ry="48" fill="${C.pine}"/>` +
    P('0,300 0,246 120,226 220,251 300,230 300,300', C.avocado) +
    `<g stroke="${C.moss}" stroke-width="4" stroke-linecap="round"><path d="M10 268L110 246M24 284L150 256M150 284L290 252"/></g>`],

  tadka: () => {
    let rays = '';
    for (let i = 0; i < 9; i++) {
      const a = Math.PI + (i + 0.5) * Math.PI / 9, w = 0.07;
      const pt = (r, da) => `${(150 + r * Math.cos(a + da)).toFixed(1)},${(262 + r * Math.sin(a + da)).toFixed(1)}`;
      rays += P(`${pt(128, -w)} ${pt(128, w)} ${pt(i % 2 ? 196 : 228, 0)}`, C.mustard);
    }
    return [C.tomato,
      O(150, 262, 112, C.mustard) + rays +
      P('0,300 0,250 300,246 300,300', C.blue) +
      P('74,300 86,258 214,258 226,300', C.ink) + P('212,262 284,244 288,254 218,278', C.ink) +
      P('90,262 210,262 206,270 94,270', C.ochre) +
      O(118, 236, 5, C.paper) + O(150, 214, 6, C.paper) + O(176, 238, 4, C.paper) + O(138, 190, 4, C.paper) + O(168, 180, 5, C.paper) + O(196, 212, 3.5, C.paper)];
  },
};

function posterSVG(d, alt) {
  const [bg, art] = SCENES[d.id]();
  const n = d.name.toUpperCase();
  const fs = n.length <= 6 ? 62 : n.length <= 9 ? 48 : 37;
  return `<svg class="poster" viewBox="0 0 300 400" role="img" aria-label="${alt || 'The ' + d.name}">
<rect width="300" height="400" fill="${bg}"/>${art}
<path d="M0 302 L44 296 L96 304 L162 295 L228 303 L300 297 L300 400 L0 400Z" fill="${C.paper}"/>
<text x="18" y="334" font-family="Yellowtail, cursive" font-size="27" fill="${C.tomato}">The</text>
<text x="282" y="328" text-anchor="end" font-family="'DM Sans', sans-serif" font-weight="700" font-size="11" letter-spacing="1.5" fill="${C.ink}">PLENA · N° ${String(d.no).padStart(2, '0')}</text>
<text x="18" y="386" font-family="Anton, Impact, sans-serif" font-size="${fs}" fill="${C.ink}" textLength="${Math.min(264, Math.round(n.length * fs * 0.5))}" lengthAdjust="spacingAndGlyphs">${n}</text>
</svg>`;
}

function heroSVG(alt) {
  return `<svg viewBox="0 0 800 640" role="img" aria-label="${alt}">
<rect width="800" height="640" fill="${C.mustard}"/>
${O(560, 215, 158, C.tomato)}
${P('0,640 0,362 180,300 380,352 560,292 800,342 800,640', C.teal)}
${P('0,392 800,366 800,640 0,640', C.paper)}${P('0,368 800,342 800,372 0,398', C.paper)}${P('0,352 800,326 800,338 0,364', C.ink)}
${D('M40 640 Q40 452 130 448 Q220 452 220 640Z', C.blue)}${D('M290 640 Q290 440 400 436 Q510 440 510 640Z', C.blue)}${D('M580 640 Q580 432 670 428 Q760 432 760 640Z', C.blue)}
${P('0,640 0,560 200,528 420,566 640,530 800,552 800,640', C.avocado)}
<g stroke="${C.moss}" stroke-width="7" stroke-linecap="round"><path d="M500 590L770 560M520 618L790 586M20 590L150 566"/></g>
<g class="steam" fill="none" stroke="${C.paper}" stroke-width="15" stroke-linecap="round"><path d="M262 420 C236 386 290 366 264 326 C246 298 284 280 270 250"/><path d="M322 410 C298 372 350 346 324 302 C308 274 344 252 330 216"/><path d="M382 420 C358 386 410 366 386 326 C370 300 402 284 392 258"/></g>
${D('M176 478 Q178 614 322 618 Q466 614 468 478Z', C.ink)}
<ellipse cx="322" cy="478" rx="150" ry="27" fill="${C.paper}"/><ellipse cx="322" cy="479" rx="132" ry="19" fill="${C.brick}"/>
${P('238,474 262,464 276,478 252,488', C.mustard)}${P('330,468 356,462 366,476 340,484', C.mustard)}${P('384,476 404,468 416,480 396,488', C.mustard)}
${O(296, 482, 8, C.ink)}${O(366, 488, 7, C.ink)}${P('300,466 318,460 314,472', C.avocado)}${P('414,470 430,466 426,478', C.avocado)}
${P('236,548 408,548 398,566 246,566', C.tomato)}
</svg>`;
}

/* Top-down dish card with handwritten call-outs. Stands in for a photo. */
function dishCardSVG(labels, alt) {
  const hand = (x, y, lines, anchor) => `<text y="${y}" text-anchor="${anchor || 'start'}" font-family="Caveat, cursive" font-weight="700" font-size="27" fill="${C.paper}">${lines.map((l, i) => `<tspan x="${x}" dy="${i ? 28 : 0}">${l}</tspan>`).join('')}</text>`;
  const arrow = (d, tip) => `<path d="${d}" fill="none" stroke="${C.paper}" stroke-width="3.5" stroke-linecap="round"/><path d="${tip}" fill="none" stroke="${C.paper}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<svg viewBox="0 0 640 740" role="img" aria-label="${alt}">
<rect width="640" height="740" fill="${C.brick}"/>
${P('0,0 640,0 640,22 520,16 400,24 250,14 110,23 0,17', C.tomato)}
<g transform="translate(0,100)">
${O(322, 322, 172, C.ink)}${O(322, 322, 160, C.paper)}${O(322, 322, 138, C.ochre)}
${P('250,262 286,250 300,284 262,296', C.mustard)}${P('338,238 372,232 380,264 346,270', C.mustard)}${P('376,330 410,318 422,350 388,362', C.mustard)}${P('270,360 302,352 310,384 278,392', C.mustard)}${P('318,300 346,292 354,318 326,326', C.mustard)}
<ellipse cx="240" cy="330" rx="17" ry="11" fill="${C.ink}" transform="rotate(-20 240 330)"/><ellipse cx="400" cy="282" rx="17" ry="11" fill="${C.ink}" transform="rotate(30 400 282)"/><ellipse cx="344" cy="394" rx="17" ry="11" fill="${C.ink}" transform="rotate(10 344 394)"/>
<g fill="${C.brick}">${[[290, 320], [306, 338], [356, 350], [392, 392], [296, 418], [250, 386], [366, 300], [300, 234], [414, 322], [334, 350], [228, 292], [372, 412], [322, 262], [276, 318]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g>
${P('304,270 324,262 320,280', C.avocado)}${P('356,372 376,366 372,386', C.avocado)}${P('256,410 276,404 272,424', C.avocado)}${P('396,244 412,238 410,256', C.moss)}
${O(96, 500, 54, C.ink)}${O(96, 500, 46, C.paper)}
<g stroke="${C.avocado}" stroke-width="6" stroke-linecap="round"><path d="M72 488L106 476M78 508L120 492M86 524L116 514M70 500L94 504"/></g><g stroke="${C.mustard}" stroke-width="5" stroke-linecap="round"><path d="M90 482L112 500M82 516L98 522"/></g>
${O(548, 500, 46, C.ink)}${O(548, 500, 38, C.tomato)}${O(538, 492, 6, C.brick)}${O(560, 506, 5, C.brick)}${O(548, 518, 4, C.brick)}
${P('556,120 580,116 586,184 562,188', C.paper)}${P('560,120 576,117 575,102 561,104', C.ink)}${P('561,146 582,143 585,182 563,185', C.mustard)}
</g>
${hand(322, 58, labels[3], 'middle')}${arrow('M322 100 C330 150 318 220 324 318', 'M314 306 L324 320 L334 306')}
${hand(20, 150, labels[2])}${arrow('M96 192 C130 250 180 370 226 420', 'M212 414 L227 421 L226 405')}
${hand(620, 150, labels[4], 'end')}${arrow('M560 192 C566 198 568 204 568 212', 'M560 204 L568 214 L576 204')}
${hand(20, 688, labels[0])}${arrow('M150 660 C150 648 140 640 128 634', 'M140 632 L127 633 L133 645')}
${hand(620, 688, labels[1], 'end')}${arrow('M470 662 C478 650 490 640 506 634', 'M494 632 L507 633 L500 645')}
</svg>`;
}

const HOW_ICONS = [
  `<svg viewBox="0 0 80 80" aria-hidden="true">${P('10,18 70,16 72,68 8,70', C.paper)}${P('10,18 70,16 70,30 10,32', C.tomato)}${P('22,10 28,10 28,24 22,24', C.ink)}${P('52,10 58,10 58,24 52,24', C.ink)}<path d="M26 50l9 9 20-20" fill="none" stroke="${C.teal}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 80 80" aria-hidden="true">${P('14,36 66,36 62,70 18,70', C.ink)}${P('8,32 72,30 72,38 8,40', C.tomato)}${P('34,22 46,22 46,31 34,31', C.ink)}<g fill="none" stroke="${C.paper}" stroke-width="5" stroke-linecap="round"><path d="M28 20c-5-6 5-9 0-15M52 20c-5-6 5-9 0-15"/></g></svg>`,
  `<svg viewBox="0 0 80 80" aria-hidden="true">${P('8,34 72,32 70,72 10,72', C.paper)}${P('6,26 74,24 74,36 6,38', C.mustard)}${O(40, 54, 13, C.tomato)}<path d="M40 46v9l6 4" fill="none" stroke="${C.paper}" stroke-width="4" stroke-linecap="round"/>${P('30,14 50,14 52,26 28,26', C.ink)}</svg>`,
  `<svg viewBox="0 0 80 80" aria-hidden="true">${D('M10 42 Q12 72 40 73 Q68 72 70 42Z', C.mustard)}<ellipse cx="40" cy="42" rx="31" ry="7" fill="${C.paper}"/><ellipse cx="40" cy="42" rx="25" ry="4" fill="${C.tomato}"/><g fill="none" stroke="${C.paper}" stroke-width="5" stroke-linecap="round"><path d="M30 30c-5-6 5-9 0-16M48 30c-5-6 5-9 0-16"/></g></svg>`,
];

/* Standard Plena seal (creatives-v1): ring text, numbers in the centre. */
function sealSVG(lang) {
  const fr = lang === 'fr';
  return `<svg viewBox="0 0 260 260" role="img" aria-label="Standard Plena">
<circle cx="130" cy="130" r="126" fill="${C.ink}"/><circle cx="130" cy="130" r="92" fill="${C.mustard}"/>
<defs><path id="ring" d="M130 130 m-106 0 a106 106 0 1 1 212 0 a106 106 0 1 1 -212 0"/></defs>
<text font-family="'DM Sans', sans-serif" font-weight="700" font-size="13" fill="${C.paper}" letter-spacing="2"><textPath href="#ring" textLength="650" lengthAdjust="spacing">STANDARD PLENA ✺ MADE IN LUXEMBOURG ✺ ${fr ? 'LÉGUMES DE LA GRANDE RÉGION' : 'VEG FROM THE GRANDE RÉGION'} ✺</textPath></text>
<text x="130" y="112" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="46" fill="${C.ink}">25 g</text>
<text x="130" y="130" text-anchor="middle" font-family="'DM Sans', sans-serif" font-weight="700" font-size="12" letter-spacing="2" fill="${C.ink}">${fr ? 'PROTÉINES' : 'PROTEIN'}</text>
<text x="130" y="176" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="46" fill="${C.tomato}">10 g</text>
<text x="130" y="194" text-anchor="middle" font-family="'DM Sans', sans-serif" font-weight="700" font-size="12" letter-spacing="2" fill="${C.ink}">${fr ? 'FIBRES' : 'FIBRE'}</text>
</svg>`;
}

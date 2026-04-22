/* Equirectangular projection, 900x500 viewBox.
   x = (lon + 180) * 2.5
   y = (90 - lat) * (500/180) ≈ (90 - lat) * 2.778  */

function mapCallout(x, y, num) {
  return `<circle cx="${x}" cy="${y}" r="12" fill="white" stroke="#3b5bdb" stroke-width="2"/>
<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#3b5bdb">${num}</text>`;
}

function oceanLabel(x, y, letter) {
  return `<circle cx="${x}" cy="${y}" r="12" fill="#DBEAFE" stroke="#3b5bdb" stroke-width="2"/>
<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#1D4ED8">${letter}</text>`;
}

function buildWorldContinents() {
  /* Continent polygons (approximate, educational) */
  const continents = [
    {
      id: 'north-america',
      points: '38,61 120,56 175,56 215,42 255,50 275,51 285,108 275,130 262,162 248,170 235,190 243,208 220,178 188,190 174,187 150,148 140,123 82,73',
      fill: '#FDE68A', stroke: '#D97706'
    },
    {
      id: 'greenland',
      points: '248,22 288,18 305,35 285,55 252,50',
      fill: '#FDE68A', stroke: '#D97706'
    },
    {
      id: 'south-america',
      points: '244,207 284,203 313,198 362,213 358,280 300,362 275,307 248,235',
      fill: '#BBF7D0', stroke: '#16A34A'
    },
    {
      id: 'europe',
      points: '427,148 435,128 439,115 437,105 442,88 462,50 520,63 528,100 520,132 510,133 500,134 490,143 475,150 460,152 443,150',
      fill: '#FCA5A5', stroke: '#DC2626'
    },
    {
      id: 'africa',
      points: '437,150 443,150 460,152 475,150 490,143 535,148 558,218 575,225 548,263 548,292 525,320 495,347 480,300 472,242 457,238 412,238 407,213 417,175',
      fill: '#C4B5FD', stroke: '#7C3AED'
    },
    {
      id: 'asia',
      points: '527,63 535,57 600,42 680,40 750,47 825,60 870,85 878,90 800,140 750,160 710,248 650,228 620,188 595,192 558,218 535,148 520,132 528,100',
      fill: '#FED7AA', stroke: '#EA580C'
    },
    {
      id: 'australia',
      points: '735,312 778,283 835,280 828,355 782,357 735,348',
      fill: '#A5F3FC', stroke: '#0891B2'
    },
    {
      id: 'antarctica',
      points: '0,418 900,418 900,500 0,500',
      fill: '#E0F2FE', stroke: '#7DD3FC'
    }
  ];

  /* Japan (simplified) */
  const japan = '808,138 818,130 825,142 820,158 810,155';
  /* New Zealand */
  const nz = '865,375 872,360 878,372 870,385';
  /* UK */
  const uk = '430,102 437,95 440,103 436,112 428,108';
  /* Madagascar */
  const madagascar = '545,288 555,272 562,290 556,315 545,310';

  let svg = `<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--world">
<!-- Ocean -->
<rect width="900" height="500" fill="#BFDBFE" rx="8"/>
<!-- Grid lines -->
<line x1="0" y1="250" x2="900" y2="250" stroke="#93C5FD" stroke-width="0.75" stroke-dasharray="6,4"/>
<line x1="450" y1="0" x2="450" y2="500" stroke="#93C5FD" stroke-width="0.75" stroke-dasharray="6,4"/>
`;

  continents.forEach(c => {
    svg += `<polygon points="${c.points}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5" stroke-linejoin="round"/>`;
  });

  svg += `<polygon points="${japan}" fill="#FED7AA" stroke="#EA580C" stroke-width="1.5" stroke-linejoin="round"/>`;
  svg += `<polygon points="${nz}" fill="#A5F3FC" stroke="#0891B2" stroke-width="1.5" stroke-linejoin="round"/>`;
  svg += `<polygon points="${uk}" fill="#FCA5A5" stroke="#DC2626" stroke-width="1.5" stroke-linejoin="round"/>`;
  svg += `<polygon points="${madagascar}" fill="#C4B5FD" stroke="#7C3AED" stroke-width="1.5" stroke-linejoin="round"/>`;

  /* Continent callout bubbles (numbered) */
  /* 1 North America */
  svg += mapCallout(195, 130, 1);
  /* 2 South America */
  svg += mapCallout(305, 295, 2);
  /* 3 Europe */
  svg += mapCallout(475, 100, 3);
  /* 4 Africa */
  svg += mapCallout(488, 255, 4);
  /* 5 Asia */
  svg += mapCallout(660, 130, 5);
  /* 6 Australia */
  svg += mapCallout(782, 318, 6);
  /* 7 Antarctica */
  svg += mapCallout(450, 455, 7);

  /* Ocean callout bubbles (lettered) */
  /* A Pacific Ocean */
  svg += oceanLabel(90, 290, 'A');
  /* B Atlantic Ocean */
  svg += oceanLabel(370, 295, 'B');
  /* C Indian Ocean */
  svg += oceanLabel(615, 348, 'C');
  /* D Arctic Ocean */
  svg += oceanLabel(450, 28, 'D');

  svg += `</svg>`;
  return svg;
}

function buildNorthAmerica() {
  /* Simplified country polygons within North America */
  const countries = [
    {
      id: 'canada',
      points: '80,18 260,10 310,18 345,60 315,95 290,110 265,105 245,118 215,115 200,140 165,148 130,140 100,110 65,90 55,65',
      fill: '#FDE68A', stroke: '#D97706'
    },
    {
      id: 'alaska',
      points: '15,18 75,15 80,18 55,65 35,72 10,55',
      fill: '#FEF3C7', stroke: '#D97706'
    },
    {
      id: 'greenland',
      points: '330,5 400,5 415,40 388,72 345,60 310,18',
      fill: '#E0F2FE', stroke: '#7DD3FC'
    },
    {
      id: 'usa',
      points: '65,148 100,148 165,148 200,140 215,115 245,118 265,105 290,110 315,95 310,185 285,205 250,218 225,222 185,215 140,215 110,205 80,200 60,190',
      fill: '#BFDBFE', stroke: '#2563EB'
    },
    {
      id: 'mexico',
      points: '80,200 110,205 140,215 185,215 225,222 240,240 230,268 210,275 175,270 155,255 135,260 118,252 105,232 80,225',
      fill: '#BBF7D0', stroke: '#16A34A'
    },
    {
      id: 'cuba',
      points: '195,258 235,252 245,262 230,270 192,268',
      fill: '#FCA5A5', stroke: '#DC2626'
    },
    {
      id: 'central-america',
      points: '155,255 175,270 210,275 218,292 200,310 178,315 162,305 148,285 140,268 138,260',
      fill: '#C4B5FD', stroke: '#7C3AED'
    }
  ];

  let svg = `<svg viewBox="0 0 450 340" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--medium">
<!-- Ocean background -->
<rect width="450" height="340" fill="#BFDBFE" rx="8"/>
`;

  countries.forEach(c => {
    svg += `<polygon points="${c.points}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5" stroke-linejoin="round"/>`;
  });

  /* Callout bubbles */
  /* 1 Canada */
  svg += mapCallout(190, 75, 1);
  /* 2 Alaska */
  svg += mapCallout(40, 40, 2);
  /* 3 Greenland */
  svg += mapCallout(368, 35, 3);
  /* 4 United States */
  svg += mapCallout(185, 172, 4);
  /* 5 Mexico */
  svg += mapCallout(165, 240, 5);
  /* 6 Cuba */
  svg += mapCallout(218, 262, 6);
  /* 7 Central America */
  svg += mapCallout(183, 295, 7);

  svg += `</svg>`;
  return svg;
}

const MAPS = {
  'world-continents': {
    title: 'World Map — Continents & Oceans',
    numbered: ['North America','South America','Europe','Africa','Asia','Australia','Antarctica'],
    lettered: ['Pacific Ocean','Atlantic Ocean','Indian Ocean','Arctic Ocean'],
    svg: buildWorldContinents
  },
  'north-america': {
    title: 'North America — Countries & Regions',
    numbered: ['Canada','Alaska (USA)','Greenland','United States','Mexico','Cuba','Central America'],
    lettered: [],
    svg: buildNorthAmerica
  }
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generate() {
  const mapKey = document.getElementById('map-type').value;
  const def = MAPS[mapKey];

  document.getElementById('map-title').textContent = def.title;

  const diagramEl = document.getElementById('map-diagram');
  diagramEl.innerHTML = def.svg();

  const allLabels = [...def.numbered, ...def.lettered.map((l, i) => `(${String.fromCharCode(65 + i)}) ${l}`)];
  const numberedShuffled = shuffleArray(def.numbered.map((l, i) => (i + 1) + '. ____'));

  const bankLabels = [
    ...shuffleArray(def.numbered),
    ...def.lettered
  ];

  const bankEl = document.getElementById('map-word-bank');
  let bankHtml = '<div class="sci-bank-title">Word Bank</div><div class="sci-bank-items">';
  bankLabels.forEach(l => { bankHtml += `<span class="sci-bank-word">${l}</span>`; });
  bankHtml += '</div>';
  bankEl.innerHTML = bankHtml;

  let akHtml = '<div class="answer-key-header"><h2>Answer Key</h2><p>' + def.title + '</p></div>';
  akHtml += '<div class="lang-answer-grid">';
  def.numbered.forEach((l, i) => { akHtml += `<div class="lang-answer-item">${i + 1}. ${l}</div>`; });
  if (def.lettered.length) {
    def.lettered.forEach((l, i) => { akHtml += `<div class="lang-answer-item">${String.fromCharCode(65 + i)}. ${l}</div>`; });
  }
  akHtml += '</div>';
  document.getElementById('map-answer-key').innerHTML = akHtml;

  document.getElementById('output').classList.remove('hidden');
}

document.getElementById('generate-btn').addEventListener('click', generate);
document.getElementById('print-btn').addEventListener('click', () => window.print());

document.getElementById('answer-key-check').addEventListener('change', function () {
  const akEl = document.getElementById('map-answer-key');
  if (this.checked) {
    akEl.classList.add('show-on-print');
  } else {
    akEl.classList.remove('show-on-print');
  }
});

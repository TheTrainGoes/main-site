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
  return `<svg viewBox="0 0 1280 712" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--world">
<image href="images/maps/world-continents.png" x="0" y="0" width="1280" height="712"/>
${mapCallout(250, 200, 1)}   <!-- North America -->
${mapCallout(400, 480, 2)}   <!-- South America -->
${mapCallout(650, 160, 3)}   <!-- Europe -->
${mapCallout(680, 420, 4)}   <!-- Africa -->
${mapCallout(920, 200, 5)}   <!-- Asia -->
${mapCallout(1050, 520, 6)}  <!-- Australia -->
${mapCallout(640, 690, 7)}   <!-- Antarctica -->
${oceanLabel(100, 350, 'A')} <!-- Pacific Ocean -->
${oceanLabel(500, 350, 'B')} <!-- Atlantic Ocean -->
${oceanLabel(880, 480, 'C')} <!-- Indian Ocean -->
${oceanLabel(640, 40, 'D')}  <!-- Arctic Ocean -->
</svg>`;
}

function buildNorthAmerica() {
  return `<svg viewBox="0 0 1876 1964" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--medium">
<image href="images/maps/north-america.png" x="0" y="0" width="1876" height="1964"/>
${mapCallout(950, 550, 1)}    <!-- Canada -->
${mapCallout(200, 450, 2)}    <!-- Alaska -->
${mapCallout(1750, 450, 3)}   <!-- Greenland -->
${mapCallout(1020, 1250, 4)}  <!-- United States -->
${mapCallout(850, 1650, 5)}   <!-- Mexico -->
${mapCallout(1250, 1550, 6)}  <!-- Cuba -->
${mapCallout(950, 1850, 7)}   <!-- Central America -->
</svg>`;
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

function buildAnswerLines(numbered, lettered) {
  let html = '<div class="map-answer-grid">';
  const allLabels = [...numbered, ...lettered.map((l, i) => `${String.fromCharCode(65 + i)}`).map((letter, i) => letter)];
  const labelList = [...numbered, ...lettered];

  labelList.forEach((label, i) => {
    const num = i < numbered.length ? (i + 1) : String.fromCharCode(65 + i - numbered.length);
    html += `<div class="map-answer-row"><span class="map-answer-num">${num}.</span><div class="answer-line"></div></div>`;
  });

  html += '</div>';
  return html;
}

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

  document.getElementById('map-answer-lines').innerHTML = buildAnswerLines(def.numbered, def.lettered);

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

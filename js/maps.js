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
  return `<svg viewBox="0 0 1500 740" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--world">
<image href="images/maps/world-continents.png" x="0" y="0" width="1500" height="740"/>
${mapCallout(284, 160, 1)}   <!-- North America -->
${mapCallout(427, 374, 2)}   <!-- South America -->
${mapCallout(694, 142, 3)}   <!-- Europe -->
${mapCallout(712, 303, 4)}   <!-- Africa -->
${mapCallout(961, 160, 5)}   <!-- Asia -->
${mapCallout(1121, 409, 6)}  <!-- Australia -->
${mapCallout(750, 587, 7)}   <!-- Antarctica -->
${oceanLabel(107, 320, 'A')} <!-- Pacific Ocean -->
${oceanLabel(534, 320, 'B')} <!-- Atlantic Ocean -->
${oceanLabel(926, 392, 'C')} <!-- Indian Ocean -->
${oceanLabel(750, 60, 'D')}  <!-- Arctic Ocean -->
</svg>`;
}

function buildNorthAmerica() {
  return `<svg viewBox="0 0 453 600" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--medium">
<image href="images/maps/north-america.png" x="0" y="0" width="453" height="600"/>
${mapCallout(226, 150, 1)}   <!-- Canada -->
${mapCallout(60, 100, 2)}    <!-- Alaska -->
${mapCallout(430, 120, 3)}   <!-- Greenland -->
${mapCallout(280, 350, 4)}   <!-- United States -->
${mapCallout(200, 450, 5)}   <!-- Mexico -->
${mapCallout(320, 420, 6)}   <!-- Cuba -->
${mapCallout(240, 500, 7)}   <!-- Central America -->
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

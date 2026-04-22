const DIAGRAMS = {
  'solar-system': {
    title: 'Solar System',
    labels: ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'],
    svg: buildSolarSystem
  },
  'plant-parts': {
    title: 'Parts of a Plant',
    labels: ['Flower','Leaf','Stem','Roots','Seed / Fruit'],
    svg: buildPlantParts
  },
  'water-cycle': {
    title: 'The Water Cycle',
    labels: ['Evaporation','Condensation','Precipitation','Surface Runoff','Collection'],
    svg: buildWaterCycle
  },
  'human-body': {
    title: 'Human Body',
    labels: ['Brain','Heart','Lungs','Stomach','Arm / Hand','Leg / Foot'],
    svg: buildHumanBody
  }
};

function calloutBubble(x, y, num) {
  return `<circle cx="${x}" cy="${y}" r="11" fill="white" stroke="#3b5bdb" stroke-width="2"/>
<text x="${x}" y="${y+4}" text-anchor="middle" font-size="12" font-weight="700" fill="#3b5bdb">${num}</text>`;
}

function labelLine(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#555" stroke-width="1.5" stroke-dasharray="4,3"/>`;
}

function buildSolarSystem() {
  const cx = 450, cy = 260;
  const sunR = 38;
  const orbits = [58, 88, 122, 158, 210, 268, 318, 355];

  const angles = [25, 100, 185, 280, 55, 145, 245, 340];
  const planetR = [5, 7, 8, 6, 20, 16, 11, 10];
  const planetColors = ['#9CA3AF','#D97706','#2563EB','#DC2626','#CA8A04','#B45309','#06B6D4','#1D4ED8'];

  let svg = `<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" class="sci-svg">
<rect width="900" height="520" fill="#0d1117" rx="8"/>
<!-- Sun glow -->
<circle cx="${cx}" cy="${cy}" r="52" fill="#FDE68A" opacity="0.15"/>
<circle cx="${cx}" cy="${cy}" r="44" fill="#FDE68A" opacity="0.2"/>
`;

  orbits.forEach(r => {
    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#333" stroke-width="1"/>`;
  });

  svg += `<!-- Sun --><circle cx="${cx}" cy="${cy}" r="${sunR}" fill="#FDB836" stroke="#F59E0B" stroke-width="2"/>
<text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="11" font-weight="700" fill="#7C3500">Sun</text>`;

  orbits.forEach((r, i) => {
    const theta = (angles[i] * Math.PI) / 180;
    const px = cx + r * Math.sin(theta);
    const py = cy - r * Math.cos(theta);
    svg += `<circle cx="${Math.round(px)}" cy="${Math.round(py)}" r="${planetR[i]}" fill="${planetColors[i]}"/>`;

    const dist = 26;
    const lx = px + dist * Math.sin(theta);
    const ly = py - dist * Math.cos(theta);
    svg += labelLine(Math.round(px), Math.round(py), Math.round(lx), Math.round(ly));
    svg += calloutBubble(Math.round(lx), Math.round(ly), i + 1);
  });

  svg += `</svg>`;
  return svg;
}

function buildPlantParts() {
  return `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--medium">
<rect width="600" height="500" fill="#F0FDF4" rx="8"/>

<!-- Roots -->
<line x1="300" y1="390" x2="240" y2="460" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
<line x1="300" y1="390" x2="280" y2="475" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
<line x1="300" y1="390" x2="320" y2="470" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
<line x1="300" y1="390" x2="360" y2="455" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
<line x1="240" y1="460" x2="210" y2="485" stroke="#92400E" stroke-width="2"/>
<line x1="280" y1="475" x2="260" y2="490" stroke="#92400E" stroke-width="2"/>
<line x1="320" y1="470" x2="335" y2="488" stroke="#92400E" stroke-width="2"/>
<line x1="360" y1="455" x2="385" y2="478" stroke="#92400E" stroke-width="2"/>

<!-- Ground line -->
<rect x="150" y="388" width="300" height="8" rx="4" fill="#D97706" opacity="0.4"/>

<!-- Stem -->
<rect x="290" y="220" width="20" height="170" rx="6" fill="#16A34A"/>

<!-- Left leaf -->
<ellipse cx="235" cy="295" rx="55" ry="28" fill="#22C55E" transform="rotate(-20,235,295)"/>
<line x1="290" y1="295" x2="235" y2="295" stroke="#15803D" stroke-width="2"/>

<!-- Right leaf -->
<ellipse cx="365" cy="255" rx="55" ry="28" fill="#22C55E" transform="rotate(20,365,255)"/>
<line x1="310" y1="255" x2="365" y2="255" stroke="#15803D" stroke-width="2"/>

<!-- Flower petals -->
<circle cx="300" cy="155" r="22" fill="#FDE047"/>
<circle cx="300" cy="120" r="20" fill="#FB7185"/>
<circle cx="300" cy="190" r="20" fill="#FB7185"/>
<circle cx="265" cy="155" r="20" fill="#FB7185"/>
<circle cx="335" cy="155" r="20" fill="#FB7185"/>
<circle cx="276" cy="131" r="18" fill="#FB7185"/>
<circle cx="324" cy="131" r="18" fill="#FB7185"/>
<circle cx="276" cy="179" r="18" fill="#FB7185"/>
<circle cx="324" cy="179" r="18" fill="#FB7185"/>
<!-- Flower center -->
<circle cx="300" cy="155" r="22" fill="#FDE047"/>
<circle cx="300" cy="155" r="14" fill="#FBBF24"/>

<!-- Seed/Fruit pod -->
<ellipse cx="185" cy="340" rx="22" ry="14" fill="#86EFAC" stroke="#16A34A" stroke-width="2"/>
<line x1="207" y1="340" x2="290" y2="340" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3"/>

<!-- Callout lines & bubbles -->
<!-- 1: Flower -->
${labelLine(300, 135, 440, 80)}
${calloutBubble(453, 80, 1)}

<!-- 2: Leaf -->
${labelLine(235, 278, 100, 220)}
${calloutBubble(87, 220, 2)}

<!-- 3: Stem -->
${labelLine(310, 320, 460, 320)}
${calloutBubble(473, 320, 3)}

<!-- 4: Roots -->
${labelLine(300, 430, 460, 445)}
${calloutBubble(473, 445, 4)}

<!-- 5: Seed/Fruit -->
${labelLine(163, 340, 100, 365)}
${calloutBubble(87, 365, 5)}
</svg>`;
}

function buildWaterCycle() {
  return `<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--medium">
<!-- Sky -->
<rect width="800" height="480" fill="#EFF6FF" rx="8"/>
<!-- Ground -->
<rect x="0" y="340" width="800" height="140" fill="#86EFAC" rx="0"/>
<rect x="0" y="430" width="800" height="50" rx="0" fill="#6EE7B7"/>

<!-- Sun -->
<circle cx="700" cy="70" r="45" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/>
<line x1="700" y1="15" x2="700" y2="5" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="700" y1="125" x2="700" y2="135" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="645" y1="70" x2="635" y2="70" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="755" y1="70" x2="765" y2="70" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="661" y1="31" x2="653" y2="23" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="739" y1="109" x2="747" y2="117" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="661" y1="109" x2="653" y2="117" stroke="#F59E0B" stroke-width="2.5"/>
<line x1="739" y1="31" x2="747" y2="23" stroke="#F59E0B" stroke-width="2.5"/>

<!-- Mountain -->
<polygon points="250,340 420,130 590,340" fill="#9CA3AF"/>
<polygon points="320,340 420,175 520,340" fill="#D1D5DB"/>
<!-- Snow cap -->
<polygon points="390,130 420,130 445,180 395,180" fill="white"/>

<!-- Lake / Ocean -->
<ellipse cx="130" cy="370" rx="115" ry="35" fill="#60A5FA"/>
<ellipse cx="130" cy="365" rx="110" ry="28" fill="#93C5FD"/>

<!-- Cloud -->
<ellipse cx="400" cy="70" rx="85" ry="38" fill="white" stroke="#93C5FD" stroke-width="2"/>
<ellipse cx="345" cy="88" rx="55" ry="35" fill="white" stroke="#93C5FD" stroke-width="2"/>
<ellipse cx="455" cy="88" rx="55" ry="35" fill="white" stroke="#93C5FD" stroke-width="2"/>

<!-- Rain drops -->
<line x1="360" y1="125" x2="345" y2="155" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>
<line x1="385" y1="128" x2="370" y2="158" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>
<line x1="410" y1="128" x2="395" y2="158" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>
<line x1="435" y1="125" x2="420" y2="155" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>
<line x1="460" y1="124" x2="445" y2="154" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>

<!-- Evaporation arrows (lake upward) -->
<defs>
  <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 Z" fill="#2563EB"/>
  </marker>
</defs>
<path d="M100,320 Q90,230 200,160 Q310,100 340,85" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arr)"/>

<!-- Runoff arrow (mountain down to lake) -->
<path d="M310,310 Q250,340 200,355 Q170,362 145,365" fill="none" stroke="#1D4ED8" stroke-width="2.5" marker-end="url(#arr)"/>

<!-- Callout lines & bubbles -->
<!-- 1: Evaporation -->
${labelLine(140, 290, 50, 200)}
${calloutBubble(37, 187, 1)}

<!-- 2: Condensation (cloud forms) -->
${labelLine(400, 50, 400, 20)}
${calloutBubble(400, 10, 2)}

<!-- 3: Precipitation (rain) -->
${labelLine(465, 145, 570, 145)}
${calloutBubble(583, 145, 3)}

<!-- 4: Surface Runoff -->
${labelLine(255, 338, 170, 420)}
${calloutBubble(157, 433, 4)}

<!-- 5: Collection (lake) -->
${labelLine(130, 395, 50, 440)}
${calloutBubble(37, 453, 5)}
</svg>`;
}

function buildHumanBody() {
  return `<svg viewBox="0 0 600 580" xmlns="http://www.w3.org/2000/svg" class="sci-svg sci-svg--medium">
<rect width="600" height="580" fill="#FFF7ED" rx="8"/>

<!-- Head -->
<ellipse cx="300" cy="80" rx="52" ry="60" fill="#FECACA" stroke="#9CA3AF" stroke-width="2"/>
<!-- Neck -->
<rect x="283" y="133" width="34" height="28" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>

<!-- Body torso -->
<path d="M220,160 L380,160 L370,330 L230,330 Z" fill="#FED7AA" stroke="#9CA3AF" stroke-width="2"/>

<!-- Left arm -->
<path d="M220,165 L170,175 L145,310 L168,315 L195,200 L230,190 Z" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>
<!-- Left hand -->
<ellipse cx="155" cy="325" rx="18" ry="13" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>

<!-- Right arm -->
<path d="M380,165 L430,175 L455,310 L432,315 L405,200 L370,190 Z" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>
<!-- Right hand -->
<ellipse cx="445" cy="325" rx="18" ry="13" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>

<!-- Left leg -->
<path d="M233,328 L218,510 L250,510 L265,340 Z" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>
<!-- Left foot -->
<ellipse cx="232" cy="515" rx="24" ry="12" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>

<!-- Right leg -->
<path d="M335,340 L350,510 L382,510 L367,328 Z" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>
<!-- Right foot -->
<ellipse cx="368" cy="515" rx="24" ry="12" fill="#FECACA" stroke="#9CA3AF" stroke-width="1.5"/>

<!-- Internal organs (simplified) -->
<!-- Heart -->
<path d="M278,198 C278,188 293,183 300,195 C307,183 322,188 322,198 C322,210 300,228 300,228 C300,228 278,210 278,198 Z" fill="#EF4444"/>
<!-- Lungs -->
<ellipse cx="270" cy="220" rx="20" ry="30" fill="#FDA4AF" opacity="0.7"/>
<ellipse cx="330" cy="220" rx="20" ry="30" fill="#FDA4AF" opacity="0.7"/>
<!-- Stomach -->
<ellipse cx="300" cy="278" rx="28" ry="22" fill="#FDE68A" opacity="0.8"/>

<!-- Callout lines & bubbles -->
<!-- 1: Brain -->
${labelLine(300, 38, 440, 25)}
${calloutBubble(453, 25, 1)}

<!-- 2: Heart -->
${labelLine(290, 208, 130, 210)}
${calloutBubble(117, 210, 2)}

<!-- 3: Lungs -->
${labelLine(330, 208, 470, 195)}
${calloutBubble(483, 195, 3)}

<!-- 4: Stomach -->
${labelLine(300, 290, 460, 295)}
${calloutBubble(473, 295, 4)}

<!-- 5: Arm/Hand -->
${labelLine(155, 325, 80, 370)}
${calloutBubble(67, 383, 5)}

<!-- 6: Leg/Foot -->
${labelLine(368, 515, 490, 530)}
${calloutBubble(503, 543, 6)}
</svg>`;
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
  const topic = document.getElementById('topic').value;
  const def = DIAGRAMS[topic];

  document.getElementById('sci-title').textContent = def.title;

  const diagramEl = document.getElementById('sci-diagram');
  diagramEl.innerHTML = def.svg();

  const shuffled = shuffleArray(def.labels);
  const bankEl = document.getElementById('sci-word-bank');
  bankEl.innerHTML = '<div class="sci-bank-title">Word Bank</div><div class="sci-bank-items">' +
    shuffled.map(w => `<span class="sci-bank-word">${w}</span>`).join('') +
    '</div>';

  const akEl = document.getElementById('sci-answer-key');
  akEl.innerHTML = '<div class="answer-key-header"><h2>Answer Key</h2><p>' + def.title + '</p></div>' +
    '<div class="lang-answer-grid">' +
    def.labels.map((w, i) => `<div class="lang-answer-item">${i + 1}. ${w}</div>`).join('') +
    '</div>';

  document.getElementById('output').classList.remove('hidden');
}

document.getElementById('generate-btn').addEventListener('click', generate);
document.getElementById('print-btn').addEventListener('click', () => window.print());

document.getElementById('answer-key-check').addEventListener('change', function () {
  const akEl = document.getElementById('sci-answer-key');
  if (this.checked) {
    akEl.classList.add('show-on-print');
  } else {
    akEl.classList.remove('show-on-print');
  }
});

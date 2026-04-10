/* ============================================================
   COLORING SHEETS — CATS
   ============================================================ */

const FOLDER = 'coloring sheets/cats/';

// Discover images by scanning known filenames embedded at build time.
// Since this is a static site we list them directly.
const IMAGE_FILES = [
  '0volo.jpg','3NuIs.jpg','4M6Yx.jpg','8NBaG.jpg','IxZXg.jpg',
  'ONAsu.jpg','iamTD.jpg','kMiLo.jpg','pB6Ox.jpg','pFJez.jpg',
  'uOMp2.jpg','uZwvV.jpg','vDRLf.jpg'
];

const grid        = document.getElementById('thumbnail-grid');
const modal       = document.getElementById('cs-modal');
const modalImg    = document.getElementById('modal-img');
const modalClose  = document.getElementById('modal-close');
const modalBg     = document.getElementById('modal-backdrop');
const subtitle    = document.getElementById('sheet-subtitle');

let currentSrc = null;

// ── Update subtitle count ────────────────────────────────────
subtitle.textContent = `${IMAGE_FILES.length} printable cat coloring pages \u2014 click any sheet to preview, download, or print.`;

// ── Build thumbnails ─────────────────────────────────────────
IMAGE_FILES.forEach((file, i) => {
  const src = `${FOLDER}${file}`;
  const btn = document.createElement('button');
  btn.className = 'cs-thumb-btn';
  btn.setAttribute('aria-label', `Coloring sheet ${i + 1}`);
  btn.innerHTML = `<img class="cs-thumb-img" src="${src}" alt="Cat coloring sheet ${i + 1}" loading="lazy">`;
  btn.addEventListener('click', () => openModal(src));
  grid.appendChild(btn);
});

// ── Modal ────────────────────────────────────────────────────
function openModal(src) {
  currentSrc = src;
  modalImg.src = src;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  currentSrc = null;
}

modalClose.addEventListener('click', closeModal);
modalBg.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Single sheet actions ─────────────────────────────────────
document.getElementById('btn-download-single').addEventListener('click', () => {
  if (currentSrc) downloadPDF([currentSrc], 'cat-coloring-sheet.pdf');
});

document.getElementById('btn-print-single').addEventListener('click', () => {
  if (currentSrc) printImages([currentSrc]);
});

// ── Bulk actions ─────────────────────────────────────────────
document.getElementById('btn-all-pdf').addEventListener('click', () => {
  const srcs = IMAGE_FILES.map(f => `${FOLDER}${f}`);
  downloadPDF(srcs, 'cat-coloring-sheets-all.pdf');
});

document.getElementById('btn-print-all').addEventListener('click', () => {
  const srcs = IMAGE_FILES.map(f => `${FOLDER}${f}`);
  printImages(srcs);
});

document.getElementById('btn-random-pdf').addEventListener('click', () => {
  const countInput = document.getElementById('random-count');
  let n = parseInt(countInput.value, 10);
  if (isNaN(n) || n < 1) n = 1;
  if (n > IMAGE_FILES.length) n = IMAGE_FILES.length;
  const shuffled = [...IMAGE_FILES].sort(() => Math.random() - 0.5);
  const chosen   = shuffled.slice(0, n).map(f => `${FOLDER}${f}`);
  downloadPDF(chosen, `cat-coloring-sheets-random-${n}.pdf`);
});

// ── PDF generation (jsPDF) ───────────────────────────────────
async function downloadPDF(srcs, filename) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });

  for (let i = 0; i < srcs.length; i++) {
    if (i > 0) doc.addPage();
    const imgData = await loadImageAsDataURL(srcs[i]);
    // Fill the whole letter page (8.5 × 11 in) keeping aspect ratio centred
    const pageW = 8.5, pageH = 11;
    const margin = 0.25;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const { w, h } = fitDimensions(imgData.width, imgData.height, maxW, maxH);
    const x = margin + (maxW - w) / 2;
    const y = margin + (maxH - h) / 2;
    doc.addImage(imgData.dataURL, 'JPEG', x, y, w, h);
  }

  doc.save(filename);
}

// ── Print via hidden iframe ───────────────────────────────────
function printImages(srcs) {
  // Build an off-screen iframe with one image per page
  let existing = document.getElementById('cs-print-frame');
  if (existing) existing.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'cs-print-frame';
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:8.5in;height:11in;border:none;';
  document.body.appendChild(iframe);

  const imgTags = srcs.map((src, i) =>
    `<div style="page-break-after:${i < srcs.length - 1 ? 'always' : 'avoid'};text-align:center;">
       <img src="${src}" style="max-width:100%;max-height:100vh;object-fit:contain;">
     </div>`
  ).join('');

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#fff;}
    @page{size:letter portrait;margin:0.25in;}
    @media print{.no-print{display:none}}
  </style></head><body>${imgTags}</body></html>`);
  doc.close();

  // Wait for images to load before printing
  const imgs = doc.querySelectorAll('img');
  let loaded = 0;
  const total = imgs.length || 0;

  function tryPrint() {
    loaded++;
    if (loaded >= total) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  }

  if (total === 0) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  } else {
    imgs.forEach(img => {
      if (img.complete) { tryPrint(); }
      else { img.addEventListener('load', tryPrint); img.addEventListener('error', tryPrint); }
    });
  }
}

// ── Helpers ───────────────────────────────────────────────────
function loadImageAsDataURL(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      resolve({ dataURL: canvas.toDataURL('image/jpeg', 0.95), width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
}

function fitDimensions(imgW, imgH, maxW, maxH) {
  const ratio = Math.min(maxW / imgW, maxH / imgH);
  return { w: imgW * ratio, h: imgH * ratio };
}

/* ============================================================
   COLORING SHEETS — Multi-Category Renderer
   Expects globals set before this script loads:
     MULTI_DATA   : array of { id, name, sheets: [filename, ...] }
     MULTI_FOLDER : base folder path, e.g. 'coloring sheets/animals/'
   ============================================================ */

(function () {
  const DATA   = window.MULTI_DATA   || [];
  const FOLDER = window.MULTI_FOLDER || '';

  const grid       = document.getElementById('thumbnail-grid');
  const modal      = document.getElementById('cs-modal');
  const modalImg   = document.getElementById('modal-img');
  const modalLabel = document.getElementById('modal-label');
  const modalClose = document.getElementById('modal-close');
  const modalBg    = document.getElementById('modal-backdrop');
  const subtitle   = document.getElementById('sheet-subtitle');
  const catList    = document.getElementById('category-list');
  const catHeader  = document.getElementById('category-header');

  let currentSheet   = null;
  let currentCat     = DATA[0] || null;
  let currentSheets  = [];   // { name, label }[]

  // ── Build sub-category sidebar ────────────────────────────────
  if (DATA.length <= 1) {
    // Hide sidebar for single-category pages
    const sidebar = document.getElementById('cat-sidebar');
    if (sidebar) sidebar.style.display = 'none';
  } else {
    DATA.forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.className = 'cat-list-btn' + (i === 0 ? ' active' : '');
      btn.textContent = cat.name;
      btn.dataset.id = cat.id;
      btn.addEventListener('click', () => selectCategory(cat, btn));
      catList.appendChild(btn);
    });
  }

  // ── Select category ───────────────────────────────────────────
  function selectCategory(cat, btn) {
    currentCat = cat;
    // Update active button
    catList.querySelectorAll('.cat-list-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Convert sheet filenames to { name, label }
    currentSheets = cat.sheets.map(name => ({
      name,
      label: name.replace(/-/g, ' ').replace(/\s+Coloring\s+(Page|Sheet|Pages?|In).*$/i, '').replace(/\s+For\s+(Kids|Preschoolers|Adults|Toddlers).*$/i, '').trim()
    }));

    buildGrid();
    if (catHeader) catHeader.textContent = cat.name;
    if (subtitle) subtitle.textContent = `${currentSheets.length} printable ${cat.name.toLowerCase()} coloring pages \u2014 click any sheet to preview, download, or print.`;
  }

  // ── Build thumbnail grid ──────────────────────────────────────
  function buildGrid() {
    grid.innerHTML = '';
    currentSheets.forEach(sheet => {
      const jpgSrc = `${FOLDER}${sheet.name}.jpg`;
      const btn = document.createElement('button');
      btn.className = 'cs-thumb-btn';
      btn.setAttribute('aria-label', sheet.label);
      btn.innerHTML = `<img class="cs-thumb-img" src="${jpgSrc}" alt="${sheet.label}" loading="lazy">`;
      btn.addEventListener('click', () => openModal(sheet));
      grid.appendChild(btn);
    });
  }

  // ── Modal ─────────────────────────────────────────────────────
  function openModal(sheet) {
    currentSheet = sheet;
    modalImg.src = `${FOLDER}${sheet.name}.jpg`;
    if (modalLabel) modalLabel.textContent = sheet.label;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    currentSheet = null;
  }

  modalClose.addEventListener('click', closeModal);
  modalBg.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Single sheet actions ──────────────────────────────────────
  document.getElementById('btn-download-single').addEventListener('click', () => {
    if (currentSheet) downloadPDFsDirect([currentSheet], `${currentSheet.name}.pdf`);
  });

  document.getElementById('btn-print-single').addEventListener('click', () => {
    if (currentSheet) printPDFs([currentSheet]);
  });

  // ── Bulk actions ──────────────────────────────────────────────
  document.getElementById('btn-all-pdf').addEventListener('click', () => {
    const slug = currentCat ? currentCat.id : 'sheets';
    mergePDFs(currentSheets, `${slug}-coloring-sheets-all.pdf`);
  });

  document.getElementById('btn-print-all').addEventListener('click', () => {
    printPDFs(currentSheets);
  });

  document.getElementById('btn-random-pdf').addEventListener('click', () => {
    const countInput = document.getElementById('random-count');
    let n = parseInt(countInput.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > currentSheets.length) n = currentSheets.length;
    const chosen = [...currentSheets].sort(() => Math.random() - 0.5).slice(0, n);
    const slug = currentCat ? currentCat.id : 'sheets';
    mergePDFs(chosen, `${slug}-coloring-sheets-random-${n}.pdf`);
  });

  // ── Single PDF direct download ────────────────────────────────
  function downloadPDFsDirect(sheets, filename) {
    if (sheets.length === 1) {
      const a = document.createElement('a');
      a.href = `${FOLDER}${sheets[0].name}.pdf`;
      a.download = filename;
      a.click();
    } else {
      mergePDFs(sheets, filename);
    }
  }

  // ── Merge PDFs with pdf-lib ───────────────────────────────────
  async function mergePDFs(sheets, filename) {
    if (!window.PDFLib) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js');
    }
    const { PDFDocument } = window.PDFLib;
    const merged = await PDFDocument.create();
    for (const sheet of sheets) {
      const url   = `${FOLDER}${sheet.name}.pdf`;
      const bytes = await fetch(url).then(r => r.arrayBuffer());
      const doc   = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }
    const mergedBytes = await merged.save();
    const blob = new Blob([mergedBytes], { type: 'application/pdf' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  // ── Print via hidden iframe ───────────────────────────────────
  function printPDFs(sheets) {
    if (sheets.length === 1) {
      const iframe = getOrCreatePrintFrame();
      iframe.src = `${FOLDER}${sheets[0].name}.pdf`;
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };
      return;
    }
    sheets.forEach(sheet => {
      window.open(`${FOLDER}${sheet.name}.pdf`, '_blank');
    });
  }

  function getOrCreatePrintFrame() {
    let f = document.getElementById('cs-print-frame');
    if (!f) {
      f = document.createElement('iframe');
      f.id = 'cs-print-frame';
      f.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;';
      document.body.appendChild(f);
    }
    return f;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s  = document.createElement('script');
      s.src    = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // ── Initial render ────────────────────────────────────────────
  if (currentCat) selectCategory(currentCat, catList ? catList.querySelector('.cat-list-btn') : null);

})();

/* ============================================================
   COLORING SHEETS — CATS
   ============================================================ */

const FOLDER = 'coloring sheets/cats/';

// Each entry: { name, label }
// name  = base filename (no extension)
// label = human-readable title shown in modal
const SHEETS = [
  { name: 'Cat-with-Shirt-and-Bowtie-Riding-a-Bicycle-Coloring-Sheet', label: 'Cat with Shirt and Bowtie Riding a Bicycle' },
  { name: 'Big-Cat-Sitting-On-The-Grass', label: 'Big Cat Sitting On The Grass' },
  { name: 'Realistic-Cat-Walking-on-a-Rooftop-with-Blossoming-Trees-Coloring-Page', label: 'Realistic Cat Walking on a Rooftop with Blossoming Trees' },
  { name: 'Ferocious-Meowzilla-Cat-Attacking-City-with-Flames-Coloring-Page', label: 'Ferocious Meowzilla Cat Attacking City with Flames' },
  { name: 'Cat-with-Beanie-Knitting-on-a-Chair-by-the-Window-in-Winter-Coloring-Sheet', label: 'Cat with Beanie Knitting on a Chair by the Window in Winter' },
  { name: 'Cat-Licking-Water-from-a-Cup-Next-to-Scenic-Window-View-Coloring-Page-for-Kids', label: 'Cat Licking Water from a Cup Next to Scenic Window View' },
  { name: 'Curious-Cat-Sitting-on-a-Rooftop-with-City-Skyline-Coloring-Page', label: 'Curious Cat Sitting on a Rooftop with City Skyline' },
  { name: 'Chef-Cat-Making-Sushi-with-Chopsticks-Coloring-Page-for-Kids', label: 'Chef Cat Making Sushi with Chopsticks' },
  { name: 'Cat-in-Hiking-Uniform-and-Backpack-Inside-the-Jungle-Coloring-Page', label: 'Cat in Hiking Uniform and Backpack Inside the Jungle' },
  { name: 'Pretty-Striped-Cat-Sitting-Coloring-Sheet', label: 'Pretty Striped Cat Sitting' },
  { name: 'Artistic-Cat-with-Ornamental-Floral-Details-and-Garden-Frame-Coloring-Sheet', label: 'Artistic Cat with Ornamental Floral Details and Garden Frame' },
  { name: 'Spooky-Halloween-Cat-Wearing-Witch-Hat-with-Pumpkins-and-Ghosts', label: 'Spooky Halloween Cat Wearing Witch Hat with Pumpkins and Ghosts' },
  { name: 'Cat-With-Clothes-Standing-Up', label: 'Cat With Clothes Standing Up' },
  { name: 'Spotted-Cat-Stretching-In-Backyard-Coloring-In', label: 'Spotted Cat Stretching In Backyard' },
  { name: 'Halloween-Cat-Wearing-Witch-Hat-with-Jack-o-Lantern-Coloring-Page-for-Kids', label: 'Halloween Cat Wearing Witch Hat with Jack-o-Lantern' },
  { name: 'Fluffy-Kitten-Peeking-Out-of-a-Decorated-Box-Coloring-Page-for-Kids', label: 'Fluffy Kitten Peeking Out of a Decorated Box' },
  { name: 'Tiny-Cat-Inside-a-Teacup-Full-of-Flowers-Coloring-Page', label: 'Tiny Cat Inside a Teacup Full of Flowers' },
  { name: 'Rich-Cat-Lounging-on-an-Armchair-Coloring-Sheet', label: 'Rich Cat Lounging on an Armchair' },
  { name: 'Cat-Framed-by-Intricate-Floral-Mandala-Coloring-Page-for-Kids', label: 'Cat Framed by Intricate Floral Mandala' },
  { name: 'Adorable-Christmas-Cat-in-Santa-Suit-Wrapped-in-Holiday-Lights-Coloring-Sheet-for-Kids', label: 'Adorable Christmas Cat in Santa Suit Wrapped in Holiday Lights' },
  { name: 'Three-Realistic-Kittens-Looking-Up', label: 'Three Realistic Kittens Looking Up' },
  { name: 'Playful-Cat-Building-a-Sandcastle-by-the-Beach', label: 'Playful Cat Building a Sandcastle by the Beach' },
  { name: 'Unicorn-Cat-Sitting-on-Fluffy-Clouds-with-Sparkling-Stars-Coloring-Page', label: 'Unicorn Cat Sitting on Fluffy Clouds with Sparkling Stars' },
  { name: 'Intricate-Stained-Glass-Cat-Portrait-with-Bold-Whiskers', label: 'Intricate Stained Glass Cat Portrait with Bold Whiskers' },
  { name: 'Kawaii-Cat-in-Scarf-Sitting-Under-Fairy-Lights-in-Winter', label: 'Kawaii Cat in Scarf Sitting Under Fairy Lights in Winter' },
  { name: 'Hairy-Little-Cat-with-Big-Eyes-Coloring-Page-for-Preschoolers', label: 'Hairy Little Cat with Big Eyes' },
  { name: 'Grumpy-Cat-in-Festive-Sweater-Sitting-Among-Christmas-Presents-Coloring-Page', label: 'Grumpy Cat in Festive Sweater Sitting Among Christmas Presents' },
  { name: 'Elegant-Cat-Sitting-Upright-with-Decorative-Ornamental-Mandala-Coloring-Page', label: 'Elegant Cat Sitting Upright with Decorative Ornamental Mandala' },
  { name: 'DJ-Cat-Wearing-Sunglasses-and-Headphones-Coloring-Page', label: 'DJ Cat Wearing Sunglasses and Headphones' },
  { name: 'Adult-Cat-Looking-Up-Coloring-In', label: 'Adult Cat Looking Up' },
  { name: 'Detailed-Cat-Mandala-with-Ornate-Patterns-Coloring-Page-for-Adults', label: 'Detailed Cat Mandala with Ornate Patterns' },
  { name: 'Cat-with-Unicorn-Horn-Sitting-Among-Flowers-Coloring-Page', label: 'Cat with Unicorn Horn Sitting Among Flowers' },
  { name: 'Curious-Cat-Sniffing-Mushrooms-in-the-Forest-Coloring-Page', label: 'Curious Cat Sniffing Mushrooms in the Forest' },
  { name: 'Christmas-Cat-Wrapped-in-a-Wool-Blanket-with-a-Hot-Drink-Next-to-Fireplace', label: 'Christmas Cat Wrapped in a Wool Blanket with a Hot Drink' },
  { name: 'Cat-with-Floral-Swirls-and-Petal-Patterns-Coloring-Page', label: 'Cat with Floral Swirls and Petal Patterns' },
  { name: 'Cat-Dreamcatcher-with-Feathers-Fish-and-Mouse-Charm-Coloring-Page-for-Kids', label: 'Cat Dreamcatcher with Feathers, Fish and Mouse Charm' },
  { name: 'Adorable-Cat-Sleeping-on-a-Cloud-with-a-Rainbow-Coloring-Page-for-Preschoolers', label: 'Adorable Cat Sleeping on a Cloud with a Rainbow' },
  { name: 'Striped-Tabby-Cat-Smiling-at-Cupcakes-with-Cherries-on-Top-Coloring-Page-for-Kids', label: 'Striped Tabby Cat Smiling at Cupcakes with Cherries on Top' },
  { name: 'Siberian-Cat-Walking-On-Flower-Field-Coloring-In', label: 'Siberian Cat Walking On Flower Field' },
  { name: 'Small-Cartoon-Cat-Flying-a-Kite-in-a-Park-Coloring-Page-for-Kids', label: 'Small Cartoon Cat Flying a Kite in a Park' },
  { name: 'Sleepy-Cat-Lying-on-a-Vintage-Record-Player-Coloring-Sheet', label: 'Sleepy Cat Lying on a Vintage Record Player' },
  { name: 'Realistic-Tabby-Cat-Resting-on-a-Window-Ledge-with-Balls-of-Yarn', label: 'Realistic Tabby Cat Resting on a Window Ledge with Balls of Yarn' },
  { name: 'Pretty-Cat-with-Flower-Crown-Dancing-Coloring-Sheet-for-Kids', label: 'Pretty Cat with Flower Crown Dancing' },
  { name: 'Peaceful-Cat-Sitting-on-a-Crescent-Moon-in-the-Sky-Coloring-Page', label: 'Peaceful Cat Sitting on a Crescent Moon in the Sky' },
  { name: 'Magical-Cat-with-Witch-Hat-Casting-a-Spell-Coloring-Sheet', label: 'Magical Cat with Witch Hat Casting a Spell' },
  { name: 'Puss-In-Boots-Coloring-Sheet-For-Preschoolers', label: 'Puss In Boots' },
  { name: 'Pretty-Cat-Framed-by-Roses-Coloring-Page', label: 'Pretty Cat Framed by Roses' },
  { name: 'Close-Up-Of-Realistic-Cat', label: 'Close Up Of Realistic Cat' },
  { name: 'Simple-Outline-Of-Realistic-Cat-Coloring-Page', label: 'Simple Outline Of Realistic Cat' },
  { name: 'Large-Cat-Curled-Up-Next-to-Books-in-a-Library', label: 'Large Cat Curled Up Next to Books in a Library' },
  { name: 'Happy-Cat-Dancing-with-Paws-Up-Coloring-Sheet-for-Kids', label: 'Happy Cat Dancing with Paws Up' },
  { name: 'Furry-Cat-Holding-a-Flower-Coloring-Sheet-for-Preschoolers', label: 'Furry Cat Holding a Flower' },
  { name: 'Four-Baby-Cats-Playing-in-a-Flower-Garden-Coloring-Sheet', label: 'Four Baby Cats Playing in a Flower Garden' },
  { name: 'Cat-With-Toys-And-Food-Coloring-In', label: 'Cat With Toys And Food' },
  { name: 'Easy-Striped-Cat-Playing-with-Balls-of-Yarn-Coloring-Page-for-Kids', label: 'Easy Striped Cat Playing with Balls of Yarn' },
  { name: 'Chubby-Cat-Playing-the-Guitar-with-Flowers-and-Musical-Notes-Coloring-Page-for-Kids', label: 'Chubby Cat Playing the Guitar with Flowers and Musical Notes' },
  { name: 'Cat-Sitting-Outside-Cat-House', label: 'Cat Sitting Outside Cat House' },
  { name: 'Garfield-Holding-Crown-Coloring-In-For-Preschoolers', label: 'Garfield Holding Crown' },
  { name: 'Easy-Outline-Of-Felix-The-Cat-Coloring-Sheet', label: 'Easy Outline Of Felix The Cat' },
  { name: 'Coloring-Page-Of-Hello-Kitty-Hugging-Teddy-Bear', label: 'Hello Kitty Hugging Teddy Bear' },
  { name: 'Detailed-Garfield-Coloring-Page-For-Kids', label: 'Detailed Garfield' },
  { name: 'Adult-Cat-Exposing-Belly', label: 'Adult Cat Exposing Belly' },
  { name: 'Kitten-Wearing-Pants-And-Hooded-Jacket', label: 'Kitten Wearing Pants And Hooded Jacket' },
  { name: 'Cartoon-Cat-Winking-Coloring-Sheet', label: 'Cartoon Cat Winking' },
  { name: 'Cat-Lying-On-Bed-Coloring-Sheet', label: 'Cat Lying On Bed' },
  { name: 'Norwegian-Forest-Cat-Coloring-Sheet', label: 'Norwegian Forest Cat' },
  { name: 'Coloring-Page-Of-Realistic-Striped-Cat', label: 'Realistic Striped Cat' },
  { name: 'Coloring-Page-Of-Cat-Cleaning-Itself', label: 'Cat Cleaning Itself' },
  { name: 'Artistic-Stained-Glass-Cat-with-Swirling-Background-Coloring-Sheet', label: 'Artistic Stained Glass Cat with Swirling Background' },
];

const grid        = document.getElementById('thumbnail-grid');
const modal       = document.getElementById('cs-modal');
const modalImg    = document.getElementById('modal-img');
const modalLabel  = document.getElementById('modal-label');
const modalClose  = document.getElementById('modal-close');
const modalBg     = document.getElementById('modal-backdrop');
const subtitle    = document.getElementById('sheet-subtitle');

let currentSheet = null;

// ── Update subtitle count ────────────────────────────────────
subtitle.textContent = `${SHEETS.length} printable cat coloring pages \u2014 click any sheet to preview, download, or print.`;

// ── Build thumbnails ─────────────────────────────────────────
SHEETS.forEach((sheet, i) => {
  const jpgSrc = `${FOLDER}${sheet.name}.jpg`;
  const btn = document.createElement('button');
  btn.className = 'cs-thumb-btn';
  btn.setAttribute('aria-label', sheet.label);
  btn.innerHTML = `<img class="cs-thumb-img" src="${jpgSrc}" alt="${sheet.label}" loading="lazy">`;
  btn.addEventListener('click', () => openModal(sheet));
  grid.appendChild(btn);
});

// ── Modal ────────────────────────────────────────────────────
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

// ── Single sheet actions ─────────────────────────────────────
document.getElementById('btn-download-single').addEventListener('click', () => {
  if (currentSheet) downloadPDFsDirect([currentSheet], `${currentSheet.name}.pdf`);
});

document.getElementById('btn-print-single').addEventListener('click', () => {
  if (currentSheet) printPDFs([currentSheet]);
});

// ── Bulk actions ─────────────────────────────────────────────
document.getElementById('btn-all-pdf').addEventListener('click', () => {
  mergePDFs(SHEETS, 'cat-coloring-sheets-all.pdf');
});

document.getElementById('btn-print-all').addEventListener('click', () => {
  printPDFs(SHEETS);
});

document.getElementById('btn-random-pdf').addEventListener('click', () => {
  const countInput = document.getElementById('random-count');
  let n = parseInt(countInput.value, 10);
  if (isNaN(n) || n < 1) n = 1;
  if (n > SHEETS.length) n = SHEETS.length;
  const chosen = [...SHEETS].sort(() => Math.random() - 0.5).slice(0, n);
  mergePDFs(chosen, `cat-coloring-sheets-random-${n}.pdf`);
});

// ── Single PDF direct download (no merge needed) ─────────────
function downloadPDFsDirect(sheets, filename) {
  if (sheets.length === 1) {
    // Direct link download
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
  const btn = event && event.currentTarget;

  // Load pdf-lib on demand
  if (!window.PDFLib) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js');
  }

  const { PDFDocument } = window.PDFLib;
  const merged = await PDFDocument.create();

  for (const sheet of sheets) {
    const url = `${FOLDER}${sheet.name}.pdf`;
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
    // For a single PDF, open it and trigger print
    const iframe = getOrCreatePrintFrame();
    iframe.src = `${FOLDER}${sheets[0].name}.pdf`;
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
    return;
  }

  // Multiple PDFs: merge first, then open blob URL in iframe for printing
  mergePDFs(sheets, '_print.pdf').then(() => {
    // mergePDFs triggers a download; for printing we need a separate path
    // So we repeat the merge but open the blob in an iframe
  });

  // Alternative: open each PDF in a new tab (simpler for multi-page)
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

// ── Script loader ─────────────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s  = document.createElement('script');
    s.src    = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

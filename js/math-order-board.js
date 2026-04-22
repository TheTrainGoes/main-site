'use strict';

const GRADE_LABELS = {
  easy:   'Easy',
  medium: 'Medium',
  hard:   'Hard'
};

const ALL_GRADES = ['easy', 'medium', 'hard'];

// Budget amounts by difficulty (in cents)
const BUDGET_BY_GRADE = {
  easy:   1000,   // $10.00
  medium: 2000,   // $20.00
  hard:   4000    // $40.00
};

// Menu items
const MENU_ITEMS = [
  'Ice Cream Cone',
  'Sundae',
  'Slushie',
  'Hot Dog',
  'French Fries',
  'Hamburger',
  'Pizza Slice',
  'Popcorn',
  'Candy Bar',
  'Cookie',
  'Soda',
  'Milkshake'
];

let currentGrade = 'easy';
let currentBudget = BUDGET_BY_GRADE['easy'];
let currentPrices = {};

// ============================================================
// GRADE PROGRESSION
// ============================================================

function getItemCountForGrade(grade) {
  switch (grade) {
    case 'easy':   return 6;
    case 'medium': return 8;
    case 'hard':   return 11;
    default: return 6;
  }
}

function getVisibleMenuItems(grade) {
  const count = getItemCountForGrade(grade);
  return MENU_ITEMS.slice(0, count);
}

// ============================================================
// INITIALIZATION
// ============================================================

function init() {
  populateGradeSelect();
  document.getElementById('generate-btn').addEventListener('click', generateWorksheet);
  document.getElementById('answer-key-check').addEventListener('change', function () {
    document.getElementById('answer-key').classList.toggle('show-on-print', this.checked);
  });
  document.getElementById('print-btn').addEventListener('click', () => window.print());
}

function populateGradeSelect() {
  const gradeSelect = document.getElementById('grade');
  ALL_GRADES.forEach(grade => {
    const option = document.createElement('option');
    option.value = grade;
    option.textContent = GRADE_LABELS[grade];
    if (grade === currentGrade) {
      option.selected = true;
    }
    gradeSelect.appendChild(option);
  });

  gradeSelect.addEventListener('change', (e) => {
    currentGrade = e.target.value;
    currentBudget = BUDGET_BY_GRADE[currentGrade];
  });
}

function generateWorksheet() {
  currentGrade = document.getElementById('grade').value;
  currentBudget = BUDGET_BY_GRADE[currentGrade];
  generatePrices();

  updateWorksheetHeader();
  updateWorksheetMenu();
  updateProblemBudget();
  generateSampleSolutions();

  // Reset checkbox and answer key visibility, show print controls
  const answerKeyCheck = document.getElementById('answer-key-check');
  answerKeyCheck.checked = false;
  document.getElementById('answer-key').classList.remove('show-on-print');
  document.getElementById('print-controls').style.display = 'flex';
}

// ============================================================
// PRICE GENERATION
// ============================================================

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePrices() {
  currentPrices = {};
  
  let minPrice, maxPrice;
  switch (currentGrade) {
    case 'easy':   minPrice = 50;  maxPrice = 300;  break;
    case 'medium': minPrice = 125; maxPrice = 600;  break;
    case 'hard':   minPrice = 250; maxPrice = 1000; break;
    default:       minPrice = 50;  maxPrice = 300;
  }

  const visibleItems = getVisibleMenuItems(currentGrade);
  const useDecimalPrices = currentGrade === 'medium' || currentGrade === 'hard';

  visibleItems.forEach(item => {
    let price;
    
    if (useDecimalPrices) {
      price = rand(minPrice, maxPrice);
      if (Math.random() < 0.4) {
        const dollarAmount = Math.floor(price / 100);
        price = dollarAmount * 100 + 99;
        if (price > maxPrice) {
          price = dollarAmount * 100 - 1;
        }
      }
    } else {
      const priceInQuarters = rand(Math.ceil(minPrice / 25), Math.floor(maxPrice / 25));
      price = priceInQuarters * 25;
    }
    
    currentPrices[item] = price;
  });
}

// ============================================================
// WORKSHEET GENERATION
// ============================================================

function updateWorksheetHeader() {
  const header = document.getElementById('worksheet-header');
  header.innerHTML = `<strong>${GRADE_LABELS[currentGrade]} Difficulty</strong> — Order Board Worksheet`;
}

function updateWorksheetMenu() {
  const menuArea = document.getElementById('worksheet-menu');
  menuArea.innerHTML = '';
  
  const visibleItems = getVisibleMenuItems(currentGrade);
  const menuGrid = document.createElement('div');
  menuGrid.className = 'worksheet-menu-grid';
  
  visibleItems.forEach(item => {
    const price = currentPrices[item];
    const itemDiv = document.createElement('div');
    itemDiv.className = 'worksheet-menu-item';
    itemDiv.innerHTML = `
      <div class="ws-item-name">${item}</div>
      <div class="ws-item-price">${centsToDollars(price)}</div>
    `;
    menuGrid.appendChild(itemDiv);
  });
  
  menuArea.appendChild(menuGrid);
}

function updateProblemBudget() {
  const budgetEl = document.getElementById('problem-budget');
  budgetEl.textContent = centsToDollars(currentBudget);
}

// ============================================================
// SAMPLE SOLUTIONS
// ============================================================

function generateSampleSolutions() {
  const solutions = [];
  const visibleItems = getVisibleMenuItems(currentGrade);
  
  // Generate 4 different solution combinations
  for (let i = 0; i < 4; i++) {
    const solution = findSolutionCombination(visibleItems);
    if (solution) {
      solutions.push(solution);
    }
  }
  
  displaySampleSolutions(solutions);
}

function findSolutionCombination(items) {
  // Try to find a combination that's close to budget
  const maxAttempts = 50;
  let bestCombo = null;
  let bestDiff = currentBudget + 100;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const combo = [];
    let total = 0;
    
    // Pick 2-5 random items
    const itemCount = rand(2, Math.min(5, items.length));
    const selectedIndices = new Set();
    
    for (let i = 0; i < itemCount; i++) {
      let idx;
      do {
        idx = rand(0, items.length - 1);
      } while (selectedIndices.has(idx));
      selectedIndices.add(idx);
      
      const item = items[idx];
      combo.push(item);
      total += currentPrices[item];
    }
    
    // Check if this is a good solution (under budget and close to it)
    if (total <= currentBudget) {
      const diff = currentBudget - total;
      if (diff < bestDiff) {
        bestDiff = diff;
        bestCombo = { items: combo, total: total, remaining: diff };
      }
    }
  }
  
  return bestCombo;
}

function displaySampleSolutions(solutions) {
  const container = document.getElementById('sample-solutions');
  container.innerHTML = '';
  
  solutions.forEach((solution, index) => {
    const solutionDiv = document.createElement('div');
    solutionDiv.className = 'sample-solution';
    
    let itemsText = solution.items.join(' + ');
    let equation = `${itemsText} = ${centsToDollars(solution.total)}`;
    
    const remaining = currentBudget - solution.total;
    const remainingText = remaining === 0 ? 'Perfect!' : `${centsToDollars(remaining)} left`;
    
    solutionDiv.innerHTML = `
      <div class="solution-label">Sample ${index + 1}:</div>
      <div class="solution-equation">${equation}</div>
      <div class="solution-note">${remainingText}</div>
    `;
    
    container.appendChild(solutionDiv);
  });
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function centsToDollars(cents) {
  return '$' + (cents / 100).toFixed(2);
}

// ============================================================
// START
// ============================================================

init();

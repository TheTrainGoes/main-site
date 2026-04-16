'use strict';

const GRADE_LABELS = {
  kindergarten: 'Kindergarten',
  grade1: 'Grade 1',
  grade2: 'Grade 2',
  grade3: 'Grade 3',
  grade4: 'Grade 4',
  grade5: 'Grade 5',
  grade6: 'Grade 6'
};

const ALL_GRADES = ['kindergarten', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6'];

// Budget amounts by grade (in cents)
const BUDGET_BY_GRADE = {
  kindergarten: 500,   // $5.00
  grade1: 1000,        // $10.00
  grade2: 1500,        // $15.00
  grade3: 2000,        // $20.00
  grade4: 2500,        // $25.00
  grade5: 3000,        // $30.00
  grade6: 4000         // $40.00
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

let currentGrade = 'grade2';
let currentBudget = BUDGET_BY_GRADE['grade2'];
let currentPrices = {};

// ============================================================
// GRADE PROGRESSION
// ============================================================

function getItemCountForGrade(grade) {
  switch (grade) {
    case 'kindergarten': return 6;
    case 'grade1': return 6;
    case 'grade2': return 7;
    case 'grade3': return 8;
    case 'grade4': return 9;
    case 'grade5': return 10;
    case 'grade6': return 11;
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
    case 'kindergarten':
      minPrice = 50; maxPrice = 150;
      break;
    case 'grade1':
      minPrice = 100; maxPrice = 300;
      break;
    case 'grade2':
      minPrice = 100; maxPrice = 400;
      break;
    case 'grade3':
      minPrice = 125; maxPrice = 500;
      break;
    case 'grade4':
      minPrice = 150; maxPrice = 600;
      break;
    case 'grade5':
      minPrice = 200; maxPrice = 750;
      break;
    case 'grade6':
      minPrice = 250; maxPrice = 1000;
      break;
    default:
      minPrice = 100; maxPrice = 400;
  }

  const visibleItems = getVisibleMenuItems(currentGrade);
  const isGrade3Plus = ['grade3', 'grade4', 'grade5', 'grade6'].includes(currentGrade);

  visibleItems.forEach(item => {
    let price;
    
    if (isGrade3Plus) {
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
  header.innerHTML = `<strong>${GRADE_LABELS[currentGrade]}</strong> — Order Board Worksheet`;
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

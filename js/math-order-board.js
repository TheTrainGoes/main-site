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

// Menu items and base prices
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
// INITIALIZATION
// ============================================================

function init() {
  populateGradeSelect();
  generateNewGame();
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
    generateNewPrices();
    updateDisplay();
  });
}

function generateNewGame() {
  generateNewPrices();
  clearOrderInput();
  updateDisplay();
}

// ============================================================
// PRICE GENERATION
// ============================================================

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNewPrices() {
  currentPrices = {};
  
  // Prices vary based on grade level
  let minPrice, maxPrice;
  switch (currentGrade) {
    case 'kindergarten':
      minPrice = 50; maxPrice = 150;   // $0.50 to $1.50
      break;
    case 'grade1':
      minPrice = 100; maxPrice = 300;  // $1.00 to $3.00
      break;
    case 'grade2':
      minPrice = 100; maxPrice = 400;  // $1.00 to $4.00
      break;
    case 'grade3':
      minPrice = 125; maxPrice = 500;  // $1.25 to $5.00
      break;
    case 'grade4':
      minPrice = 150; maxPrice = 600;  // $1.50 to $6.00
      break;
    case 'grade5':
      minPrice = 200; maxPrice = 750;  // $2.00 to $7.50
      break;
    case 'grade6':
      minPrice = 250; maxPrice = 1000; // $2.50 to $10.00
      break;
    default:
      minPrice = 100; maxPrice = 400;
  }

  MENU_ITEMS.forEach(item => {
    // Prices are in quarters for realistic pricing
    const priceInQuarters = rand(Math.ceil(minPrice / 25), Math.floor(maxPrice / 25));
    currentPrices[item] = priceInQuarters * 25;
  });
}

// ============================================================
// DISPLAY UPDATES
// ============================================================

function updateDisplay() {
  updateBudgetDisplay();
  updateMenuBoard();
  updateOrderSummary();
}

function updateBudgetDisplay() {
  const budgetDisplay = document.getElementById('budget-display');
  budgetDisplay.textContent = centsToDollars(currentBudget);
}

function updateMenuBoard() {
  const menuBoard = document.getElementById('menu-board');
  menuBoard.innerHTML = '';

  MENU_ITEMS.forEach(item => {
    const price = currentPrices[item];
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.innerHTML = `
      <div class="item-name">${item}</div>
      <div class="item-price">${centsToDollars(price)}</div>
    `;
    menuBoard.appendChild(card);
  });
}

function updateOrderSummary() {
  const budgetSummary = document.getElementById('summary-budget');
  budgetSummary.textContent = centsToDollars(currentBudget);
  
  const totalSpent = calculateOrderTotal();
  const remaining = currentBudget - totalSpent;

  const totalDisplay = document.getElementById('summary-total');
  totalDisplay.textContent = centsToDollars(totalSpent);
  totalDisplay.className = totalSpent > currentBudget ? 'over-budget' : '';

  const remainingDisplay = document.getElementById('summary-remaining');
  remainingDisplay.textContent = centsToDollars(Math.max(0, remaining));
  remainingDisplay.className = remaining < 0 ? 'over-budget' : '';
}

function clearOrderInput() {
  document.getElementById('order-list').value = '';
  document.getElementById('result-message').textContent = '';
  document.getElementById('result-message').className = 'result-message hidden';
  updateOrderSummary();
}

// ============================================================
// ORDER CALCULATION
// ============================================================

function calculateOrderTotal() {
  const orderText = document.getElementById('order-list').value;
  if (!orderText.trim()) {
    return 0;
  }

  let total = 0;
  const lines = orderText.split('\n').map(line => line.trim());

  lines.forEach(line => {
    if (!line) return;

    // Try to find matching items (case-insensitive)
    let found = false;
    for (const [item, price] of Object.entries(currentPrices)) {
      if (item.toLowerCase() === line.toLowerCase()) {
        total += price;
        found = true;
        break;
      }
    }

    if (!found) {
      // Try partial matching for common variations
      const lowercaseLine = line.toLowerCase();
      for (const [item, price] of Object.entries(currentPrices)) {
        if (item.toLowerCase().includes(lowercaseLine) || lowercaseLine.includes(item.toLowerCase())) {
          total += price;
          found = true;
          break;
        }
      }
    }
  });

  return total;
}

function checkOrder() {
  const orderText = document.getElementById('order-list').value.trim();
  if (!orderText) {
    showMessage('Please write what you want to order!', 'error');
    return;
  }

  const total = calculateOrderTotal();
  const remaining = currentBudget - total;
  const resultMessage = document.getElementById('result-message');

  if (total === 0) {
    showMessage("I couldn't find those items on the menu. Try using names from the menu board!", 'error');
    return;
  }

  if (remaining < 0) {
    const overage = Math.abs(remaining);
    showMessage(
      `You went over budget by ${centsToDollars(overage)}! 😢 Try ordering fewer items.`,
      'error'
    );
  } else if (remaining === 0) {
    showMessage(
      `Perfect! You spent exactly your whole budget! 🎉`,
      'success'
    );
  } else {
    const percentage = Math.round((total / currentBudget) * 100);
    showMessage(
      `Great job! You spent ${centsToDollars(total)} and have ${centsToDollars(remaining)} left (${percentage}% of your budget). 👍`,
      'success'
    );
  }
}

function showMessage(message, type) {
  const resultMessage = document.getElementById('result-message');
  resultMessage.textContent = message;
  resultMessage.className = `result-message ${type}`;
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function centsToDollars(cents) {
  return '$' + (cents / 100).toFixed(2);
}

// ============================================================
// EVENT LISTENERS
// ============================================================

document.getElementById('random-btn').addEventListener('click', () => {
  generateNewPrices();
  updateDisplay();
});

document.getElementById('new-game-btn').addEventListener('click', () => {
  generateNewGame();
});

document.getElementById('calculate-btn').addEventListener('click', () => {
  updateOrderSummary();
  checkOrder();
});

// Update order summary as user types
document.getElementById('order-list').addEventListener('input', () => {
  updateOrderSummary();
});

// ============================================================
// START THE GAME
// ============================================================

init();

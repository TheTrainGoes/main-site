const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const DAY_ABBR_SUN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_ABBR_MON = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const DAY_FULL_SUN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_FULL_MON = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function generateMonthly(month, year, weekStart) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay();
  if (weekStart === 1) firstDay = (firstDay + 6) % 7;

  const dayHeaders = weekStart === 0 ? DAY_ABBR_SUN : DAY_ABBR_MON;

  const grid = document.createElement('div');
  grid.className = 'cal-grid';

  dayHeaders.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'cal-header-cell';
    cell.textContent = d;
    grid.appendChild(cell);
  });

  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell cal-day-empty';
    grid.appendChild(cell);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    const num = document.createElement('span');
    num.className = 'cal-day-num';
    num.textContent = d;
    cell.appendChild(num);
    grid.appendChild(cell);
  }

  return grid;
}

function generateWeekly(month, year, weekStart) {
  const dayNames = weekStart === 0 ? DAY_FULL_SUN : DAY_FULL_MON;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay();
  if (weekStart === 1) firstDay = (firstDay + 6) % 7;

  const container = document.createElement('div');
  container.className = 'cal-weekly-container';

  let weekNumber = 1;
  let day = 1 - firstDay;

  while (day <= daysInMonth) {
    const weekEl = document.createElement('div');
    weekEl.className = 'cal-week-block';

    const weekLabel = document.createElement('div');
    weekLabel.className = 'cal-week-label';
    weekLabel.textContent = 'Week ' + weekNumber;
    weekEl.appendChild(weekLabel);

    const daysEl = document.createElement('div');
    daysEl.className = 'cal-week-days';

    for (let col = 0; col < 7; col++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'cal-week-day';

      const nameEl = document.createElement('div');
      nameEl.className = 'cal-week-day-name';
      nameEl.textContent = dayNames[col];

      const numEl = document.createElement('div');
      numEl.className = 'cal-week-day-num';
      numEl.textContent = (day >= 1 && day <= daysInMonth) ? day : '';

      dayEl.appendChild(nameEl);
      dayEl.appendChild(numEl);
      daysEl.appendChild(dayEl);
      day++;
    }

    weekEl.appendChild(daysEl);

    const linesEl = document.createElement('div');
    linesEl.className = 'cal-week-lines';
    for (let i = 0; i < 4; i++) {
      const line = document.createElement('div');
      line.className = 'cal-week-line-row';
      linesEl.appendChild(line);
    }
    weekEl.appendChild(linesEl);

    container.appendChild(weekEl);
    weekNumber++;
  }

  return container;
}

function generate() {
  const style = document.getElementById('cal-style').value;
  const month = parseInt(document.getElementById('cal-month').value);
  const year = parseInt(document.getElementById('cal-year').value);
  const weekStart = parseInt(document.getElementById('week-start').value);
  const landscape = document.getElementById('landscape-print').checked;

  const title = MONTH_NAMES[month] + ' ' + year;
  document.getElementById('cal-title').textContent =
    style === 'weekly' ? title + ' — Weekly Planner' : title;

  const body = document.getElementById('cal-body');
  body.innerHTML = '';

  if (style === 'monthly') {
    body.appendChild(generateMonthly(month, year, weekStart));
  } else {
    body.appendChild(generateWeekly(month, year, weekStart));
  }

  const outputEl = document.getElementById('output');
  outputEl.classList.remove('hidden');
  if (landscape) {
    outputEl.classList.add('landscape-print');
  } else {
    outputEl.classList.remove('landscape-print');
  }
}

// Pre-select current month
const now = new Date();
document.getElementById('cal-month').value = now.getMonth();
document.getElementById('cal-year').value = now.getFullYear();

document.getElementById('generate-btn').addEventListener('click', generate);
document.getElementById('regen-btn').addEventListener('click', generate);
document.getElementById('print-btn').addEventListener('click', () => window.print());

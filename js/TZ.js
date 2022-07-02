// данные для таблицы
const response = {
    "ab": { "0": "1", "1": "7", "2": "13", "3": "19", "4": "25", "5": "31" },
    "ac": { "0": "2", "1": "8", "2": "14", "3": "20", "4": "26", "5": "32" },
    "ad": { "0": "3", "1": "9", "2": "15", "3": "21", "4": "27", "5": "33" },
    "af": { "0": "4", "1": "10", "2": "16", "3": "22", "4": "28", "5": "34" },
    "ar": { "0": "5", "1": "11", "2": "17", "3": "23", "4": "29", "5": "35" },
    "ae": { "0": "6", "1": "12", "2": "18", "3": "24", "4": "30", "5": "36" },
};

// преобразование столбцов в строки, и извлечение заголовков
const tableData = { headers: Object.keys(response), rows: [] };
for (const header of tableData.headers) {
    Object.values(response[header]).forEach((val, idx) => {
        (tableData.rows[idx] = (tableData.rows[idx] ?? [])).push(val);
    });
}

// рендеринг таблицы
const tBody = document.createElement('table').createTBody();
tBody.insertAdjacentHTML('beforeBegin', `<thead><tr>${tableData.headers.map(hdr => `<th>${hdr}</th>`).join('')
    }</tr></thead>`);
for (const row of tableData.rows) {
    const tr = tBody.insertRow();
    row.forEach(val => tr.insertCell().textContent = val);
}
document.body.appendChild(tBody.parentElement);


//последние значения
let last = [];

function setLast() {
  document.getElementById('last').innerHTML = last.join(', ');
}

function insertLast(value) {
  if (last.length > 4) {
    last.shift();
  }
  
  last[last.length] = value;
  setLast();
}


// выделение ячейки цветом по номеру строки и столбца
function selectCell(row, column) {
    var currentSelection = document.querySelector('td[selected]'); //находим текущую выделенную ячейку
    if (currentSelection) {      
      insertLast(currentSelection.innerHTML);
      currentSelection.removeAttribute('selected'); //если найдена, то снимаем выделение
    }

    var newSelection = document.querySelector('table').rows[row].cells[column - 1]; // находим строку и столбец
    newSelection.setAttribute('selected', true); //устанавливаем атрибут selected, который затем будем использовать в css для раскраски
}


// при загрузке страницы выбор ячейки
function randomChoice(rows = 6, columns = 6) {

    var cellsCount = rows * columns;

    var rndCellNumber = Math.floor(Math.random() * cellsCount);
    var row = Math.floor(rndCellNumber / columns) + 1;
    var column = (rndCellNumber % columns) + 1;

    selectCell(row, column);
}

randomChoice();

//Изменение цвета круга

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let isSecond = false;

//Задаем время, которое будет выводиться в кольце 
const TIME_LIMIT_2 = 6;
const TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


//Вставляем в HTML разметку кольца, в котором будет таймер
document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
//Запускаем таймер
startTimer();
//Создаем функцию, которая будет считать первый раунд
function startTimer() {
  
  isSecond = false;
  
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      
      onTimesUp();
      
    
    }
  }, 1000);
  
}
//Создаем функцию, которая будет считать второй раунд
function startTimer_second() {
  
  isSecond = true;
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT_2 - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    if (timeLeft === 0) {
      
      onTimesUp_Second();
    
    
    }
   
  }, 1000);
  
}
//Функция, которая переходит ко второму раунду
function onTimesUp() {

    clearInterval(timerInterval);
    timePassed = 0;
   
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(COLOR_CODES.alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(COLOR_CODES.info.color);
    startTimer_second();
    
    var currentSelection = document.querySelector('td[selected]'); 
    if (currentSelection) {      
      insertLast(currentSelection.innerHTML);
      currentSelection.removeAttribute('selected'); 
    }
    
    
  }
  
  //Функция, после окончания которой, переход к первому раунду
  function onTimesUp_Second() {
    
    clearInterval(timerInterval);
    timePassed = 0;
   
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(COLOR_CODES.alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(COLOR_CODES.info.color);
    
    randomChoice();
    $('td').removeClass('active');
    startTimer();

   
  }

//Функция, которая отображает оставшееся время
function formatTime(time) {
  let seconds = time % 60;
  // Если значение секунд меньше 10, тогда отображаем его с 0 впереди 
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
//Выводим в формате секунд
  return `${seconds}`;
}
 
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
    // Если оставшееся время меньше или равно 5, удаляем класс "warning" и применяем класс "alert".
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
      // Если оставшееся время меньше или равно 5, удаляем класс "warning" и применяем класс "alert".
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}
// Делим оставшееся время на определенный временной лимит
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

// Обновляем значение свойства dasharray, начиная с 283
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

// Выделение ячейки
$(document).ready(function () {
    $('td').click(function () {      
      if (!isSecond) {
        $(this).addClass('active');
      }
    });
});
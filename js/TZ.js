// данные для таблицы
const response = {
    "ab": { "0": "1", "1": "2", "2": "3", "3": "4", "4": "5", "5": "6" },
    "ac": { "0": "1", "1": "2", "2": "3", "3": "4", "4": "5", "5": "6" },
    "ad": { "0": "1", "1": "2", "2": "3", "3": "4", "4": "5", "5": "6" },
    "af": { "0": "1", "1": "2", "2": "3", "3": "4", "4": "5", "5": "6" },
    "ar": { "0": "1", "1": "2", "2": "3", "3": "4", "4": "5", "5": "6" },
    "ae": { "0": "1", "1": "2", "2": "3", "3": "4", "4": "5", "5": "6" },
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

// выделение ячейки цветом по номеру строки и столбца
function selectCell(row, column) {
    var currentSelection = document.querySelector('td[selected]'); //находим текущую выделенную ячейку
    if (currentSelection) currentSelection.removeAttribute('selected'); //если найдена, то снимаем выделение

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
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
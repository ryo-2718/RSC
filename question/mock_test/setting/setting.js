const values = {};

function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${year} <input type="checkbox" id="${year}" onchange="toggleYear('${year}')"></td>
            <td><input type="checkbox" id="${year}1" onchange="updateValue('${year}1')"></td>
            <td><input type="checkbox" id="${year}2" onchange="updateValue('${year}2')"></td>
            <td><input type="checkbox" id="${year}3" onchange="updateValue('${year}3')"></td>
            <td><input type="checkbox" id="${year}4" onchange="updateValue('${year}4')"></td>
            <td><input type="checkbox" id="${year}5" onchange="updateValue('${year}5')"></td>
        </tr>
    `).join('');
}

function updateValue(id) {
    const checkbox = document.getElementById(id);
    values[id] = checkbox.checked;
}

function toggleChapter(chapter) {
    const isChecked = document.getElementById(`chapter_${chapter}`).checked;
    const checkboxes = document.querySelectorAll(`input[id^="${chapter}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`${year}${i}`);
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    }
}

window.onload = () => {
    const years = ['H20_1', 'H20_2', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'R1', 'R2', 'R3', 'R4'];
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = generateRows(years);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        values[checkbox.id] = checkbox.checked;
    });
};

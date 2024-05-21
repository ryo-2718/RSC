const values = {};

function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${year} <input type="checkbox" id="${year}" onchange="toggleYear('${year}')"></td>
            <td><input type="checkbox" id="${year}_1" onchange="updateValue('${year}_1')"></td>
            <td><input type="checkbox" id="${year}_2" onchange="updateValue('${year}_2')"></td>
            <td><input type="checkbox" id="${year}_3" onchange="updateValue('${year}_3')"></td>
            <td><input type="checkbox" id="${year}_4" onchange="updateValue('${year}_4')"></td>
            <td><input type="checkbox" id="${year}_5" onchange="updateValue('${year}_5')"></td>
        </tr>
    `).join('');
}

function updateValue(id) {
    const checkbox = document.getElementById(id);
    values[id] = checkbox.checked;
    const parts = id.split('_');
    const year = parts[0];
    const chapter = parts[1];
    
    // 対応する章のチェックボックスの状態を更新
    const chapterCheckbox = document.getElementById(`chapter_${chapter}`);
    chapterCheckbox.checked = areAllChaptersChecked(year);
    updateValue(chapterCheckbox.id);
    
    // 対応する年代のチェックボックスの状態を更新
    const yearCheckbox = document.getElementById(year);
    yearCheckbox.checked = areAllYearsChecked(chapter);
    updateValue(yearCheckbox.id);

    console.log(values); // デバッグ用にコンソールに表示
}

function toggleChapter(chapter) {
    const isChecked = document.getElementById(`chapter_${chapter}`).checked;
    const checkboxes = document.querySelectorAll(`input[id$="_${chapter}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`${year}_${i}`);
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    }
}

function areAllChaptersChecked(year) {
    for (let i = 1; i <= 5; i++) {
        if (!values[`${year}_${i}`]) {
            return false;
        }
    }
    return true;
}

function areAllYearsChecked(chapter) {
    const years = ['H20_1', 'H20_2', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'R1', 'R2', 'R3', 'R4'];
    for (const year of years) {
        if (!values[`${year}_${chapter}`]) {
            return false;
        }
    }
    return true;
}

window.onload = () => {
    const years = ['H20_1', 'H20_2', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'R1', 'R2', 'R3', 'R4'];
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = generateRows(years);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        values[checkbox.id] = checkbox.checked;
    });
    console.log(values); // デバッグ用にコンソールに表示
};

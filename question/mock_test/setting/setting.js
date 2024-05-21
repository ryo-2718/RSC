const values = {};

// 行を生成する関数
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

function toggleChapter(chapter) {
    const checkboxes = document.querySelectorAll(`input[id$="_${chapter}"]`);
    let allChecked = true;
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            allChecked = false;
        }
    });

    const chapterCheckbox = document.getElementById(`chapter_${chapter}`);
    chapterCheckbox.checked = allChecked;
    updateValue(`chapter_${chapter}`);

    checkboxes.forEach(checkbox => {
        if (!((checkbox.id === `H20_1` && chapter === 1) || (checkbox.id === `H20_2` && chapter === 2))) {
            checkbox.checked = allChecked;
            updateValue(checkbox.id);
        }
    });
}

function toggleYear(year) {
    const checkboxes = document.querySelectorAll(`input[id^="${year}_"]`);
    let allChecked = true;
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            allChecked = false;
        }
    });

    const yearCheckbox = document.getElementById(year);
    yearCheckbox.checked = allChecked;
    updateValue(year);

    checkboxes.forEach(checkbox => {
        checkbox.checked = allChecked;
        updateValue(checkbox.id);
    });
}

// ページが読み込まれたときの初期設定
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

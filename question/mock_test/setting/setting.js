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

function updateValue(id) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
        values[id] = checkbox.checked;

        // 章のチェックボックスの状態を更新
        for (let chapter = 1; chapter <= 5; chapter++) {
            const chapterCheckbox = document.getElementById(`chapter_${chapter}`);
            if (chapterCheckbox) {
                const relatedCheckboxes = document.querySelectorAll(`input[id$="_${chapter}"]`);
                const allChecked = Array.from(relatedCheckboxes).every(cb => cb.checked);
                chapterCheckbox.checked = allChecked;
                values[`chapter_${chapter}`] = allChecked;
            }
        }

        // 年代のチェックボックスの状態を更新
        const year = id.split('_')[0];
        const yearCheckbox = document.getElementById(year);
        if (yearCheckbox) {
            const yearRelatedCheckboxes = document.querySelectorAll(`input[id^="${year}_"]`);
            const allChecked = Array.from(yearRelatedCheckboxes).every(cb => cb.checked);
            yearCheckbox.checked = allChecked;
            values[year] = allChecked;
        }

        console.log(values); // デバッグ用にコンソールに表示
    }
}

function toggleChapter(chapter) {
    const isChecked = document.getElementById(`chapter_${chapter}`).checked;
    const checkboxes = document.querySelectorAll(`input[id$="_${chapter}"]`);
    checkboxes.forEach(checkbox => {
        if (checkbox && !((checkbox.id === `H20_1` && chapter === 1) || (checkbox.id === `H20_2` && chapter === 2))) {
            checkbox.checked = isChecked;
            updateValue(checkbox.id);
        }
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    const checkboxes = document.querySelectorAll(`input[id^="${year}_"]`);
    checkboxes.forEach(checkbox => {
        if (checkbox) {
            checkbox.checked = isChecked;
            updateValue(checkbox.id);
        }
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

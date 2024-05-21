const values = {};

// 行を生成する関数
function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${year.replace('$', '-')} <input type="checkbox" id="${year.replace('$', '_')}" onchange="toggleYear('${year.replace('$', '_')}')"></td>
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
    document.querySelectorAll(`input[id$="_${chapter}"]`).forEach(checkbox => {
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    document.querySelectorAll(`input[id^="${year}_"]`).forEach(checkbox => {
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    });
}

// ページが読み込まれたときの初期設定
window.onload = () => {
    const years = ['H20$1', 'H20$2', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'R1', 'R2', 'R3', 'R4'];
    document.getElementById('table-body').innerHTML = generateRows(years);

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        values[checkbox.id] = checkbox.checked;
        checkbox.addEventListener('change', () => updateValue(checkbox.id));
    });

    console.log(values);
};

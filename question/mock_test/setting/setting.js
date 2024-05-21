const values = {};

// 行を生成する関数
function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${year.replace('$', '-')} <input type="checkbox" id="${year}" onchange="toggleYear('${year}')"></td>
            <td><input type="checkbox" id="${year}$1" onchange="updateValue('${year}$1')"></td>
            <td><input type="checkbox" id="${year}$2" onchange="updateValue('${year}$2')"></td>
            <td><input type="checkbox" id="${year}$3" onchange="updateValue('${year}$3')"></td>
            <td><input type="checkbox" id="${year}$4" onchange="updateValue('${year}$4')"></td>
            <td><input type="checkbox" id="${year}$5" onchange="updateValue('${year}$5')"></td>
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
                const relatedCheckboxes = document.querySelectorAll(`input[id$="$${chapter}"]`);
                const allChecked = Array.from(relatedCheckboxes).every(cb => cb.checked);
                chapterCheckbox.checked = allChecked;
                values[`chapter_${chapter}`] = allChecked;
            }
        }

        // 年代のチェックボックスの状態を更新
        const year = id.split('$')[0];
        const yearCheckbox = document.getElementById(year);
        if (yearCheckbox) {
            const yearRelatedCheckboxes = document.querySelectorAll(`input[id^="${year}$"]`);
            const allChecked = Array.from(yearRelatedCheckboxes).every(cb => cb.checked);
            yearCheckbox.checked = allChecked;
            values[year] = allChecked;
        }

        console.log(values); // デバッグ用にコンソールに表示
    }
}

function toggleChapter(chapter) {
    const isChecked = document.getElementById(`chapter_${chapter}`).checked;
    document.querySelectorAll(`input[id$="$${chapter}"]`).forEach(checkbox => {
        if (!(checkbox.id === `H20$1$${chapter}` || checkbox.id === `H20$2$${chapter}`)) {
            checkbox.checked = isChecked;
            updateValue(checkbox.id);
        }
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    document.querySelectorAll(`input[id^="${year}$"]`).forEach(checkbox => {
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

const values = {};

function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${year} <input type="checkbox" id="${year}" onchange="toggleYear('${year}')"></td>
            <td><input type="checkbox" id="${year}ch1" onchange="updateValue('${year}ch1')"></td>
            <td><input type="checkbox" id="${year}ch2" onchange="updateValue('${year}ch2')"></td>
            <td><input type="checkbox" id="${year}ch3" onchange="updateValue('${year}ch3')"></td>
            <td><input type="checkbox" id="${year}ch4" onchange="updateValue('${year}ch4')"></td>
            <td><input type="checkbox" id="${year}ch5" onchange="updateValue('${year}ch5')"></td>
        </tr>
    `).join('');
}

function updateValue(id) {
    const checkbox = document.getElementById(id);
    values[id] = checkbox.checked;
}

function toggleChapter(chapter) {
    const isChecked = document.getElementById(`chapter_${chapter}`).checked;
    const checkboxes = document.querySelectorAll(`input[id$="ch${chapter}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`${year}ch${i}`);
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
        checkbox.addEventListener('change', function() {
            updateRelatedCheckboxes(this.id);
        });
    });

    function updateRelatedCheckboxes(id) {
        const year = id.split('ch')[0]; // 年代を取得
        const chapter = id.split('ch')[1]; // 章を取得
        const yearCheckboxes = document.querySelectorAll(`input[id^="${year}ch"]`);
        const chapterCheckboxes = document.querySelectorAll(`input[id$="ch${chapter}"]`);
        
        // 年代に関するチェックボックスの状態をチェック
        let yearChecked = true;
        yearCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                yearChecked = false;
            }
        });

        // 章に関するチェックボックスの状態をチェック
        let chapterChecked = true;
        chapterCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                chapterChecked = false;
            }
        });

        // 年代に関するチェックボックスの状態を更新
        const yearCheckbox = document.getElementById(year);
        yearCheckbox.checked = yearChecked;
        values[yearCheckbox.id] = yearChecked;

        // 章に関するチェックボックスの状態を更新
        const chapterCheckbox = document.getElementById(`chapter_${chapter}`);
        chapterCheckbox.checked = chapterChecked;
        values[chapterCheckbox.id] = chapterChecked;

        // 年代に関するチェックボックスの状態が変更された場合、その年代に属する章の状態も更新する
        if (id.startsWith(year)) {
            chapterCheckboxes.forEach(checkbox => {
                checkbox.checked = yearChecked;
                values[checkbox.id] = yearChecked;
            });
        }

        // 章に関するチェックボックスの状態が変更された場合、その章に属する年代の状態も更新する
        if (id.endsWith(chapter)) {
            yearCheckboxes.forEach(checkbox => {
                checkbox.checked = chapterChecked;
                values[checkbox.id] = chapterChecked;
            });
        }
    }
};

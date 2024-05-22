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

function updateAllCheckboxes() {
    const yearCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([id^="chapter_"])');
    const chapterCheckboxes = document.querySelectorAll('input[id^="chapter_"]');

    // 各年代ごとにループ
    yearCheckboxes.forEach(yearCheckbox => {
        const year = yearCheckbox.id;
        let yearChecked = true;
        // 各章ごとにループ
        chapterCheckboxes.forEach(chapterCheckbox => {
            const chapter = chapterCheckbox.id.split('_')[1];
            // 各年代の章に対するチェックボックスが一つでもチェックされていなければ、その年代のチェックを外す
            if (!document.getElementById(`${year}ch${chapter}`).checked) {
                yearChecked = false;
            }
        });
        // 年代のチェックボックスを更新
        document.getElementById(year).checked = yearChecked;
        updateValue(year);
    });

    // 各章ごとにループ
    chapterCheckboxes.forEach(chapterCheckbox => {
        const chapter = chapterCheckbox.id.split('_')[1];
        let chapterChecked = true;
        // 各年代ごとにループ
        yearCheckboxes.forEach(yearCheckbox => {
            const year = yearCheckbox.id;
            // 各章の年代に対するチェックボックスが一つでもチェックされていなければ、その章のチェックを外す
            if (!document.getElementById(`${year}ch${chapter}`).checked) {
                chapterChecked = false;
            }
        });
        // 章のチェックボックスを更新
        document.getElementById(`chapter_${chapter}`).checked = chapterChecked;
        updateValue(`chapter_${chapter}`);
    });
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
    // 全体のチェックボックスを更新
    updateAllCheckboxes();
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`${year}ch${i}`);
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    }
    // 全体のチェックボックスを更新
    updateAllCheckboxes();
}

window.onload = () => {
    const years = ['H20_1', 'H20_2', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'R1', 'R2', 'R3', 'R4'];
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = generateRows(years);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        values[checkbox.id] = checkbox.checked;
    });

    // 全体のチェックボックスを更新
    updateAllCheckboxes();
};

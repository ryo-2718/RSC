const values = {};

function formatYear(year) {
    let formattedYear = year;
    if (year.startsWith('H')) {
        formattedYear = '平成' + year.substring(1).replace('_1', '年①').replace('_2', '年②');
        if (!formattedYear.includes('年')) {
            formattedYear = formattedYear + '年';
        }
    } else if (year.startsWith('R')) {
        formattedYear = '令和' + year.substring(1).replace('_1', '年①').replace('_2', '年②');
        if (!formattedYear.includes('年')) {
            formattedYear = formattedYear + '年';
        }
    }
    return formattedYear;
}

function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${formatYear(year)} <input type="checkbox" id="${year}" checked onchange="toggleYear('${year}')"></td>
            <td><input type="checkbox" id="${year}ch1" checked onchange="updateValue('${year}ch1')"></td>
            <td><input type="checkbox" id="${year}ch2" checked onchange="updateValue('${year}ch2')"></td>
            <td><input type="checkbox" id="${year}ch3" checked onchange="updateValue('${year}ch3')"></td>
            <td><input type="checkbox" id="${year}ch4" checked onchange="updateValue('${year}ch4')"></td>
            <td><input type="checkbox" id="${year}ch5" checked onchange="updateValue('${year}ch5')"></td>
        </tr>
    `).join('');
}

function updateValue(id) {
    const checkbox = document.getElementById(id);
    values[id] = checkbox.checked;
    updateRelatedCheckboxes(id);
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

function updateRelatedCheckboxes(id) {
    const year = id.includes('ch') ? id.split('ch')[0] : id; // 年代を取得
    const chapter = id.includes('ch') ? id.split('ch')[1] : null; // 章を取得
    const yearCheckboxes = document.querySelectorAll(`input[id^="${year}ch"]`);
    
    // 年代に関するチェックボックスの状態をチェック
    let yearChecked = Array.from(yearCheckboxes).every(checkbox => checkbox.checked);

    // 年代に関するチェックボックスの状態を更新
    const yearCheckbox = document.getElementById(year);
    if (yearCheckbox) {
        yearCheckbox.checked = yearChecked;
        values[yearCheckbox.id] = yearChecked;
    }

    // 章に関するチェックボックスの状態をチェック
    if (chapter) {
        const chapterCheckboxes = document.querySelectorAll(`input[id$="ch${chapter}"]`);
        let chapterChecked = Array.from(chapterCheckboxes).every(checkbox => checkbox.checked);

        // 章に関するチェックボックスの状態を更新
        const chapterCheckbox = document.getElementById(`chapter_${chapter}`);
        if (chapterCheckbox) {
            chapterCheckbox.checked = chapterChecked;
            values[chapterCheckbox.id] = chapterChecked;
        }
    }
}

// 模擬試験モードのトグルスイッチの状態を切り替える関数
function toggleFunction(isOn) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (isOn) {
            checkbox.checked = true; // すべてのチェックボックスをチェック
            checkbox.disabled = true; // チェックボックスをロック
        } else {
            checkbox.disabled = false; // チェックボックスのロックを解除
        }
        updateValue(checkbox.id);
    });
}

window.onload = () => {
    const years = ['H20_1', 'H20_2', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'R1', 'R2', 'R3', 'R4'];
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = generateRows(years);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true; // すべてのチェックボックスをチェック状態にする
        values[checkbox.id] = checkbox.checked;
        checkbox.addEventListener('change', function() {
            updateValue(this.id);
        });
    });
};

function savePreferences() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let selectedIds = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedIds.push(checkbox.id);
    }
  });

  localStorage.setItem('selectedIds', JSON.stringify(selectedIds));
}


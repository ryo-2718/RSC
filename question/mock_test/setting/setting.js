const values = {};

// 行を生成する関数
function generateRows(years) {
    return years.map(year => `
        <tr>
            <td>${year.replace('$', '-')}</td>
            <td><input type="checkbox" id="${year}-1" onchange="updateValue('${year}-1')"></td>
            <td><input type="checkbox" id="${year}-2" onchange="updateValue('${year}-2')"></td>
            <td><input type="checkbox" id="${year}-3" onchange="updateValue('${year}-3')"></td>
            <td><input type="checkbox" id="${year}-4" onchange="updateValue('${year}-4')"></td>
            <td><input type="checkbox" id="${year}-5" onchange="updateValue('${year}-5')"></td>
        </tr>
    `).join('');
}

function updateValue(id) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
        values[id] = checkbox.checked;

        const [year, chapter] = id.split('-');
        const allChecked = ['1', '2', '3', '4', '5'].every(num => {
            return values[`${year}-${num}`];
        });
        document.getElementById(year).checked = allChecked;

        const allChaptersChecked = ['1', '2', '3', '4', '5'].every(num => {
            return values[`${year}-${num}`];
        });
        document.getElementById(`chapter_${chapter}`).checked = allChaptersChecked;

        console.log(values); // デバッグ用にコンソールに表示
    }
}

function toggleChapter(chapter) {
    const isChecked = document.getElementById(`chapter_${chapter}`).checked;
    document.querySelectorAll(`input[id$="-${chapter}"]`).forEach(checkbox => {
        checkbox.checked = isChecked;
        updateValue(checkbox.id);
    });
}

function toggleYear(year) {
    const isChecked = document.getElementById(year).checked;
    document.querySelectorAll(`input[id^="${year}-"]`).forEach(checkbox => {
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

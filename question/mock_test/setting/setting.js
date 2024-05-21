 function toggleMockTestMode() {
            const isMockTestMode = document.getElementById('mock-test-mode').checked;
            const chapterCheckboxes = document.querySelectorAll('input[name="chapter"]');
            const yearCheckboxes = document.querySelectorAll('input[name="year"]');
            
            chapterCheckboxes.forEach(checkbox => {
                checkbox.checked = isMockTestMode;
                checkbox.disabled = isMockTestMode;
            });
            
            yearCheckboxes.forEach(checkbox => {
                checkbox.checked = isMockTestMode;
                checkbox.disabled = isMockTestMode;
            });
        }
        
        window.onload = () => {
            toggleMockTestMode();
        };

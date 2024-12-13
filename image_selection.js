const imagesContainerLeft = document.getElementById("images-container-left");
const imagesContainerRight = document.getElementById("images-container-right");
const saveSelectionLeft = document.getElementById("save-selection-left");
const saveSelectionRight = document.getElementById("save-selection-right");
const leftSelectedCount = document.getElementById("left-selected-count");
const rightSelectedCount = document.getElementById("right-selected-count");

function createImageSelection(container, selectedNumbersKey, countElement) {
    for (let i = 1; i <= 86; i++) {
        let imageDiv = document.createElement("div");
        imageDiv.style.backgroundImage = `url('images/${i}.png')`;
        imageDiv.addEventListener('click', function () {
            imageDiv.classList.toggle('selected');
            updateSelectedState(container, selectedNumbersKey, countElement);
        });
        container.appendChild(imageDiv);
    }
    restoreSelectedState(container, selectedNumbersKey, countElement);
}

function getUnselectedNumbers(container) {
    let allNumbers = Array.from({ length: 86 }, (_, i) => i + 1);
    let selectedDivs = container.querySelectorAll('div.selected');
    let selectedNumbers = Array.from(selectedDivs).map(div => {
        return parseInt(div.style.backgroundImage.match(/\d+/)[0]);
    });
    return allNumbers.filter(number => !selectedNumbers.includes(number));
}

function updateSelectedState(container, key, countElement) {
    let selectedDivs = container.querySelectorAll('div.selected');
    let selectedNumbers = Array.from(selectedDivs).map(div => {
        return parseInt(div.style.backgroundImage.match(/\d+/)[0]);
    });
    localStorage.setItem(key, JSON.stringify(selectedNumbers));
    countElement.textContent = `${selectedNumbers.length}/86`;
}

function restoreSelectedState(container, key, countElement) {
    let selectedNumbers = JSON.parse(localStorage.getItem(key)) || [];
    selectedNumbers.forEach(number => {
        let imageDiv = container.querySelector(`div[style*="images/${number}.png"]`);
        if (imageDiv) {
            imageDiv.classList.add('selected');
        }
    });
    countElement.textContent = `${selectedNumbers.length}/86`;
}

saveSelectionLeft.addEventListener('click', function () {
    let unselectedNumbers = getUnselectedNumbers(imagesContainerLeft);
    localStorage.setItem('unselectedNumbersLeft', JSON.stringify(unselectedNumbers));
    alert('左の画像選択が保存されました');
});

saveSelectionRight.addEventListener('click', function () {
    let unselectedNumbers = getUnselectedNumbers(imagesContainerRight);
    localStorage.setItem('unselectedNumbersRight', JSON.stringify(unselectedNumbers));
    alert('右の画像選択が保存されました');
});

createImageSelection(imagesContainerLeft, 'selectedNumbersLeft', leftSelectedCount);
createImageSelection(imagesContainerRight, 'selectedNumbersRight', rightSelectedCount);

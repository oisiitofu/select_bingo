const leftBingo = document.getElementById("left-bingo");
const rightBingo = document.getElementById("right-bingo");
const generateLeftButton = document.getElementById("generate-left");
const generateRightButton = document.getElementById("generate-right");
const imagesContainerLeft = document.getElementById("images-container-left");
const imagesContainerRight = document.getElementById("images-container-right");

function generateBingoCard(container, colorClass, selectedNumbers) {
    container.innerHTML = ""; // 既存のビンゴカードをクリア
    let shuffledNumbers = selectedNumbers.sort(() => Math.random() - 0.5).slice(0, 25);
    shuffledNumbers.forEach(number => {
        let cell = document.createElement("div");
        cell.style.backgroundImage = `url('images/${number}.png')`;
        cell.addEventListener('click', function () {
            if (cell.classList.contains(`marked-${colorClass}`)) {
                cell.classList.remove(`marked-${colorClass}`);
            } else {
                cell.classList.add(`marked-${colorClass}`);
            }
        });
        container.appendChild(cell);
    });
}

function createImageSelection(container) {
    for (let i = 1; i <= 86; i++) {
        let imageDiv = document.createElement("div");
        imageDiv.style.backgroundImage = `url('images/${i}.png')`;
        imageDiv.addEventListener('click', function () {
            imageDiv.classList.toggle('selected');
        });
        container.appendChild(imageDiv);
    }
}

function getSelectedNumbers(container) {
    let selectedDivs = container.querySelectorAll('div.selected');
    let selectedNumbers = Array.from(selectedDivs).map(div => {
        return parseInt(div.style.backgroundImage.match(/\d+/)[0]);
    });
    return selectedNumbers;
}

generateLeftButton.addEventListener('click', function () {
    let selectedNumbers = getSelectedNumbers(imagesContainerLeft);
    if (selectedNumbers.length >= 25) {
        generateBingoCard(leftBingo, 'red', selectedNumbers);
    } else {
        alert("左のカード用に25個以上の画像を選択してください");
    }
});

generateRightButton.addEventListener('click', function () {
    let selectedNumbers = getSelectedNumbers(imagesContainerRight);
    if (selectedNumbers.length >= 25) {
        generateBingoCard(rightBingo, 'blue', selectedNumbers);
    } else {
        alert("右のカード用に25個以上の画像を選択してください");
    }
});

createImageSelection(imagesContainerLeft);
createImageSelection(imagesContainerRight);

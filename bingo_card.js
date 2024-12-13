const leftBingo = document.getElementById("left-bingo");
const rightBingo = document.getElementById("right-bingo");
const generateLeftButton = document.getElementById("generate-left");
const generateRightButton = document.getElementById("generate-right");

function generateBingoCard(container, colorClass, unselectedNumbers) {
    container.innerHTML = ""; // 既存のビンゴカードをクリア
    let shuffledNumbers = unselectedNumbers.sort(() => Math.random() - 0.5).slice(0, 25);
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

generateLeftButton.addEventListener('click', function () {
    let unselectedNumbers = JSON.parse(localStorage.getItem('unselectedNumbersLeft'));
    if (unselectedNumbers && unselectedNumbers.length >= 25) {
        generateBingoCard(leftBingo, 'red', unselectedNumbers);
    } else {
        alert("左のカード用に25個以上の画像を選択してください");
    }
});

generateRightButton.addEventListener('click', function () {
    let unselectedNumbers = JSON.parse(localStorage.getItem('unselectedNumbersRight'));
    if (unselectedNumbers && unselectedNumbers.length >= 25) {
        generateBingoCard(rightBingo, 'blue', unselectedNumbers);
    } else {
        alert("右のカード用に25個以上の画像を選択してください");
    }
});

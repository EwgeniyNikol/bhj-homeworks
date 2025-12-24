let deadCount = 0;
let lostCount = 0;

const deadElement = document.getElementById('dead');
const lostElement = document.getElementById('lost');

const getHole = index => document.getElementById(`hole${index}`);

const resetGame = () => {
	deadCount = 0;
	lostCount = 0;
	deadElement.textContent = deadCount;
	lostElement.textContent = lostCount;
};

const checkGameResult = () => {
	if (deadCount === 10) {
		alert('Поздравляем! Вы победили!');
		resetGame();
		return true;
	}

	if (lostCount === 5) {
		alert('Игра окончена! Вы проиграли!');
		resetGame();
		return true;
	}

	return false;
};

const handleHoleClick = function() {
	if (this.classList.contains('hole_has-mole')) {
		deadCount++;
		deadElement.textContent = deadCount;
	} else {
		lostCount++;
		lostElement.textContent = lostCount;
	}

	checkGameResult();
};

for (let i = 1; i <= 9; i++) {
	const hole = getHole(i);
	hole.onclick = handleHoleClick;
}
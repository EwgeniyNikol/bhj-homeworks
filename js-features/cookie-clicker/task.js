const cookie = document.getElementById('cookie');
const clickCounter = document.getElementById('clicker__counter');

let lastClickTime = null;

const speedContainer = document.createElement('div');
speedContainer.id = 'clicker__speed';
speedContainer.className = 'clicker__speed';
speedContainer.innerHTML = 'Скорость клика: <span>0</span> кликов/сек';

clickCounter.parentNode.parentNode.appendChild(speedContainer);

const speedValue = speedContainer.querySelector('span');

cookie.onclick = function() {
	let currentCount = parseInt(clickCounter.textContent);
	currentCount++;
	clickCounter.textContent = currentCount;

	if (cookie.width === 200) {
		cookie.width = 180;
		cookie.height = 180;
	} else {
		cookie.width = 200;
		cookie.height = 200;
	}

	const now = new Date();

	if (lastClickTime) {
		const timeDiff = (now - lastClickTime) / 1000;
		const speed = 1 / timeDiff;
		speedValue.textContent = speed.toFixed(1);
	}

	lastClickTime = now;
};
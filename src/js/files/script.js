import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney, getRandom_2 } from './functions.js';
import { startData } from './startData.js';

if (sessionStorage.getItem('privacy') && document.querySelector('.preloader')) {
	document.querySelector('.preloader').classList.add('_hide');
}

export function initStartData() {

	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}

	if (!sessionStorage.getItem('current-bet')) {
		sessionStorage.setItem('current-bet', startData.countBet);
		writeCurrentBet();
	} else {
		writeCurrentBet();
	}

}

function writeScore() {
	if (document.querySelector(startData.nameScore)) {
		document.querySelectorAll(startData.nameScore).forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

export function writeCurrentBet() {
	const betItem = document.querySelectorAll(startData.nameBetScore);
	if (betItem.length) {
		betItem.forEach(item => {
			item.textContent = sessionStorage.getItem('current-bet');
		})
	}

}

initStartData();


//========================================================================================================================================================
//game
const betBox = document.querySelector('.footer-game__bet-box');
const circles = document.querySelector('.field__buttons');

const glove = document.querySelector('.field__glowe');
const ball = document.querySelector('.field__ball');

const resultTextBox = document.querySelector('.field__result-text-box');
const resultText = document.querySelector('.field__result-text');
const currentScore = document.querySelector('.field__score');

const buttonStart = document.querySelector('.footer-game__button');

export const config = {
	state: 1,
	playerSelect: 1,
	ballChoice: 0,
	winCoeff: 3
}

export function startGame() {

	config.state = 2;

	holdInteractives();

	deleteMoney(+sessionStorage.getItem('current-bet'));

	hideCircles();

	generateRandomBallChoice();

	setTimeout(() => {
		moveGlove();
		moveBall();
	}, 500);

	setTimeout(() => {
		if (checkCollision()) {
			const count = +sessionStorage.getItem('current-bet') * config.winCoeff;
			updateCurrentScore(count, '+');
			writeShowResultText('win');
			addMoney(count, '.score', 1000, 2000);
		} else {
			updateCurrentScore(+sessionStorage.getItem('current-bet'), '-');
			writeShowResultText();
		}
		config.state = 3;
	}, 1000);
}

function holdInteractives() {
	betBox.classList.add('_hold');
	buttonStart.classList.add('_hold');
}
function returnInteractives() {
	betBox.classList.remove('_hold');
	buttonStart.classList.remove('_hold');
}

function hideCircles() {
	circles.classList.add('_hide');
}

function generateRandomBallChoice() {
	config.ballChoice = getRandom(1, 4);
}

function removeHideCircles() {
	circles.classList.remove('_hide');
}

function moveGlove() {
	if (config.ballChoice === 1) {
		glove.classList.add('_left');
	} else if (config.ballChoice === 2) {
		glove.classList.add('_center');
	} else if (config.ballChoice === 3) {
		glove.classList.add('_right');
	}
}

function moveBall() {
	if (config.playerSelect === 1) {
		ball.classList.add('_left');
	} else if (config.playerSelect === 2) {
		ball.classList.add('_center');
	} else if (config.playerSelect === 3) {
		ball.classList.add('_right');
	}
}

function checkCollision() {
	return config.playerSelect !== config.ballChoice;
}

function writeShowResultText(status = 'lose') {
	if (status === 'win') {
		resultText.innerHTML = 'Goal';
	} else {
		resultText.innerHTML = 'Lose';
	}
	resultTextBox.classList.add('_visible');
}

function returnStartPositionGlove() {
	if (glove.classList.contains('_left')) glove.classList.remove('_left');
	if (glove.classList.contains('_center')) glove.classList.remove('_center');
	if (glove.classList.contains('_right')) glove.classList.remove('_right');
}

function returnStartPositionBall() {
	if (ball.classList.contains('_left')) ball.classList.remove('_left');
	if (ball.classList.contains('_center')) ball.classList.remove('_center');
	if (ball.classList.contains('_right')) ball.classList.remove('_right');
}

export function removeClassGroup(blocks, className) {
	document.querySelectorAll(blocks).forEach(circle => {
		if (circle.classList.contains(className)) circle.classList.remove(className);
	})
}

function updateCurrentScore(count, symb) {
	currentScore.textContent = `${symb}${count}`;
}

function resetCurrentScore() {
	currentScore.textContent = `0`;
}

export function resetGame() {
	returnInteractives();

	returnStartPositionGlove();
	removeHideCircles();
	returnStartPositionBall();

	resultTextBox.classList.remove('_visible');

	setTimeout(() => {
		resetCurrentScore();
	}, 150);

	config.state = 1;
}

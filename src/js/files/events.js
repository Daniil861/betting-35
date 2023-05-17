import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney, getRandom_2 } from './functions.js';
import { initStartData, writeCurrentBet, removeClassGroup, config, startGame, resetGame } from './script.js';
// import { startGame, resetGame, stopAnimation, config_game, autoMode } from './aviator.js';
import { configSlot } from './slot.js';
import { startData } from './startData.js';

const preloader = document.querySelector('.preloader');

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {
	initStartData();

	let targetElement = e.target;

	const preloader = document.querySelector('.preloader');
	const wrapper = document.querySelector('.wrapper');

	const money = +sessionStorage.getItem('money');
	const currentBet = +sessionStorage.getItem('current-bet');

	if (targetElement.closest('[data-btn="privacy"]')) {
		window.location.href = 'index.html';
	}

	if (targetElement.closest('.preloader__button')) {
		window.location.href = 'main.html';
	}

	if (targetElement.closest('[data-btn="game"]')) {
		wrapper.classList.add('_game');
	}

	if (targetElement.closest('[data-btn="game-home"]')) {
		wrapper.classList.remove('_game');
	}

	if (targetElement.closest('[data-btn="slot"]')) {
		wrapper.classList.add('_slot');
	}

	if (targetElement.closest('[data-btn="slot-home"]')) {
		wrapper.classList.remove('_slot');
	}

	//========================================================================================================================================================
	// bet-box

	if (targetElement.closest('[data-btn="bet-down"]') && currentBet > startData.countBet) {
		sessionStorage.setItem('current-bet', currentBet - startData.countBet);
		writeCurrentBet()
	}

	if (targetElement.closest('[data-btn="bet-up"]') && money > currentBet + startData.countBet && currentBet < startData.maxBet) {
		sessionStorage.setItem('current-bet', currentBet + startData.countBet);
		writeCurrentBet();
	}

	if (targetElement.closest('.field__button') && config.state === 1) {
		removeClassGroup('.field__button', '_active');
		targetElement.closest('.field__button').classList.add('_active');
		config.playerSelect = +targetElement.closest('.field__button').dataset.circle;
	}

	if (targetElement.closest('.footer-game__button') && config.state === 1) {
		startGame();
	}

	if (targetElement.closest('.game') && config.state === 3) {
		resetGame();
	}

})

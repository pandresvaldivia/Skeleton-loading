import UI from './classes/ui.js';

const ui = new UI('../assets/json/data.json', '../assets/images/');

document.addEventListener('DOMContentLoaded', () => {
	ui.createSection();
});

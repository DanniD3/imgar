'use strict';

document.addEventListener('DOMContentLoaded', function() {
	// button.addEventListener('click', function () {
	// 	window.location.replace('./form');
	// });
	var items = document.querySelector('.items');
	var hidden = document.querySelector('.hidden');
	items.addEventListener('click', function () {
		hidden.style.display = 'block';
	});
});
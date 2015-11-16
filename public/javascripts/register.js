'use strict';

document.addEventListener('DOMContentLoaded', function() {
	var button = document.querySelector('.return');
	button.addEventListener('click', function () {
		window.location.replace('./');
	});
});
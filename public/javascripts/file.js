'use strict';

document.addEventListener('DOMContentLoaded', function() {

	// Redirect if no File
	// -------------------
	var err = document.querySelector('.err');
	if (err) {
		setTimeout(function () {
			location.replace('/');
		}, 5000);
	}
});
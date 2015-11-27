'use strict';

document.addEventListener('DOMContentLoaded', function() {
	
	// Logo Redirect Home
	// ------------------
	var logo = document.querySelector('.logoImg');
	logo.addEventListener('click', function () {
		location.replace('/');
		console.log('clicked');
	});

	// Login/Sign Up button events
	// ---------------------------
	var items = document.querySelector('.items');
	var account = document.querySelector('.account');
	items.addEventListener('click', function () {
		account.style.display = 'flex';
	});

	window.addEventListener('click', function (e) {
		if (account.style.display === 'flex') {
			if (e.srcElement.innerHTML
				.search(/^\<div/g) !== -1) {
				account.style.display = 'none';
			}
		}
	});
});
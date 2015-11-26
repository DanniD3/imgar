'use strict';

document.addEventListener('DOMContentLoaded', function() {
	
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
	})

	// Blocks Upload when no file present
	// ----------------------------------
	var upload = document.querySelector('.upload');
	var imgInput = document.querySelector('.img');
	upload.addEventListener('click', function (e) {
		if (imgInput.files.length === 0) {
			e.preventDefault();
			var p = document.createElement('p');
			p.innerHTML = 'No File chosen for Upload!'
			p.style.color = 'red';
			document.querySelector('.err').appendChild(p);
		}
	});
});
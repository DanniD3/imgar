'use strict';

document.addEventListener('DOMContentLoaded', function() {

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
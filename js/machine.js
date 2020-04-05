'use strict';
var sizes = ComputeSizes();

function ComputeSizes () {
	let windowWidth = document.body.clientWidth;
	let windowHeight = document.body.clientHeight;
	let s = {Width:windowWidth, Height:windowHeight};
	
	return s;
}

console.log(sizes.Width);

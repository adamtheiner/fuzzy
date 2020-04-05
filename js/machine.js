'use strict';
var machineGR = document.getElementById('mmachineGR');
var drawingSVG = document.getElementById('drawing');
var svgFrame = document.getElementsByTagName('svg')[0];
var sizes = ComputeSizes();

function ComputeSizes () { //вычисление размеров видимой области окна браузера
	let windowWidth = document.body.clientWidth;
	let windowHeight = document.body.clientHeight;
	let headerHeight = document.getElementById('header').clientHeight;
	let grHeight = windowHeight - headerHeight - 3;
	let machineWidth = svgFrame.clientWidth / 2 + svgFrame.clientWidth / 4;
	let s = {Width:windowWidth, Height:windowHeight, HeaderHeight:headerHeight, GraphicHeight:grHeight};
	
	return s;
}

machineGR.setAttribute('height', sizes.GraphicHeight);
svgFrame.setAttribute('height', sizes.GraphicHeight - sizes.GraphicHeight/4);

console.log(sizes);

DrawMachine();

//================================

function DrawMachine () {
	DrawRoundedRect (10, 10, 290, 380, 4, 2, '#369', '#fff');
}

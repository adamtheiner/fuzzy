'use strict';
var machineGR = document.getElementById('mmachineGR');
var drawingSVG = document.getElementById('drawing');
var svgFrame = document.getElementsByTagName('svg')[0];
var sizes = ComputeSizes();
console.log(svgFrame)

function ComputeSizes () { //вычисление размеров видимой области окна браузера
	let windowWidth = document.body.clientWidth;
	let windowHeight = document.body.clientHeight;
	let headerHeight = document.getElementById('header').clientHeight;
	let grHeight = windowHeight - headerHeight - 3;
	let machineZoneX = svgFrame.clientWidth / 2;
	let s = {Width:windowWidth, Height:windowHeight, HeaderHeight:headerHeight, GraphicHeight:grHeight, machineZoneX};
	
	return s;
}

machineGR.setAttribute('height', sizes.GraphicHeight);

svgFrame.setAttribute('height', sizes.GraphicHeight - sizes.GraphicHeight/4);

console.log(sizes);

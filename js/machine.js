'use strict';
var machineGR = document.getElementById('machineGR');
var drawingSVG = document.getElementById('drawing');
var svgFrame = document.getElementsByTagName('svg')[0];
var sizes = ComputeSizes();

function ComputeSizes () { //вычисление размеров видимой области окна браузера
	let windowWidth = document.body.clientWidth;
	let windowHeight = document.body.clientHeight;
	let headerHeight = document.getElementById('header').clientHeight;
	let grHeight = (windowHeight - headerHeight) - 3;
	let grWidth = svgFrame.clientWidth;
	let s = {grH:grHeight, grW:grWidth};
	return s;
}

machineGR.setAttribute('height', sizes.grH);
svgFrame.setAttribute('height', sizes.grH - sizes.grH / 4);

DrawMachine();

//================================

function DrawMachine () {
	let machineWidth;
	let machineHeight;
	let posX;
	let posY;
	if (sizes.grH > sizes.grW) {
		machineWidth = (sizes.grW - sizes.grW / 4) - 5;
		machineHeight = (machineWidth + machineWidth / 4) - 5;
	}
		else {
		machineHeight = (sizes.grH - sizes.grH / 4) - 5;
		machineWidth = (machineHeight - machineHeight / 4) - 5
		}
	posX = (svgFrame.clientWidth - machineWidth) / 2;
	posY = (svgFrame.clientHeight - machineHeight) / 2;
	DrawRoundedRect (posX, posY, machineWidth, machineHeight, 4, 2, '#8696a0', '#fff');
}

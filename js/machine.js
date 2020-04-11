'use strict';
var machineGR = document.getElementById('machineGR');
var drawingSVG = document.getElementById('drawing');
var svgFrame = document.getElementsByTagName('svg')[0];
var sizes = ComputeSizes();
var machineWidth;
var machineHeight;
var posX;
var posY;
var isStarted = false;
var washTimeStr = '00:00 min';

function ComputeSizes() { //вычисление размеров видимой области окна браузера return (grH: grHeight, grW: grWidth)
    let windowWidth = document.body.clientWidth;
    let windowHeight = document.body.clientHeight;
    let headerHeight = document.getElementById('header').clientHeight;
    let grHeight = (windowHeight - headerHeight) - 3;
    let grWidth = svgFrame.clientWidth;
    let s = { grH: grHeight, grW: grWidth };
    return s;
}

machineGR.setAttribute('height', sizes.grH);
svgFrame.setAttribute('height', sizes.grH - sizes.grH / 4);



DrawMachine();

//DrawSock(100, 100);

//================================

function DrawMachine() {
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
    DrawRoundedRect(posX, posY, machineWidth, machineHeight, 4, 2, '#8696a0', '#fff');
    let washingDrumX = sizes.grW / 2;
    let washingDrumY = svgFrame.clientHeight / 2 + (machineHeight / 5) / 3;
    let drumRadius = (machineWidth / 2 + machineWidth / 7) / 2;
    DrawLine(posX, posY + machineHeight / 5, posX + machineWidth, posY + machineHeight / 5, 2, '#8696a0');
    DrawCircle(washingDrumX, washingDrumY, drumRadius, '#8696a0', 2, '#fff');
    DrawCircle(washingDrumX, washingDrumY, drumRadius - drumRadius / 5, '#8696a0', 2, '#fff');
    DrawLine(
        washingDrumX + (drumRadius - drumRadius / 5),
        washingDrumY - drumRadius / 4,
        washingDrumX + (drumRadius - drumRadius / 5),
        washingDrumY + drumRadius / 4,
        drumRadius / 10,
        '#8696a0');
	let posStartButtonX = posX + machineWidth / 10;
	let posStartButtonY = posY + machineWidth / 10;
	let startButtonRadius = machineWidth / 25;
	DrawStartButton(isStarted, posStartButtonX, posStartButtonY, startButtonRadius);
	DrawWashTimeTable(posX, posY, machineWidth, washTimeStr);
}

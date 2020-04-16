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
    DrawCircle(washingDrumX, washingDrumY, drumRadius, '#8696a0', 2, '#fff', 0, 0);
    DrawCircle(washingDrumX, washingDrumY, drumRadius - drumRadius / 5, 'rgba(134, 150, 160, 0.555)', 2, "url(#linear-gradient)", 20, 'MachineDrum');
	DrawCircle(washingDrumX, washingDrumY, drumRadius-drumRadius/3, 'rgba(255, 255, 255, 0.444)', 10, 'rgba(255,255,255,0.222)', 12, 'MachineDrumDecor');
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

//=======================================
// Select wear

var Wear = document.getElementsByTagName('td');
Wear[0].onclick =  WearSelection;
Wear[2].onclick =  WearSelection;
Wear[3].onclick =  WearSelection;

var compute_cell = Wear[1];

function WearSelection () {
	//document.getElementsByTagName('th')[0].innerText = ' ';
	if (this.id == 'socks_cell') {
		compute_cell.innerHTML = '<img id="socks_cell" src="files/socks.png" width="256" height="256" border="0" alt="1r1">';
	}
	if (this.id == 'pants_cell') {
		compute_cell.innerHTML = '<img id="socks_cell" src="files/pants.png" width="256" height="256" border="0" alt="1r1">';
	}
	if (this.id == 'tshirt_cell') {
		compute_cell.innerHTML = '<img id="socks_cell" src="files/tshirt.png" width="256" height="256" border="0" alt="1r1">';
	}
	range_cell.style.cursor = "grabbing";
}
var drum = document.getElementById('MachineDrum');
//=========================================
// Create greasy + dirt

// drag-n-drop
range_cell.onmousedown = function(event) {
	var range_cell = document.getElementById('range_cell').firstChild;
	range_cell.style.position = 'absolute';
	//range_cell.style.zIndex = 1000;
	document.body.append(range_cell);

	moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) {
		range_cell.style.left = pageX - range_cell.offsetWidth / 2 + 'px';
		range_cell.style.top = pageY - range_cell.offsetHeight / 2 + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	range_cell.onmouseup = function() {
		range_cell.style.left = this.getBoundingClientRect().X + 256;
		range_cell.style.top = this.getBoundingClientRect().Y + 256;
		range_cell.setAttribute('width', '32px');
		range_cell.setAttribute('height', '32px');
		document.removeEventListener('mousemove', onMouseMove);
		range_cell.onmouseup = null;
		moveAt(event.clientX+128, event.clientY+128);
		let imgX = posX +  machineWidth / 2 + machineWidth / 21 - Math.random() * 10;
		let imgY = posY + machineHeight / 2 + machineWidth / 21 + Math.random() * 10;
		drawImg(
			range_cell.getAttribute('src'),
			imgX,
			imgY,
			machineWidth / 5,
			machineWidth / 5,
			Math.random() * 100,
			imgX,
			imgY,
			drum
		);
		range_cell.remove();
	};
};

//

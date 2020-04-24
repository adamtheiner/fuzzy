'use strict';
var machineGR = document.getElementById('machineGR');
var drawingSVG = document.getElementById('drawing');
var svgFrame = document.getElementsByTagName('svg')[0];
var gSpan = document.getElementById('totalGreasySpan');
var dSpan = document.getElementById('totalDirtSpan');
var gRangeInput = document.getElementById('greasyRangeInput');
var dRangeInput = document.getElementById('dirtRangeInput');
var Head = document.getElementById('contentHead');
var sizes = ComputeSizes();
var machineWidth;
var machineHeight;
var posX;
var posY;
var degre;
var wears;
var washingDrumX;
var washingDrumY;
var drumRadius;
var drumDecor1;
var drumDecor2;
var isStarted = false;
var drumDecor3;
var washTimeStr = '00:00 min';

var totalWeight = 0.00;
var totalGreasy = 0.15;
var totalDirt = 0.15;

var washingTime = 135;
var hours = 0;
var minutes = 0;

function ComputeSizes() {
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

var drum = document.getElementById('MachineDrum');

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
    washingDrumX = sizes.grW / 2;
    washingDrumY = svgFrame.clientHeight / 2 + (machineHeight / 5) / 3;
    drumRadius = (machineWidth / 2 + machineWidth / 7) / 2;
    DrawLine(posX, posY + machineHeight / 5, posX + machineWidth, posY + machineHeight / 5, 2, '#8696a0', 0, 0, 0, 0);
	DrawDrumDecor(washingDrumX, washingDrumY, drumRadius);
    DrawCircle(washingDrumX, washingDrumY, drumRadius - drumRadius / 5, 'rgba(134, 150, 160, 0.555)', 2, "url(#linear-gradient)", 20, 'MachineDrum');
	//function DrawCircle (x, y, r, s, sw, c, rot, Id)
	DrawCircle(washingDrumX, washingDrumY, drumRadius-drumRadius/3, 'rgba(255, 255, 255, 0.444)', 10, 'rgba(255,255,255,0.222)', 0, 'MachineDrumDecor');
	DrawCircle(washingDrumX, washingDrumY, drumRadius, '#8696a0', 2, 'rgba(0, 184, 255, 0.01)', 0, 'outerCircle');
	DrawCircle(washingDrumX, washingDrumY, drumRadius - drumRadius / 5, 'rgba(255, 255, 255, 1)', drumRadius / 5, 'rgba(0, 0, 0, 0)', 0, 'outCircle');
    DrawLine(
        washingDrumX + (drumRadius - drumRadius / 5),
        washingDrumY - drumRadius / 4,
        washingDrumX + (drumRadius - drumRadius / 5),
        washingDrumY + drumRadius / 4,
        drumRadius / 10,
        '#8696a0', 0, 0, 0, 0
	);
	let posStartButtonX = posX + machineWidth / 10;
	let posStartButtonY = posY + machineWidth / 10;
	let startButtonRadius = machineWidth / 20;
	DrawStartButton(isStarted, posStartButtonX, posStartButtonY, startButtonRadius);
	DrawWashTimeTable(posX, posY, machineWidth);
}

function DrawDrumDecor (DrumX, DrumY, DrumRadius) {
	DrawLine(DrumX, DrumY, DrumX, DrumY + DrumRadius / 2, DrumRadius / 5, '#8696a0', 'round', 0, 'drum_decor_1', 0);
	DrawLine(DrumX, DrumY, DrumX, DrumY + DrumRadius / 2, DrumRadius / 5, '#8696a0', 'round', 0, 'drum_decor_2', 240);
	DrawLine(DrumX, DrumY, DrumX, DrumY + DrumRadius / 2, DrumRadius / 5, '#8696a0', 'round', 0, 'drum_decor_3', 120);
}

function DrawStartButton (isStarted, posX, posY, radius) {
	if (!isStarted) {
		isStarted = true;
		DrawCircle (posX, posY, radius, '#000', 0.222, 'green', 0, 'startRing');
		DrawCircle (posX, posY, radius - radius/7, '#fff', 2.22, 'green', 0, 'startButton');
	} else {
		isStarted = false;
		DrawCircle (posX, posY, radius, '#000', 0.222, 'green', 0, 'startRing');
		DrawCircle (posX, posY, radius - radius/7, '#fff', 2.22, 'green', 0, 'startButton');
	}
}

var startButton = document.getElementById('startButton');

startButton.onclick = function () { // =========* MACHINE START *==========
	startButton.setAttribute('fill', 'red');
	ComputeWashingTime();
	DrawWashTimeTable(posX, posY, machineWidth);
	CountDown();
	WashingProcess();
	startButton.onclick = null;
}

//function DrumRotate () {
//	var DrumDecor = [drumDecor1, drumDecor2, drumDecor3]
//}



var timerDrumAnimate;
function WashingProcess () {
	drumDecor1 = document.getElementById('drum_decor_1');
	drumDecor2 = document.getElementById('drum_decor_2');
	drumDecor3 = document.getElementById('drum_decor_3');
	timerDrumAnimate = setInterval(DrumTick, 50);
}
var rotCountDegre = 0;
var speed = 10;    // drum rotate speed ============= drum rotate speed
var wearSpeed = Math.random() * 100;
function DrumTick () {
	rotCountDegre++;
	drumDecor1.setAttribute('transform', 'rotate(' + rotCountDegre * speed + ', ' + washingDrumX + ', ' + washingDrumY + ')');
	drumDecor2.setAttribute('transform', 'rotate(' + (rotCountDegre * speed + 120) + ', ' + washingDrumX + ', ' + washingDrumY + ')');
	drumDecor3.setAttribute('transform', 'rotate(' + (rotCountDegre * speed + 240) + ', ' + washingDrumX + ', ' + washingDrumY + ')');
	wears = document.getElementsByClassName('beRotate');
	for (var i = 0; i < wears.length; i++) {
		//wears[i].setAttribute('transform', 'rotate(' + (Math.random() * 100) + ', '+washingDrumX + ', ' + washingDrumY +')');
		wears[i].setAttribute('transform', 'rotate(' + (rotCountDegre * wearSpeed - (Math.random() * 10 - Math.random() * 10) * 15) + ', ' + washingDrumX + ', ' + washingDrumY + ')');
	}
	if (washingTime == 0) {
		clearInterval(timerDrumAnimate);
	}
}


var timerId;
function CountDown () {
	timerId = setInterval(TimerTick, 1000);
}

function TimerTick () {
	washingTime -= 1;
	if (washingTime >= 60) {
	hours = 1;
	minutes = washingTime - 60;
	} else {
		hours = 0;
		minutes = washingTime;
	}
	DrawWashTimeTable(posX, posY, machineWidth);
	if (washingTime == 0) {
		clearInterval(timerId);
		WashingEnd();
	}
}

function WashingEnd () { // =========* MACHINE STOP *==========
	startButton.setAttribute('fill', 'green');
	let CleanLinen = wears;
	for (var i = 0; i < CleanLinen.length; i++) {
		CleanLinen[i].removeAttribute('transform');
		
		CleanLinen[i].setAttribute('transform', 'rotate(' + (45 + Math.random()*10) + ', ' + washingDrumX + ', ' + washingDrumY + ')');
	}
	var popup = document.createElement('div');
	popup.setAttribute('class', 'alert alert-primary');
	popup.setAttribute('role', 'alert');
	popup.innerHTML = '<h1>Washing is finished</h1>';
	Head.appendChild(popup);
}

function ComputeWashingTime () {
	washingTime = washingTime * totalGreasy;
	washingTime = washingTime * totalDirt;
	washingTime += 21;
	washingTime = washingTime.toFixed();
	if (washingTime >= 60) {
		hours = 1;
		minutes = washingTime - 60;
	} else {
		hours = 0;
		minutes = washingTime;
	}
}

var Wear = document.getElementsByTagName('td');
Wear[0].onclick =  WearSelection;
Wear[2].onclick =  WearSelection;
Wear[3].onclick =  WearSelection;

var compute_cell = Wear[1];

function WearSelection () {
	//document.getElementsByTagName('th')[0].innerText = ' ';
//	if (this.id == 'socks_cell') {
//		compute_cell.innerHTML = '<img id="socks_cell" src="files/socks.png" width="180" height="180" border="0" alt="1r1">';
//		AddWeight(0.02);
//	}
//	if (this.id == 'pants_cell') {
//		compute_cell.innerHTML = '<img id="socks_cell" src="files/pants.png" width="180" height="180" border="0" alt="1r1">';
//		AddWeight(0.33);
//	}
//	if (this.id == 'tshirt_cell') {
//		compute_cell.innerHTML = '<img id="socks_cell" src="files/tshirt.png" width="180" height="180" border="0" alt="1r1">';
//		AddWeight(0.11);
//	}
	
	DragWear(event);
}

//  range_cell.onmousedown = DragWear(event);

function DragWear (event) {
	//var range_cell = document.getElementById('range_cell').firstChild;
	var range_cell = event.explicitOriginalTarget.cloneNode(true);
	range_cell.style.cursor = "grabbing";
	range_cell.style.position = 'absolute';
	range_cell.style.zIndex = 1000;
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
}

gRangeInput.onchange = AddGreasy;
dRangeInput.onchange = AddDirt;

function AddWeight(weight) {
	totalWeight += weight;
	let wSpan = document.getElementById('totalWeightSpan');
	wSpan.innerText = totalWeight.toString().substr(0, 4);
}

function AddGreasy () {
	if (totalGreasy < gRangeInput.value) {
		totalGreasy = gRangeInput.value;
	}
	gSpan.innerText = totalGreasy.toString().substr(0, 6);
}

function AddDirt () {
	if (totalDirt < dRangeInput.value) {
		totalDirt = dRangeInput.value;
	}
	dSpan.innerText = totalDirt.toString().substr(0, 6);
}

function DrawWashTimeTable (posX, posY, scaledMachineSize) {// нужно добавить удаление предыдущих цифр, чтобы сократить расход памяти?
	tablePosX = posX + scaledMachineSize / 2;
	tablePosY = posY + scaledMachineSize / 21;
	tableWidth = scaledMachineSize / 2 - scaledMachineSize / 21;
	tableHeight = scaledMachineSize / 7;
	DrawRoundedRect (tablePosX, tablePosY, tableWidth, tableHeight, 4, 2, machineColor, 'rgba(0, 0, 0, 0.777)');
	DrawHours(hours, minutes);
}

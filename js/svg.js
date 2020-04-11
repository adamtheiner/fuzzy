'use strict';
var ns = 'http://www.w3.org/2000/svg';
var divSvg = document.getElementById('drawing');
var svg = document.createElementNS(ns, 'svg');
svg.setAttributeNS(null, 'width', '100%');
//svg.setAttributeNS(null, 'height', '100%');
if (divSvg) {
	divSvg.appendChild(svg);
}

var NodesTop = [];
var NodesBottom = [];
var radius = svg.clientWidth / 64;
var intervalOfNodes;
var lines = [];

var machineColor = '#8696a0';
var cipherColor = '#48ac48';

///
/* рисует КРУГ с параметрами:
x - координата, У - координата,
r - радиус, с - цвет
(строка типа '#777' или '#7f7f7c')*/
///
function DrawCircle (x, y, r, s, sw, c) {
	let circle = document.createElementNS(ns, 'circle');
	circle.setAttributeNS(null, 'cx', x);
	circle.setAttributeNS(null, 'cy', y);
	circle.setAttributeNS(null, 'r', r);
	circle.setAttributeNS(null, 'fill', c);
	circle.setAttributeNS(null, 'stroke', s);
	circle.setAttributeNS(null, 'stroke-width', sw);
	svg.appendChild(circle);
}

/* рисует ПРЯМУЮ ЛИНИЮ с параметрами: 
x1 - координата начала, У1 - координата начала,
x2 - координата конца, У2 - координата конца,
th - толщина, с - цвет (строка типа '#777' или '#7f7f7c')*/
function DrawLine (x1, y1, x2, y2, sw, c) {
	var line = document.createElementNS(ns,'line');
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1);
	line.setAttribute('x2', x2);
	line.setAttribute('y2', y2);
	line.setAttribute("stroke", c)
	line.setAttribute('stroke-width', sw);
	svg.appendChild(line);
}

/* params:
how many Nodes in the top row,
how many Nodes in the bottom row*/
function SetNodesCoordinates (topNodesNumber, bottomNodesNumber) { 
	var svgFrameWidth = svg.clientWidth;
	var svgFrameHeigth = svg.clientHeight;
	intervalOfNodes = svgFrameWidth/40 + radius; // distance between Nodes
	for (let i = 0; i < topNodesNumber; i++) { 
		var Node = new Object({x: intervalOfNodes * (i + 1), y: 18, name: 'top_Node_' + (i + 1)});
		NodesTop.push(Node);
	}
	for (let i=0; i<bottomNodesNumber; i++) {
		var Node = new Object({x: intervalOfNodes * (i + 1), y:svgFrameHeigth - 18, name: 'bottom_Node_' + (i + 1)});
		NodesBottom.push(Node);
	}
}

function OffsetRowNodesToCenter () {
	var rowSize = NodesTop[NodesTop.length - 1].x - NodesTop[0].x;
	var sizeATopRowOffset = (svg.clientWidth / 2) - (rowSize / 2 + intervalOfNodes);
	for (let i = 0; i < NodesTop.length; i++) {
		NodesTop[i].x += sizeATopRowOffset;
	}
	rowSize = NodesBottom[NodesBottom.length - 1].x - NodesBottom[0].x;
	var sizeABottomRowOffset = (svg.clientWidth / 2) - (rowSize / 2 + intervalOfNodes);
	for (let i = 0; i < NodesBottom.length; i++) {
		NodesBottom[i].x += sizeABottomRowOffset;
	}
}

function DrawNodes () {
	OffsetRowNodesToCenter();

	for (let i=0; i<NodesTop.length; i++) {
		DrawCircle(NodesTop[i].x, NodesTop[i].y);
	}

	for (let i=0; i<NodesBottom.length; i++) {
		DrawCircle(NodesBottom[i].x, NodesBottom[i].y, radius, '#777');
	}
}

function DrawLines(lines) {
	lines.forEach (function(line, i, lines)
	{
		console.log(i);
		DrawLine(line.x1, line.y1, line.x2, line.y2, line.sw, line.c);
	});
}

function DrawRoundedRect (x, y, w, h, r, sw, cs, cf) {
	var roundRect = document.createElementNS(ns,'rect');
	roundRect.setAttribute('x', x);
	roundRect.setAttribute('y', y);
	roundRect.setAttribute('width', w);
	roundRect.setAttribute('height', h);
	roundRect.setAttribute('rx', r);
	roundRect.setAttribute('ry', r);
	roundRect.setAttribute('fill', cf);
	roundRect.setAttribute('stroke', cs);
	roundRect.setAttribute('stroke-width', sw);
	svg.appendChild(roundRect);
}

function DrawSock (posX, posY) {
	var sock = document.createElementNS(ns,'path');
	sock.setAttribute('stroke', 'black');
	sock.setAttribute('stroke-width', 0.333);
	sock.setAttribute('fill', '#e3e3e3')
	//sock.setAttribute('d', 'M' + (posX) + ' ' + (posY) + 'c20 40, 5 25, 90 50'); // sock path
	svg.appendChild(sock);
}

function DrawStartButton (isStarted, posX, posY, radius) {
	let colorButton;
	if (!isStarted) {
		colorButton = 'green';
	} else {
		colorButton = 'red';
	}
	DrawCircle (posX, posY, radius, '#000', 0.222, colorButton);
	DrawCircle (posX, posY, radius - radius/7, '#fff', 2.22, colorButton);
}

function DrawWashTimeTable (posX, posY, scaledMachineSize, washTimeStr) {
	let tablePosX = posX + scaledMachineSize / 2;
	let tablePosY = posY + scaledMachineSize / 21;
	let tableWidth = scaledMachineSize / 2.5;
	let tableHeight = scaledMachineSize / 7;
	let hours = 1;
	let minutes = 10;
	DrawRoundedRect (tablePosX, tablePosY, tableWidth, tableHeight, 4, 2, machineColor, 'rgba(0, 0, 0, 0.5)');
	DrawHours(hours);
	DrawMinutes(minutes);
}

function DrawHours (hours) {
	switch(hours) {
		case 0: lines = [
			{'x1':15, 'y1':15, 'x2':50, 'y2':150, 'sw':2, 'c':cipherColor},
			{'x1':10, 'y1':40, 'x2':10, 'y2':140, 'sw':2, 'c':cipherColor}
		];
		break;
		case 1: lines = [
			{'x1':19, 'y1':19, 'x2':50, 'y2':250, 'sw':2, 'c':cipherColor},
			{'x1':10, 'y1':40, 'x2':10, 'y2':140, 'sw':2, 'c':cipherColor}
		];
		break;
	}
	DrawLines(lines);
	console.log(lines);
}

function DrawMinutes(minutes) {
}

//SetNodesCoordinates(9, 22);

//DrawNodes();


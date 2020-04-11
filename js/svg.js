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

///
/* рисует ПРЯМУЮ ЛИНИЮ с параметрами: 
x1 - координата начала, У1 - координата начала,
x2 - координата конца, У2 - координата конца,
th - толщина, с - цвет (строка типа '#777' или '#7f7f7c')*/
///
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

///
/* params:
how many Nodes in the top row,
how many Nodes in the bottom row*/
///
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
	for (var i = 0; i < lines.Length; i++) {
		DrawLine(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2, lines[i].sw, lines[i].c);
	}
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
}

//SetNodesCoordinates(9, 22);

//DrawNodes();


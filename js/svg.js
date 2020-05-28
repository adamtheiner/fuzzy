'use strict';
var ns = 'http://www.w3.org/2000/svg';
var divSvg = document.getElementById('drawing');
var svg = document.createElementNS(ns, 'svg');
svg.setAttributeNS(null, 'width', '100%');
var blurFilter = document.createElementNS(ns, 'filter');
blurFilter.setAttribute('id', 'blurFilter')
svg.appendChild(blurFilter);
var gauseBlur = document.createElementNS(ns, 'feGaussianBlur');
blurFilter.appendChild(gauseBlur);

var linearGradient = document.createElementNS(ns, 'linearGradient');
linearGradient.setAttribute('id', 'linear-gradient');
svg.appendChild(linearGradient);
linearGradient.innerHTML = `
	<stop offset="0%" stop-color="rgba(222, 222, 222, 0.555)"/>
	<stop offset="10%" stop-color="rgba(222, 222, 222, 0.555)"/>
	<stop offset="15%" stop-color="#ffffff"/>
	<stop offset="30%" stop-color="rgba(222, 222, 222, 0.555)"/>
	<stop offset="35%" stop-color="#ffffff"/>
	<stop offset="40%" stop-color="rgba(222, 222, 222, 0.555)"/>
	<stop offset="100%" stop-color="rgba(222, 222, 222, 0.555)"/>
`;

//svg.setAttributeNS(null, 'height', '100%');
if (divSvg) {
	divSvg.appendChild(svg);
}

var NodesTop = [];
var NodesBottom = [];
var radius = svg.clientWidth / 64;
var intervalOfNodes;
var lines = [];
var tablePosX = 0;
var tablePosY = 0;
var tableWidth = 0;
var tableHeight = 0;

var machineColor = '#8696a0';
//var cipherColor = '#48ac48';
var cipherColor = '#0ff';

///
/* vykreslenie kruhu s súradnicami:
x - súradnica, У - súradnica,
r - polomer, с - farba
('#777' alebo '#7f7f7c')*/
///
function DrawCircle (x, y, r, s, sw, c, rot, Id) {
	let circle = document.createElementNS(ns, 'circle');
	circle.setAttributeNS(null, 'cx', x);
	circle.setAttributeNS(null, 'cy', y);
	circle.setAttributeNS(null, 'r', r);
	circle.setAttributeNS(null, 'fill', c);
	circle.setAttributeNS(null, 'stroke', s);
	circle.setAttributeNS(null, 'stroke-width', sw);
	circle.setAttributeNS(null, 'transform', "rotate(" + rot + ", " + x + ", "+ y +")");
	circle.setAttributeNS(null, 'id', Id);
	circle.setAttributeNS(null, 'filter', 'url(#blurFilter)');
	svg.appendChild(circle);
}

/* vykreslenie priamej čiary s parametrami: 
x1 - súradnica začiatku, У1 - súradnica začiatku,
x2 - súradnica konca, У2 - súradnica konca,
th - hrúbka, с - farba ('#777' alebo '#7f7f7c')*/
function DrawLine (x1, y1, x2, y2, stroke_width, stroke_color, stroke_linecap, stroke_blur, Id, degre) {
	var line = document.createElementNS(ns,'line');
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1);
	line.setAttribute('x2', x2);
	line.setAttribute('y2', y2);
	line.setAttribute("stroke", stroke_color)
	line.setAttribute('stroke-width', stroke_width);
	line.setAttribute('stroke-linecap', stroke_linecap);
	line.setAttribute('id', Id);
	line.setAttribute('transform', 'rotate('+degre + ' '+ x1 + ' '+ y1+')');
	svg.appendChild(line);
}

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
		DrawLine(line.x1, line.y1, line.x2, line.y2, line.sw, line.c, 'round', 0, '_nothing', 0);
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

function DrawHours (hours, minutes) {
	var hoursText = "00";
	switch(hours) {
		case 0: hoursText = "00";
		break;
		case 1: hoursText = "01";
		break;
	}
	let minutesText = minutes.toString(10);
	if (minutesText.length < 2) {
		minutesText = '0' + minutesText;
	}
	DrawText(tablePosX+tableWidth/10, tablePosY+tableHeight-tableWidth/15, 1, hoursText + ':' + minutesText);
}

function DrawText (posX, posY, scale, textContent) {
	var textElement = document.createElementNS(ns,'text');
	textElement.setAttribute('x', posX);
	textElement.setAttribute('y', posY);
	textElement.setAttribute('fill', cipherColor);
	textElement.setAttribute('class', 'cipher');
	textElement.setAttribute('style', 'font-size: ' + (tableHeight - tableHeight / 3) + 'px;');
	textElement.innerHTML = textContent;
	svg.appendChild(textElement);
}

function drawImg (Image, X, Y, W, H, Rot, rotXcenter, rotYcenter, referenceElement) {
	var imageElement = document.createElementNS(ns,'image');
	imageElement.setAttribute('class', 'beRotate');
	imageElement.setAttribute('href', Image);
	imageElement.setAttribute('x', X);
	imageElement.setAttribute('y', Y);
	imageElement.setAttribute('width', W);
	imageElement.setAttribute('height', H);
	imageElement.setAttribute('transform', 'rotate(' + Rot + ', ' + rotXcenter + ', ' + rotYcenter + ')');
	svg.insertBefore(imageElement, referenceElement);
}
//SetNodesCoordinates(9, 22);
//DrawNodes();


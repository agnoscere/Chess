var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.textAlign = "center";

var pieces = new Array();
var availablePos = new Array();
var selectedPiece;
var twoDArrBoard = new Array(8);

for (var i = 0; i < 8; i++) {
    twoDArrBoard[i] = new Array(8);

    for (var j = 0; j < 8; j++) {
        twoDArrBoard[i][j] = null;
    }
}


function clicked(event) {
    var boardX = Math.floor((event.clientX - 10) / 100);
    var boardY = Math.floor((event.clientY - 10) / 100);

    for (var i in availablePos) {
        if (availablePos[i].x == boardX && availablePos[i].y == boardY) {
            selectedPiece.makeMove(boardX, boardY);
            availablePos = [];
            selectedPiece = 0;
            drawBoard();
            return;
        }
    }

    availablePos = [];
    selectedPiece = 0;
    for (var i in pieces) {
        if (pieces[i].x == boardX && pieces[i].y == boardY) {
            drawBoard();
            selectedPiece = pieces[i];
            pieces[i].showMoves();
        }
    }

    if (selectedPiece === 0) {
        availablePos = 0;
        drawBoard();
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, 800, 800);

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (i % 2 == 0 && j % 2 == 0 || i % 2 == 1 && j % 2  == 1) {
                continue;
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(i * 100, j * 100, 100, 100);
            }
        }
    }

    for (var i in pieces) {
        pieces[i].drawPiece();
    }
}

window.onload = function() {
    pieces.push(new pawn(0, 1, true));
    pieces.push(new pawn(1, 1, true));
    pieces.push(new pawn(2, 1, true));
    pieces.push(new pawn(3, 1, true));
    pieces.push(new pawn(4, 1, true));
    pieces.push(new pawn(5, 1, true));
    pieces.push(new pawn(6, 1, true));
    pieces.push(new pawn(7, 1, true));
    pieces.push(new rook(0, 0, true));
    pieces.push(new rook(7, 0, true));
    pieces.push(new knight(1, 0, true));
    pieces.push(new knight(6, 0, true));
    pieces.push(new bishop(2, 0, true));
    pieces.push(new bishop(5, 0, true));
    pieces.push(new queen(3, 0, true));
    pieces.push(new king(4, 0, true));

    pieces.push(new pawn(0, 6, false));
    pieces.push(new pawn(1, 6, false));
    pieces.push(new pawn(2, 6, false));
    pieces.push(new pawn(3, 6, false));
    pieces.push(new pawn(4, 6, false));
    pieces.push(new pawn(5, 6, false));
    pieces.push(new pawn(6, 6, false));
    pieces.push(new pawn(7, 6, false));
    pieces.push(new rook(0, 7, false));
    pieces.push(new rook(7, 7, false));
    pieces.push(new knight(1, 7, false));
    pieces.push(new knight(6, 7, false));
    pieces.push(new bishop(2, 7, false));
    pieces.push(new bishop(5, 7, false));
    pieces.push(new queen(3, 7, false));
    pieces.push(new king(4, 7, false));

    drawBoard();
}

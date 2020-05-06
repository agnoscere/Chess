class piece {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        twoDArrBoard[x][y] = color;
    }

    drawPiece() {
        ctx.lineWidth = 1;
        if (this.x % 2 == 0 && this.y % 2 == 0 || this.x % 2 == 1 && this.y % 2  == 1) {
            if (this.color) {
                ctx.fillStyle = "black";
                ctx.fillText(this.label, parseInt(this.x * 100) + 50, parseInt(this.y * 100) + 60);
            } else {
                ctx.strokeStyle = "black";
                ctx.strokeText(this.label, parseInt(this.x * 100) + 50, parseInt(this.y * 100) + 60);
            }
        } else {
            if (this.color) {
                ctx.strokeStyle = "white";;
                ctx.strokeText(this.label, parseInt(this.x * 100) + 50, parseInt(this.y * 100) + 60);
            } else {
                ctx.fillStyle = "white";;
                ctx.fillText(this.label, parseInt(this.x * 100) + 50, parseInt(this.y * 100) + 60);
            }
        }
    }

    makeMove(newX, newY) {
        for (var i in pieces) {
            if (pieces[i].x == newX && pieces[i].y == newY) {
                pieces.splice(i, 1);
                console.log(pieces[i].x);
            }
        }

        twoDArrBoard[this.x][this.y] = null;
        twoDArrBoard[newX][newY] = this.color;

        this.x = newX;
        this.y = newY;
    }

    drawMoves() {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;

        for (var i in availablePos) {
            ctx.strokeRect(availablePos[i].x * 100, availablePos[i].y * 100, 100, 100);
            console.log(availablePos[i]);
        }
    }
}

class pawn extends piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.label = "P";
        this.hasMoved = false;
        twoDArrBoard[x][y] = color;
    }

    showMoves() {
        if (!this.hasMoved) {
            if (!this.color) {
                availablePos.push({x: this.x, y: this.y - 2});
                availablePos.push({x: this.x, y: this.y - 1});
            } else {
                availablePos.push({x: this.x, y: this.y + 2});
                availablePos.push({x: this.x, y: this.y + 1});
            }
        } else {
            if (!this.color) {
                availablePos.push({x: this.x, y: this.y - 1});
            } else {
                availablePos.push({x: this.x, y: this.y + 1});
            }
        }

        this.checkCollision();
        super.drawMoves();
    }

    makeMove(newX, newY) {
        this.hasMoved = true;
        super.makeMove(newX, newY);
    }

    checkCollision() {
        for (var i in availablePos) {
            if (this.x === availablePos[i].x && this.y === availablePos[i].y) {
            }
        }
    }
}

class knight extends piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.label = "Kn";
        twoDArrBoard[x][y] = color;
    }

    showMoves() {
        availablePos.push({x: this.x + 2, y: this.y + 1});
        availablePos.push({x: this.x + 2, y: this.y - 1});
        availablePos.push({x: this.x - 2, y: this.y + 1});
        availablePos.push({x: this.x - 2, y: this.y - 1});
        availablePos.push({x: this.x + 1, y: this.y + 2});
        availablePos.push({x: this.x + 1, y: this.y - 2});
        availablePos.push({x: this.x - 1, y: this.y + 2});
        availablePos.push({x: this.x - 1, y: this.y - 2});

        this.checkCollision();
        super.drawMoves();
    }

    // Used only in showMoves, checks whether the possible move is out
    // of the board or if there is another piece of the same color in
    // the space in availablePos
    checkCollision() {
        for (var i in twoDArrBoard) {
            console.log(twoDArrBoard[i]);
        }

        for (var i in availablePos) {
            if (availablePos[i].x > 7 || availablePos[i].y > 7 || availablePos[i].x < 0 || availablePos[i].y < 0) {
                availablePos.splice(i, 1);
            }

            if (twoDArrBoard[availablePos[i].x][availablePos[i].y] == availablePos[i].color) {
                availablePos.splice(i, 1);
            }
        }
    }
}

class rook extends piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.label = "R";
        twoDArrBoard[x][y] = color;
    }

    showMoves() {
        var flag = false;
        for (var i = 1; this.x + i < 8; i++) {
            for (var j in pieces) {
                if (pieces[j].x == this.x + i && pieces[j].y == this.y && pieces[j].color == this.color) {
                    flag = true;
                    break;
                } else if (pieces[j].x == this.x + i && pieces[j].y == this.y) {
                    availablePos.push({x: this.x + i, y: this.y});
                    flag = true;
                    break;
                } else {
                    availablePos.push({x: this.x + i, y: this.y});
                }
            }

            if (flag) {
                break;
            }
        }

        flag = false;
        for (var i = 1; this.x - i >= 0; i++) {
            for (var j in pieces) {
                if (pieces[j].x == this.x - i && pieces[j].y == this.y && pieces[j].color == this.color) {
                    flag = true;
                    break;
                } else if (pieces[j].x == this.x - i && pieces[j].y == this.y) {
                    availablePos.push({x: this.x - i, y: this.y});
                    flag = true;
                    break;
                } else {
                    availablePos.push({x: this.x - i, y: this.y});
                }
            }

            if (flag) {
                break;
            }
        }

        flag = false;
        for (var i = 1; this.y + i < 8; i++) {
            for (var j in pieces) {
                if (pieces[j].x == this.x && pieces[j].y == this.y + i && pieces[j].color == this.color) {
                    flag = true;
                    break;
                } else if (pieces[j].x == this.x && pieces[j].y == this.y + i) {
                    availablePos.push({x: this.x, y: this.y + i});
                    flag = true;
                    break;
                } else {
                    availablePos.push({x: this.x, y: this.y + i});
                }
            }

            if (flag) {
                break;
            }
        }

        flag = false;
        for (var i = 1; this.y - i >= 0; i++) {
            for (var j in pieces) {
                if (pieces[j].x == this.x && pieces[j].y == this.y - i && pieces[j].color == this.color) {
                    flag = true;
                    break;
                } else if (pieces[j].x == this.x && pieces[j].y == this.y - i) {
                    availablePos.push({x: this.x, y: this.y - i});
                    flag = true;
                    break;
                } else {
                    availablePos.push({x: this.x, y: this.y - i});
                }
            }

            if (flag) {
                break;
            }
        }

        super.drawMoves();
    }
}

class bishop extends piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.label = "B";
        twoDArrBoard[x][y] = color;
    }

    showMoves() {

    }
}

class king extends piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.label = "K";
        twoDArrBoard[x][y] = color;
    }

    showMoves() {

    }
}

class queen extends piece {
    constructor(x, y, color) {
        super(x, y, color);
        this.label = "Q";
        twoDArrBoard[x][y] = color;
    }

    showMoves() {

    }
}

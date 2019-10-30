let min = 0,
    sec = 0,
    bars, player, map;

function startGameTimer(m, s) {
    min = m;
    sec = s;
    idTimer = setInterval(gameTimer, 1000);
}

function gameTimer() {
    sec--;
    if (min > 0 && sec == -1) {
        min--;
        sec = 59;
    } else if (min == 0 && sec < 0) {
        stopGameTimer();
    }
    console.log(min, sec);
    if (sec > 9) {
        document.getElementById("timer").innerHTML = "0" + min + ":" + sec;
    } else {
        document.getElementById("timer").innerHTML = "0" + min + ":0" + sec;
    }
}

function stopGameTimer() {
    clearInterval(idTimer);
    if (min <= 0 && sec <= 00) {
        alert("Koniec czasu!");
        sec = 0;
    }
}

class Player {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.beersNumber = 0;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('player');
        document.addEventListener('keydown', (event) => {
            this.handleMove(event.keyCode);
        })
    }
    handleMove(keyCode) {
        switch (keyCode) {
            case 39:
                if (this.positionX < xMax) {
                    this.move(this.positionX + 1, this.positionY);
                }

                break;
            case 37:
                if (this.positionX > xMin) {
                    this.move(this.positionX - 1, this.positionY);
                }
                break;
            case 40:
                if (this.positionY < yMax) {
                    this.move(this.positionX, this.positionY + 1);
                }
                break;
            case 38:
                if (this.positionY > yMin) {
                    this.move(this.positionX, this.positionY - 1);
                }
                break;
        }
    }
    move(x, y) {
        this.checkColsion(x, y);
        this.positionX = x;
        this.positionY = y;
        this.element.classList.remove('player');
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('player');

        console.log(this)
    }
    checkColsion(x, y) {
        const colision = bars.find((bar) => {
            if (bar.positionX === x && bar.positionY === y) {
                return bar
            }
        })
        if (typeof colision !== 'undefined') {
            colision.interact(player)
        }
    }
    addBeer(numBeers) {
        this.beersNumber = this.beersNumber + numBeers;
    }
}

class Bar {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.visted = false;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('bar');
    }
    interact(player) {
        if (true === this.visited) {
            return;
        }

        player.addBeer(1);
        this.visited = true;
    }
}

class Map {
    constructor(x, y) {
        this.xMin = 1;
        this.yMin = 1;
        this.xMax = x;
        this.yMax = y;
        this.mapGenerator(x, y);
    }
    mapGenerator(x, y) {
        let table = document.getElementById('map');
        for (let i = 0; i < y; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < x; j++) {
                let col = document.createElement('td');
                row.appendChild(col);
                col.classList.add('x' + (j + 1));
            }
            table.appendChild(row);
        }
        for (let i = 0; i < y; i++) {
            let yHigh = table.rows[i]
            for (let j = 0; j < x; j++) {
                yHigh.cells[j].classList.add('y' + (i + 1));
            }
        }
        let elem = document.getElementById('mapGenerator');
        elem.parentNode.removeChild(elem);

        bars = [new Bar(6, 6), new Bar(8, 8)]
    }
}

document.querySelector('#startGame').addEventListener('click', () => {
    player = new Player(2, 2);
});
document.querySelector('#mapGenerator').addEventListener('click', () => {
    map = new Map(10, 10);
});
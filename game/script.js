let pause = true,
    mapObjects = [],
    player, bar, mapArray,
    timer, obstacle;

class Timer {
    constructor(m, s) {
        this.min = m;
        this.sec = s;
        this.score = 0;
        this.pause = true;
        this.gameTimer();
        this.idTimer
    }
    gameTimer() {
        this.idTimer = setInterval(() => {
            this.sec--;
            this.score++;
            if (this.min > 0 && this.sec < 0) {
                this.min--;
                this.sec = 59;
            }
            if (this.sec > 9) {
                document.getElementById("timer").innerHTML = "0" + this.min + ":" + this.sec;
            } else {
                document.getElementById("timer").innerHTML = "0" + this.min + ":0" + this.sec;
            }
            if (player.beersNumber === 6) {
                clearInterval(this.idTimer);
                let elem = document.getElementById('pauseGame');
                elem.parentNode.removeChild(elem);
                document.getElementById("timer").innerHTML = "HANGOVER! Udało się w " + this.score + " sekund.";
                document.getElementById("timer").style.height = '100%';
                document.getElementById("timer").style.width = '100%';
            }
            if (this.min === 0 && this.sec === 0) {
                clearInterval(this.idTimer);
                let elem = document.getElementById('pauseGame');
                elem.parentNode.removeChild(elem);
                document.getElementById("timer").innerHTML = "PRZEGRAŁEŚ! NASTAŁ DZIEŃ A TY WCIĄŻ NA NOGACH xD";
                document.getElementById("timer").style.height = '100%';
                document.getElementById("timer").style.width = '100%';
            }

        }, 1000);
    }
    stopGameTimer() {
        clearInterval(this.idTimer);
    }
    startGameTimer() {
        this.gameTimer();
    }
}
class Player {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.beersNumber = 0;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('player');
        document.addEventListener('keyup', (event) => {
            this.handleMove(event.keyCode);
        })
        let elem = document.getElementById('startGame');
        elem.parentNode.removeChild(elem);
        document.getElementById('pauseGame').disabled = false;
    }
    handleMove(keyCode) {
        switch (keyCode) {
            case 39:
                if (this.positionX < map.xMax && this.beersNumber === 0) {
                    this.move(this.positionX + 1, this.positionY);
                } else if (this.positionX > map.xMin && this.beersNumber === 1) {
                    this.move(this.positionX - 1, this.positionY);
                } else if (this.positionX > map.xMin && this.beersNumber === 2) {
                    this.move(this.positionX - 1, this.positionY);
                } else if (this.positionX > map.xMin && this.beersNumber === 3) {
                    this.move(this.positionX - 1, this.positionY);
                } else if (this.positionY < map.yMax && this.beersNumber === 4) {
                    this.move(this.positionX, this.positionY + 1);
                } else if (this.positionY > map.yMin && this.beersNumber === 5) {
                    this.move(this.positionX, this.positionY - 1);
                }
                break;
            case 37:
                if (this.positionX > map.xMin && this.beersNumber === 0) {
                    this.move(this.positionX - 1, this.positionY);
                } else if (this.positionX < map.xMax && this.beersNumber === 1) {
                    this.move(this.positionX + 1, this.positionY);
                } else if (this.positionX < map.xMax && this.beersNumber === 2) {
                    this.move(this.positionX + 1, this.positionY);
                } else if (this.positionY > map.yMin && this.beersNumber === 3) {
                    this.move(this.positionX, this.positionY - 1);
                } else if (this.positionX < map.xMax && this.beersNumber === 4) {
                    this.move(this.positionX + 1, this.positionY);
                } else if (this.positionY < map.yMax && this.beersNumber === 5) {
                    this.move(this.positionX, this.positionY + 1);
                }
                break;
            case 40:
                if (this.positionY < map.yMax && this.beersNumber === 0) {
                    this.move(this.positionX, this.positionY + 1);
                } else if (this.positionY < map.yMax && this.beersNumber === 1) {
                    this.move(this.positionX, this.positionY + 1);
                } else if (this.positionY > map.yMin && this.beersNumber === 2) {
                    this.move(this.positionX, this.positionY - 1);
                } else if (this.positionX < map.xMax && this.beersNumber === 3) {
                    this.move(this.positionX + 1, this.positionY);
                } else if (this.positionY > map.yMin && this.beersNumber === 4) {
                    this.move(this.positionX, this.positionY - 1);
                } else if (this.positionX > map.xMin && this.beersNumber === 5) {
                    this.move(this.positionX - 1, this.positionY);
                }
                break;
            case 38:
                if (this.positionY > map.yMin && this.beersNumber === 0) {
                    this.move(this.positionX, this.positionY - 1);
                } else if (this.positionY > map.yMin && this.beersNumber === 1) {
                    this.move(this.positionX, this.positionY - 1);
                } else if (this.positionY < map.yMax && this.beersNumber === 2) {
                    this.move(this.positionX, this.positionY + 1);
                } else if (this.positionY < map.yMax && this.beersNumber === 3) {
                    this.move(this.positionX, this.positionY + 1);
                } else if (this.positionX > map.xMin && this.beersNumber === 4) {
                    this.move(this.positionX - 1, this.positionY);
                } else if (this.positionX < map.xMax && this.beersNumber === 5) {
                    this.move(this.positionX + 1, this.positionY);
                }
                break;
        }
    }
    move(x, y) {
        if (pause === true) {
            this.checkColsion(x, y);
            this.positionX = x;
            this.positionY = y;
            this.element.classList.remove('player');
            this.element = document.querySelector(`.x${x}.y${y}`);
            this.element.classList.add('player');
        }
    }
    checkColsion(x, y) {
        const colision = mapObjects.find((mapObj) => {
            if (mapObj.positionX === x && mapObj.positionY === y) {
                return mapObj
            }
        })
        if (this.colision !== obstacle) {
            return false;
        }
        if (typeof colision !== 'undefined') {
            colision.interact(player)
        }
    }
    addBeer(numBeers) {
        this.beersNumber = this.beersNumber + numBeers;
        document.getElementById('alcoholeProgressBar').value = `${this.beersNumber}`;
    }
}

class Bar {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.visited = false;
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

class Obstacle {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('obstacle');
    }
    interact(player) {
        this.move(this.positionX, this.positionY);
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
        mapArray = [
            ['O', '_', '_', 'O', 'O', 'O', 'O', '_', '_', 'O'],
            ['B', '_', '_', '_', '_', '_', '_', '_', '_', 'B'],
            ['O', '_', '_', '_', '_', '_', '_', '_', '_', 'O'],
            ['O', '_', '_', 'O', 'O', '_', 'O', 'O', '_', 'O'],
            ['O', '_', '_', 'O', 'B', '_', 'O', 'O', '_', 'O'],
            ['O', '_', '_', 'O', 'O', '_', 'O', 'O', '_', 'O'],
            ['O', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
            ['O', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
            ['B', '_', '_', 'O', 'O', 'O', 'O', '_', '_', 'O'],
            ['O', '_', '_', 'O', 'O', 'O', 'B', '_', '_', 'B'],
        ]
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
                if (mapArray[i][j] === 'B') {
                    mapObjects.push(new Bar(j + 1, i + 1));
                } else if (mapArray[i][j] === '_') {

                } else if (mapArray[i][j] === 'O') {
                    mapObjects.push(new Obstacle(j + 1, i + 1));
                }
            }
        }
        let elem = document.getElementById('mapGenerator');
        elem.parentNode.removeChild(elem);
        document.getElementById('startGame').disabled = false;
    }
}

function gameMenu() {
    document.querySelector('#startGame').addEventListener('click', () => {
        player = new Player(2, 2);
        timer = new Timer(1, 30);
        document.getElementById("timer").style.display = 'block';
        document.getElementById("beers").style.display = 'block';
    });
    document.querySelector('#mapGenerator').addEventListener('click', () => {
        map = new Map(10, 10);
    });
    document.querySelector('#pauseGame').addEventListener('click', () => {
        if (pause === true) {
            timer.stopGameTimer();
            pause = false;
        } else if (pause === false) {
            timer.startGameTimer()
            pause = true;
        }
    });
}

gameMenu();
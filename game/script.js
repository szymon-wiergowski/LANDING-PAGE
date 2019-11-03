let bars, player, bar, mapObjects, timer;

// class Timer {
//     constructor(m, s) {
//         this.min = m;
//         this.sec = s;
//         this.pouse = true;
//         this.timerToggle = setInterval(gameTimer(), 1000);
//         console.log(this.min)
//     }
//     gameTimer() {
//         this.sec--;
//         console.log(this.sec)
//         console.log(this.min)
//         if (this.min > 0 && this.sec == -1) {
//             this.min--;
//             this.sec = 59;
//         } else if (this.min == 0 && this.sec < 0) {
//             clearInterval(this.timerToggle);
//         }
//         if (this.sec > 9) {
//             document.getElementById("timer").innerHTML = "0" + this.min + ":" + this.sec;
//         } else {
//             document.getElementById("timer").innerHTML = "0" + this.min + ":0" + this.sec;
//         }
//     }
// }
// stopGameTimer() {
//     clearInterval(this.timerToggle);
//     if (this.min <= 0 && this.sec <= 0) {
//         alert("Koniec czasu!");
//         this.sec = 0;
//     }
// }
// }

class Obstacle {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
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
        let elem = document.getElementById('startGame');
        elem.parentNode.removeChild(elem);
        document.getElementById('pouseGame').disabled = false;
    }
    handleMove(keyCode) {
        switch (keyCode) {
            case 39:
                if (this.positionX < map.xMax) {
                    this.move(this.positionX + 1, this.positionY);
                }
                break;
            case 37:
                if (this.positionX > map.xMin) {
                    this.move(this.positionX - 1, this.positionY);
                }
                break;
            case 40:
                if (this.positionY < map.yMax) {
                    this.move(this.positionX, this.positionY + 1);
                }
                break;
            case 38:
                if (this.positionY > map.yMin) {
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
        mapObjects = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'u', 'x', 'u', 'u'],
            ['x', 'u', 'b', 'u', 'u'],
            ['x', 'u', 'u', 'u', 'u'],
            ['x', 'x', 'x', 'b', 'x'],
        ]
        let table = document.getElementById('map');
        for (let i = 0; i < y; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < x; j++) {
                let col = document.createElement('td');
                row.appendChild(col);
                col.classList.add('x' + (j + 1));
                col.classList.add(mapObjects[i][j]);
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
        document.getElementById('startGame').disabled = false;
    }
}

function gameMenu() {
    document.querySelector('#startGame').addEventListener('click', () => {
        player = new Player(2, 2);
        // timer = new Timer(5,0);
    });
    document.querySelector('#mapGenerator').addEventListener('click', () => {
        map = new Map(5, 5);
    });
    document.querySelector('#pouseGame').addEventListener('click', () => {
        if (pouse = false) {
            clearInterval(timer.timerToggle);
        } else {
            setInterval(timer.timerToggle, 1000);
        }
    });
}

gameMenu();
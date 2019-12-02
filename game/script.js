let pause = true,
    mapObjects = [],
    player, bar, mapArray,
    timer, obstacle, playerImg, kebab;

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
        document.getElementById("timer").innerHTML = "0" + this.min + ":" + this.sec;
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
            if (player.beersNumber === 4) {
                clearInterval(this.idTimer);
                let elem = document.getElementById('pauseGame');
                elem.parentNode.removeChild(elem);
                pause = false;
                document.getElementById("timer").innerHTML = "HANGOVER! Upiłeś się!<br><img class='playerLose' src='images/hangover.jpg'>";
                document.getElementById("timer").style.height = '100%';
                document.getElementById("timer").style.width = '100%';
                document.getElementById("map").remove();
                document.getElementById("beers").remove();
                document.getElementById("restart").style.display = 'block';
            }
            if (this.min === 0 && this.sec === 0) {
                clearInterval(this.idTimer);
                let elem = document.getElementById('pauseGame');
                elem.parentNode.removeChild(elem);
                pause = false;
                document.getElementById("timer").innerHTML = "PRZEGRAŁEŚ! NASTAŁ DZIEŃ A TY WCIĄŻ NA NOGACH xD<br><img class='playerLose' src='images/player.gif'>";
                document.getElementById("timer").style.height = '100%';
                document.getElementById("timer").style.width = '100%';
                document.getElementById("map").remove();
                document.getElementById("beers").remove();
                document.getElementById("restart").style.display = 'block';
            }
            if (player.visitedBarsNumbers === 6) {
                clearInterval(this.idTimer);
                let elem = document.getElementById('pauseGame');
                elem.parentNode.removeChild(elem);
                pause = false;
                document.getElementById("timer").innerHTML = "Gratulacje, udało Ci się odwiedzić wszyskie bary w " + this.score + " sekund.<br><img class='playerLose' src='images/win.jpg'>";
                document.getElementById("timer").style.height = '100%';
                document.getElementById("timer").style.width = '100%';
                document.getElementById("map").remove();
                document.getElementById("beers").remove();
                document.getElementById("restart").style.display = 'block';
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
        this.visitedBarsNumbers = 0;
        this.beersNumber = 0;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.innerHTML = "<img class='player' src='images/player.gif'>";
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
                    document.querySelector("img.player").style.animationName = "fromLeft";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                //  else if (this.positionX > map.xMin && this.beersNumber === 1) {
                //     this.move(this.positionX - 1, this.positionY);
                //     document.querySelector("img.player").style.animationName = "fromRight";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // }
                else if (this.positionX > map.xMin && this.beersNumber === 1) {
                    this.move(this.positionX - 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromRight";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                //  else if (this.positionX > map.xMin && this.beersNumber === 3) {
                //     this.move(this.positionX - 1, this.positionY);
                //     document.querySelector("img.player").style.animationName = "fromRight";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // }
                else if (this.positionY < map.yMax && this.beersNumber === 2) {
                    this.move(this.positionX, this.positionY + 1);
                    document.querySelector("img.player").style.animationName = "fromTop";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                } else if (this.positionY > map.yMin && this.beersNumber === 3) {
                    this.move(this.positionX, this.positionY - 1);
                    document.querySelector("img.player").style.animationName = "fromBottom";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                break;
            case 37:
                if (this.positionX > map.xMin && this.beersNumber === 0) {
                    this.move(this.positionX - 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromRight";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                // else if (this.positionX < map.xMax && this.beersNumber === 1) {
                //     this.move(this.positionX + 1, this.positionY);
                //     document.querySelector("img.player").style.animationName = "fromLeft";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // } 
                else if (this.positionX < map.xMax && this.beersNumber === 1) {
                    this.move(this.positionX + 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromLeft";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                //  else if (this.positionY > map.yMin && this.beersNumber === 3) {
                //     this.move(this.positionX, this.positionY - 1);
                //     document.querySelector("img.player").style.animationName = "fromBottom";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // }
                else if (this.positionX < map.xMax && this.beersNumber === 2) {
                    this.move(this.positionX + 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromLeft";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                } else if (this.positionY < map.yMax && this.beersNumber === 3) {
                    this.move(this.positionX, this.positionY + 1);
                    document.querySelector("img.player").style.animationName = "fromTop";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                break;
            case 40:
                if (this.positionY < map.yMax && this.beersNumber === 0) {
                    this.move(this.positionX, this.positionY + 1);
                    document.querySelector("img.player").style.animationName = "fromTop";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                //  else if (this.positionY < map.yMax && this.beersNumber === 1) {
                //     this.move(this.positionX, this.positionY + 1);
                //     document.querySelector("img.player").style.animationName = "fromTop";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // }
                else if (this.positionY > map.yMin && this.beersNumber === 1) {
                    this.move(this.positionX, this.positionY - 1);
                    document.querySelector("img.player").style.animationName = "fromBottom";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                //  else if (this.positionX < map.xMax && this.beersNumber === 3) {
                //     this.move(this.positionX + 1, this.positionY);
                //     document.querySelector("img.player").style.animationName = "fromLeft";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // } 
                else if (this.positionY > map.yMin && this.beersNumber === 2) {
                    this.move(this.positionX, this.positionY - 1);
                    document.querySelector("img.player").style.animationName = "fromBottom";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                } else if (this.positionX > map.xMin && this.beersNumber === 3) {
                    this.move(this.positionX - 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromRight";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                break;
            case 38:
                if (this.positionY > map.yMin && this.beersNumber === 0) {
                    this.move(this.positionX, this.positionY - 1);
                    document.querySelector("img.player").style.animationName = "fromBottom";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                //  else if (this.positionY > map.yMin && this.beersNumber === 1) {
                //     this.move(this.positionX, this.positionY - 1);
                //     document.querySelector("img.player").style.animationName = "fromBottom";O
                else if (this.positionY < map.yMax && this.beersNumber === 1) {
                    this.move(this.positionX, this.positionY + 1);
                    document.querySelector("img.player").style.animationName = "fromTop";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                // else if (this.positionY < map.yMax && this.beersNumber === 3) {
                //     this.move(this.positionX, this.positionY + 1);
                //     document.querySelector("img.player").style.animationName = "fromTop";
                //     document.querySelector("img.player").style.animationDuration = "0.4s";
                // } 
                else if (this.positionX > map.xMin && this.beersNumber === 2) {
                    this.move(this.positionX - 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromRight";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                } else if (this.positionX < map.xMax && this.beersNumber === 3) {
                    this.move(this.positionX + 1, this.positionY);
                    document.querySelector("img.player").style.animationName = "fromLeft";
                    document.querySelector("img.player").style.animationDuration = "0.4s";
                }
                break;
        }
    }
    move(x, y) {
        if (pause === true) {
            this.checkColsion(x, y);
            this.positionX = x;
            this.positionY = y;
            this.element.innerHTML = "";
            this.element = document.querySelector(`.x${x}.y${y}`);
            this.element.innerHTML = "<img class='player' src='images/player.gif'>";
            this.walkSound();
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
        if (this.beersNumber === 3) {
            document.getElementById('beerText').innerHTML = '<p style="color:red;">Zjedz kebaba!</p>'
        } else {
            document.getElementById('beerText').innerHTML = ''
        }
    }
    walkSound() {
        const audio = document.getElementById("walkSound");
        audio.play();
    }
    visitedBars() {
        this.visitedBarsNumbers++;
    }
}

class Bar {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.visited = false;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('bar');
        this.element.innerHTML = "<img class='drink' src='images/coctail.gif'>";
    }
    interact(player) {
        if (true === this.visited) {
            return;
        }
        this.drinkSound();
        player.addBeer(1);
        player.visitedBars();
        console.log(player.visitedBarsNumbers);
        this.visited = true;
    }
    drinkSound() {
        const audio = document.getElementById("drinkSound");
        audio.play();
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

class Kebab {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.element = document.querySelector(`.x${x}.y${y}`);
        this.element.classList.add('kebab');
        this.element.innerHTML = "<img class='eat' src='images/kebab.gif'>";
    }
    interact(player) {
        if (true === this.visited) {
            return;
        }
        this.eatSound();

        if (player.beersNumber > 0) {
            player.addBeer(-1)
        };
        this.visited = true;
    }
    eatSound() {
        const audio = document.getElementById("eatSound");
        audio.play();
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
            ['O', '_', '_', 'O', 'O', 'O', 'O', '_', 'K', 'O'],
            ['B', '_', '_', 'O', '_', '_', '_', '_', '_', 'B'],
            ['O', '_', '_', '_', '_', '_', 'O', '_', '_', 'O'],
            ['O', '_', '_', 'O', 'O', '_', '_', 'O', '_', 'O'],
            ['O', '_', 'O', 'O', 'B', '_', '_', 'O', '_', 'O'],
            ['O', '_', 'K', 'O', 'O', '_', '_', 'O', '_', 'O'],
            ['O', '_', '_', 'O', '_', '_', '_', '_', '_', '_'],
            ['O', 'O', '_', '_', '_', 'O', '_', '_', '_', 'K'],
            ['B', '_', '_', 'O', 'O', 'O', 'O', 'O', '_', 'O'],
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

                } else if (mapArray[i][j] === 'K') {
                    mapObjects.push(new Kebab(j + 1, i + 1));
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
        player = new Player(5, 2);
        timer = new Timer(1, 50);
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
    document.querySelector('#restart').addEventListener('click', () => {
        window.location.reload(true);
    });
}

gameMenu();
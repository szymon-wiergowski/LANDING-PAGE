let xPosition, yPosition, yMin = 1,
    yMax, xMin = 1,
    xMax;

function mapGenerator(mapWidth, mapHeight) {
    let table = document.getElementById('map');
    yMax = mapWidth;
    xMax = mapHeight;
    for (i = 0; i < mapHeight; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < mapWidth; j++) {
            let col = document.createElement('td');
            row.appendChild(col);
            col.classList.add('x' + (j + 1));
        }
        table.appendChild(row);
    }
    for (i = 0; i < mapHeight; i++) {
        let yHigh = table.rows[i]
        for (j = 0; j < mapWidth; j++) {
            yHigh.cells[j].classList.add('y' + (i + 1));
        }
    }
    let elem = document.getElementById('btn');
    elem.parentNode.removeChild(elem);
}

function playerPosition(x, y) {
    // trap = document.querySelector(`.x${x}.y${y}`);
    // if () {
    // console.log(x, y);
    xPosition = x;
    yPosition = y;
    
    movePlayer = document.querySelector(`.x${xPosition}.y${yPosition}`);
    movePlayer.classList.add('player');
    document.onkeydown = moveDirection;
}

function moveDirection(move) {
    movePlayer.classList.remove('player');
    if (move.keyCode == 39) {
        if (xPosition < xMax) {
            xPosition++;
        }
    } else if (move.keyCode == 37) {
        if (xPosition > xMin) {
            xPosition--;
        }
    } else if (move.keyCode == 40) {
        if (yMax > yPosition) {
            yPosition++;
        }
    } else if (move.keyCode == 38) {
        if (yPosition > yMin) {
            yPosition--;
        }
    }
    playerPosition(xPosition, yPosition);
}
// switch (moveDirection) {
//     case 'LEFT':
//         nextPositionOfPlayer = $(this).find('td.car').prev();
//         setupOfCar += 'car--left';
//         break;
//     case 'UP':
//         nextPositionOfPlayer = $(this).find('td.car').parent().prev().find(':nth-child(' + (lastPositionOfCar.index() + 1) + ')');
//         setupOfCar += 'car--up';
//         break;
//     case 'RIGHT':
//         nextPositionOfPlayer = $(this).find('td.car').next();
//         setupOfCar += 'car--right';
//         break;
//     case 'DOWN':
//         nextPositionOfPlayer = $(this).find('td.car').parent().next().find(':nth-child(' + (lastPositionOfCar.index() + 1) + ')');
//         setupOfCar += 'car--down';
//         break;
// }
{
    /* <script>
    function anim(e) {
        alert(e.keyCode);
    }
    if(e.keyCode==39){
        
    }
    document.onkeydown = anim;    
    </script> */
}
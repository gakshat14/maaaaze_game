import Canvas from "./Canvas";
import { Circle } from "./Component";

let mazeForm: HTMLFormElement = document.getElementById('maze_size_form') as HTMLFormElement;

type IColCircle = { position: number, circle: Circle, coordinates: { x: number, y: number } };

let circlesAndPosition: IColCircle[] = [];
let position: number[] = [];
let player: Circle = null;
let canvas: Canvas = null;
let weHaveACanvas = false;
let score = 0;

mazeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const numberOfRows = Number((document.getElementById('row_input') as HTMLInputElement).value);
    const numberOfColumn = Number((document.getElementById('column_input') as HTMLInputElement).value);

    // check if we already have a canvas
    if(!weHaveACanvas) {
        canvas = new Canvas(numberOfRows, numberOfColumn, 'canvas_container');
        weHaveACanvas = true;
    } else {
        clearMaaaze();
        canvas = new Canvas(numberOfRows, numberOfColumn, 'canvas_container');
    }

    document.getElementById('game_over').style.display = 'none';

    // generate power palets
    generatePowerCirclesInit(numberOfRows, numberOfColumn, canvas);

    // generating player
    player = new Circle(50, 50, canvas.context, 20, 'green');

    document.getElementById('button_container').style.display = 'block';
})

function clearMaaaze() {
    document.querySelector('canvas').remove();
    circlesAndPosition = [];
    position = [];
    score = 0;
    document.getElementById('score').innerText = '';
}

function generatePowerCirclesInit(numberOfRows: number, numberOfColumn: number, canvas: Canvas) {
    const total_palets = Math.floor((numberOfColumn * numberOfRows) / numberOfColumn)
    for (let p = 0; p < total_palets; p++) {
        let random_number = Math.ceil(Math.random() * ((numberOfColumn * numberOfRows) - 2) + 2);
        if (position.length === 0 || !position.includes(random_number)) {
            const { x, y } = generateCoordinates(random_number, numberOfColumn);
            position.push(random_number);
            circlesAndPosition.push({ position: random_number, circle: new Circle(x, y, canvas.context, 10), coordinates: { x, y } });
            continue;
        }
        while (position.includes(random_number)) {
            random_number = Math.floor(Math.random() * (numberOfColumn * numberOfRows));
            if (!position.includes(random_number)) {
                const { x, y } = generateCoordinates(random_number, numberOfColumn);
                position.push(random_number);
                circlesAndPosition.push({ position: random_number, circle: new Circle(x, y, canvas.context, 10), coordinates: { x, y } });
                canvas.context.fill();
                break;
            }
        };
    }

}

function generatePowerCirclesFromObject(circlePositionObject: IColCircle[], currentCircleX, currentCircleY) {
    const newCirclePositionObject: IColCircle[] = [];
    for (let i = 0; i <  circlePositionObject.length; i++) {
        const circleObject = circlePositionObject[i];
        if(currentCircleX !== circleObject.coordinates.x || currentCircleY !== circleObject.coordinates.y) {
            newCirclePositionObject.push({coordinates: circleObject.coordinates, position: circleObject.position, circle: new Circle(circleObject.coordinates.x, circleObject.coordinates.y, canvas.context, 10)});
        } else {
            score += 10;
            document.getElementById('score').innerText = `Your score: ${score.toString()}`;
        }
    }
    circlesAndPosition = [...newCirclePositionObject];
    if (circlePositionObject.length < 1) {
        clearMaaaze();
        document.getElementById('button_container').style.display = 'none';
        weHaveACanvas = false;
        document.getElementById('game_over').style.display = 'block';
    }
}

function generateCoordinates(randomNumber: number, column: number): { x: number, y: number } {
    const y = (Math.ceil(randomNumber / column) * 100) - 50;
    const x = (randomNumber % column) === 0 ? (column * 100) - 50 : ((randomNumber % column) * 100) - 50;
    return { x, y };
}

// add event handlers to the button
const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');

enum playerDirection {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right'
}

function updateGame(x, y) {
    player = null;
    canvas.context.clearRect(0, 0, canvas.canvas_width, canvas.canvas_height);
    canvas.generateGrid();
    generatePowerCirclesFromObject(circlesAndPosition, x, y);
    player = new Circle(x, y, canvas.context, 20, 'green');
}

function handlePlayersMovement(direction: keyof typeof playerDirection) {
    return (e: MouseEvent) => {
        switch (direction) {
            case playerDirection.up:
                {
                    const { x, y } = player.updatedCoordinates(0, -100);
                    updateGame(x, y);
                    break;
                }
            case playerDirection.left:
                {
                    const { x, y } = player.updatedCoordinates(-100, 0)
                    updateGame(x, y);
                    break;
                }
            case playerDirection.right:
                {
                    const { x, y } = player.updatedCoordinates(100, 0)
                    updateGame(x, y);
                    break;
                }
            case playerDirection.down:
                {
                    const { x, y } = player.updatedCoordinates(0, 100);
                    updateGame(x, y);
                    break;
                }
            default:
                break;
        }
    }
}

up.addEventListener('mousedown', handlePlayersMovement('up'))
down.addEventListener('mousedown', handlePlayersMovement('down'))
left.addEventListener('mousedown', handlePlayersMovement('left'))
right.addEventListener('mousedown', handlePlayersMovement('right'))

if ((module as any).hot) {
    (module as any).hot.accept();
}

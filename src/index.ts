import Canvas from "./Canvas";
import { Circle } from "./Component";

let mazeForm: HTMLFormElement = document.getElementById('maze_size_form') as HTMLFormElement;

mazeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const numberOfRows = Number((document.getElementById('row_input') as HTMLInputElement).value);
    const numberOfColumn = Number((document.getElementById('column_input') as HTMLInputElement).value);

    const canvas = new Canvas(numberOfRows, numberOfColumn);
    
    // generate power palets
    generatePowerPalets(numberOfRows, numberOfColumn, canvas);

    // generating player
    const player = new Circle(50, 50, canvas.context, 20, 'green');
})

function generatePowerPalets(numberOfRows: number, numberOfColumn: number, canvas: Canvas) {
    const total_palets = Math.floor((numberOfColumn * numberOfRows) / numberOfColumn)
    const position: number[] = [];
    for(let p = 0; p < total_palets; p++) {
        let random_number = Math.ceil(Math.random() * ((numberOfColumn * numberOfRows)- 2) + 2);
        if(position.length === 0 || !position.includes(random_number)){
            position.push(random_number);
            const {x, y} = generateCoordinates(random_number, numberOfColumn);
            new Circle(x, y, canvas.context, 10);
            continue;
        }
        while (position.includes(random_number)) {
            random_number = Math.floor(Math.random() * (numberOfColumn * numberOfRows));
            if(!position.includes(random_number)) {
                position.push(random_number)
                const {x, y} = generateCoordinates(random_number, numberOfColumn);
                new Circle(x, y, canvas.context, 10);
                canvas.context.fill();
                break;
            }
        };
    }
}

function generateCoordinates(randomNumber: number, column: number): {x: number, y: number} {
    const y = (Math.ceil(randomNumber / column) * 100) - 50;
    const x = (randomNumber % column) === 0 ? (column * 100) - 50 : ((randomNumber % column) * 100) - 50;
    return {x, y};
}

if ((module as any).hot) {
    (module as any).hot.accept();
}

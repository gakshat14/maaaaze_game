import '../styles/canvas.css';

export default class Canvas {
    private _canvas: HTMLCanvasElement = null;
    context: CanvasRenderingContext2D = null;
    private _canvas_height = 0;
    private _canvas_width = 0;
    interval = null;

    constructor(rows: number, columns: number, insertBeforeId = 'root') {
        this._canvas = document.createElement('canvas');
        this._canvas_height = 100 * rows;
        this._canvas_width = 100 * columns;
        this._canvas.height = this._canvas_height;
        this._canvas.width = this._canvas_width;
        this.context = this._canvas.getContext('2d');
        document.querySelector('body').appendChild(this._canvas);
        this.generateGrid(rows, columns);
        // this.interval = setInterval(() => {this.updateCanvas(rows, columns)}, 20)
    }

    generateGrid(rows: number, column: number) {
        for (let c = 0; c < column; c++) {
            for (let row = 0; row < rows; row++) {
                this.context.strokeRect(c * 100, row * 100, 100, 100)
            }
        }
        
    }

}
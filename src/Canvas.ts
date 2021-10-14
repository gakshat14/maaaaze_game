import '../styles/canvas.css';

export default class Canvas {
    private _canvas: HTMLCanvasElement = null;
    context: CanvasRenderingContext2D = null;
    canvas_height = 0;
    canvas_width = 0;
    interval = null;
    private readonly _rows: number;
    private readonly _columns: number;

    constructor(rows: number, columns: number, insertBeforeId = 'root') {
        this._canvas = document.createElement('canvas');
        this.canvas_height = 100 * rows;
        this.canvas_width = 100 * columns;
        this._canvas.height = this.canvas_height;
        this._canvas.width = this.canvas_width;
        this._rows = rows;
        this._columns = columns;
        this.context = this._canvas.getContext('2d');
        document.getElementById(insertBeforeId).appendChild(this._canvas);
        this.generateGrid();
        // this.interval = setInterval(() => {this.updateCanvas(rows, columns)}, 20)
    }

    generateGrid() {
        for (let c = 0; c < this._columns; c++) {
            for (let row = 0; row < this._rows; row++) {
                this.context.strokeRect(c * 100, row * 100, 100, 100)
            }
        }
        
    }

}
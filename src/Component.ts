abstract class Component {
    protected readonly _xCoord: number;
    protected readonly _yCoord: number;
    protected readonly _ctx: CanvasRenderingContext2D;
    protected readonly _fillStyle: string;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, fillStyle = 'black') {
        this._xCoord = x;
        this._yCoord = y;
        this._ctx = ctx;
        this._fillStyle = fillStyle;
    }

    abstract render(): void;
}

export class Circle extends Component {
    private readonly _radius: number;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, radius: number, fillStyle?: string) {
        super(x, y, ctx, fillStyle);
        this._radius = radius;
        this.render();
    }

    render() {
        this._ctx.beginPath();
        this._ctx.arc(this._xCoord, this._yCoord, this._radius, 0, 360);
        this._ctx.fillStyle = this._fillStyle;
        this._ctx.fill();
    }
}
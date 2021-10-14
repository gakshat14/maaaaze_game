abstract class Component {
    protected  _xCoord: number;
    protected  _yCoord: number;
    protected readonly _ctx: CanvasRenderingContext2D;
    protected readonly _fillStyle: string;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, fillStyle = 'black') {
        this._xCoord = x;
        this._yCoord = y;
        this._ctx = ctx;
        this._fillStyle = fillStyle;
    }

    protected abstract render(): void;
}

export class Circle extends Component {
    private readonly _radius: number;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, radius: number, fillStyle?: string) {
        super(x, y, ctx, fillStyle);
        this._radius = radius;
        this.render();
    }

    protected render() {
        this._ctx.beginPath();
        this._ctx.arc(this._xCoord, this._yCoord, this._radius, 0, 360);
        this._ctx.fillStyle = this._fillStyle;
        this._ctx.fill();
    }

    updatedCoordinates(xIncrement, yIncrement) {
        if(this._xCoord === 50 && xIncrement > 0) {
            this._xCoord += xIncrement;
        } else if(this._xCoord !== 50) {
            this._xCoord += xIncrement;
        }
        if(this._yCoord === 50 && yIncrement > 0) {
            this._yCoord += yIncrement
        } else if(this._yCoord !== 50) {
            this._yCoord += yIncrement
        }
        return {x: this._xCoord, y: this._yCoord};
    }
}
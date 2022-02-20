export default class windowParameter {
    private baxViewheight = 48;
    private boxheight = 45;
    private boxTextfromtop = 35;
    private spacing = 5;
    private toprowheight = 30
    private numberboxwidth = 40
    private boxtimewidth = 120
    private separator = 2
    private logospace=80

    window_width: number;
    window_height: number;
    window_top_pixel: number;

    constructor() {
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0
    }

    public calculateArea(radius: number) {
        return this.baxViewheight * radius * radius;
    }


    public getBoxheight(): number {
        return this.boxheight
    }

    public getBoxNumberWidth(): number {
        return this.numberboxwidth
    }

    public getBoxDiaganol(): number {
        return 18
    }

    public getWindowWidth(): number {
        return this.window_width
    }

    public getBoxWidth(parts: number): number {
        return (this.window_width - this.logospace - (2 * this.spacing)) / parts
    }

    public getLaneNumberTextFromLeft(): number {
        return 10
    }

    public getBoxTimeLaneWidth(): number {
        return this.boxtimewidth
    }

    public getBoxTextFromTop(): number {
        return this.boxTextfromtop
    }

    public getHeaderWidth(): number {
        return this.window_width - (2 * this.spacing) - this.logospace
    }

    public getPictureStart(): number {
        return this.spacing
    }

    public getPictureLength(): number {
        return this.window_width - (2 * this.spacing)
    }

    public getPictureMiddle(): number {
        return (this.window_width - (2 * this.spacing) - this.logospace) / 2
    }

    public getSeparatorHeight(): number {
        return this.separator
    }

    public getTopRowHeight() : number {
        return this.toprowheight
    }

}
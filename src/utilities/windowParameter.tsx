export default class windowParameter {
    private baxViewheight = 48;
    private boxheight = 45;
    private boxTextfromtop = 35;

    window_width: number;
    window_height: number;
    window_top_pixel: number;

    constructor() {
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0
    }

    public calculateArea(radius:number) {
        return this.baxViewheight * radius * radius;
    }

    
    public getBoxheight():number {
        return this.boxheight
    }
    
    public getBoxViewheight():number {
        return this.baxViewheight
    }

    public getWindowWidth():number {
        return this.window_width
    }

    public getBoxTextFromTop():number {
        return this.boxTextfromtop
    }

}
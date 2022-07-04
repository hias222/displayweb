
export default class windowParameter {
    private boxheight = 45;
    private boxTextfromtop = 35;
    private spacing = 5;
    private toprowheight = 30
    private numberboxwidth = 42
    private boxtimewidth = 120
    private separator = 2
    private logospace = 150

    private lengthNameStartlist: number = 25;
    private spaceNameStartlist: number = 380;
    private lengthClubStartlist: number = 27;

    private lengthNameFinishlist: number = 25;
    private spaceNameFinishlist: number = 300;
    private lengthClubFinishlist: number = 21;

    private showClub: boolean = false
    private showAgeResult: boolean = true
    private logonumber: number = 0

    private scalefactor = 1;

    private detailedheader = true;

    window_width: number;
    window_height: number;
    window_top_pixel: number;

    constructor() {
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0
        let window_mode: number = process.env.REACT_APP_SHOW_MODE !== undefined ? Number(process.env.REACT_APP_SHOW_MODE) : 0

        this.setWindowMode(window_mode);
    }

    private setWindowMode(windowmode: number) {

        if (windowmode === 1) {
            // Mode 1 16:9 SGM
            this.window_width = 896
            this.window_height = 512
            this.showClub = true;
            this.boxheight = 48
            this.toprowheight = 35;
            this.logonumber = 1;
        }

        if (windowmode === 2) {
            //Mode 2 16:9 FCN
            this.window_width = 896
            this.window_height = 512
            this.showClub = true;
            this.boxheight = 48
            this.toprowheight = 35;
            this.logonumber = 2;
            this.showAgeResult = false
        }

        if (windowmode === 3) {
            // Mode 3 1080p
            this.window_width = 1919
            this.window_height = 1079
            this.showClub = true;
            this.boxheight = 100
            this.toprowheight = 80;
            this.logonumber = 0;
            this.lengthNameStartlist = 50;
            this.spaceNameStartlist = 800;
            this.lengthClubStartlist = 30;

            this.boxTextfromtop = 80;
            this.numberboxwidth = 80;

            this.lengthNameFinishlist = 30;
            this.spaceNameFinishlist = 600;

            this.boxtimewidth = 220;
            this.scalefactor = 2.5;

            this.spacing = 10;
            this.detailedheader = false;
            this.toprowheight = 120;
        }

        if (windowmode === 4) {
            //Anzeige Fürth
            this.window_width = 512
            this.window_height = 384
            this.showClub = false;
            this.boxheight = 45
            this.toprowheight = 30;
            this.boxTextfromtop = 32;
            this.logonumber = 0;
            this.logospace = 100
            this.showAgeResult = false
        }

        if (windowmode === 5) {
            //Anzeige Fürth
            this.window_width = 512
            this.window_height = 384
            this.showClub = false;
            this.boxheight = 35
            this.toprowheight = 30;
            this.boxTextfromtop = 32;
            this.logonumber = 0;
            this.logospace = 95
            this.showAgeResult = false
            this.scalefactor = 0.9;
            this.boxTextfromtop = 30;
            this.toprowheight = 28
        }

    }

    public getBoxheight(): number {
        return this.boxheight
    }

    public getBoxNumberWidth(): number {
        return this.numberboxwidth
    }

    public getBoxScaleFactorh(): number {
        return this.scalefactor;
    }

    public getBoxDiaganol(): number {
        return 18
    }

    public getWindowWidth(): number {
        return this.window_width
    }

    public getWindowHeight(): number {
        return this.window_height
    }

    public getWindowTopEmptyPixel(): number {
        return this.window_top_pixel
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

    public getLogoNumber(): number {
        return this.logonumber
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

    public getTopRowHeight(): number {
        return this.toprowheight
    }

    // Length Names

    public showClubs(): boolean {
        return this.showClub
    }

    public showAgeResults(): boolean {
        return this.showAgeResult
    }

    public getLengthNameStartlist(): number {
        return this.lengthNameStartlist
    }

    public getSpaceNameStartlist(): number {
        return this.spaceNameStartlist
    }

    public getLengthClubStartlist(): number {
        return this.lengthClubStartlist
    }

    public getLengthNameFinishlist(): number {
        return this.lengthNameFinishlist
    }

    public getSpaceNameFinishlist(): number {
        return this.spaceNameFinishlist
    }

    public getLengthClubFinishlist(): number {
        return this.lengthClubFinishlist
    }

    public getDetailsInHeader(): boolean {
        return this.detailedheader
    }

}
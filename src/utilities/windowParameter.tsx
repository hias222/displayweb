export default class windowParameter {



    private renderMode = 'pixel'

    private boxheight = 45;
    private boxTextfromtop = 35;
    private boxHeaderTextfromtop = 35;
    private spacing = 5;
    private toprowheight = 30
    private numberboxwidth = 42
    private boxtimewidth = 110
    private separator = 2
    private logospace = 150

    private laneNumberTextFromLeft: number = 10;
    private lengthNameStartlist: number = 22;
    private spaceNameStartlist: number = 365;
    private lengthClubStartlist: number = 26;

    private lengthNameFinishlist: number = 21;
    private spaceNameFinishlist: number = 315;
    private lengthClubFinishlist: number = 22;

    private lengthMedalFinishList = 40;

    private showNameInHiit = false;

    private onlyLaneAndPlace = false
    private separateSmallWindow = false
    private showClub: boolean = false
    private showAgeResult: boolean = true
    private detailedheaderoneline: boolean = false
    private lanestwocolumns: boolean =false
    /*
    0  <Swimmer></Swimmer>
    1    return <SGMittelfranken />
    2    return <FCNLogo />
    3    return <LebkuchenLogo />
    5    return <SGFLogo />
    */


    private logonumber: number = 0

    private scalefactor = 1;

    private showHeader = true;
    private detailedheader = true;
    private twopartsheader = false;
    private showonlyClub = false;

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

        if (windowmode === 19) {
            //Mode 2 16:9 FCN
            this.window_width = 448
            this.window_height = 512
            this.showClub = false;
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

        if (windowmode === 4 || windowmode === 18) {
            //Anzeige Fürth
            this.window_width = 512
            this.window_height = 384
            this.showClub = false;
            this.boxheight = 45
            this.toprowheight = 30;
            this.boxTextfromtop = 32;
            this.logonumber = 5;
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
            this.logospace = 95
            this.showAgeResult = false
            this.scalefactor = 0.9;
            this.boxTextfromtop = 30;
            this.toprowheight = 28
            this.logonumber = 5
        }

        if (windowmode === 6) {
            //Mode 2 16:9 FCN 6 Bahnen
            this.window_width = 896
            this.window_height = 512
            this.showClub = true;
            this.boxheight = 60
            this.boxTextfromtop = 46;
            this.toprowheight = 45;
            this.logonumber = 2;
            this.scalefactor = 1.3;
            this.showAgeResult = false

            this.lengthNameStartlist = 16;
            this.spaceNameStartlist = 380;
            this.lengthClubStartlist = 14;

            this.lengthNameFinishlist = 15;
            this.spaceNameFinishlist = 360;
            this.lengthClubFinishlist = 11;

            this.boxtimewidth = 170;
            this.numberboxwidth = 50;

            this.lengthMedalFinishList = 40
        }

        if (windowmode === 7 || windowmode === 11) {
            this.window_width = 128
            this.window_height = 256
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.showClub = false;

            this.laneNumberTextFromLeft = 1

            this.boxheight = 32
            this.boxTextfromtop = 27;
            this.toprowheight = 26;
            this.scalefactor = 0.7;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 86;
            this.numberboxwidth = 21;
        }

        if (windowmode === 8) {
            //Mode 2 16:9 FCN
            this.window_width = 256
            this.window_height = 128
            this.detailedheader = false
            this.onlyLaneAndPlace = false
            this.showClub = false;
            this.logospace = 20

            this.laneNumberTextFromLeft = 5

            this.boxheight = 32
            this.boxTextfromtop = 22;
            this.toprowheight = 22;
            this.scalefactor = 0.6;
            this.showAgeResult = false

            this.lengthNameStartlist = 20;
            this.spaceNameStartlist = 180;
            this.lengthClubStartlist = 15;

            this.lengthNameFinishlist = 16;
            this.spaceNameFinishlist = 120;
            this.lengthClubFinishlist = 11;

            this.boxtimewidth = 80;
            this.numberboxwidth = 20;
        }

        if (windowmode === 9) {
            this.window_width = 128
            this.window_height = 256
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.separateSmallWindow = true
            this.showClub = false;

            this.laneNumberTextFromLeft = 1

            this.boxheight = 30
            this.boxTextfromtop = 26;
            this.toprowheight = 28;
            this.scalefactor = 1;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 86;
            this.numberboxwidth = 21;
            this.showHeader = false;
        }

        if (windowmode === 10) {
            //Anzeige Fürth
            this.window_width = 512
            this.window_height = 384
            this.showClub = false;
            this.boxheight = 35
            this.toprowheight = 30;
            this.boxTextfromtop = 32;
            this.logospace = 160
            this.showAgeResult = false
            this.scalefactor = 0.9;
            this.boxTextfromtop = 30;
            this.toprowheight = 28
            this.logonumber = 10
            this.twopartsheader = true
        }

        if (windowmode === 12) {
            //Anzeige Fürth
            this.window_width = 128
            this.window_height = 256
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.showClub = false;

            //this.showHeader = false;
            //this.separateSmallWindow = false;

            this.laneNumberTextFromLeft = 1

            this.boxheight = 28
            this.boxTextfromtop = 24;
            this.toprowheight = 24;
            this.scalefactor = 1;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 86;
            this.numberboxwidth = 21;
        }

        if (windowmode === 13 || windowmode === 16 || windowmode === 17) {
            //5 Bahnen
            this.window_width = 128
            this.window_height = 256
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.showClub = false;

            //this.showHeader = false;
            //this.separateSmallWindow = false;

            this.laneNumberTextFromLeft = 1

            this.boxheight = 35
            this.boxTextfromtop = 28;
            this.toprowheight = 34;
            this.scalefactor = 0.8;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 86;
            this.numberboxwidth = 21;
        }


        if (windowmode === 14) {
            //IPAD 2 Air
            this.window_width = 1152
            this.window_height = 1536
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.showClub = false;
            this.laneNumberTextFromLeft = 1
            this.boxheight = 182
            this.boxTextfromtop = 144;
            this.boxHeaderTextfromtop = 150;
            this.toprowheight = 182;
            this.scalefactor = 1;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 186;
            this.numberboxwidth = 41;

            this.showNameInHiit = true;
        }

        if (windowmode === 15) {
            // flex
            this.renderMode = 'grid'
            this.window_width = 1152
            this.window_height = 1536
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.showClub = false;
            this.laneNumberTextFromLeft = 1
            this.boxheight = 182
            this.boxTextfromtop = 144;
            this.boxHeaderTextfromtop = 100;
            this.toprowheight = 155;
            this.scalefactor = 1;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 186;
            this.numberboxwidth = 41;

            this.showNameInHiit = true;
        }

        if (windowmode === 20) {
            // 128 x 96 Pixel für
            // 640 x 480 mm
            // 2*3 
            this.window_width = 256
            this.window_height = 288
            this.detailedheader = false
            this.onlyLaneAndPlace = true
            this.separateSmallWindow = true
            this.showClub = false;

            this.laneNumberTextFromLeft = 1

            this.boxheight = 30
            this.boxTextfromtop = 26;
            this.toprowheight = 28;
            this.scalefactor = 1;
            this.showAgeResult = false

            this.lengthNameStartlist = 0;
            this.spaceNameStartlist = 0;
            this.lengthClubStartlist = 0;

            this.lengthNameFinishlist = 0;
            this.spaceNameFinishlist = 0;
            this.lengthClubFinishlist = 0;

            this.boxtimewidth = 86;
            this.numberboxwidth = 21;
            this.showHeader = false;
        }

        if (windowmode === 21) {
            // 128 x 96 Pixel für
            // 640 x 480 mm
            // 4*2
            this.window_width = 512
            this.window_height = 192

            this.detailedheader = false
            this.detailedheaderoneline = true
            this.showHeader = false
            this.onlyLaneAndPlace = false

            this.lanestwocolumns = true
            this.separateSmallWindow = false
            this.showClub = false;

            this.laneNumberTextFromLeft = 1
            this.logonumber = 2;

            this.boxheight = 30
            this.boxTextfromtop = 26;
            this.toprowheight = 28;
            this.scalefactor = 1;
            this.showAgeResult = false

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
        if (this.onlyLaneAndPlace) {
            return (this.window_width - (2 * this.spacing)) / parts
        } else {
            return (this.window_width - this.logospace - (2 * this.spacing)) / parts
        }

    }

    public getLaneNumberTextFromLeft(): number {
        return this.laneNumberTextFromLeft
    }

    public getBoxTimeLaneWidth(): number {
        return this.boxtimewidth
    }

    public getBoxTextFromTop(): number {
        return this.boxTextfromtop
    }

    public getboxHeaderTextfromtop(): number {
        return this.boxHeaderTextfromtop
    }

    public getlengthMedalFinishList(): number {
        return this.lengthMedalFinishList
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
        if (this.onlyLaneAndPlace) {
            return (this.window_width) / 2
        } else {
            return (this.window_width - (2 * this.spacing) - this.logospace) / 2
        }
    }

    public getshowNameInHiit(): boolean {
        return this.showNameInHiit;
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

    public getMaxPixelLength(): number {
        if (this.window_height > this.window_width) {
            return this.window_width
        } else {
            return this.window_height
        }
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

    public getShowOnlyClub(): boolean {
        return this.showonlyClub
    }

    public getTwoPArtsHeader(): boolean {
        return this.twopartsheader
    }

    public getOnlyLaneAndPlace(): boolean {
        return this.onlyLaneAndPlace
    }

    public getSeparateSmallWindow(): boolean {
        return this.separateSmallWindow
    }

    public getshowHeader(): boolean {
        return this.showHeader
    }

    public getLogoSpace(): number {
        return this.logospace;
    }

    public getRenderMode(): string {
        return this.renderMode;
    }

    public getDetailedheaderoneline(): boolean {
        return this.detailedheaderoneline;
    }

    public getLanestwocolumns(): boolean {
        return this.lanestwocolumns;
    }

}
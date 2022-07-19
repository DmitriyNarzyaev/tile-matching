import BackgroundPanel from "./BackgroundPanel";
var Container = PIXI.Container;
export default class HeaderPanel extends Container {
    constructor() {
        super();
        this._height = 50;
        this._backdroundColor = 0xC09883;
        this.initHeaderPaner();
    }
    initHeaderPaner() {
        this._headerPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._headerPanel);
    }
}
HeaderPanel.WIDTH = 400;
//# sourceMappingURL=HeaderPanel.js.map
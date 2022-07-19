import BackgroundPanel from "./BackgroundPanel";
var Container = PIXI.Container;
export default class FooterPanel extends Container {
    constructor() {
        super();
        this._height = 50;
        this._backdroundColor = 0x654445;
        this.initHeaderPaner();
    }
    initHeaderPaner() {
        this._footerPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._footerPanel);
    }
}
FooterPanel.WIDTH = 400;
//# sourceMappingURL=footerPanel.js.map
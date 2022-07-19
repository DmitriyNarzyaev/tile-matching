import BackgroundPanel from "./BackgroundPanel";
var Container = PIXI.Container;
export default class BodyPanel extends Container {
    constructor() {
        super();
        this._height = 500;
        this._backdroundColor = 0x2C1D1F;
        this.initHeaderPaner();
    }
    initHeaderPaner() {
        this._bodyPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._bodyPanel);
    }
}
BodyPanel.WIDTH = 400;
//# sourceMappingURL=BodyPanel.js.map
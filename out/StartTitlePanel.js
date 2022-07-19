import BackgroundPanel from "./BackgroundPanel";
var Container = PIXI.Container;
export default class StartTitlePanel extends Container {
    constructor() {
        super();
        this._height = 600;
        this._backdroundColor = 0x111111;
        this.initHeaderPaner();
    }
    initHeaderPaner() {
        this._bodyPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._bodyPanel);
    }
}
StartTitlePanel.WIDTH = 400;
//# sourceMappingURL=StartTitlePanel.js.map
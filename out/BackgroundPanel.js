var Container = PIXI.Container;
export default class BackgroundPanel extends Container {
    constructor(panelHeight, panelColor) {
        super();
        let panel = new PIXI.Graphics;
        panel
            .beginFill(panelColor)
            .drawRect(0, 0, 400, panelHeight);
        this.addChild(panel);
    }
}
//# sourceMappingURL=BackgroundPanel.js.map
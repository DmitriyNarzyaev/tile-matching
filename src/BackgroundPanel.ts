import Container = PIXI.Container;

export default class BackgroundPanel extends Container {

	constructor(panelHeight:number, panelColor:number) {
		super();
        let panel:PIXI.Graphics = new PIXI.Graphics;
		panel
			.beginFill(panelColor)
			.drawRect(0, 0, 400, panelHeight);
		this.addChild(panel);
	}
}

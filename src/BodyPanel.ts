import BackgroundPanel from "./BackgroundPanel";
import Container = PIXI.Container;

export default class BodyPanel extends Container {
	public static WIDTH:number = 400;
	private readonly _height:number = 500;
    private _bodyPanel:BackgroundPanel;
    private _backdroundColor:number = 0x2C1D1F;

	constructor() {
		super();
        this.initHeaderPaner();
	}

	private initHeaderPaner():void {
		this._bodyPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._bodyPanel);
	}
}

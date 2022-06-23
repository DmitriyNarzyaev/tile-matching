import BackgroundPanel from "./BackgroundPanel";
import Container = PIXI.Container;

export default class HeaderPanel extends Container {
	public static WIDTH:number = 400;
	private _height:number = 50;
    private _headerPanel:BackgroundPanel;
    private _backdroundColor:number = 0xC09883;

	constructor() {
		super();
        this.initHeaderPaner();
	}

	private initHeaderPaner():void {
		this._headerPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._headerPanel);
	}
}

import BackgroundPanel from "./BackgroundPanel";
import Container = PIXI.Container;

export default class StartTitlePanel extends Container {
	public static WIDTH:number = 400;
	private readonly _height:number = 600;
    private _bodyPanel:BackgroundPanel;
    private _backdroundColor:number = 0x111111;

	constructor() {
		super();
        this.initHeaderPaner();
	}

	private initHeaderPaner():void {
		this._bodyPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._bodyPanel);
	}
}

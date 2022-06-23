import BackgroundPanel from "./BackgroundPanel";
import Container = PIXI.Container;

export default class FooterPanel extends Container {
	public static WIDTH:number = 400;
	private readonly _height:number = 50;
    private _footerPanel:BackgroundPanel;
    private _backdroundColor:number = 0x654445;

	constructor() {
		super();
        this.initHeaderPaner();
	}

	private initHeaderPaner():void {
		this._footerPanel = new BackgroundPanel(this._height, this._backdroundColor);
        this.addChild(this._footerPanel);
	}
}

import Container = PIXI.Container;
import {} from "pixi.js";
import Button from "./Button";

export default class MainContainer extends Container {
	public static WIDTH:number = 400;
	public static HEIGHT:number = 600;
	private _panelHeight:number = 0;
	private _panelY:number = 0;
	private _startTitleContainer:PIXI.Container;
	private _backgroundContainer:PIXI.Container;

	constructor() {
		super();
		
		this._startTitleContainer = new PIXI.Container;
		this.addChild(this._startTitleContainer);

		this._backgroundContainer = new PIXI.Container;
		this.addChild(this._backgroundContainer);

		this.initTitle();
		this.initButton();
	}

	private initTitle():void {
		this.initPanel(MainContainer.HEIGHT, 0x111111, this._panelY, this._startTitleContainer);
	}

	private removeTitle():void {
		this.removeChild(this._startTitleContainer);
	}
	
	private startGame():void {
		this.initHeaderPaner();
		this.initBodyPaner();
		this.initFooterPaner();
	}

	private initHeaderPaner():void {
		this._panelHeight = MainContainer.HEIGHT/10;
		this.initPanel(this._panelHeight, 0xC09883, this._panelY, this._backgroundContainer);
	}

	private initBodyPaner():void {
		this._panelY += MainContainer.HEIGHT/10;
		this._panelHeight = (MainContainer.HEIGHT/10)*8;
		this.initPanel(this._panelHeight, 0x2C1D1F, this._panelY, this._backgroundContainer);
	}

	private initFooterPaner():void {
		this._panelY += (MainContainer.HEIGHT/10)*8;
		this._panelHeight = MainContainer.HEIGHT/10;
		this.initPanel(this._panelHeight, 0x654445, this._panelY, this._backgroundContainer);
	}

	private initPanel(panelHeight:number, panelColor:number, panelY:number, container:PIXI.Container):void {
		let panel:PIXI.Graphics = new PIXI.Graphics;
		panel
			.beginFill(panelColor)
			.drawRect(0, 0, MainContainer.WIDTH, panelHeight);
		container.addChild(panel);
		panel.y = panelY
	}

	private initButton():void {
		let button:Button = new Button(
			"START",
			() => {this.buttonClickFunctions();},
		);
		button.x = (MainContainer.WIDTH - button.width)/2
		this._startTitleContainer.addChild(button);
	}

	private buttonClickFunctions():void {
		console.log("click");
		this.removeTitle();
		this.startGame();
	}
}

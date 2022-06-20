import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Button extends Container {
    private _button:PIXI.Graphics
    private _textStyle:TextStyle;
    private readonly _clickCallback:()=>void;
    public buttonName:string;
    private readonly _buttonWidth:number = 160;
    private readonly _buttonHeight:number = 40;
    private readonly _buttonRadius:number = 8;

	constructor(
            buttonName:string,
            clickCallback:()=>void = null,
        ){

		super();
        this._clickCallback = clickCallback;
        this.buttonName = buttonName;
        this.interactive = true;
        this.buttonMode = true;

        this._button = new PIXI.Graphics;
        this._button
            .beginFill(0x223841)
            .drawRoundedRect(0, 0, this._buttonWidth, this._buttonHeight, this._buttonRadius);
        this.addChild(this._button);

        this._textStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#ffffff'],
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, this._textStyle);
        buttonText.x = (this._button.width - buttonText.width)/2;
        buttonText.y = (this._button.height - buttonText.height)/2;
        this._button.addChild(buttonText);

        if (clickCallback) {
			this.addListener('pointertap', this.pointerTabHandler, this);
		}
	}

    private pointerTabHandler():void {
		this._clickCallback();
	}
}
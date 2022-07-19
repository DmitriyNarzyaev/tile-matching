var Container = PIXI.Container;
export default class Button extends Container {
    constructor(buttonName, clickCallback = null) {
        super();
        this._buttonWidth = 160;
        this._buttonHeight = 40;
        this._buttonRadius = 8;
        this._clickCallback = clickCallback;
        this.buttonName = buttonName;
        this.interactive = true;
        this.buttonMode = true;
        this._button = new PIXI.Graphics;
        this._button
            .beginFill(0x223841)
            .drawRoundedRect(0, 0, this._buttonWidth, this._buttonHeight, this._buttonRadius);
        this.addChild(this._button);
        this._textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#ffffff'],
        });
        const buttonText = new PIXI.Text(buttonName, this._textStyle);
        buttonText.x = (this._button.width - buttonText.width) / 2;
        buttonText.y = (this._button.height - buttonText.height) / 2;
        this._button.addChild(buttonText);
        if (clickCallback) {
            this.addListener('pointertap', this.pointerTabHandler, this);
        }
    }
    pointerTabHandler() {
        this._clickCallback();
    }
}
//# sourceMappingURL=Button.js.map
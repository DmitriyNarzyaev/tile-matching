import Container = PIXI.Container;
import { Loader } from "pixi.js";
import Button from "./Button";

export default class MainContainer extends Container {
	public static WIDTH:number = 400;
	public static HEIGHT:number = 560;
	private _panelHeight:number = 0;
	private _panelY:number = 0;
	private _startTitleContainer:PIXI.Container;
	private _gameContainer:PIXI.Container;
	private _namePuzzles:string[] = [
		"clover", "cup", "diamond", "heart"
	];

	constructor() {
		super();
		
		this._startTitleContainer = new PIXI.Container;
		this.addChild(this._startTitleContainer);

		this._gameContainer = new PIXI.Container;
		this.addChild(this._gameContainer);

		this.pictureLoader();
	}

	private pictureLoader():void {
		const loader:Loader = new Loader();
		//loader.add("zombie", "zombie.png");
		loader.add("clover", "clover.png");
		loader.add("cup", "cup.png");
		loader.add("diamond", "diamond.png");
		loader.add("heart", "heart.png");
		loader.load((loader, resources)=> {
			this.initTitle();
			this.initButton();
		});
		loader.load();
	}

	private initTitle():void {
		this.initPanel(MainContainer.HEIGHT, 0x111111, this._panelY, this._startTitleContainer);
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

	private removeTitle():void {
		this.removeChild(this._startTitleContainer);
	}
	
	private startGame():void {
		this.initHeaderPaner();
		this.initBodyPaner();
		this.initFooterPaner();
		this.initPuzzles();
	}

	private initHeaderPaner():void {
		this._panelHeight = MainContainer.HEIGHT/10;
		this.initPanel(this._panelHeight, 0xC09883, this._panelY, this._gameContainer);
	}

	private initBodyPaner():void {
		this._panelY += MainContainer.HEIGHT/10;
		this._panelHeight = (MainContainer.HEIGHT/10)*8;
		this.initPanel(this._panelHeight, 0x2C1D1F, this._panelY, this._gameContainer);
	}

	private initFooterPaner():void {
		this._panelY += (MainContainer.HEIGHT/10)*8;
		this._panelHeight = MainContainer.HEIGHT/10;
		this.initPanel(this._panelHeight, 0x654445, this._panelY, this._gameContainer);
	}

	private initPanel(panelHeight:number, panelColor:number, panelY:number, container:PIXI.Container):void {
		let panel:PIXI.Graphics = new PIXI.Graphics;
		panel
			.beginFill(panelColor)
			.drawRect(0, 0, MainContainer.WIDTH, panelHeight);
		container.addChild(panel);
		panel.y = panelY
	}

	private initPuzzles() {
		let puzzleX:number = 0;
		let puzzleY:number = MainContainer.HEIGHT/10;
		for (let puzzleIterator:number = 0; puzzleIterator<72; puzzleIterator++) {
			let puzzleRandomizer = Math.floor(Math.random()*4);
			//console.log("******* " + puzzleRandomizer);
			let puzzle:PIXI.Sprite = PIXI.Sprite.from(this._namePuzzles[puzzleRandomizer]);
			puzzle.width = 50;
			puzzle.height = 50;
			puzzle.x = puzzleX;
			puzzle.y = puzzleY;
			this._gameContainer.addChild(puzzle);
			puzzleX += puzzle.width;

			if ((puzzleIterator + 1) % 8 == 0) {
				puzzleX = 0;
				puzzleY += puzzle.height;
			}
		}
	}
}

import Container = PIXI.Container;
import { Loader } from "pixi.js";
import Button from "./Button";
import HeaderPanel from "./HeaderPanel";
import BodyPanel from "./BodyPanel";
import FooterPanel from "./footerPanel";
import StartTitlePanel from "./StartTitlePanel";

export default class MainContainer extends Container {
	public static WIDTH:number = 400;
	public static HEIGHT:number = 600;
	private _startTitleContainer:PIXI.Container;
	private _gameContainer:PIXI.Container;
	private _startTitlePanel:StartTitlePanel
	private _headerPanel:HeaderPanel;
	private _bodyPanel:BodyPanel;
	private _footerPanel:FooterPanel;
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
		});
		loader.load();
	}

	private initTitle():void {
		const buttonY:number = 200;

		this._startTitlePanel = new StartTitlePanel;
		this._startTitleContainer.addChild(this._startTitlePanel);

		let button:Button = new Button(
			"START",
			() => {this.buttonClickFunctions();},
		);
		button.x = (MainContainer.WIDTH - button.width)/2
		button.y = buttonY;
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
		this._headerPanel = new HeaderPanel;
		this._gameContainer.addChild(this._headerPanel);
	}

	private initBodyPaner():void {
		this._bodyPanel = new BodyPanel;
		this._bodyPanel.y = this._headerPanel.height;
		this._gameContainer.addChild(this._bodyPanel);
	}

	private initFooterPaner():void {
		this._footerPanel = new FooterPanel;
		this._footerPanel.y = this._bodyPanel.y + this._bodyPanel.height;
		this._gameContainer.addChild(this._footerPanel);
	}

	private initPuzzles() {
		let puzzleX:number = 0;
		let puzzleY:number = 0;
		for (let puzzleIterator:number = 0; puzzleIterator<80; puzzleIterator++) {
			let puzzleRandomizer = Math.floor(Math.random()*4);
			//console.log("******* " + puzzleRandomizer);
			let puzzle:PIXI.Sprite = PIXI.Sprite.from(this._namePuzzles[puzzleRandomizer]);
			puzzle.width = 50;
			puzzle.height = 50;
			puzzle.x = puzzleX;
			puzzle.y = puzzleY;
			this._bodyPanel.addChild(puzzle);
			puzzleX += puzzle.width;

			if ((puzzleIterator + 1) % 8 == 0) {
				puzzleX = 0;
				puzzleY += puzzle.height;
			}
		}
	}
}

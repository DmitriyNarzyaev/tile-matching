import Container = PIXI.Container;
import { Loader } from "pixi.js";
import Button from "./Button";
import HeaderPanel from "./HeaderPanel";
import BodyPanel from "./BodyPanel";
import FooterPanel from "./footerPanel";
import StartTitlePanel from "./StartTitlePanel";
import Puzzle from "./Puzzle";

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
	private _puzzles:Puzzle[] = [];

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
		loader.add("clover", "clover.png");
		loader.add("cup", "cup.png");
		loader.add("diamond", "diamond.png");
		loader.add("heart", "heart.png");
		loader.load((loader, resources)=> {
			this.initTitle();
		});
		loader.load();
	}

	//заставка
	private initTitle():void {
		const buttonY:number = 400;

		this._startTitlePanel = new StartTitlePanel;
		this._startTitleContainer.addChild(this._startTitlePanel);

		let startGameButton:Button = new Button(
			"START",
			() => {this.buttonClickFunctions();},
		);
		startGameButton.x = (MainContainer.WIDTH - startGameButton.width)/2
		startGameButton.y = buttonY;
		this._startTitleContainer.addChild(startGameButton);
	}

	private buttonClickFunctions():void {
		console.log("click");
		this.removeAll();
		this.startGame();
	}

	private removeAll():void {
		this.removeChild(this._startTitleContainer);
		//Global.PIXI_APP.ticker.remove(this.ticker, this);
	}
	
	private startGame():void {
		this.initHeaderPaner();
		this.initBodyPaner();
		this.initFooterPaner();
		this.initPuzzles();
		//Global.PIXI_APP.ticker.add(this.ticker, this);
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
		let puzzleX:number = 25;
		let puzzleY:number = 25;
		let numberOfPussles:number = 80;
		let puzzlesOnLine:number = 8;

		for (let puzzleIterator:number = 0; puzzleIterator<numberOfPussles; puzzleIterator++) {
			let puzzleRandomizer = Math.floor(Math.random()*4);
			// let puzzle:PIXI.Sprite = PIXI.Sprite.from(this._namePuzzles[puzzleRandomizer]);
			// puzzle.width = 50;
			// puzzle.height = 50;
			// puzzle.x = puzzleX;
			// puzzle.y = puzzleY;
			// puzzle.anchor.set(.5, .5);
			// puzzle.interactive = true;
			// puzzle.buttonMode = true;
			// this._bodyPanel.addChild(puzzle);
			// this._puzzles.push(puzzle);
			// puzzleX += puzzle.width;
			let puzzle:Puzzle = new Puzzle(this._namePuzzles[puzzleRandomizer]);
			puzzle.x = puzzleX;
			puzzle.y = puzzleY;
			puzzle.interactive = true;
			puzzle.buttonMode = true;
			this._bodyPanel.addChild(puzzle);
			this._puzzles.push(puzzle);
			puzzleX += puzzle.width;


			if ((puzzleIterator + 1) % puzzlesOnLine == 0) {
				puzzleX = 25;
				puzzleY += puzzle.height;
			}

			puzzle.addListener("mouseover", () => {this.mouseOverHandler(puzzle);});

			puzzle.addListener("mouseout", 
				() => {this.mouseOutHandler(puzzle);
				},
			);

			puzzle.addListener("pointertap", this.pointerTapHandler, this);
		}
	}

	private mouseOverHandler(puzzle:Puzzle):void {
		console.log("mouse over");
		puzzle.puzzleSprite.tint = (0x888888);
	}

	private mouseOutHandler(puzzle:Puzzle):void {
		console.log("mouse out");
		puzzle.puzzleSprite.tint = (0xffffff);
	}

	private pointerTapHandler():void {
		console.log("pointer tap");
	}

	// private ticker():void {

	// }
}

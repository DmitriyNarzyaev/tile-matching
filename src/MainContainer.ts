import Container = PIXI.Container;
import { Loader } from "pixi.js";
import Button from "./Button";
import HeaderPanel from "./HeaderPanel";
import BodyPanel from "./BodyPanel";
import FooterPanel from "./footerPanel";
import StartTitlePanel from "./StartTitlePanel";
import Puzzle from "./Puzzle";
import Global from "./Global";

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
	private _scaleIterator:number = 0;
	private _gems:number[][] = []
	private _kolonka:number = 10;
	private _stroka:number = 8;
	private _puzzleContainer:PIXI.Container;

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
		Global.PIXI_APP.ticker.remove(this.ticker, this);
	}
	
	private startGame():void {
		this.initHeaderPaner();
		this.initBodyPaner();
		this.initFooterPaner();
		this.createGrid();
		Global.PIXI_APP.ticker.add(this.ticker, this);
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

	private createGrid():void {
		// Создание пустой сетки
		for(let i = 0; i < this._kolonka; i++) {
			let array:number[] = [];
			this._gems.push(array);
			for(let j = 0; j < this._stroka; j++) {
				array.push(0);
				do{
					let randomizer = Math.floor(Math.random()*4);
					array[array.length-1] = randomizer;
				} while (this.isStreak(i, j));
			}
		}
		console.log(this._gems);

		this._puzzleContainer = new PIXI.Container;
		this.addChild(this._puzzleContainer);
		this._puzzleContainer.x = 25;								//FIXME: magic number
		this._puzzleContainer.y = this._headerPanel.height + 25;	//FIXME: magic number

		let puzzleX:number = 0;
		let puzzleY:number = 0;
		let puzzleHeight = 0;
		for(let i = 0; i < this._gems.length; i++) {
			this._gems[i].forEach(puzzleNameNumber => {
				let puzzle:Puzzle = new Puzzle(this._namePuzzles[puzzleNameNumber]);
				puzzle.x = puzzleX;
				puzzle.y = puzzleY;
				puzzleX += puzzle.width;
				puzzle.interactive = true;
				puzzle.buttonMode = true;
				this._puzzles.push(puzzle);
				this._puzzleContainer.addChild(puzzle);
				if (puzzleHeight <= 1) {
					puzzleHeight = puzzle.height;
				}
				puzzle.addListener("mouseover", () => {this.mouseOverHandler(puzzle);});
				puzzle.addListener("mouseout", 	() => {this.mouseOutHandler(puzzle);},);
				puzzle.addListener("pointertap", this.pointerTapHandler, this);
			});
			puzzleX = 0;
			puzzleY += puzzleHeight;
		}
	}

	private isStreak(row:number, col:number) {
		return this.isVerticalStreak(row, col) || this.isHorizontalStreak(row, col);
	}

	// Проверка на группу сбора по колонкам
	private isVerticalStreak(row:number, col:number) {
		let gemValue = this._gems[row][col];
		let streak = 0;
		let tmp = row;

		while(tmp > 0 && this._gems[tmp - 1][col] == gemValue){
			streak++;
			tmp--;
		}

		tmp = row;

		while((tmp < this._kolonka - 1) && (this._gems[tmp + 1] != undefined && this._gems[tmp + 1][col] == gemValue)){
			streak++;
			tmp++;
		}

		return streak > 1;
	}

	//Проверка на группу сбора по строкам
	private isHorizontalStreak(row:number, col:number) {
		let gemValue = this._gems[row][col];
		let streak = 0;
		let tmp = col;

		while(tmp > 0 && this._gems[row][tmp - 1] == gemValue){
			streak++;
			tmp--;
		}

		tmp = col;

		while(tmp < this._stroka && this._gems[row][tmp + 1] == gemValue){
			streak++;
			tmp++;
		}
	
		return streak > 1;
	}

	private mouseOverHandler(puzzle:Puzzle):void {
		puzzle.puzzleSprite.tint = (0xaaaaaa);
		puzzle.mouseHovering = true;
	}

	private mouseOutHandler(puzzle:Puzzle):void {
		puzzle.puzzleSprite.tint = (0xffffff);
		puzzle.mouseHovering = false;
		puzzle.puzzleSprite.scale.x = 1;
		puzzle.puzzleSprite.scale.y = 1;
		this._scaleIterator = 0;
	}

	private pointerTapHandler():void {
		
	}

	private ticker():void {
		this._puzzles.forEach((puzzle) => {
			this._scaleIterator += 1;
			if (puzzle.mouseHovering == true) {
				const scale = 1 + Math.cos(this._scaleIterator/800)/30;
				puzzle.puzzleSprite.scale.x = scale;
				puzzle.puzzleSprite.scale.y = scale;
			}
		});
	}
}

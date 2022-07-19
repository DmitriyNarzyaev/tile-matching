import Container = PIXI.Container;
import { InteractionEvent, Loader } from "pixi.js";
import Button from "./Button";
import HeaderPanel from "./HeaderPanel";
import BodyPanel from "./BodyPanel";
import FooterPanel from "./footerPanel";
import StartTitlePanel from "./StartTitlePanel";
import Puzzle from "./Puzzle";
import Global from "./Global";
import { join } from "path";

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
	//private _scaleIterator:number = 0;
	private _puzzleNumbers:number[][] = [];
	private _linesNumber:number = 10;
	private _columnsNumber:number = 8;
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
		this.removeAll();
		this.startGame();
	}

	private removeAll():void {
		this.removeChild(this._startTitleContainer);
		this.removeChild(this._puzzleContainer);
		this._puzzles = [];									//!!!!!!!!!!!FIXME не обновляется массив
	}
	
	private startGame():void {
		this.initHeaderPaner();
		this.initBodyPaner();
		this.initFooterPaner();
		this.createGrid();
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

	private createGrid():void {
		// Создание пустой сетки
		for(let i = 0; i < this._linesNumber; i++) {
			let array:number[] = [];
			this._puzzleNumbers.push(array);
			for(let j = 0; j < this._columnsNumber; j++) {
				array.push(0);
				do{
					let randomizer = Math.floor(Math.random()*4);
					array[array.length-1] = randomizer;
				} while (this.isStreak(i, j));
			}
		}
	}

	private initPuzzles():void {
		this._puzzleContainer = new PIXI.Container;
		this.addChild(this._puzzleContainer);
		this._puzzleContainer.x = 25;								//FIXME: magic number
		this._puzzleContainer.y = this._headerPanel.height + 25;	//FIXME: magic number
		let puzzleHeight = 0;
		let iterator:number = 0;
		for(let i = 0; i < this._puzzleNumbers.length; i++) {
			this._puzzleNumbers[i].forEach(puzzleNameNumber => {
				let puzzle:Puzzle = new Puzzle(this._namePuzzles[puzzleNameNumber]);
				puzzle.columnIndex = iterator;
				puzzle.lineIndex = i;
				puzzle.puzzleX = 50 * puzzle.columnIndex;
				puzzle.puzzleY = 50 * puzzle.lineIndex;
				puzzle.x = puzzle.puzzleX;
				puzzle.y = puzzle.puzzleY;
				iterator++;
				puzzle.interactive = true;
				puzzle.buttonMode = true;
				this._puzzles.push(puzzle);
				this._puzzleContainer.addChild(puzzle);
				if (puzzleHeight <= 1) {
					puzzleHeight = puzzle.height;
				}
				// puzzle.addListener("mouseover", () => {this.mouseOverHandler(puzzle);});
				// puzzle.addListener("mouseout", 	() => {this.mouseOutHandler(puzzle);},);
				puzzle.addListener("pointertap", () => {this.pointerTapHandler(puzzle);},);
			});
			iterator = 0;
		}
	}

	private isStreak(row:number, col:number) {
		return this.isVerticalStreak(row, col) || this.isHorizontalStreak(row, col);
	}

	// Проверка на группу сбора по колонкам
	private isVerticalStreak(row:number, col:number) {
		let gemValue = this._puzzleNumbers[row][col];
		let streak = 0;
		let tmp = row;

		while(tmp > 0 && this._puzzleNumbers[tmp - 1][col] == gemValue){
			streak++;
			tmp--;
		}

		tmp = row;

		while((tmp < this._linesNumber - 1) && (this._puzzleNumbers[tmp + 1] != undefined && this._puzzleNumbers[tmp + 1][col] == gemValue)){
			streak++;
			tmp++;
		}

		return streak > 1;
	}

	//Проверка на группу сбора по строкам
	private isHorizontalStreak(row:number, col:number) {
		let gemValue = this._puzzleNumbers[row][col];
		let streak = 0;
		let tmp = col;

		while(tmp > 0 && this._puzzleNumbers[row][tmp - 1] == gemValue){
			streak++;
			tmp--;
		}

		tmp = col;

		while(tmp < this._columnsNumber && this._puzzleNumbers[row][tmp + 1] == gemValue){
			streak++;
			tmp++;
		}
	
		return streak > 1;
	}

	// private mouseOverHandler(puzzle:Puzzle):void {
	// 	puzzle.mouseHovering = true;
	// }

	// private mouseOutHandler(puzzle:Puzzle):void {
	// 	puzzle.mouseHovering = false;
	// 	puzzle.puzzleSprite.scale.x = 1;
	// 	puzzle.puzzleSprite.scale.y = 1;
	// 	this._scaleIterator = 0;
	// }

	private firstLineIndex:number = null;
	private firstColumnIndex:number = null;
	private secondLineIndex:number = null;
	private secondColumnIndex:number = null;
	private pointerTapHandler(puzzle:Puzzle):void {
		if (this.firstLineIndex == null && this.firstColumnIndex == null) {
			this.firstLineIndex = puzzle.lineIndex;
			this.firstColumnIndex = puzzle.columnIndex;
			puzzle.puzzleSprite.tint = (0xaaaaaa);
		} else if (this.firstLineIndex != null && this.firstColumnIndex != null) {
			this.secondLineIndex = puzzle.lineIndex;
			this.secondColumnIndex = puzzle.columnIndex;
			let difference1:number = Math.abs(this.secondLineIndex - this.firstLineIndex);
			let difference2:number = Math.abs(this.secondColumnIndex - this.firstColumnIndex);

			if ((difference1 == 1 && difference2 == 0)) {
				let tempIndex1:number = this._puzzleNumbers[this.firstLineIndex][this.firstColumnIndex];
				puzzle.puzzleSprite.tint = (0xaaaaaa);
				this._puzzleNumbers[this.firstLineIndex][this.firstColumnIndex]
					= this._puzzleNumbers[this.secondLineIndex][this.secondColumnIndex];
				this._puzzleNumbers[this.secondLineIndex][this.secondColumnIndex]
					= tempIndex1;
				this.firstLineIndex = null;
				this.firstColumnIndex = null;
				this.secondLineIndex = null;
				this.secondColumnIndex = null;
				this.removeAll();
				this.initPuzzles();
			}

			if ((difference1 == 0 && difference2 == 1)) {
				let tempIndex1:number = this._puzzleNumbers[this.firstLineIndex][this.firstColumnIndex];
				puzzle.puzzleSprite.tint = (0xaaaaaa);
				this._puzzleNumbers[this.firstLineIndex][this.firstColumnIndex]
					= this._puzzleNumbers[this.secondLineIndex][this.secondColumnIndex];
				this._puzzleNumbers[this.secondLineIndex][this.secondColumnIndex]
					= tempIndex1;
				this.firstLineIndex = null;
				this.firstColumnIndex = null;
				this.secondLineIndex = null;
				this.secondColumnIndex = null;
				this.removeAll();
				this.initPuzzles();
			}
		}

		this.removeGems();
	}

	//удаление пазлов
	private removeGems():void {
		//удаление в строках
		for (let i:number = 0; i<this._linesNumber; i++) {
			this._puzzleNumbers[i].forEach((puzzle, index) => {
				if (puzzle == this._puzzleNumbers[i][index + 1] && puzzle == this._puzzleNumbers[i][index + 2]) {
					this._puzzles[index + (i * this._columnsNumber)].toDelete = true;
					this._puzzles[(index + 1) + (i*this._columnsNumber)].toDelete = true;
					this._puzzles[(index + 2) + (i*this._columnsNumber)].toDelete = true;
				}
			});
		}

		//удаление в колонках
		for (let i:number = 0; i<this._columnsNumber; i++) {
			this._puzzleNumbers[i].forEach((puzzle, index) => {
				if (puzzle == this._puzzleNumbers[i+1][index] && puzzle == this._puzzleNumbers[i+2][index]) {
					this._puzzles[index + this._columnsNumber*i].toDelete = true;
					this._puzzles[index + this._columnsNumber*(i+1)].toDelete = true;
					this._puzzles[index + this._columnsNumber*(i+2)].toDelete = true;
				}
			});
		}
		
		this._puzzles.forEach(puzzle => {
			if (puzzle.toDelete == true) {
				this._puzzleContainer.removeChild(puzzle);
			}
		});
	}

	// private ticker():void {
	// 	this._puzzles.forEach((puzzle) => {
	// 		this._scaleIterator += 1;
	// 		if (puzzle.mouseHovering == true) {
	// 			const scale = 1 + Math.cos(this._scaleIterator/800)/30;
	// 			puzzle.puzzleSprite.scale.x = scale;
	// 			puzzle.puzzleSprite.scale.y = scale;
	// 		}
	// 	});
	// }
}

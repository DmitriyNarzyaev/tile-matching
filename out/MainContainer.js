var Container = PIXI.Container;
import { Loader } from "pixi.js";
import Button from "./Button";
import HeaderPanel from "./HeaderPanel";
import BodyPanel from "./BodyPanel";
import FooterPanel from "./footerPanel";
import StartTitlePanel from "./StartTitlePanel";
import Puzzle from "./Puzzle";
export default class MainContainer extends Container {
    constructor() {
        super();
        this._namePuzzles = [
            "clover", "cup", "diamond", "heart"
        ];
        this._puzzles = [];
        //private _scaleIterator:number = 0;
        this._pussleNumbers = [];
        this._linesNumber = 10;
        this._columnsNumber = 8;
        // private mouseOverHandler(puzzle:Puzzle):void {
        // 	puzzle.mouseHovering = true;
        // }
        // private mouseOutHandler(puzzle:Puzzle):void {
        // 	puzzle.mouseHovering = false;
        // 	puzzle.puzzleSprite.scale.x = 1;
        // 	puzzle.puzzleSprite.scale.y = 1;
        // 	this._scaleIterator = 0;
        // }
        this.firstLineIndex = null;
        this.firstColumnIndex = null;
        this.secondLineIndex = null;
        this.secondColumnIndex = null;
        this._startTitleContainer = new PIXI.Container;
        this.addChild(this._startTitleContainer);
        this._gameContainer = new PIXI.Container;
        this.addChild(this._gameContainer);
        this.pictureLoader();
    }
    pictureLoader() {
        const loader = new Loader();
        loader.add("clover", "clover.png");
        loader.add("cup", "cup.png");
        loader.add("diamond", "diamond.png");
        loader.add("heart", "heart.png");
        loader.load((loader, resources) => {
            this.initTitle();
        });
        loader.load();
    }
    //заставка
    initTitle() {
        const buttonY = 400;
        this._startTitlePanel = new StartTitlePanel;
        this._startTitleContainer.addChild(this._startTitlePanel);
        let startGameButton = new Button("START", () => { this.buttonClickFunctions(); });
        startGameButton.x = (MainContainer.WIDTH - startGameButton.width) / 2;
        startGameButton.y = buttonY;
        this._startTitleContainer.addChild(startGameButton);
    }
    buttonClickFunctions() {
        this.removeAll();
        this.startGame();
    }
    removeAll() {
        this.removeChild(this._startTitleContainer);
        this.removeChild(this._puzzleContainer);
        this._puzzles = []; //!!!!!!!!!!!FIXME не обновляется массив
    }
    startGame() {
        this.initHeaderPaner();
        this.initBodyPaner();
        this.initFooterPaner();
        this.createGrid();
        this.initPuzzles();
        //Global.PIXI_APP.ticker.add(this.ticker, this);
    }
    initHeaderPaner() {
        this._headerPanel = new HeaderPanel;
        this._gameContainer.addChild(this._headerPanel);
    }
    initBodyPaner() {
        this._bodyPanel = new BodyPanel;
        this._bodyPanel.y = this._headerPanel.height;
        this._gameContainer.addChild(this._bodyPanel);
    }
    initFooterPaner() {
        this._footerPanel = new FooterPanel;
        this._footerPanel.y = this._bodyPanel.y + this._bodyPanel.height;
        this._gameContainer.addChild(this._footerPanel);
    }
    createGrid() {
        // Создание пустой сетки
        for (let i = 0; i < this._linesNumber; i++) {
            let array = [];
            this._pussleNumbers.push(array);
            for (let j = 0; j < this._columnsNumber; j++) {
                array.push(0);
                do {
                    let randomizer = Math.floor(Math.random() * 4);
                    array[array.length - 1] = randomizer;
                } while (this.isStreak(i, j));
            }
        }
    }
    initPuzzles() {
        this._puzzleContainer = new PIXI.Container;
        this.addChild(this._puzzleContainer);
        this._puzzleContainer.x = 25; //FIXME: magic number
        this._puzzleContainer.y = this._headerPanel.height + 25; //FIXME: magic number
        let puzzleHeight = 0;
        let iterator = 0;
        for (let i = 0; i < this._pussleNumbers.length; i++) {
            this._pussleNumbers[i].forEach(puzzleNameNumber => {
                let puzzle = new Puzzle(this._namePuzzles[puzzleNameNumber]);
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
                puzzle.addListener("pointertap", () => { this.pointerTapHandler(puzzle); });
            });
            iterator = 0;
        }
    }
    isStreak(row, col) {
        return this.isVerticalStreak(row, col) || this.isHorizontalStreak(row, col);
    }
    // Проверка на группу сбора по колонкам
    isVerticalStreak(row, col) {
        let gemValue = this._pussleNumbers[row][col];
        let streak = 0;
        let tmp = row;
        while (tmp > 0 && this._pussleNumbers[tmp - 1][col] == gemValue) {
            streak++;
            tmp--;
        }
        tmp = row;
        while ((tmp < this._linesNumber - 1) && (this._pussleNumbers[tmp + 1] != undefined && this._pussleNumbers[tmp + 1][col] == gemValue)) {
            streak++;
            tmp++;
        }
        return streak > 1;
    }
    //Проверка на группу сбора по строкам
    isHorizontalStreak(row, col) {
        let gemValue = this._pussleNumbers[row][col];
        let streak = 0;
        let tmp = col;
        while (tmp > 0 && this._pussleNumbers[row][tmp - 1] == gemValue) {
            streak++;
            tmp--;
        }
        tmp = col;
        while (tmp < this._columnsNumber && this._pussleNumbers[row][tmp + 1] == gemValue) {
            streak++;
            tmp++;
        }
        return streak > 1;
    }
    pointerTapHandler(puzzle) {
        if (this.firstLineIndex == null && this.firstColumnIndex == null) {
            this.firstLineIndex = puzzle.lineIndex;
            this.firstColumnIndex = puzzle.columnIndex;
            puzzle.puzzleSprite.tint = (0xaaaaaa);
        }
        else if (this.firstLineIndex != null && this.firstColumnIndex != null) {
            this.secondLineIndex = puzzle.lineIndex;
            this.secondColumnIndex = puzzle.columnIndex;
            let difference1 = Math.abs(this.secondLineIndex - this.firstLineIndex);
            let difference2 = Math.abs(this.secondColumnIndex - this.firstColumnIndex);
            if ((difference1 == 1 && difference2 == 0)) {
                let tempIndex1 = this._pussleNumbers[this.firstLineIndex][this.firstColumnIndex];
                puzzle.puzzleSprite.tint = (0xaaaaaa);
                this._pussleNumbers[this.firstLineIndex][this.firstColumnIndex]
                    = this._pussleNumbers[this.secondLineIndex][this.secondColumnIndex];
                this._pussleNumbers[this.secondLineIndex][this.secondColumnIndex]
                    = tempIndex1;
                this.firstLineIndex = null;
                this.firstColumnIndex = null;
                this.secondLineIndex = null;
                this.secondColumnIndex = null;
                this.removeAll();
                this.initPuzzles();
            }
            if ((difference1 == 0 && difference2 == 1)) {
                let tempIndex1 = this._pussleNumbers[this.firstLineIndex][this.firstColumnIndex];
                puzzle.puzzleSprite.tint = (0xaaaaaa);
                this._pussleNumbers[this.firstLineIndex][this.firstColumnIndex]
                    = this._pussleNumbers[this.secondLineIndex][this.secondColumnIndex];
                this._pussleNumbers[this.secondLineIndex][this.secondColumnIndex]
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
    removeGems() {
        for (let i = 0; i < this._pussleNumbers.length; i++) {
            this._pussleNumbers[i].forEach((puzzle, index) => {
                if (puzzle == this._pussleNumbers[i][index + 1] && puzzle == this._pussleNumbers[i][index + 2]) {
                    console.log(this._puzzles[index].lineIndex);
                    this._puzzles[index * i].toDelete = true;
                    // this._puzzles[index+1].toDelete = true;
                    // this._puzzles[index+2].toDelete = true;
                }
            });
        }
        this._puzzles.forEach(puzzle => {
            if (puzzle.toDelete == true) {
                this._puzzleContainer.removeChild(puzzle);
            }
        });
    }
}
MainContainer.WIDTH = 400;
MainContainer.HEIGHT = 600;
//# sourceMappingURL=MainContainer.js.map
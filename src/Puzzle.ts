import Container = PIXI.Container;

export default class Puzzle extends Container {
	private puzzleWidth:number = 50;
	private puzzleHeight:number = 50;
	public puzzleSprite:PIXI.Sprite;

	constructor(puzzleName:string) {
		super();
        this.puzzleSprite = PIXI.Sprite.from(puzzleName);
		this.puzzleSprite.width = this.puzzleWidth;
		this.puzzleSprite.height = this.puzzleHeight;
		this.puzzleSprite.anchor.set(.5, .5);
		this.addChild(this.puzzleSprite);
	}
}

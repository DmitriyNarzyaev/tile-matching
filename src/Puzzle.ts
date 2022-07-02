import Container = PIXI.Container;

export default class Puzzle extends Container {
	public puzzleSprite:PIXI.Sprite;
	public mouseHovering:boolean;

	constructor(puzzleName:string, row:number, column:number) {
		super();
        this.puzzleSprite = PIXI.Sprite.from(puzzleName);
		this.puzzleSprite.anchor.set(.5, .5);
		this.addChild(this.puzzleSprite);
	}
}

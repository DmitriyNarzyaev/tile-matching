import Container = PIXI.Container;

export default class Puzzle extends Container {
	public puzzleSprite:PIXI.Sprite;
	public mouseHovering:boolean;
	public lineIndex:number;
	public columnIndex:number;

	public toDelete:boolean = false;
	public pName:string = "";

	constructor(puzzleName:string) {
		super();
        this.puzzleSprite = PIXI.Sprite.from(puzzleName);
		this.puzzleSprite.anchor.set(.5, .5);
		this.addChild(this.puzzleSprite);
		this.pName = puzzleName;
	}
}

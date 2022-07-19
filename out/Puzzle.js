var Container = PIXI.Container;
export default class Puzzle extends Container {
    constructor(puzzleName) {
        super();
        this.puzzleX = 0;
        this.puzzleY = 0;
        this.toDelete = false;
        this.pName = "";
        this.puzzleSprite = PIXI.Sprite.from(puzzleName);
        this.puzzleSprite.anchor.set(.5, .5);
        this.addChild(this.puzzleSprite);
        this.pName = puzzleName;
    }
}
//# sourceMappingURL=Puzzle.js.map
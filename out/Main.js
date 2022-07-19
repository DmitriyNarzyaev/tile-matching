var Container = PIXI.Container;
import MainContainer from "./MainContainer";
import Global from "./Global";
export class Main extends Container {
    constructor(canvasId) {
        super();
        this.initPixiApp(canvasId);
        this.initMainContainer();
    }
    initPixiApp(canvasId) {
        Global.PIXI_APP = new PIXI.Application({
            backgroundColor: 0x000000,
            view: document.getElementById(canvasId),
            antialias: true,
            // needed to avoid troubles with invisible fonts on some Android devices
            resolution: ((devicePixelRatio || 1) < 2) ? 1 : 2,
        });
        Global.PIXI_APP.stage.addChild(this);
        Global.PIXI_APP.renderer.view.style.width = MainContainer.WIDTH + "px";
        Global.PIXI_APP.renderer.view.style.height = MainContainer.HEIGHT + "px";
        Global.PIXI_APP.renderer.resize(MainContainer.WIDTH, MainContainer.HEIGHT);
    }
    initMainContainer() {
        this._mainContainer = new MainContainer();
        Global.PIXI_APP.stage.addChild(this._mainContainer);
    }
}
//# sourceMappingURL=Main.js.map
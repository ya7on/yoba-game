import { GLOBAL } from "./location";
import { Terrain } from "./terrain";

export class Scene {
    active: boolean = false;
    constructor() {
        GLOBAL.TERRAIN = new Terrain();
    }
    render() {
        GLOBAL.PLAYER.draw();
        GLOBAL.PLAYER._step();
        GLOBAL.PLAYER._listener();
        GLOBAL.TERRAIN.render();
    }
}
import { GLOBAL } from "./location";
import { Terrain } from "./terrain";

export class Scene {
    active: boolean = false;
    terrain: Terrain;
    constructor() {
        this.terrain = new Terrain();
    }
    render() {
        GLOBAL.PLAYER.draw(GLOBAL.CTX);
        this.terrain.render();
    }
}
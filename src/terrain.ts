// import { Terrain_Type } from "./storage";
import { CanvasObj, LevelJSON } from "./storage";
import json from '../level_models/one.json';
import { GLOBAL } from './location';

export class Terrain {
    data: LevelJSON
    constructor() {
        this.data = json;
    }

    render() {
        GLOBAL.CTX.fillStyle = 'green';
        for (let platform of this.data.platforms) {
            GLOBAL.CTX.fillRect(platform.x, platform.y, platform.width, platform.height);
        }
    }
}
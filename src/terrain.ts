// import { Terrain_Type } from "./storage";
import { CanvasObj, LevelJSON } from "./storage";
import json from '../level_models/one.json';
import { GLOBAL } from './location';

export class Terrain {
    data: LevelJSON;
    floors: Floor[] = [];
    constructor() {
        this.data = json;
        for (let item of this.data.floors) {
            let floor = new Floor(item);
            this.floors.push(floor);
        }
        console.log(this.floors);
    }

    render() {
        GLOBAL.CTX.fillStyle = 'green';
        for (let floor of this.floors) {
            GLOBAL.CTX.fillRect(floor.x, floor.y, floor.width, floor.height);
        }
    }
}

// =======
// import { Terrain_Type } from "./storage";

// class Terrain {
//     x:number;
//     y:number;
//     width:number;
//     height:number;

//     constructor(options:Terrain_Type) {
//         this.width = options.width ? options.width : 1;
//         this.height = options.height ? options.height : 1;
//     }
// }

class Floor {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(options: CanvasObj) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
    }
}

//     draw() {
//         console.log('draw');
// >>>>>>> behindloader
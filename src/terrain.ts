import { Terrain_Type } from "./storage";

class Terrain {
    x:number;
    y:number;
    width:number;
    height:number;

    constructor(options:Terrain_Type) {
        this.width = options.width ? options.width : 1;
        this.height = options.height ? options.height : 1;
    }
}

export class Floor extends Terrain {
    constructor(options:Terrain_Type) {
        super(options);
    }

    draw() {
        console.log('draw');
    }
}
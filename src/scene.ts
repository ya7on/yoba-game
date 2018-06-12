import { GLOBAL } from "./location";
import { Character, Player } from "./characters"
import { Floor } from "./terrain";
import data from "../level_models/one.json";


export class Scene {
    active: boolean = false;
    constructor() {
        this.active = true;
        GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});
        GLOBAL.TERRAIN.push( new Floor({x: 0, y: 250, type: 'mario_block', width: 5, height: 3}) )
        GLOBAL.TERRAIN.push( new Floor({x: 400, y: 150, type: 'mario_block', height: 3}) )
        GLOBAL.TERRAIN.push( new Floor({x: 500, y: 250, type: 'mario_block', width: 5}) )
        for (let options of data.NPC) {
            let character: Character = new Character(options);
            GLOBAL.NPC.push(character);
        }
    }
    render() {
        GLOBAL.PLAYER.draw();
        GLOBAL.PLAYER._step();
        GLOBAL.PLAYER._listener();
        GLOBAL.PLAYER.collision.left = false;
        GLOBAL.PLAYER.collision.right = false;
        GLOBAL.PLAYER.collision.top = false;
        GLOBAL.PLAYER.collision.bottom = false;
        for (var OBJ of GLOBAL.TERRAIN) {
            OBJ.draw();
            OBJ.checkCollision(GLOBAL.PLAYER);
            for (let NPC of GLOBAL.NPC) {
                NPC.draw();
                OBJ.checkCollision(NPC);
                NPC._step();
            }
        }
    }
}
import { Player } from "./characters";
import { Floor, Terrain } from "./terrain";
import { TERRAINS } from "./storage";
import { Menu } from "./menu";

interface GlobalsType {
    /** Персонаж игрока */
    PLAYER: Player;

    /** Неигровые персонажи */
    NPC: Array<any>; // TODO

    /** Окружение */
    TERRAIN: Array<Terrain>;

    // /** Меню */
    MENU: Menu;

    /** Контекст */
    CTX: CanvasRenderingContext2D;

    /** Холст */
    CANVAS: HTMLCanvasElement;
}

export let GLOBAL:GlobalsType = {
    PLAYER: null,
    NPC: [],
    TERRAIN: [],
    // SCENE: null,
    MENU: null,
    CTX: null,
    CANVAS: null
}

GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});
GLOBAL.TERRAIN.push( new Floor({x: 0, y: 250, type: 'mario_block', width: 5, height: 3}) )
GLOBAL.TERRAIN.push( new Floor({x: 400, y: 150, type: 'mario_block', height: 3}) )
GLOBAL.TERRAIN.push( new Floor({x: 500, y: 250, type: 'mario_block', width: 5}) )

/** Класс загрузки локаций */
export class Location {
    constructor(location:string) {
        
    }
}
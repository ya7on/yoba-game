import { Player } from "./characters";
import { Scene } from "./scene";
import { Menu } from "./menu";
import { Terrain } from "./terrain"
// import { Floor } from "./terrain";

interface GlobalsType {
    /** Персонаж игрока */
    PLAYER: Player;

    /** Неигровые персонажи */
    NPC: Array<any>; // TODO

    /** Окружение */
    TERRAIN: Terrain;

    /** Сцена */
    SCENE: Scene;
    // TERRAIN: Array<any>;

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
    TERRAIN: null,
    SCENE: null,
    MENU: null,
    CTX: null,
    CANVAS: null
}


// GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});

// GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});
// GLOBAL.TERRAIN.push( new Floor({x: 50, y: 50}) )

/** Класс загрузки локаций */
export class Location {
    constructor(location:string) {
        
    }
}
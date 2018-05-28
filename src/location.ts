import { Player } from "./characters";
import { Scene } from "./scene";
import { Menu } from "./menu";
import { Terrain } from "./terrain"

interface GlobalsType {
    /** Персонаж игрока */
    PLAYER: Player;

    /** Неигровые персонажи */
    NPC: Array<any>; // TODO

    /** Окружение */
    TERRAIN: Terrain;

    /** Сцена */
    SCENE: Scene;

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

/** Класс загрузки локаций */
export class Location {
    constructor(location:string) {
        
    }
}
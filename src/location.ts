import { Player } from "./characters";

interface GlobalsType {
    /** Персонаж игрока */
    PLAYER: Player;

    /** Неигровые персонажи */
    NPC: Array<any>; // TODO

    /** Окружение */
    TERRAIN: Array<Terrain>;

    // /** Меню */
    // MENU: any;

    /** Контекст */
    CTX: CanvasRenderingContext2D;

    /** Холст */
    CANVAS: HTMLCanvasElement;
}

export let GLOBAL:GlobalsType = {
    PLAYER: null,
    NPC: [],
    TERRAIN: [],
    // MENU: null,
    CTX: null,
    CANVAS: null
}

GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});

/** Класс загрузки локаций */
export class Location {
    constructor(location:string) {
        
    }
}
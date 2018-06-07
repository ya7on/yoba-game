import { Player } from "./characters";
import { Terrain } from "./terrain";
import { Menu } from "./menu";
import { Scene } from "./scene"

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

    /** Сцена */
    SCENE: Scene;
}

export let GLOBAL: GlobalsType = {
    PLAYER: null,
    NPC: [],
    TERRAIN: [],
    SCENE: null,
    MENU: null,
    CTX: null,
    CANVAS: null
}

/** Класс загрузки локаций */
export class Location {
    constructor(location:string) {
        
    }
}
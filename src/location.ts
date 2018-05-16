import { Player } from "./characters"

interface GlobalsType {
    /** Персонаж игрока */
    PLAYER: Player;

    /** Неигровые персонажи */
    NPC: Array<any>; // TODO

    /** Окружение */
    TERRAIN: Array<Terrain>;
}

export let GLOBAL:GlobalsType = {
    PLAYER: null,
    NPC: [],
    TERRAIN: []
}

GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});

/** Класс загрузки локаций */
export class Location {
    constructor(location:string) {
        
    }
}
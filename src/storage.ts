/** Тип данных для char_type */
export interface Char_Types {
    [index: string]: Char_Type
}
/**  */
export interface Char_Type {
    /** hp */
    hp: number,
    /** Скорость */
    speed: number;
    /** Спрайт */
    sprite?: Sprite;
    /** Название */
    name: string;
}
/** Тип данных для объекта спрайтов */
export interface Sprites {
    [index: string]: Sprite;
}
/** Тип данных для спрайта */
export interface Sprite {
    // путь к спрайту
    url: string,
    // размеры изображения
    dWidth: number;
    dHeight: number;
    // левый верхний угол источника
    sx: number;
    sy: number;
    // размеры вырезаемого фрагмента
    sWidth: number;
    sHeight: number;
}

/**  */
export let SPRITES:Sprites = {
    'player': {
        url: 'media/sprites/test.png',
        dWidth: 70,
        dHeight: 70,
        sx: 0,
        sy: 0,
        sWidth: 70,
        sHeight: 70,
    }
}
/** Стандартные параметры объектов */
export let CHAR_TYPES:Char_Types = {
    'player': {
        name: 'player',
        hp: 100,
        speed: 10,
        sprite: SPRITES.player,
    },
}
import { CHAR_TYPES, Sprite, Char_Type } from "./storage";

/** Тип данных которые приходят в виде входного аргумента в класс Character */
interface CharacterOptions {
    // Начальные координаты
    x: number;
    y: number;
    // Тип персонажа
    type: string;
    // Путь к спрайту
    sprite?: Sprite;
}

/** Родительский приватный класс персонажей */
class Character {
    x: number;
    y: number;

    sprite: Sprite;
    type: Char_Type;

    hp: number;
    speed: number;

    image: HTMLImageElement;

    constructor(options:CharacterOptions) {
        this.type = CHAR_TYPES[options.type];

        this.x = options.x;
        this.y = options.y;

        this.sprite = options.sprite ? options.sprite : this.type.sprite;

        this.hp = this.type.hp;
        this.speed = this.type.speed;

        this.image = new Image();
        this.image.src = this.sprite.url;
    }

    draw(ctx:CanvasRenderingContext2D):void {
        ctx.drawImage(
            this.image,
            this.sprite.sx,
            this.sprite.sy,
            this.sprite.sWidth,
            this.sprite.sHeight,
            this.x,
            this.y,
            this.sprite.dWidth,
            this.sprite.dHeight
        );
    }
}

/** Класс ГГ */
export class Player extends Character {
    constructor(options:CharacterOptions) {
        super(options);
    }
}
import { CHAR_TYPES, Sprite, Sprite_Frame, Char_Type, CanvasObj } from "./storage";
import { GLOBAL } from "./location";

/** Тип данных которые приходят в виде входного аргумента в класс Character */
export interface CharacterOptions {
    // Начальные координаты
    x: number;
    y: number;
    // Тип персонажа
    type: string;
    // Путь к спрайту
    sprite?: Sprite;
}

/** Родительский приватный класс персонажей */
export class Character {
    x: number;
    y: number;

    sprite: Sprite;
    spriteFrame: Sprite_Frame;
    type: Char_Type;

    hp: number;
    speed: number;

    gravity:number = 0;
    /** Ускорение свободного падения */
    G:number = 0.2;
    /** Максимальное ускорение */
    MAX_GRAVITY:number = 7;

    image: HTMLImageElement;

    direction:string = 'right';

    // Анимация
    in_move:boolean = false;
    sprite_index:number = 0;
    anim_speed:number = 100;
    anim_index:number = 0;

    collision = {
        top: false,
        bottom: false,
        left: false,
        right : false
    }

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

    /** Отрисовка этого персонажа */
    draw():void {
        if (this.in_move) { // Если в движении
            this.spriteFrame = {
                dWidth: this.sprite.move[this.direction][this.sprite_index].dWidth,
                dHeight: this.sprite.move[this.direction][this.sprite_index].dHeight,
                sx: this.sprite.move[this.direction][this.sprite_index].sx,
                sy: this.sprite.move[this.direction][this.sprite_index].sy,
                sWidth: this.sprite.move[this.direction][this.sprite_index].sWidth,
                sHeight: this.sprite.move[this.direction][this.sprite_index].sHeight,
            };
            this.anim_index++;
            if (this.anim_index >= this.anim_speed) {
                this.sprite_index++;
            }
            if (this.sprite_index >= Object.keys(this.sprite.move[this.direction]).length-1) {
                this.sprite_index = 0;
            }
        } else {
            this.spriteFrame = {
                dWidth: this.sprite.standing[this.direction].dWidth,
                dHeight: this.sprite.standing[this.direction].dHeight,
                sx: this.sprite.standing[this.direction].sx,
                sy: this.sprite.standing[this.direction].sy,
                sWidth: this.sprite.standing[this.direction].sWidth,
                sHeight: this.sprite.standing[this.direction].sHeight
            }
        }
        GLOBAL.CTX.drawImage(
            this.image,
            this.spriteFrame.sx,
            this.spriteFrame.sy,
            this.spriteFrame.sWidth,
            this.spriteFrame.sHeight,
            this.x,
            this.y,
            this.spriteFrame.dWidth,
            this.spriteFrame.dHeight
        );
    }

    /** Общая для всех постоянно выполняемая функция */
    _step():void {
        if (this.collision.bottom) {
            this.gravity = 0;
        } else {
            this.y += this.gravity;
            this.gravity = this.gravity >= this.MAX_GRAVITY ? this.MAX_GRAVITY : this.gravity + this.G;
        }
    }
}

/** Класс ГГ */
export class Player extends Character {
    keyPressed:Array<boolean> = [];
    keyEvents:Array<{(): void}> = [];

    constructor(options:CharacterOptions) {
        super(options);

        // Забиваются функции на нажатие клавиш
        this.keyEvents[68] = this.move.right;
        this.keyEvents[65] = this.move.left;
        this.keyEvents[87] = this.move.jump;

        document.addEventListener('keydown', (e:KeyboardEvent) => this._keyboardEvents(e));
        document.addEventListener('keyup', (e:KeyboardEvent) => this._keyboardEvents(e));
    }

    move = {
        left: () => {
            if (!this.collision.left) {
                this.x -= this.speed;
                this.direction = 'left';
                this.in_move = true;
            }
        },
        right: () => {
            if (!this.collision.right) {
                this.x += this.speed;
                this.direction = 'right';
                this.in_move = true;
            }
        },
        jump: () => {
            if (this.collision.bottom) {
                this.gravity = -this.MAX_GRAVITY;
                this.collision.bottom = false;
                this.y += this.gravity;
            }
        }
    }

    /** Постоянно выполняемая функция, проверяющая нажатие клавиш */
    _listener():void {
        for (var k in this.keyPressed) { // Нажатие клавиш
            if (this.keyEvents[k]) this.keyEvents[k]();
        }
    }

    _keyboardEvents(e:KeyboardEvent):void {
        if (e.type == 'keydown') {
            this.keyPressed[e.keyCode] = true;
        } else if (this.keyPressed[e.keyCode]) {
            delete this.keyPressed[e.keyCode];
            this.in_move = false;
        }
    }
}

function contains(obj: CanvasObj, x: number, y: number): boolean {
    if (x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height) {
        return true;
    }
    return false;
}

// function canMove(x: number, y: number): boolean {
//     for (let floor of GLOBAL.TERRAIN.floors) {
//         if (contains(floor, x, y)) {
//             return false
//         }
//     }
//     return true
// }
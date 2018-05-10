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

    gravity:number = 0;
    /** Ускорение свободного падения */
    G:number = 0.3;
    /** Максимальное ускорение */
    MAX_GRAVITY:number = 10;

    image: HTMLImageElement;

    direction:string = 'right';

    // Анимация
    in_move:boolean = false;
    sprite_index:number = 0;
    anim_speed:number = 100;
    anim_index:number = 0;

    constructor(options:CharacterOptions) {
        this.type = CHAR_TYPES[options.type];

        this.x = options.x;
        this.y = options.y;

        this.sprite = options.sprite ? options.sprite : this.type.sprite;

        this.hp = this.type.hp;
        this.speed = this.type.speed;

        this.image = new Image();
        this.image.src = this.sprite.url;

        setInterval(() => this._step(), 0);
    }

    draw(ctx:CanvasRenderingContext2D):void {
        if (this.in_move) { // Если в движении
            ctx.drawImage(
                this.image,
                this.sprite.move[this.direction][this.sprite_index].sx,
                this.sprite.move[this.direction][this.sprite_index].sy,
                this.sprite.move[this.direction][this.sprite_index].sWidth,
                this.sprite.move[this.direction][this.sprite_index].sHeight,
                this.x,
                this.y,
                this.sprite.move[this.direction][this.sprite_index].dWidth,
                this.sprite.move[this.direction][this.sprite_index].dHeight
            );
            this.anim_index++;
            if (this.anim_index >= this.anim_speed) {
                this.sprite_index++;
            }
            if (this.sprite_index >= Object.keys(this.sprite.move[this.direction]).length-1) {
                this.sprite_index = 0;
            }
        } else {
            ctx.drawImage(
                this.image,
                this.sprite.standing[this.direction].sx,
                this.sprite.standing[this.direction].sy,
                this.sprite.standing[this.direction].sWidth,
                this.sprite.standing[this.direction].sHeight,
                this.x,
                this.y,
                this.sprite.standing[this.direction].dWidth,
                this.sprite.standing[this.direction].dHeight
            );
        }
    }

    _step():void {
        this.y += this.gravity;

        this.gravity = this.gravity >= this.MAX_GRAVITY ? this.MAX_GRAVITY : this.gravity + this.G;

        // TEST
        if (this.y > 400) {
            this.gravity = -0;
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

        document.addEventListener('keydown', (e:KeyboardEvent) => this._keyboardEvents(e));
        document.addEventListener('keyup', (e:KeyboardEvent) => this._keyboardEvents(e));

        setInterval(() => this._listener(), 0);
    }

    move = {
        left: () => {
            this.x -= this.speed;
            this.direction = 'left';
            this.in_move = true;
        },
        right: () => {
            this.x += this.speed;
            this.direction = 'right';
            this.in_move = true;
        },
    }

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
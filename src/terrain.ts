import { Terrain_Options, TERRAINS, Sprite, Sprite_Frame } from "./storage";
import { GLOBAL } from "./location";
import { Character } from "./characters";

interface Bounds {
    tl: Array<number>;
    tr: Array<number>;
    br: Array<number>;
    bl: Array<number>;
}

export class Terrain {
    x:number;
    y:number;
    width:number;
    height:number;
    type:string;
    
    image: HTMLImageElement;
    sprite: Sprite;
    spriteFrame: Sprite_Frame;
    sprite_index: number = 0;

    anim_speed:number = 100;
    anim_index:number = 0;

    constructor(options:Terrain_Options) {
        this.x = options.x;
        this.y = options.y;
        this.type = options.type;

        this.width = options.width ? options.width : 1;
        this.height = options.height ? options.height : 1;
 
        this.sprite = TERRAINS[ this.type ];

        this.image = new Image();
        this.image.src = this.sprite.url;
    }

    draw():void {
        this.spriteFrame = {
            dWidth: this.sprite.sprite[this.sprite_index].dWidth,
            dHeight: this.sprite.sprite[this.sprite_index].dHeight,
            sx: this.sprite.sprite[this.sprite_index].sx,
            sy: this.sprite.sprite[this.sprite_index].sy,
            sWidth: this.sprite.sprite[this.sprite_index].sWidth,
            sHeight: this.sprite.sprite[this.sprite_index].sHeight,
        };
        this.anim_index++;
        if (this.anim_index >= this.anim_speed) {
            this.sprite_index++;
        }
        if (this.sprite_index >= Object.keys(this.sprite.sprite).length-1) {
            this.sprite_index = 0;
        }
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                GLOBAL.CTX.drawImage(
                    this.image,
                    this.spriteFrame.sx,
                    this.spriteFrame.sy,
                    this.spriteFrame.sWidth,
                    this.spriteFrame.sHeight,
                    this.x + (this.spriteFrame.dWidth * x),
                    this.y + (this.spriteFrame.dHeight * y),
                    this.spriteFrame.dWidth,
                    this.spriteFrame.dHeight
                );
            }
        }
    }

    checkCollision(object:Character):boolean {return false}
    /** Проверяет два объекта на вертикальную коллизию */
    _pointInSquare(point:Array<number>, square:Bounds):boolean {
        let x:number = point[0];
        let y:number = point[1];

        if (x > square.tl[0] && x < square.br[0] && y > square.tl[1] && y < square.br[1]) {
            return true
        } else {
            return false
        }
    }
}

/** Твердые объекты */
export class Floor extends Terrain {
    is_solid:boolean = true;

    constructor(options:Terrain_Options) {
        super(options);
    }

    checkCollision(object:Character):boolean {
        // не. ну тут просто пиздец. иначе не придумал как
        let self:Bounds = {
            tl: [
                this.x,
                this.y
            ],
            tr: [
                this.x + this.spriteFrame.dWidth * this.width,
                this.y
            ],
            br: [
                this.x + this.spriteFrame.dWidth * this.width,
                this.y + this.spriteFrame.dHeight * this.width
            ],
            bl: [
                this.x,
                this.y + this.spriteFrame.dHeight * this.width
            ]
        };
        let other:Bounds = {
            tl: [
                object.x,
                object.y
            ],
            tr: [
                object.x + object.spriteFrame.dWidth,
                object.y
            ],
            br: [
                object.x + object.spriteFrame.dWidth,
                object.y + object.spriteFrame.dHeight
            ],
            bl: [
                object.x,
                object.y + object.spriteFrame.dHeight
            ]
        };

        let collision:boolean = false
        
        let side:Array<number>;
        let offset:number = 2;

        // ʕ·͡ᴥ·ʔ
        for (var point of [other.bl, other.tl, other.br, other.tr]) {
            // LEFT COLLISION
            side = point.slice();
            side[0] -= offset;
            collision = this._pointInSquare( side, self );
            object.collision.left = collision ? collision : object.collision.left;
            // RIGHT COLLISION
            side = point.slice();
            side[0] += offset;
            collision = this._pointInSquare( side, self );
            object.collision.right = collision ? collision : object.collision.right;
            // TOP COLLISION
            side = point.slice();
            side[1] -= offset;
            collision = this._pointInSquare( side, self );
            object.collision.top = collision ? collision : object.collision.top;
            // BOTTOM COLLISION
            side = point.slice();
            side[1] += offset;
            collision = this._pointInSquare( side, self );
            object.collision.bottom = collision ? collision : object.collision.bottom;
        }

        return collision
    }
}

/** Декорации. Объекты, сквозь которые может проходить персонаж */
export class Decoration extends Terrain {
    is_solid:boolean = false;

    constructor(options:Terrain_Options) {
        super(options);
    }
}

//     draw() {
//         console.log('draw');
// >>>>>>> behindloader
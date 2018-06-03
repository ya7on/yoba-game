import { CanvasObj, CanvasButton, Point } from "./storage";
import { Main } from "./main";
import { GLOBAL } from "./location"
import { Player } from "./characters"
// import { Scene } from "./scene";


export class Menu {
    active:Boolean = false;
    items:Array<string>;
    width: number = 200;
    height: number = 50;
    buttons: Array<CanvasButton> = [];
    buttonEvents: { [key: string]: Function } = {
        start: () => {
            this.close();
            // GLOBAL.SCENE = new Scene();
            // GLOBAL.PLAYER = new Player({x:1, y:1, type: 'player'});
            // GLOBAL.SCENE.active = true;
        }
    }
    listener: EventListenerObject = listenClick.bind(this);

    constructor() {
        GLOBAL.CANVAS.addEventListener('click', this.listener);
        this.render();
    }

    render() {
        this.items = ['start', 'settings'];
        GLOBAL.CTX.font = "Bold 24px Courier";
        var x: number = GLOBAL.CTX.canvas.width * 0.5 - 200 * 0.5;
        var y: number = 100;
        for (var text of this.items) {
            y += 100;
            let param: CanvasObj = {
                x: x,
                y: y,
                width: this.width,
                height: this.height
            }
            this.drawButton(text, param);
        }

    }

    drawButton(text: string, object: CanvasObj) {
        GLOBAL.CTX.fillStyle = 'pink';
        GLOBAL.CTX.fillRect(object.x, object.y, object.width, object.height);
        GLOBAL.CTX.fillStyle = 'black';
        let center: Point = getCenter(object);
        let textWidth: number = GLOBAL.CTX.measureText(text).width;
        let textHeight: number = textWidth / text.length;
        GLOBAL.CTX.fillText(text, center.x - textWidth * 0.5, center.y + textHeight * 0.5);
        this.buttons.push({
            param: object,
            text: text,
            event: this.buttonEvents[text]
        });
    }

    close() {
        GLOBAL.CANVAS.removeEventListener('click', this.listener);
        this.active = false;
    }
}

// TODO: Возможно, стоит превратить в метод
/** Функция проверяет указанный объект на вхождение в него x, y */
function contains(obj: CanvasObj, x: number, y: number): boolean {
    if (x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height) {
        return true;
    }
    return false;
}

function listenClick (event: MouseEvent): void {
    for (var button of this.buttons) {
        if (contains(button.param, event.x, event.y)) {
            button.event && button.event();
        }
    }
}

/** Функция возвращает центр указанного объекта */
function getCenter(object: CanvasObj): Point {
    let x: number = object.x + object.width * 0.5;
    let y: number = object.y + object.height * 0.5;
    return {x: x, y: y}
}

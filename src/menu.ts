import { CanvasObj, CanvasButton, Point } from "./storage";
import { GLOBAL } from "./location"
import { Scene } from "./scene";


export class Menu {
    active: Boolean = true;
    items: Array<string>;
    width: number = 200;
    height: number = 50;
    buttons: Array<CanvasButton> = [];
    buttonEvents: { [key: string]: Function } = {
        start: () => {
            this.close();
            GLOBAL.SCENE = new Scene();
            GLOBAL.SCENE.active = true;
        }
    }
    listener: EventListenerObject = listenClick.bind(this);

    constructor() {
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
            this.createButton(text, param);
        }
        GLOBAL.CANVAS.addEventListener('click', this.listener);
    }

    render() {
        for (let button of this.buttons) {
            this.drawButton(button);
        }
    }

    createButton(text: string, object: CanvasObj) {
        let center: Point = getCenter(object);
        let textWidth: number = GLOBAL.CTX.measureText(text).width;
        let textHeight: number = textWidth / text.length;
        let canvasText = {
            x: center.x - textWidth * 0.5,
            y: center.y + textHeight * 0.5,
            text: text
        }
        this.buttons.push({
            param: object,
            textParam: canvasText,
            event: this.buttonEvents[text]
        });
    }

    drawButton(button: CanvasButton) {
        GLOBAL.CTX.fillStyle = 'pink';
        GLOBAL.CTX.fillRect(button.param.x, button.param.y, button.param.width, button.param.height);
        GLOBAL.CTX.fillStyle = 'black';
        GLOBAL.CTX.fillText(button.textParam.text, button.textParam.x, button.textParam.y);
    }

    close() {
        GLOBAL.CANVAS.removeEventListener('click', this.listener);
        this.buttons = [];
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

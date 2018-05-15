import { canvasObj, canvasButton } from "./storage";
import { Main } from "./main";


export class Menu {
    active:Boolean = true;
    items:Array<string>;
    width: number = 200;
    height: number = 50;
    buttons: Array<canvasButton> = [];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    buttonEvents: { [key: string]: Function } = {
        start: () => {
            this.close();
            new Main;
        }
    }
    listener: EventListenerObject = listenClick.bind(this);

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvas.addEventListener('click', this.listener);
        this.render();
    }

    render() {
        this.items = ['start', 'settings'];
        this.ctx.font = "24px serif";
        var x: number = this.ctx.canvas.width * 0.5 - 200 * 0.5;
        var y: number = 0;
        for (var text of this.items) {
            y += 100;
            let param: canvasObj = {
                x: x,
                y: y,
                width: this.width,
                height: this.height
            }
            this.drawButton(text, param);
        }

    }

    drawButton(text: string, param: canvasObj) {
        this.ctx.fillStyle = 'pink';
        this.ctx.fillRect(param.x, param.y, param.width, param.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(text, param.x, param.y + 25);
        this.buttons.push({
            param: param,
            text: text,
            event: this.buttonEvents[text]
        });
    }

    close() {
        this.canvas.removeEventListener('click', this.listener);
    }
}

// TODO: Возможно, стоит превратить в метод
/** Функция проверяет указанный объект на вхождение в него x, y */
function contains(obj: canvasObj, x: number, y: number): boolean {
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
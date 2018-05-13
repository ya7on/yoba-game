import { canvasObj, canvasButton } from "./storage";
import { Main } from "./main";


export class Menu {
    active:Boolean = true;
    items:Array<string>;
    width: number = 200;
    height: number = 50;
    buttons: Array<canvasButton> = [];

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        canvas.addEventListener('click', (event: MouseEvent) => {
            for (var button of this.buttons) {
                if (contains(button.param, event.x, event.y)) {
                    button.event && button.event();
                }
            }
        });
        this.render(ctx);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.items = ['start', 'settings'];
        ctx.font = "24px serif";
        var x: number = ctx.canvas.width * 0.5 - this.width * 0.5;
        var y: number = 0;
        for (var text of this.items) {
            y += 100;
            let param: canvasObj = {
                x: x,
                y: y,
                width: this.width,
                height: this.height
            }
            this.drawButton(ctx, text, param);
        }

    }

    drawButton(ctx: CanvasRenderingContext2D, text: string, param: canvasObj) {
        ctx.fillStyle = 'pink';
        ctx.fillRect(param.x, param.y, param.width, param.height);
        ctx.fillStyle = 'black';
        ctx.fillText(text, param.x, param.y + 25);
        this.buttons.push({
            param: param,
            text: text,
            event: buttonEvents[text]
        });
    }
}

function contains(obj: canvasObj, x: number, y: number): boolean {
    if (x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height) {
        return true;
    }
    return false;
}

var buttonEvents: { [key: string]: Function } = {
    start: () => {
        new Main;
    }
}
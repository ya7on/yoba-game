import { Player } from "./characters";
import { Location } from "./location";
import { Menu } from "./menu";



let player = new Player({x:1, y:1, type: 'player'});
let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('app');
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
// canvas.style.width = '100%';
// canvas.style.height = '100%';
canvas.width = 1024; // TODO
canvas.height = 768; // TODO
let MENU:Menu = new Menu(ctx, canvas);

export class Main {
    // canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('app');
    // ctx:CanvasRenderingContext2D = this.canvas.getContext('2d');

    constructor() {
        // Настройка канваса
        // canvas.style.width = '100%';
        // canvas.style.height = '100%';
        // canvas.width = 1024; // TODO
        // canvas.height = 768; // TODO
        // вызов рендера
        setInterval(() => this.render(), 0);

        ctx.imageSmoothingEnabled = false;
    };

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
    }
}

// new Main();
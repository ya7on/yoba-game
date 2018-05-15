import { Player } from "./characters";
import { Location } from "./location";
import { Menu } from "./menu";


let player = new Player({x:1, y:1, type: 'player'});
let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('app');
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// Настройка канваса
canvas.width = window.innerWidth; // TODO
canvas.height = window.innerHeight; // TODO

let MENU:Menu = new Menu(ctx, canvas);

export class Main {
    constructor() {
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
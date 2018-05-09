import { Player } from "./characters";
import { Location } from "./location";
import { Menu } from "./menu";

let MENU:Menu = new Menu();

let player = new Player({x:1, y:1, type: 'player'});

class Main {
    canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('app');
    ctx:CanvasRenderingContext2D = this.canvas.getContext('2d');

    constructor() {
        // Настройка канваса
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.width = 1024; // TODO
        this.canvas.height = 768; // TODO
        // вызов рендера
        setInterval(() => this.render(), 0);
    };

    render() {
        this.ctx.clearRect(0,0,100,100)
        player.draw(this.ctx);
    }
}

new Main();
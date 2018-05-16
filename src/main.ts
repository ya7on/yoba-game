import { GLOBAL, Location } from "./location";
import { Menu } from "./menu"

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

        this.ctx.imageSmoothingEnabled = false;
    };

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (GLOBAL.PLAYER) {
            GLOBAL.PLAYER.draw(this.ctx);
        }
    }
}

new Main()
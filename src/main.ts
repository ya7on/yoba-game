import { GLOBAL, Location } from "./location";
import { Menu } from "./menu";

GLOBAL.CANVAS = <HTMLCanvasElement>document.getElementById('app');
GLOBAL.CTX = GLOBAL.CANVAS.getContext('2d');

// Настройка канваса
GLOBAL.CANVAS.width = window.innerWidth; // TODO
GLOBAL.CANVAS.height = window.innerHeight; // TODO

let MENU:Menu = new Menu(GLOBAL.CTX, GLOBAL.CANVAS);

export class Main {
    constructor() {
        // вызов рендера
        setInterval(() => this.render(), 0);

        GLOBAL.CTX.imageSmoothingEnabled = false;
    };

    render() {
        if (!MENU.active) {
            GLOBAL.CTX.clearRect(0, 0, GLOBAL.CANVAS.width, GLOBAL.CANVAS.height);
            if (GLOBAL.PLAYER) {
                GLOBAL.PLAYER.draw(GLOBAL.CTX);
            }
        }
    }
}

new Main()

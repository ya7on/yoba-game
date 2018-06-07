import { GLOBAL} from "./location";
import { Menu } from "./menu";
import { Scene } from "./scene";


GLOBAL.CANVAS = <HTMLCanvasElement>document.getElementById('app');
GLOBAL.CTX = GLOBAL.CANVAS.getContext('2d');

// Настройка канваса
GLOBAL.CANVAS.width = window.innerWidth;
GLOBAL.CANVAS.height = window.innerHeight;

GLOBAL.MENU = new Menu();

export class Main {
    constructor() {
        // вызов рендера
        setInterval(() => this.render(), 0);
        GLOBAL.SCENE = new Scene();
        GLOBAL.CTX.imageSmoothingEnabled = false;
    };

    render() {
        
        // if (GLOBAL.MENU.active) {
        //     GLOBAL.MENU.render()
        // }
        if (GLOBAL.SCENE && GLOBAL.SCENE.active) {
            GLOBAL.CTX.clearRect(0, 0, GLOBAL.CANVAS.width, GLOBAL.CANVAS.height);
            GLOBAL.SCENE.render();
        }
    }
}

new Main()

import { Player } from "./player";

class Main {
    canvas = <HTMLCanvasElement>document.getElementById('app');
    ctx = this.canvas.getContext('2d');

    constructor() {
        setInterval(() => this.render(), 0);
    };

    render() {

        // if (window.PLAYER) {
        //     debugger;
        // }
        // window.NPC.forEach(element => {
        //    debugger; 
        // });
    }
}

new Main();
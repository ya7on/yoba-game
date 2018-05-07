/* jshint esversion: 6 */
define([], function() {

    // переменная игрока
    window.PLAYER = null;
    // переменные для отрисовки
    window.NPCs = [];
    window.BACKGROUNDs = [];

    class Main {
        constructor() {
            this.canvas = document.getElementById('app');
            this.ctx = this.canvas.getContext('2d');

            let this_ = this;
            setInterval(function(){
                this_.render();
            }, 0);
        }

        /** Отрисовка */
        render() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (PLAYER && this.isInSight(PLAYER)) { // Отрисовка ГГ
                PLAYER.draw(this.ctx);
            }
            
            // Пробегает по всем неписям и отрисовывает их
            for (var i in NPCs) {
                if (this.isInSight(NPCs[i])) {
                    NPCs.draw(this.ctx);
                }
            }
        }

        /** Проверяет находится ли объект в поле зрения */
        isInSight(object) {
            return true; // ПОКА ТРУ ПОТОМ TODO
        }

    }

    return Main;
});
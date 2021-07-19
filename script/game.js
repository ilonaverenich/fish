const KEYS = {
   left: 37,
   right: 39,
   top: 38,
   down: 40
}
let game = {
   ctx: null, //отсутсвие значения, в дальнейшем может быть присвоено значение
   sprites: {
      fish: null,
      background: null,
      fishenemy: null,
      buttonplay: null,
      buttonstop: null

   },
   width: 640,
   height: 320,
   fish: null,

   init() {
      //init - получаем контекст для отрисовки графики
      this.ctx = document.getElementById('mycanvas').getContext('2d');
      this.setEvents();
   },
   setEvents() {
      window.addEventListener("keydown", e => {

         switch (e.keyCode) {
            case KEYS.left:

               this.fish.dx = -this.fish.speed;
               break;

            case KEYS.top:
               this.fish.dy = -this.fish.speed;
               break;

            case KEYS.right:
               this.fish.dx = this.fish.speed;
               /*   this.fish = */
               break;

            case KEYS.down:
               this.fish.dy = this.fish.speed;
               break;
         }
      });

      window.addEventListener("keyup", e => {
         this.fish.dx = 0;
         this.fish.dy = 0;

      });
   },
   preload(callback) {
      //preload - предзагрузка спрайтов
      let loaded = 0;
      let required = Object.keys(this.sprites).length;
      let onImageLoad = () => {
         ++loaded;
         if (loaded >= required) {
            callback();
         }
      }
      for (let key in this.sprites) {
         this.sprites[key] = new Image();
         this.sprites[key].src = "img/" + key + '.png';
         this.sprites[key].addEventListener('load', onImageLoad);

      }
   },
   update() {
      this.fish.move()

      /*  for (let fishs of this.) */
   },
   run() {
      //run - игровой запуск
      window.requestAnimationFrame(() => {
         this.update();//обновление всех игровых состояний
         this.render();//отрисовка всех игровых компонентов с учётом изменённых характеристик
         this.run();//запуск игры
      });
   },
   render() {
      //render - отрисовка изображений
      this.ctx.clearRect(0, 0, this.width, this.height);//перед тем, как отрисовать новый кадр, отчистить всё, что было до этого
      this.ctx.drawImage(this.sprites.background, 0, 0);
      this.ctx.drawImage(this.sprites.fish, 0, 0, this.fish.width, this.fish.height, this.fish.x, this.fish.y, this.fish.width, this.fish.height);
      this.ctx.drawImage(this.sprites.fishenemy, 10, 10);
      this.ctx.drawImage(this.sprites.buttonplay, 600, 10);
      this.ctx.drawImage(this.sprites.buttonstop, 560, 10);

   },
   start() {
      this.init();
      this.preload(() => {
         this.run();
      });
      this.run();
   }
};

game.fish = {
   x: 275,
   y: 140,
   height: 50,
   width: 65,
   dx: 0,//смещение по х
   dy: 0,//смещение по y
   speed: 2, //скорость рыбки
   headToTheRight: true,//голова рыбки вправо
   move() {
      {
         if (this.dx) {
            this.x += this.dx;
         }

         if (this.dy) {
            this.y += this.dy;
         }
      }
   },
   collide(element) {
      let x = this.x + this.dx;
      let y = this.y + this.dy;
      if (this.x + this.width > element.x &&
         this.x < element.width + element.x &&
         this.y + this.height > element.y &&
         this.y < element.y + element.height) {
         return true;
      }
      else {
         return false;
      }

   }
}
window.addEventListener('load', () => {
   game.start();
});


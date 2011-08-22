ig.module(
  "game.entities.asteroid"
).requires(
  "impact.entity"
).defines(function() {
  EntityAsteroid = ig.Entity.extend({
    size: {x: 64, y: 64},
    type: ig.Entity.TYPE.B,
    animSheet: new ig.AnimationSheet("media/asteroid.png", 64, 64),
    init: function (x,y,s) {
      this.parent(x,y,s);
      this.addAnim("idle", 1, [0]);
    },
    update: function() {
      this.parent();
      // Boundary checks
      if (this.pos.x > ig.system.width) {
          this.pos.x = -64;
      } else if(this.pos.x < -64) {
          this.pos.x = ig.system.width;
      };

      if (this.pos.y > ig.system.height) {
          this.pos.y = -64;
      } else if (this.pos.y < -64) {
          this.pos.y = ig.system.height;
      };
    }
  });
});
ig.module(
  "game.entities.player"
).requires(
  "impact.entity"
).defines(function() {
  EntityPlayer = ig.Entity.extend({
    size: {x:28, y: 50},
    offset: {x: 18, y: 7},
    angle: 0,
    thrust: 0,
    
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    check: function(other) {
      this.health = 0;
    },
    
    animSheet: new ig.AnimationSheet("media/player.png", 64, 64),
    
    init: function(x,y,s) {
      this.parent(x,y,s);
      this.addAnim("idle", 0.05, [0]);
      this.addAnim("thrust", 0.05, [1,2]);
    },
    
    update: function() {
      if (ig.input.state("left")) {
          this.angle -= 3;
      };

      if (ig.input.state("right")) {
          this.angle += 3;    
      };

      if (ig.input.state("up")) {
          // Accelerate the player in the right direction
          this.accel.x = Math.sin(this.angle*Math.PI/180)*this.thrust;
          this.accel.y = -(Math.cos(this.angle*Math.PI/180)*this.thrust);
          this.currentAnim = this.anims.thrust;
      } else {
          this.accel.x = 0;
          this.accel.y = 0;
          this.currentAnim = this.anims.idle;
      };

      // Set the angle for the current animation
      this.currentAnim.angle = this.angle*(Math.PI/180);
      
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
var Sprite = function (name, painter, behaviors) {
  if (name !== undefined) this.name = name;
  if (painter !== undefined) this.painter = painter;

  this.top = 0;
  this.left = 0;
  this.width = 0;
  this.height = 0;
  this.velocityX = 0;
  this.velocityY = 0;
  this.visible = true;
  this.animating = false;
  this.behaviors = behaviors || [];
  return this;

}

Sprite.prototype = {
  paint: function (context) {
    var _self = this;
    if (this.painter !== undefined && this.visible) {
      this.painter.paint(_self, context);
    }
  },
  updated: function (context,time) {
    for  (var i=0;i<this.behaviors.length;++i){
      this.behaviors[i].execute(this,context,time);
    }
  }
}


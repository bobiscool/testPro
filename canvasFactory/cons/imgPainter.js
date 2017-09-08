/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-08 10:07:42 
 * @Last Modified by:   Thunderball.Wu 
 * @Last Modified time: 2017-09-08 10:07:42 
 * 图像绘制器
 */

var ImagePainter = function(imgUrl){
    this.image = new Image();
    this.Image.url = imgUrl;
}

ImagePainter.prototype = {
    paint:function(sprite,context){
        if(this.image.complete){
            context.drawImage(this.image,sprite.left,sprite.top,sprite.width,sprite.height);
        }
    }
}
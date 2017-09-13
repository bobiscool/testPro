function bucket(x, y) {
    this.x = x;
    this.y = y;
}

bucket.prototype = {
    drawCircle:function(context){
       context.arc(this.x,this.y)
    }
}
Textline=function(){
    this.text ='';
    this.left = x;
    this.bottom = y;
    this.caret = 0;
}

Textline.prototype = {
    insert:function(text){
       this.text = this.text.substr(0,this.caret)+text+
                   this.text.substr(this.caret);
       this.caret += text.length;
    },
    removeCharacterBeforeCaRET:function(){
        if(this.caret === 0){
            
        }

    }
}
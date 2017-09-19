/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-19 12:47:19 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-19 16:26:29
 * calc.js
 * 用于计算的js库
 */

 var expExample = ['1','+','2','+',"sin(",'3',')']

 var expRank = {
     "(":0,
     "/":1,
     "*":1,
      "+":2,
      "-":2
 }


function Calc(exp){
  
}



function _Calc(exp){
 // Calc 随身携带的包
   this.exp = exp;
   // 由于有 sin cos 这些特殊的函数 我建议 传入的exp 最好不要是字符串 就是一个数组
   this.expList = exp.split('');
   this.symbolStack = [];
   //左右两边的栈
   this.numberStack = [];
}


_Calc.prototype = {
    _init:function(exp){
        //初始化解析
        
    },
    _calculate:function(){
        this.exp.forEach(function(item) {
            
            if(!isNaN(Number(item))){
               this.numberStack.push(item); 
            }else{
               this.symbolStack.push(item);
            }
        }, this);
    },
    _genSubfix:function(){
         this.exp.forEach(function(item) {
            
            if(!isNaN(Number(item))){
               this.numberStack.push(item); 
            }else{
                if(this.symbolStack.length>0){
                    let oldSymbol =  this.symbolStack[this.symbolStack.length-1];
                    // 如果当前遇到的符号 优先级 大于 前面的 那就直接 压入栈

                    if(expRank[item]>expRank[oldSymbol]){
                        this.symbolStack.push(item);
                    }else{
                                 // 如果当前遇到的符号 优先级 小于 等于 前面的 那就直接 弹出栈
                        this.numberStack.push(this.symbolStack.pop())
                    }
                }

            }
        }, this);
    }
}